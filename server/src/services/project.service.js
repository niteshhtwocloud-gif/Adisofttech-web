// Business logic for portfolio case studies and initial showcase seeding.
import Project from "../models/project.model.js";

const DEFAULT_PROJECTS = [
  {
    title: "Business Management System",
    slug: "business-management-system",
    category: "Business Management",
    client: "Enterprise Services & B2B Operations",
    description: "A unified enterprise platform for milestone planning, task tracking, employee performance, and strategic execution.",
    metrics: "+45% Operational Alignment, -70% Reporting Overhead",
    image: "/portfolio/business-management.png",
    technologies: ["Next.js", "Strategy Tracking", "Team Ops", "PostgreSQL", "Tailwind CSS"],
    featured: true,
    order: 1,
  },
  {
    title: "Modern E-Commerce Platform",
    slug: "modern-ecommerce-platform",
    category: "E-Commerce",
    client: "Consumer Retail & Lifestyle Brands",
    description: "A high-conversion digital storefront featuring multi-channel inventory sync, secure payment gateways, and order logistics.",
    metrics: "+38% Conversion Lift, 99.9% Inventory Accuracy",
    image: "/portfolio/ecommerce.png",
    technologies: ["React", "Express", "Payment Gateway", "Stripe", "Redis"],
    featured: true,
    order: 2,
  },
  {
    title: "Mobile Application Experience",
    slug: "mobile-application-experience",
    category: "Mobile Application",
    client: "Direct-To-Consumer (D2C) & Mobile Retail",
    description: "Modern native iOS & Android shopping experience with buttery smooth navigation, real-time sync, and rich media product showcases.",
    metrics: "3.2x Higher Retention, 4.9 App Store Rating",
    image: "/portfolio/mobile-application.png",
    technologies: ["React Native", "iOS & Android", "Firebase", "Push Notifications", "Biometrics"],
    featured: true,
    order: 3,
  },
  {
    title: "Enterprise ERP Solutions",
    slug: "enterprise-erp-solutions",
    category: "ERP Solutions",
    client: "Manufacturing, Distribution & Wholesale Supply",
    description: "Complete enterprise resource planning suite integrating manufacturing, inventory, procurement, finance, and CRM into one dashboard.",
    metrics: "-85% Data Entry Time, 99.8% Inventory Accuracy",
    image: "/portfolio/erp-solutions.png",
    technologies: ["Enterprise ERP", "Tally TDL", "Cloud Ready", "Supply Chain", "GST Engine"],
    featured: true,
    order: 4,
  },
  {
    title: "Business Automation System",
    slug: "business-automation-system",
    category: "Business Automation",
    client: "Logistics, Professional Services & FinTech",
    description: "Smart workflow automation engine that interconnects legacy tools, automates data pipelines, and cuts manual operations by over 60%.",
    metrics: "65+ hrs/wk Saved, < 2 Mins Response Time",
    image: "/portfolio/business-automation.png",
    technologies: ["Process Automation", "Node.js", "Webhooks", "API Integrations", "Workflow Builder"],
    featured: true,
    order: 5,
  },
  {
    title: "Cloud Management Platform",
    slug: "cloud-management-platform",
    category: "Cloud & DevOps",
    client: "SaaS Platforms & Technology Infrastructure",
    description: "Centralized cloud infrastructure control hub with live Kubernetes cluster monitoring, resource telemetry, and enterprise security.",
    metrics: "32% Cloud Bill Savings, 99.99% Cluster Uptime",
    image: "/portfolio/cloud-platform.jpg",
    technologies: ["Cloud Infra", "Kubernetes", "DevOps", "Prometheus", "Docker"],
    featured: true,
    order: 6,
  },
];

// Retrieves portfolio showcase projects with optional featured filter.
export const getAllProjects = async ({ featuredOnly = false } = {}) => {
  const query = featuredOnly ? { featured: true } : {};
  return Project.find(query).sort({ order: 1, createdAt: -1 });
};

// Finds a single portfolio project by slug.
export const getProjectBySlug = async (slug) => {
  const project = await Project.findOne({ slug: slug.toLowerCase().trim() });
  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }
  return project;
};

// Creates a new portfolio project entry and formats slug.
export const createProject = async (data) => {
  const { title, slug, description, category, client, metrics, image, liveUrl, technologies, featured, order } = data;
  if (!title || !description) {
    const error = new Error("Project title and description are required");
    error.statusCode = 400;
    throw error;
  }

  const finalSlug = (slug || title)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

  const project = await Project.create({
    title: title.trim(),
    slug: finalSlug,
    description: description.trim(),
    category: category || "Web Development",
    client: client || "",
    metrics: metrics || "",
    image: image || "",
    liveUrl: liveUrl || "",
    technologies: Array.isArray(technologies) ? technologies : [],
    featured: featured !== undefined ? featured : false,
    order: order || 0,
  });

  return project;
};

// Updates project case study details by ID.
export const updateProject = async (id, data) => {
  const project = await Project.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }
  return project;
};

// Deletes project case study by ID.
export const deleteProject = async (id) => {
  const project = await Project.findByIdAndDelete(id);
  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }
  return project;
};

// Synchronizes or seeds all default portfolio showcase projects.
export const seedStarterProjects = async () => {
  for (const p of DEFAULT_PROJECTS) {
    await Project.findOneAndUpdate(
      { slug: p.slug },
      { $set: p },
      { upsert: true, new: true }
    );
  }
  return getAllProjects();
};

// Seeds default portfolio showcase projects if collection is empty.
export const seedInitialProjects = async () => {
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany(DEFAULT_PROJECTS);
    console.log("Default projects initialized");
  }
};


