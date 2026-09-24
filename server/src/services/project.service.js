// Business logic for portfolio case studies and initial showcase seeding.
import Project from "../models/project.model.js";

const DEFAULT_PROJECTS = [
  {
    title: "Business Management System",
    slug: "business-management-system",
    category: "Business Management",
    client: "Enterprise Services & B2B Operations",
    tagline: "Centralized execution, role-based workflows, and real-time enterprise performance tracking.",
    timeline: "10 Weeks to Production",
    description: "A unified enterprise platform for milestone planning, task tracking, employee performance, and strategic execution.",
    fullOverview: "Designed and deployed for mid-to-large enterprises seeking to escape fragmented spreadsheet silos. This solution consolidates team OKRs, sprint milestone tracking, resource allocation, and department budgets into an intuitive, high-velocity operational command center.",
    challenge: "Cross-departmental teams were managing goals across disparate tools and spreadsheets, leading to blind spots, delayed milestone reviews, and misaligned delivery schedules across departments.",
    solution: "AST engineered a bespoke web platform featuring lightning-fast data visualization, role-scoped access privileges, automated milestone reminders, and real-time progress calculations.",
    features: [
      "End-to-end milestone & strategy roadmap tracking",
      "Executive KPI dashboards and real-time reports",
      "Team collaboration and role-based permissions",
      "Automated weekly operational progress digests",
      "Audit trail logs and SOC-2 compliant access controls",
    ],
    caseMetrics: [
      { label: "Operational Alignment", value: "+45%", description: "Improvement in on-time cross-functional milestone completion" },
      { label: "Reporting Overhead", value: "-70%", description: "Reduction in hours spent manually consolidating monthly reports" },
      { label: "Active User Adoption", value: "98%", description: "Adoption rate achieved across 250+ employees within 30 days" },
    ],
    metrics: "+45% Operational Alignment, -70% Overhead",
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
    tagline: "Ultra-fast headless commerce with multi-channel inventory sync and automated order routing.",
    timeline: "12 Weeks to Launch",
    description: "A high-conversion digital storefront featuring multi-channel inventory sync, secure payment gateways, and order logistics.",
    fullOverview: "An omnichannel retail commerce platform engineered to handle flash sales spikes without latency. Features instant payment processing, real-time warehouse inventory adjustments, customer loyalty systems, and frictionless mobile checkouts.",
    challenge: "The client experienced heavy cart abandonment and database locks during product drops due to an outdated monolithic shopping cart system that could not sync inventory across physical outlets and online store.",
    solution: "AST rebuilt the commerce experience using an event-driven decoupled architecture with server-side rendered product listings, Redis caching for hot skus, and instant one-click payment pipelines.",
    features: [
      "Instant checkout with integrated payments & automated shipping rates",
      "Dynamic catalog & real-time multi-warehouse inventory management",
      "Comprehensive merchant analytics & live sales telemetry",
      "Automated abandon cart email & WhatsApp recovery sequences",
      "Advanced promo engine with tiered coupon & discount algorithms",
    ],
    caseMetrics: [
      { label: "Conversion Lift", value: "+38%", description: "Increase in completed mobile checkout checkouts" },
      { label: "Page Speed Score", value: "99/100", description: "Google Lighthouse score with sub-second time to interactive" },
      { label: "Inventory Accuracy", value: "99.9%", description: "Multi-branch inventory reconciliation across 12 warehouses" },
    ],
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
    tagline: "Native iOS & Android mobile shopping experience with instant sync and push notification engine.",
    timeline: "8 Weeks to App Store & Play Store",
    description: "Modern native iOS & Android shopping experience with buttery smooth navigation, real-time sync, and rich media product showcases.",
    fullOverview: "A flagship cross-platform mobile app built for iOS and Android. Provides consumers with 60 FPS fluid gestures, personalized product recommendation feeds, biometrics authentication, and automated real-time courier shipment tracking.",
    challenge: "Existing mobile web version had poor checkout conversion and high bounce rates due to clunky web views and lack of real-time offline capabilities.",
    solution: "AST built high-performance native iOS and Android apps with offline caching, instant push notifications, and frictionless one-tap payment options.",
    features: [
      "Cross-platform 60 FPS performance on iOS & Android",
      "Personalized recommendation engine & real-time order tracking",
      "Biometric login (Face ID / Touch ID / Fingerprint)",
      "Automated abandoned cart push notification triggers",
      "Offline browsing mode with SQLite data sync",
    ],
    caseMetrics: [
      { label: "User Retention", value: "3.2x", description: "Higher repeat 30-day purchases compared to responsive web" },
      { label: "App Store Rating", value: "4.9 / 5.0", description: "Average rating over 12,000+ customer reviews" },
      { label: "Checkout Duration", value: "< 25 Secs", description: "Average time from product selection to purchase confirmation" },
    ],
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
    tagline: "Comprehensive manufacturing, inventory, procurement, and accounting control in a single pane of glass.",
    timeline: "16 Weeks to Full Deployment",
    description: "Complete enterprise resource planning suite integrating manufacturing, inventory, procurement, finance, and CRM into one dashboard.",
    fullOverview: "A mission-critical ERP deployment replacing multiple legacy desktop tools across 4 manufacturing units. Unifies raw material procurement, bill-of-materials scheduling, GST compliance, invoice automation, and executive dashboards.",
    challenge: "The enterprise struggled with inaccurate production forecasts, mismatched physical inventory counts, and days of lag in month-end financial book closures.",
    solution: "AST deployed a bespoke cloud ERP system integrating real-time barcode scanning on warehouse floors, bidirectional Tally accounting sync, and live profit-margin analytics.",
    features: [
      "Live multi-branch inventory tracking with automatic reorder triggers",
      "Real-time Tally ERP bidirectional synchronization",
      "Custom GST invoice generator with e-way bill automation",
      "Production scheduling & Bill-of-Materials (BOM) management",
      "Comprehensive role-based financial audit and ledger logs",
    ],
    caseMetrics: [
      { label: "Data Entry Reduction", value: "-85%", description: "Automated sync eliminated duplicate manual accounting ledger entry" },
      { label: "Inventory Accuracy", value: "99.8%", description: "Discrepancy drop achieved within first 60 days of barcode adoption" },
      { label: "Audit Turnaround", value: "Same Day", description: "Financial audits shortened from 14 days down to instant export" },
    ],
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
    tagline: "Intelligent event triggers, automated reconciliations, and instant cross-app data synchronization.",
    timeline: "6 Weeks to Live Execution",
    description: "Smart workflow automation engine that interconnects legacy tools, automates data pipelines, and cuts manual operations by over 60%.",
    fullOverview: "A robust event-driven integration middleware connecting customer CRMs, accounting systems, communication tools (WhatsApp, Email, SMS), and banking gateways into hands-free automated pipelines.",
    challenge: "Support, billing, and sales departments were manually copying data between email, spreadsheets, CRM, and banking portals, resulting in human error and customer onboarding delays.",
    solution: "AST designed custom webhooks, data transformation pipelines, and validation engines that seamlessly pass data across all third-party and internal tools in under 5 seconds.",
    features: [
      "Visual workflow builder with event-based trigger criteria",
      "Automated WhatsApp & Email customer notification dispatcher",
      "Automated bank statement reconciliation and invoice settlement",
      "Two-way CRM to accounting auto-sync (zero human touch)",
      "High-throughput dead-letter retry queues for fail-safe operations",
    ],
    caseMetrics: [
      { label: "Hours Saved / Week", value: "65+ hrs", description: "Operational labor hours saved across accounts & support teams" },
      { label: "Response Latency", value: "< 2 Mins", description: "Customer onboarding verification time slashed from 4 hours" },
      { label: "Error Elimination", value: "99.9%", description: "Reduction in mistyped invoice addresses and calculation errors" },
    ],
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
    tagline: "Live Kubernetes telemetry, proactive cost optimization, and automated multi-cloud failover.",
    timeline: "14 Weeks to Enterprise General Availability",
    description: "Centralized cloud infrastructure control hub with live Kubernetes cluster monitoring, resource telemetry, and enterprise security.",
    fullOverview: "A specialized multi-cloud operations platform providing site-reliability engineers with real-time insight into node health, traffic spikes, database query bottlenecks, and automated cloud cost right-sizing.",
    challenge: "The client's cloud spend was spiraling across multiple AWS and DigitalOcean accounts with poor visibility into orphaned instances, idle database clusters, and container crashes.",
    solution: "AST built a unified telemetry dashboard that aggregates Prometheus metrics, scans for unused assets, and triggers automated right-sizing policies based on historical usage curves.",
    features: [
      "Unified multi-cloud dashboard for AWS, Azure & DigitalOcean",
      "Real-time CPU, RAM, and disk telemetry with Grafana visualizations",
      "Enterprise-grade zero-trust access management & audit trails",
      "One-click CI/CD pipeline diagnostics and rollout rollbacks",
      "Automated alerting integrations into Slack, PagerDuty, and Email",
    ],
    caseMetrics: [
      { label: "Cloud Bill Savings", value: "32%", description: "Immediate monthly reduction in idle compute and storage costs" },
      { label: "Incident Resolution", value: "4x Faster", description: "Mean time to resolution (MTTR) with centralized log alerts" },
      { label: "Cluster Uptime", value: "99.99%", description: "High availability across multi-zone Kubernetes workloads" },
    ],
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

// Finds a single portfolio project by slug or ID.
export const getProjectBySlug = async (slug) => {
  const clean = String(slug).trim();
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(clean);
  const query = isObjectId
    ? { $or: [{ slug: clean.toLowerCase() }, { _id: clean }] }
    : { slug: clean.toLowerCase() };

  const project = await Project.findOne(query);
  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }
  return project;
};

// Creates a new portfolio project entry and formats slug.
export const createProject = async (data) => {
  const {
    title,
    slug,
    description,
    category,
    client,
    metrics,
    image,
    liveUrl,
    technologies,
    featured,
    order,
    tagline,
    timeline,
    fullOverview,
    challenge,
    solution,
    features,
    caseMetrics,
    techStack,
  } = data;

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
    tagline: tagline || "",
    timeline: timeline || "",
    fullOverview: fullOverview || "",
    challenge: challenge || "",
    solution: solution || "",
    features: Array.isArray(features) ? features : [],
    caseMetrics: Array.isArray(caseMetrics) ? caseMetrics : [],
    techStack: Array.isArray(techStack) ? techStack : [],
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


