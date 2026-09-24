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
      default: "adisofttech22@gmail.com",
      trim: true,
    },
    phone: {
      type: String,
      default: "+91 98317 18493",
      trim: true,
    },
    address: {
      type: String,
      default: "West Bengal, India",
      trim: true,
    },
    emailUser: {
      type: String,
      default: "",
      trim: true,
    },
    emailPass: {
      type: String,
      default: "",
      trim: true,
    },
    emailTo: {
      type: String,
      default: "",
      trim: true,
    },
    heroSlides: {
      type: [
        {
          title: { type: String, default: "" },
          subtitle: { type: String, default: "" },
          badge: { type: String, default: "" },
          image: { type: String, default: "" },
          link: { type: String, default: "/#contact" },
          order: { type: Number, default: 0 },
          active: { type: Boolean, default: true },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
