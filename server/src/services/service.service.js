// Business logic for company service offerings and initial catalog seeding.
import Service from "../models/service.model.js";

const DEFAULT_SERVICES = [
  {
    title: "Custom Web Development",
    slug: "custom-web-development",
    description: "High-performance web applications built with Next.js, React, and modern full-stack architectures.",
    icon: "Globe",
    features: ["Responsive Architecture", "SEO & Core Web Vitals", "API Integrations", "Database Architecture"],
    order: 1,
    active: true,
  },
  {
    title: "Tally Customization & Integration",
    slug: "tally-customization-integration",
    description: "Tailor Tally to your exact accounting workflows with TDL scripts, custom invoices, and API connectors.",
    icon: "FileText",
    features: ["Custom Invoices & Reports", "GST E-Way Bill Sync", "Web to Tally Data Bridge", "Automated Vouchers"],
    order: 2,
    active: true,
  },
  {
    title: "Custom Business Software",
    slug: "custom-business-software",
    description: "Replace spreadsheets with bespoke ERP, CRM, inventory, and management systems built for your team.",
    icon: "Layers",
    features: ["Unified Single Source of Truth", "Role-Based Access Control", "Real-Time Dashboards", "Audit Trails"],
    order: 3,
    active: true,
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Cross-platform iOS and Android mobile solutions built with React Native for staff and customers.",
    icon: "Smartphone",
    features: ["iOS & Android Support", "Offline Sync & Storage", "Push Notifications", "Hardware Camera & GPS"],
    order: 4,
    active: true,
  },
  {
    title: "Cloud Solutions",
    slug: "cloud-solutions",
    description: "Secure, highly available cloud infrastructures on AWS and Google Cloud with 99.9% uptime.",
    icon: "Cloud",
    features: ["Zero Hardware Overhead", "Automated Backups", "Multi-Region Redundancy", "Instant Auto-Scaling"],
    order: 5,
    active: true,
  },
  {
    title: "Business Automation",
    slug: "business-automation",
    description: "Automate repetitive operational loops, notification triggers, and data synchronization.",
    icon: "Cpu",
    features: ["Automated Lead Routing", "WhatsApp & SMS Triggers", "Scheduled Nightly Sync", "Multi-Level Approvals"],
    order: 6,
    active: true,
  },
];

// Retrieves all services sorted by configured display order.
export const getAllServices = async ({ activeOnly = false } = {}) => {
  const query = activeOnly ? { active: true } : {};
  const services = await Service.find(query).sort({ order: 1, createdAt: 1 });
  return services;
};

// Finds a single service offering by unique slug.
export const getServiceBySlug = async (slug) => {
  const service = await Service.findOne({ slug: slug.toLowerCase().trim() });
  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }
  return service;
};

// Creates a new service offering and formats slug.
export const createService = async (data) => {
  const { title, slug, description, icon, features, order, active } = data;
  if (!title || !description) {
    const error = new Error("Service title and description are required");
    error.statusCode = 400;
    throw error;
  }

  const finalSlug = (slug || title)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const service = await Service.create({
    title: title.trim(),
    slug: finalSlug,
    description: description.trim(),
    icon: icon || "Code",
    features: Array.isArray(features) ? features : [],
    order: order || 0,
    active: active !== undefined ? active : true,
  });

  return service;
};

// Updates existing service details by ID.
export const updateService = async (id, data) => {
  const service = await Service.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }
  return service;
};

// Deletes service offering by ID.
export const deleteService = async (id) => {
  const service = await Service.findByIdAndDelete(id);
  if (!service) {
    const error = new Error("Service not found");
    error.statusCode = 404;
    throw error;
  }
  return service;
};

// Seeds default catalog services if collection is empty.
export const seedInitialServices = async () => {
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany(DEFAULT_SERVICES);
    console.log("Default services initialized");
  }
};

