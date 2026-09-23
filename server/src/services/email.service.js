// SMTP email transport and notification service for consultation inquiries.
import nodemailer from "nodemailer";
import config from "../config/env.js";

let transporter = null;

if (config.emailUser && config.emailPass) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.emailUser,
      pass: config.emailPass,
    },
  });
}

// Sends styled HTML email alert when new contact inquiry is submitted.
export const sendContactNotification = async ({
  name,
  email,
  phone,
  company,
  service,
  message,
}) => {
  if (!transporter) {
    console.log("Email transporter not configured. Skipping email dispatch.");
    return false;
  }

  const recipient = config.emailTo || config.emailUser;
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
      from: `"AdiSofTech Lead Engine" <${config.emailUser}>`,
      to: recipient,
      subject,
      html,
    });
    console.log(`Email notification sent to ${recipient}`);
    return true;
  } catch (err) {
    console.error("Failed to send contact notification email:", err.message);
    return false;
  }
};

// Sends professional AST-branded HTML email with 6-digit OTP code for administrator password reset.
export const sendPasswordResetOtpEmail = async ({ email, name, otp }) => {
  if (!transporter) {
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
      from: `"AdiSofTech Security" <${config.emailUser}>`,
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

