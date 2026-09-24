import mongoose from "mongoose";
import config from "../config/env.js";

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

async function run() {
  const uri = config.mongoUri;
  if (!uri) throw new Error("mongoUri not found in config");
  await mongoose.connect(uri);
  const Settings = mongoose.model("Settings", new mongoose.Schema({}, { strict: false }));
  await Settings.updateOne({}, { $set: { heroSlides: DEFAULT_HERO_SLIDES } });
  console.log("SUCCESS: Hero banner slides saved to MongoDB Atlas!");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});
