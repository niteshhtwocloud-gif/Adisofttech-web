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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0d1117; color: #f0f6fc; border-radius: 12px; border: 1px solid #30363d;">
      <h2 style="color: #58a6ff; margin-bottom: 20px; font-size: 20px;">⚡ New Technical Consultation Lead</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #8b949e; width: 140px;">Name</td>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #f0f6fc; font-weight: bold;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #8b949e;">Company</td>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #f0f6fc;">${company}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #8b949e;">Phone</td>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #58a6ff;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #8b949e;">Email</td>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #f0f6fc;">${email || "Not provided"}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #8b949e;">Requested Service</td>
          <td style="padding: 10px; border-bottom: 1px solid #21262d; color: #f0f6fc;">${service || "Technical Consultation"}</td>
        </tr>
      </table>
      <div style="background-color: #161b22; padding: 16px; border-radius: 8px; border: 1px solid #30363d; margin-bottom: 20px;">
        <h4 style="margin: 0 0 8px 0; color: #8b949e; font-size: 12px; text-transform: uppercase;">Message</h4>
        <p style="margin: 0; color: #e6edf3; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
      <p style="font-size: 12px; color: #6e7681; margin: 0;">Sent via AdiSofTech Full-Stack Ingestion Engine • ${new Date().toLocaleString()}</p>
    </div>
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

