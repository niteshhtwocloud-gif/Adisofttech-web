import Settings from "../models/settings.model.js";

// Retrieves current system & brand settings (or creates default if not initialized).
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

// Updates system & brand settings (logo, company name, contact info).
export const updateSettings = async (req, res, next) => {
  try {
    const { companyName, tagline, logo, supportEmail, phone, address } = req.body;
    
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

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    next(error);
  }
};
