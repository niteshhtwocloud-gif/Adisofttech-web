import { getWebsiteImageUrl } from "@/utils/image";

// Portfolio case studies, client success metrics, and technology stack definitions.
export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  category: string;
  filterKey: "all" | "business" | "ecommerce" | "mobile" | "erp" | "automation" | "cloud";
  tagline: string;
  description: string;
  fullOverview: string;
  clientIndustry: string;
  timeline: string;
  tags: string[];
  image: string;
  features: string[];
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  techStack: {
    name: string;
    role: string;
  }[];
}

export const PROJECTS: CaseStudy[] = [
  {
    id: 1,
    slug: "business-management-system",
    title: "Business Management System",
    category: "Business Management",
    filterKey: "business",
    tagline: "Centralized execution, role-based workflows, and real-time enterprise performance tracking.",
    description:
      "A unified enterprise platform for milestone planning, task tracking, employee performance, and strategic execution.",
    fullOverview:
      "Designed and deployed for mid-to-large enterprises seeking to escape fragmented spreadsheet silos. This solution consolidates team OKRs, sprint milestone tracking, resource allocation, and department budgets into an intuitive, high-velocity operational command center.",
    clientIndustry: "Enterprise Services & B2B Operations",
    timeline: "10 Weeks to Production",
    tags: ["Next.js", "Strategy Tracking", "Team Ops", "PostgreSQL", "Tailwind CSS"],
    image: "/portfolio/business-management.png",
    features: [
      "End-to-end milestone & strategy roadmap tracking",
      "Executive KPI dashboards and real-time reports",
      "Team collaboration and role-based permissions",
      "Automated weekly operational progress digests",
      "Audit trail logs and SOC-2 compliant access controls",
    ],
    challenge:
      "Cross-departmental teams were managing goals across disparate tools and spreadsheets, leading to blind spots, delayed milestone reviews, and misaligned delivery schedules across departments.",
    solution:
      "AST engineered a bespoke web platform featuring lightning-fast data visualization, role-scoped access privileges, automated milestone reminders, and real-time progress calculations.",
    metrics: [
      { label: "Operational Alignment", value: "+45%", description: "Improvement in on-time cross-functional milestone completion" },
      { label: "Reporting Overhead", value: "-70%", description: "Reduction in hours spent manually consolidating monthly reports" },
      { label: "Active User Adoption", value: "98%", description: "Adoption rate achieved across 250+ employees within 30 days" },
    ],
    techStack: [
      { name: "Next.js & React", role: "Frontend UI & Server Components" },
      { name: "Node.js / Express", role: "High-concurrency API Gateway" },
      { name: "PostgreSQL & Prisma", role: "Relational Persistence & Auditing" },
      { name: "Redis", role: "Real-time pub/sub caching" },
    ],
  },
  {
    id: 2,
    slug: "modern-ecommerce-platform",
    title: "Modern E-Commerce Platform",
    category: "E-Commerce",
    filterKey: "ecommerce",
    tagline: "Ultra-fast headless commerce with multi-channel inventory sync and automated order routing.",
    description:
      "A high-conversion digital storefront featuring multi-channel inventory sync, secure payment gateways, and order logistics.",
    fullOverview:
      "An omnichannel retail commerce platform engineered to handle flash sales spikes without latency. Features instant payment processing, real-time warehouse inventory adjustments, customer loyalty systems, and frictionless mobile checkouts.",
    clientIndustry: "Consumer Retail & Lifestyle Brands",
    timeline: "12 Weeks to Launch",
    tags: ["React", "Express", "Payment Gateway", "Stripe", "Redis"],
    image: "/portfolio/ecommerce.png",
    features: [
      "Instant checkout with integrated payments & automated shipping rates",
      "Dynamic catalog & real-time multi-warehouse inventory management",
      "Comprehensive merchant analytics & live sales telemetry",
      "Automated abandon cart email & WhatsApp recovery sequences",
      "Advanced promo engine with tiered coupon & discount algorithms",
    ],
    challenge:
      "The client experienced heavy cart abandonment and database locks during product drops due to an outdated monolithic shopping cart system that could not sync inventory across physical outlets and online store.",
    solution:
      "AST rebuilt the commerce experience using an event-driven decoupled architecture with server-side rendered product listings, Redis caching for hot skus, and instant one-click payment pipelines.",
    metrics: [
      { label: "Conversion Lift", value: "+38%", description: "Increase in completed mobile checkout checkouts" },
      { label: "Page Speed Score", value: "99/100", description: "Google Lighthouse score with sub-second time to interactive" },
      { label: "Inventory Accuracy", value: "99.9%", description: "Multi-branch inventory reconciliation across 12 warehouses" },
    ],
    techStack: [
      { name: "Next.js Headless", role: "SSR Storefront" },
      { name: "Stripe & Razorpay", role: "Global Payment Orchestration" },
      { name: "Node.js Microservices", role: "Order & Inventory Service" },
      { name: "MongoDB & Redis", role: "Catalog & Fast Session State" },
    ],
  },
  {
    id: 3,
    slug: "mobile-application-experience",
    title: "Mobile Application Experience",
    category: "Mobile Application",
    filterKey: "mobile",
    tagline: "Native iOS & Android mobile shopping experience with instant sync and push notification engine.",
    description:
      "Modern native iOS & Android shopping experience with buttery smooth navigation, real-time sync, and rich media product showcases.",
    fullOverview:
      "A flagship cross-platform mobile app built for iOS and Android. Provides consumers with 60 FPS fluid gestures, personalized product recommendation feeds, biometrics authentication, and automated real-time courier shipment tracking.",
    clientIndustry: "Direct-To-Consumer (D2C) & Mobile Retail",
    timeline: "8 Weeks to App Store & Play Store",
    tags: ["React Native", "iOS & Android", "Firebase", "Push Notifications", "Biometrics"],
    image: "/portfolio/mobile-application.png",
    features: [
      "Fluid animations and intuitive touch gestures at 60 FPS",
      "Push notifications and instant live courier order tracking",
      "Offline cache support and lightning-fast loading",
      "Biometric Face ID / Fingerprint fast login",
      "Integrated customer support chat and return management",
    ],
    challenge:
      "A high proportion of customer traffic visited via mobile browsers with suboptimal conversion rates. The client required a dedicated native-feel app that felt premium, responsive, and retained customers.",
    solution:
      "AST engineered a unified React Native codebase with native bridge optimizations, local SQLite caching for instant offline browsing, and deeply integrated push marketing campaigns.",
    metrics: [
      { label: "Customer Retention", value: "3.2x", description: "Higher 30-day repeat purchase rate compared to mobile web" },
      { label: "App Store Rating", value: "4.9 / 5.0", description: "Average user review score across 1,400+ reviews" },
      { label: "Push Engagement", value: "24.6%", description: "Click-through rate on personalized cart reminder pushes" },
    ],
    techStack: [
      { name: "React Native / Expo", role: "Cross-platform Native Mobile Core" },
      { name: "Firebase Cloud Messaging", role: "Instant Push Notification Delivery" },
      { name: "Redux Toolkit & Persist", role: "Local State & Offline Storage" },
      { name: "RESTful Secure API", role: "Encrypted backend communication" },
    ],
  },
  {
    id: 4,
    slug: "enterprise-erp-solutions",
    title: "Enterprise ERP Solutions",
    category: "ERP Solutions",
    filterKey: "erp",
    tagline: "Comprehensive manufacturing, procurement, inventory, and GST accounting synchronization.",
    description:
      "Complete enterprise resource planning suite integrating manufacturing, inventory, procurement, finance, and CRM into one dashboard.",
    fullOverview:
      "A mission-critical enterprise ERP platform bridging shop floor production lines with back-office accounting, supply chain logistics, and automated invoice reconciliation. Integrates natively with Tally Prime for seamless tax compliance and financial auditing.",
    clientIndustry: "Manufacturing, Distribution & Wholesale Supply",
    timeline: "14 Weeks Deployment",
    tags: ["Enterprise ERP", "Tally TDL", "Cloud Ready", "Supply Chain", "GST Engine"],
    image: "/portfolio/erp-solutions.png",
    features: [
      "Unified finance, accounting, and supply chain control",
      "Multi-branch inventory and automated reorder triggers",
      "Seamless bi-directional Tally integration and GST-ready reporting",
      "Shop floor batch tracking, BOM (Bill of Materials), and quality checks",
      "Automated e-Way bill and e-Invoicing generation",
    ],
    challenge:
      "The client's growing manufacturing facilities struggled with delayed stock counts, manual double entry between factory logs and Tally, and human errors in supplier reconciliation.",
    solution:
      "AST built a central cloud ERP with automated Tally XML synchronization, barcode-scanned inventory flow, automated production scheduling, and real-time GST tax filing modules.",
    metrics: [
      { label: "Data Entry Time", value: "-85%", description: "Elimination of duplicate data re-entry across plant and HQ" },
      { label: "Inventory Accuracy", value: "99.8%", description: "Real-time stock matching physical warehouse audits" },
      { label: "Monthly Closing", value: "2 Days", description: "Accounting books closed in 2 days vs previous 14 days" },
    ],
    techStack: [
      { name: "Next.js & TypeScript", role: "Enterprise Admin Console" },
      { name: "Tally XML & TDL Bridge", role: "Automated Bi-directional Accounting Sync" },
      { name: "Node.js & BullMQ", role: "Background Batch Job Processing" },
      { name: "PostgreSQL", role: "ACID-compliant Transactional Database" },
    ],
  },
  {
    id: 5,
    slug: "business-automation-system",
    title: "Business Automation System",
    category: "Business Automation",
    filterKey: "automation",
    tagline: "Autonomous multi-system data pipelines, approval workflows, and operational efficiency engines.",
    description:
      "Smart workflow automation engine that interconnects legacy tools, automates data pipelines, and cuts manual operations by over 60%.",
    fullOverview:
      "An intelligent workflow orchestration engine that bridges disparate software, CRM leads, accounting updates, and communications. Automatically executes multi-step triggers, routes approval requests, and generates automated customer reports without human intervention.",
    clientIndustry: "Logistics, Professional Services & FinTech",
    timeline: "6 Weeks Implementation",
    tags: ["Process Automation", "Node.js", "Webhooks", "API Integrations", "Workflow Builder"],
    image: "/portfolio/business-automation.png",
    features: [
      "Automated multi-step approval workflows & condition triggers",
      "System-to-system data sync without manual spreadsheet copy-pasting",
      "Real-time customer updates via Email, WhatsApp, and SMS",
      "Intelligent document parsing and auto-filing",
      "Visual workflow builder with status monitoring and retry mechanisms",
    ],
    challenge:
      "Operational teams spent over 20 hours each week copying data between CRM, email inquiries, Google Sheets, and legacy invoicing tools, causing customer response delays and dropped leads.",
    solution:
      "AST implemented a scalable event-driven webhook pipeline that captures incoming inquiries, enriches customer profiles, generates quotes, and notifies sales reps in real time.",
    metrics: [
      { label: "Manual Hours Saved", value: "65+ hrs/wk", description: "Automated operational tasks saved across internal team" },
      { label: "Lead Response Time", value: "< 2 Mins", description: "Down from 4+ hours for initial customer inquiry responses" },
      { label: "Workflow Error Rate", value: "0.01%", description: "Automated self-healing retry queues on API timeouts" },
    ],
    techStack: [
      { name: "Node.js Microservices", role: "Event Listeners & Webhook Processors" },
      { name: "WhatsApp Business API", role: "Automated Interactive Notifications" },
      { name: "Redis & RabbitMQ", role: "Distributed Job Queues" },
      { name: "Tailwind CSS & React", role: "Interactive Automation Dashboard" },
    ],
  },
  {
    id: 6,
    slug: "cloud-management-platform",
    title: "Cloud Management Platform",
    category: "Cloud & DevOps",
    filterKey: "cloud",
    tagline: "Unified infrastructure observability, automated cost governance, and Kubernetes cluster telemetry.",
    description:
      "Centralized cloud infrastructure control hub with live Kubernetes cluster monitoring, resource telemetry, and enterprise security.",
    fullOverview:
      "A unified DevOps and cloud infrastructure management platform. Empowers engineering teams with real-time cluster telemetry, automated cost anomaly detection, zero-trust credential access, and rapid multi-cloud resource provisioning.",
    clientIndustry: "SaaS Platforms & Technology Infrastructure",
    timeline: "12 Weeks to Global Rollout",
    tags: ["Cloud Infra", "Kubernetes", "DevOps", "Prometheus", "Docker"],
    image: "/portfolio/cloud-platform.jpg",
    features: [
      "Real-time server telemetry, CPU/Memory metrics, and auto-scaling",
      "Cloud cost optimization and automated idle resource termination",
      "Enterprise-grade zero-trust access management & audit trails",
      "One-click CI/CD pipeline diagnostics and rollout rollbacks",
      "Automated alerting integrations into Slack, PagerDuty, and Email",
    ],
    challenge:
      "The client's cloud spend was spiraling across multiple AWS and DigitalOcean accounts with poor visibility into orphaned instances, idle database clusters, and container crashes.",
    solution:
      "AST built a unified telemetry dashboard that aggregates Prometheus metrics, scans for unused assets, and triggers automated right-sizing policies based on historical usage curves.",
    metrics: [
      { label: "Cloud Bill Savings", value: "32%", description: "Immediate monthly reduction in idle compute and storage costs" },
      { label: "Incident Resolution", value: "4x Faster", description: "Mean time to resolution (MTTR) with centralized log alerts" },
      { label: "Cluster Uptime", value: "99.99%", description: "High availability across multi-zone Kubernetes workloads" },
    ],
    techStack: [
      { name: "Next.js & Chart.js", role: "Real-time Metrics Dashboard" },
      { name: "Kubernetes & Docker", role: "Container Orchestration Engine" },
      { name: "Prometheus & Grafana", role: "Telemetry Collection & Alert Rules" },
      { name: "Golang / Node.js", role: "Lightweight Infrastructure Agents" },
    ],
  },
];

