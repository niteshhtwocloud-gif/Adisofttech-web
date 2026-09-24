// SMTP email transport and notification service for consultation inquiries.
import nodemailer from "nodemailer";
import config from "../config/env.js";
import Settings from "../models/settings.model.js";

let cachedTransporter = null;
let lastEmailUser = null;
let lastEmailPass = null;

/**
 * Retrieves the current effective email configuration.
 * Checks MongoDB Settings first, falling back to environment config.
 */
export const getEmailConfig = async () => {
  let emailUser = config.emailUser || "";
  let emailPass = config.emailPass || "";
  let emailTo = config.emailTo || "";

  try {
    const settings = await Settings.findOne().lean();
    if (settings) {
      if (settings.emailUser && settings.emailUser.trim()) {
        emailUser = settings.emailUser.trim();
      }
      if (settings.emailPass && settings.emailPass.trim()) {
        emailPass = settings.emailPass.trim();
      }
      if (settings.emailTo && settings.emailTo.trim()) {
        emailTo = settings.emailTo.trim();
      }
    }
  } catch (err) {
    console.warn("Could not load email settings from DB, using env fallback:", err.message);
  }

  return { emailUser, emailPass, emailTo };
};

/**
 * Creates or retrieves a cached Nodemailer transporter instance.
 * @param {Object} [overrideCreds] - Optional temporary credentials for verification.
 */
export const getTransporter = async (overrideCreds = null) => {
  const creds = overrideCreds || (await getEmailConfig());
  const { emailUser, emailPass } = creds;

  if (!emailUser || !emailPass) {
    return null;
  }

  // Reuse cached transporter if credentials haven't changed
  if (
    !overrideCreds &&
    cachedTransporter &&
    lastEmailUser === emailUser &&
    lastEmailPass === emailPass
  ) {
    return cachedTransporter;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  if (!overrideCreds) {
    cachedTransporter = transporter;
    lastEmailUser = emailUser;
    lastEmailPass = emailPass;
  }

  return transporter;
};

/**
 * Clears the cached transporter instance so next call re-evaluates configuration.
 */
export const resetTransporter = () => {
  cachedTransporter = null;
  lastEmailUser = null;
  lastEmailPass = null;
};

// Sends styled HTML email alert when new contact inquiry is submitted.
export const sendContactNotification = async ({
  name,
  email,
  phone,
  company,
  service,
  message,
}) => {
  const { emailUser, emailPass, emailTo } = await getEmailConfig();
  const transporter = await getTransporter();

  if (!transporter || !emailUser || !emailPass) {
    console.log("Email transporter not configured. Skipping email dispatch.");
    return false;
  }

  const recipient = emailTo || emailUser;
  const subject = `🚀 New AST Consultation Request: ${company || name}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 28px 12px; color: #0f172a;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
        <!-- Header Banner -->
        <tr>
          <td style="background: linear-gradient(135deg, #0b57d0 0%, #155eef 50%, #ea580c 100%); padding: 28px 24px; text-align: left;">
            <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border-radius: 20px; padding: 4px 12px; margin-bottom: 10px;">
              <span style="color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">⚡ New Website Inquiry</span>
            </div>
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">Technical Consultation Lead</h1>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 6px 0 0 0; font-size: 13px;">Received from AdiSofTech Public Web Portal</p>
          </td>
        </tr>

        <!-- Body Details -->
        <tr>
          <td style="padding: 28px 24px;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 6px; width: 140px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Client Name</td>
                <td style="padding: 12px 6px; font-size: 14px; font-weight: 700; color: #0f172a;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 6px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Company</td>
                <td style="padding: 12px 6px; font-size: 14px; color: #1e293b; font-weight: 600;">${company}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 6px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</td>
                <td style="padding: 12px 6px; font-size: 14px; color: #0b57d0; font-weight: 700;">
                  <a href="tel:${phone}" style="color: #0b57d0; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px 6px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</td>
                <td style="padding: 12px 6px; font-size: 14px; color: #1e293b;">
                  ${email ? `<a href="mailto:${email}" style="color: #0b57d0; text-decoration: none; font-weight: 600;">${email}</a>` : `<span style="color: #94a3b8; font-style: italic;">Not provided</span>`}
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 6px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Required Service</td>
                <td style="padding: 12px 6px;">
                  <span style="display: inline-block; background-color: #eff6ff; color: #0b57d0; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 8px; border: 1px solid #bfdbfe;">
                    ${service || "Technical Consultation"}
                  </span>
                </td>
              </tr>
            </table>

            <!-- Message Block -->
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0b57d0; border-radius: 10px; padding: 16px 18px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 8px 0; color: #0b57d0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">Project Scope & Deliverables</h4>
              <p style="margin: 0; color: #334155; font-size: 13px; line-height: 1.65; white-space: pre-wrap;">${message}</p>
            </div>

            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;">

            <!-- Footer -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-size: 11px; color: #94a3b8; text-align: left;">
                  Sent via AdiSofTech Lead Notification System
                </td>
                <td style="font-size: 11px; color: #94a3b8; text-align: right;">
                  ${new Date().toLocaleString()}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"AdiSofTech Lead Engine" <${emailUser}>`,
      to: recipient,
      subject,
      html,
    });
    console.log(`Email notification sent to ${recipient} via ${emailUser}`);
    return true;
  } catch (err) {
    console.error("Failed to send contact notification email:", err.message);
    return false;
  }
};

