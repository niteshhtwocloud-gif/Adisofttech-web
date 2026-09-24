import Settings from "../models/settings.model.js";
import config from "../config/env.js";
import { updateEnvFile } from "../utils/env.utils.js";
import { resetTransporter, sendTestEmail } from "../services/email.service.js";

const DEFAULT_HERO_SLIDES = [
  {
    title: "Custom Application Development for Your Business",
    subtitle: "We build powerful, secure and scalable custom software applications tailored to your unique business requirements.",
    badge: "Custom Solutions",
    image: "/hero/banner-custom-application.png",
    link: "/#contact",
    order: 1,
    active: true,
  },
  {
    title: "Business Automation with Tally, Web & ERP Integration",
    subtitle: "Connect Tally Prime with your web applications, mobile apps, CRM, ERP or third-party software using secure APIs.",
    badge: "Integration & Automation",
    image: "/hero/banner-business-automation.png",
    link: "/#contact",
    order: 2,
    active: true,
  },
  {
    title: "Tally Prime Customization for Your Business",
    subtitle: "Get powerful Tally Prime customizations, new reports, invoice formats, automation and business-specific solutions.",
    badge: "Tally Customization",
    image: "/hero/banner-tally-customization.png",
    link: "/#contact",
    order: 3,
    active: true,
  },
  {
    title: "Tally Integration with Any Web or Custom Application",
    subtitle: "Connect Tally Prime with your web, mobile or custom applications using API and automate your business process.",
    badge: "API Integration",
    image: "/hero/banner-tally-integration.png",
    link: "/#contact",
    order: 4,
    active: true,
  },
  {
    title: "Data Import, Export & Migration to Tally Prime",
    subtitle: "Import and export your masters and transactions from Excel, CSV, JSON or any software to Tally Prime.",
    badge: "Data Migration",
    image: "/hero/banner-data-migration.png",
    link: "/#contact",
    order: 5,
    active: true,
  },
];

// Retrieves current system & brand settings (or creates default if not initialized).
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ heroSlides: DEFAULT_HERO_SLIDES });
    } else if (!settings.heroSlides || settings.heroSlides.length === 0) {
      settings.heroSlides = DEFAULT_HERO_SLIDES;
      await settings.save();
    }

    const settingsObj = settings.toObject();

    // Default to environment variables if not yet configured in DB
    const effectiveEmailUser = settingsObj.emailUser || config.emailUser || "";
    const effectiveEmailTo = settingsObj.emailTo || config.emailTo || "";
    const hasEmailPass = Boolean(settingsObj.emailPass || config.emailPass);

    settingsObj.emailUser = effectiveEmailUser;
    settingsObj.emailTo = effectiveEmailTo;
    settingsObj.hasEmailPass = hasEmailPass;
    settingsObj.emailPass = hasEmailPass ? "••••••••" : "";

    res.status(200).json({
      success: true,
      settings: settingsObj,
    });
  } catch (error) {
    next(error);
  }
};

// Updates system, brand & SMTP settings (and synchronizes server/.env).
export const updateSettings = async (req, res, next) => {
  try {
    const {
      companyName,
      tagline,
      logo,
      supportEmail,
      phone,
      address,
      emailUser,
      emailPass,
      emailTo,
    } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
    }

    if (companyName !== undefined) settings.companyName = companyName.trim();
    if (tagline !== undefined) settings.tagline = tagline.trim();
    if (logo !== undefined) settings.logo = logo.trim();
    if (supportEmail !== undefined) settings.supportEmail = supportEmail.trim();
    if (phone !== undefined) settings.phone = phone.trim();
    if (address !== undefined) settings.address = address.trim();
    if (req.body.heroSlides !== undefined) {
      settings.heroSlides = req.body.heroSlides;
    }

    const envUpdates = {};

    if (emailUser !== undefined) {
      const cleanUser = emailUser.trim();
      settings.emailUser = cleanUser;
      envUpdates.EMAIL_USER = cleanUser;
    }

    if (emailTo !== undefined) {
      const cleanTo = emailTo.trim();
      settings.emailTo = cleanTo;
      envUpdates.EMAIL_TO = cleanTo;
    }

    // Only update app password if provided and not masked placeholder
    if (
      emailPass !== undefined &&
      emailPass.trim() !== "" &&
      !emailPass.includes("••••")
    ) {
      const cleanPass = emailPass.trim().replace(/\s+/g, "");
      settings.emailPass = cleanPass;
      envUpdates.EMAIL_PASS = cleanPass;
    }

    await settings.save();

    // Update server/.env and flush cached transporter
    if (Object.keys(envUpdates).length > 0) {
      updateEnvFile(envUpdates);
      resetTransporter();
    }

    const settingsObj = settings.toObject();
    settingsObj.hasEmailPass = Boolean(settings.emailPass || config.emailPass);
    settingsObj.emailPass = settingsObj.hasEmailPass ? "••••••••" : "";

    res.status(200).json({
      success: true,
      message: "Settings updated and synchronized with .env successfully",
      settings: settingsObj,
    });
  } catch (error) {
    next(error);
  }
};

// Dispatches a test verification email using active or provided credentials.
export const testEmailConnection = async (req, res, next) => {
  try {
    const { to, emailUser, emailPass } = req.body;
    const cleanPass = emailPass && !emailPass.includes("••••") ? emailPass.trim().replace(/\s+/g, "") : undefined;
    const result = await sendTestEmail({
      to,
      emailUser: emailUser ? emailUser.trim() : undefined,
      emailPass: cleanPass,
    });

    res.status(200).json({
      success: true,
      message: `Test email dispatched successfully to ${result.recipient}!`,
      details: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to send test email. Please check your credentials.",
    });
  }
};
