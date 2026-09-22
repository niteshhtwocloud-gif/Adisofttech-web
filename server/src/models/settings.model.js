import mongoose from "mongoose";

// Mongoose schema for system and company branding settings (logo, contact, site identity).
const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "AdiSofTech",
      trim: true,
    },
    tagline: {
      type: String,
      default: "Empowering Enterprises with Scalable Software & Cloud Solutions",
      trim: true,
    },
    logo: {
      type: String,
      default: "/images/ast-logo.png",
      trim: true,
    },
    supportEmail: {
      type: String,
      default: "contact@adisofttech.com",
      trim: true,
    },
    phone: {
      type: String,
      default: "+91 98765 43210",
      trim: true,
    },
    address: {
      type: String,
      default: "Plot No. 42, Cyber City, Gurugram, Haryana, India",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