// Sends professional AST-branded HTML email with 6-digit OTP code for administrator password reset.
export const sendPasswordResetOtpEmail = async ({ email, name, otp }) => {
  const { emailUser, emailPass } = await getEmailConfig();
  const transporter = await getTransporter();

  if (!transporter || !emailUser || !emailPass) {
    console.log("Email transporter not configured. Cannot dispatch OTP email.");
    return false;
  }

  const subject = `🔐 AdiSofTech Admin - Password Reset OTP: ${otp}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 30px 15px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
        <tr>
          <td style="background: linear-gradient(135deg, #0b57d0 0%, #155eef 50%, #ea580c 100%); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 0.5px;">AdiSofTech</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 6px 0 0 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Admin Security Portal</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px 28px;">
            <h2 style="color: #0f172a; margin: 0 0 12px 0; font-size: 20px; font-weight: 700;">Password Reset Request</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
              Hello <strong>${name || "Administrator"}</strong>,<br>
              We received a request to reset the password for your AdiSofTech Admin Account (<strong>${email}</strong>). Use the one-time verification code below to authorize your password update.
            </p>

            <div style="background-color: #f8fafc; border: 2px dashed #0b57d0; border-radius: 12px; padding: 20px; text-align: center; margin: 0 0 24px 0;">
              <span style="display: block; font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">Your 6-Digit One-Time Code</span>
              <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #0b57d0; display: inline-block;">${otp}</span>
              <span style="display: block; font-size: 12px; color: #dc2626; font-weight: 600; margin-top: 8px;">⏱ Expires in 15 minutes</span>
            </div>

            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0 0 20px 0;">
              If you did not request this password reset, please ignore this email or contact your security team immediately. Your password will remain unchanged.
            </p>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">

            <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">
              AdiSofTech Admin Control Panel • Automated Security System
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"AdiSofTech Security" <${emailUser}>`,
      to: email,
      subject,
      html,
    });
    console.log(`Password reset OTP dispatched successfully to: ${email}`);
    return true;
  } catch (err) {
    console.error("Failed to send password reset OTP email:", err.message);
    return false;
  }
};

/**
 * Dispatches a verification test email to verify configured or tested SMTP credentials.
 */
export const sendTestEmail = async ({ to, emailUser, emailPass } = {}) => {
  let transporter;
  let sender = emailUser;

  if (emailUser && emailPass) {
    transporter = await getTransporter({ emailUser, emailPass });
  } else {
    const creds = await getEmailConfig();
    sender = creds.emailUser;
    transporter = await getTransporter();
  }

  if (!transporter || !sender) {
    throw new Error("SMTP credentials are not configured. Please supply Sender Email and Google App Password.");
  }

  const recipient = to || sender;
  const subject = "🧪 AdiSofTech SMTP Verification Test Email";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 28px 12px; color: #0f172a;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
        <tr>
          <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 28px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">SMTP Test Successful! ✅</h1>
            <p style="color: rgba(255,255,255,0.95); margin: 6px 0 0 0; font-size: 13px;">AdiSofTech Email Service Verification</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 28px 24px;">
            <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 18px 0;">
              This email confirms that your <strong>Sender Gmail</strong> and <strong>Google App Password</strong> are configured properly and can send emails without issues.
            </p>
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #166534; text-transform: uppercase;">Configuration Verified:</p>
              <p style="margin: 0; font-size: 13px; color: #15803d;">• Dispatched from: <strong>${sender}</strong></p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #15803d;">• Delivered to: <strong>${recipient}</strong></p>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">• Timestamp: ${new Date().toLocaleString()}</p>
            </div>
            <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 0;">
              Incoming contact form submissions and password reset OTPs will now be delivered via this connection.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"AdiSofTech Admin Test" <${sender}>`,
    to: recipient,
    subject,
    html,
  });

  return { success: true, recipient, sender };
};