// ==================== HELPER FINDER FUNCTIONS ====================

export function getProjectByIdOrSlug(idOrSlug: string | number): CaseStudy | undefined {
  const str = String(idOrSlug).toLowerCase().trim();
  return PROJECTS.find(
    (p) => String(p.id) === str || p.slug.toLowerCase() === str
  );
}

export async function fetchProjectByIdOrSlug(idOrSlug: string | number): Promise<CaseStudy | undefined> {
  const local = getProjectByIdOrSlug(idOrSlug);

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    const res = await fetch(`${apiUrl}/projects/${idOrSlug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.project) {
        const p = data.project;
        return {
          id: p.order || local?.id || 999,
          slug: p.slug,
          title: p.title,
          category: p.category || local?.category || "Custom Software",
          filterKey: local?.filterKey || "business",
          tagline: p.tagline || local?.tagline || p.description,
          description: p.description,
          fullOverview: p.fullOverview || local?.fullOverview || p.description,
          clientIndustry: p.client || local?.clientIndustry || "Enterprise Client",
          timeline: p.timeline || local?.timeline || "10 Weeks to Production",
          tags: p.technologies?.length ? p.technologies : (local?.tags || []),
          image: getWebsiteImageUrl(p.image || local?.image),
          features: (p.features && p.features.length) ? p.features : (local?.features || [
            "Bespoke modular architecture configured for high reliability",
            "Role-based access privileges and automated security checks",
            "API-first engineering built for real-time telemetry and sync",
          ]),
          challenge:
            p.challenge ||
            local?.challenge ||
            "Modernizing operational workflows and standardizing high-throughput system performance.",
          solution:
            p.solution ||
            local?.solution ||
            "AST engineered a bespoke architecture tailored to client infrastructure and scale requirements.",
          metrics: (p.caseMetrics && p.caseMetrics.length)
            ? p.caseMetrics
            : (local?.metrics || (p.metrics ? [{ label: "Impact", value: p.metrics, description: "Key Result" }] : [{ label: "Production Status", value: "Active", description: "System operational" }])),
          techStack: (p.techStack && p.techStack.length)
            ? p.techStack
            : (p.technologies || []).length
              ? (p.technologies || []).map((t: string) => ({
                  name: t,
                  role: "Core Technology",
                }))
              : (local?.techStack || []),
        };
      }
    }
  } catch (err) {
    console.warn("Could not fetch remote project:", err);
  }

  return local;
}

export function getAllProjects(): CaseStudy[] {
  return PROJECTS;
}

