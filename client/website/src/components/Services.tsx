"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Monitor,
  Smartphone,
  Code2,
  BarChart3,
  Cloud,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Globe,
  FileText,
} from "lucide-react";
import api from "@/services/api";

const ICON_MAP: Record<string, any> = {
  Monitor,
  Smartphone,
  Code2,
  Code: Code2,
  BarChart3,
  FileText,
  Cloud,
  Cpu,
  Globe: Monitor,
  Layers,
};

const ACCENTS = [
  "from-blue-500/10 to-indigo-500/10 text-[#0b57d0]",
  "from-indigo-500/10 to-purple-500/10 text-indigo-600",
  "from-blue-500/10 to-cyan-500/10 text-[#0b57d0]",
  "from-orange-500/10 to-amber-500/10 text-[#f97316]",
  "from-sky-500/10 to-blue-500/10 text-sky-600",
  "from-emerald-500/10 to-teal-500/10 text-emerald-600",
  "from-violet-500/10 to-purple-500/10 text-violet-600",
  "from-amber-500/10 to-rose-500/10 text-amber-600",
];

// Fallback initial services for immediate static render & zero layout shift.
const FALLBACK_SERVICES = [
  {
    icon: Monitor,
    badge: "Scalable Full-Stack",
    title: "Web Application Development",
    description:
      "Enterprise-grade React, Next.js, and Node.js web platforms engineered for lightning speed, high concurrency, and intuitive UX.",
    features: [
      "Custom SaaS platforms & portals",
      "API microservices & DB optimization",
      "Responsive, accessible UI architectures",
    ],
    accent: "from-blue-500/10 to-indigo-500/10 text-[#0b57d0]",
  },
  {
    icon: Smartphone,
    badge: "iOS & Android",
    title: "Mobile Application Development",
    description:
      "High-performance native and cross-platform mobile apps with buttery smooth animations, offline sync, and secure payment integrations.",
    features: [
      "React Native & Flutter engineering",
      "Real-time push notifications & location",
      "End-to-end App Store & Play Store launch",
    ],
    accent: "from-indigo-500/10 to-purple-500/10 text-indigo-600",
  },
  {
    icon: Code2,
    badge: "Bespoke Architecture",
    title: "Custom Business Software",
    description:
      "Tailor-made software built around your exact operational workflows, eliminating spreadsheet clutter and human error.",
    features: [
      "Inventory, billing & warehouse systems",
      "Multi-branch enterprise sync",
      "Role-based security & audit logging",
    ],
    accent: "from-blue-500/10 to-cyan-500/10 text-[#0b57d0]",
  },
  {
    icon: BarChart3,
    badge: "TDL & Accounting",
    title: "Tally & ERP Customization",
    description:
      "Deep customization of Tally Prime and ERPs to automate invoice generation, custom GST reports, and warehouse reconciliations.",
    features: [
      "TDL coding & custom business modules",
      "Automated WhatsApp/Email invoicing",
      "Seamless external API integrations",
    ],
    accent: "from-orange-500/10 to-amber-500/10 text-[#f97316]",
  },
  {
    icon: Cloud,
    badge: "99.98% High Availability",
    title: "Cloud & Firebase Solutions",
    description:
      "Reliable, auto-scaling cloud infrastructure architectures leveraging AWS, Google Cloud, and Firebase for zero downtime.",
    features: [
      "Serverless architecture & Docker setups",
      "Automated CI/CD deployment pipelines",
      "Enterprise data encryption & backups",
    ],
    accent: "from-sky-500/10 to-blue-500/10 text-sky-600",
  },
  {
    icon: Cpu,
    badge: "Workflow Triggers",
    title: "Business Automation & AI",
    description:
      "Connect disparate business tools to trigger automated tasks, client follow-ups, and operational reporting without manual input.",
    features: [
      "CRM & lead pipeline automation",
      "Automated document & invoice generation",
      "Operational analytics & alerts",
    ],
    accent: "from-emerald-500/10 to-teal-500/10 text-emerald-600",
  },
];

// Helper: chooses best matching icon based on service title and icon string
function resolveServiceIcon(title: string, iconName?: string) {
  if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName];

  const lower = title.toLowerCase();
  if (lower.includes("mobile") || lower.includes("android") || lower.includes("ios")) return Smartphone;
  if (lower.includes("tally") || lower.includes("account") || lower.includes("report")) return BarChart3;
  if (lower.includes("cloud") || lower.includes("devops") || lower.includes("firebase")) return Cloud;
  if (lower.includes("automation") || lower.includes("ai") || lower.includes("workflow")) return Cpu;
  if (lower.includes("software") || lower.includes("erp") || lower.includes("custom")) return Code2;
  return Monitor;
}

// Helper: chooses a readable badge for database services
function resolveServiceBadge(service: any, index: number) {
  if (service.badge) return service.badge;
  const lower = (service.title || "").toLowerCase();
  if (lower.includes("web")) return "Scalable Full-Stack";
  if (lower.includes("mobile")) return "iOS & Android";
  if (lower.includes("tally")) return "TDL & Accounting";
  if (lower.includes("cloud")) return "High Availability";
  if (lower.includes("automation")) return "Workflow Triggers";
  if (lower.includes("software") || lower.includes("erp")) return "Bespoke Enterprise";
  return `Capability #${index + 1}`;
}

export default function Services() {
  const [servicesList, setServicesList] = useState<any[]>(FALLBACK_SERVICES);

  useEffect(() => {
    let isMounted = true;

    async function loadLiveServices() {
      try {
        const data = await api.getServices();
        if (isMounted && data && Array.isArray(data.services) && data.services.length > 0) {
          const mapped = data.services.map((item: any, idx: number) => ({
            icon: resolveServiceIcon(item.title, item.icon),
            badge: resolveServiceBadge(item, idx),
            title: item.title,
            description: item.description,
            features: Array.isArray(item.features) && item.features.length > 0
              ? item.features
              : ["High-performance architecture", "Enterprise-grade reliability"],
            accent: ACCENTS[idx % ACCENTS.length],
            slug: item.slug,
          }));
          setServicesList(mapped);
        }
      } catch (err) {
        console.warn("Could not fetch live services, using default catalog:", err);
      }
    }

    loadLiveServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="services" className="relative bg-white py-20 sm:py-24">
      {/* Subtle ambient backdrop */}
      <div className="pointer-events-none absolute top-1/2 right-0 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#eff6ff] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0b57d0]">
              <Sparkles className="h-3.5 w-3.5 text-[#f97316]" />
              <span>Full-Spectrum Capabilities ({servicesList.length} Offerings)</span>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl lg:text-[2.6rem] leading-tight">
              Technology Solutions Built for Enterprise Scale
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We design, develop, and maintain high-impact software systems that empower modern
              businesses to operate faster, scale smoothly, and outcompete their markets.
            </p>
          </div>

          <a
            href="#contact"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-[#0b57d0] shadow-xs transition hover:border-blue-300 hover:bg-blue-50 sm:flex"
          >
            <span>Request Custom Architecture</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {servicesList.map((service, idx) => {
            const Icon = service.icon || Monitor;
            return (
              <div
                key={service.slug || service.title || idx}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} shadow-2xs transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-slate-100 bg-slate-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-slate-600">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-xl font-black tracking-tight text-[#0f172a] group-hover:text-[#0b57d0] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600">
                    {service.description}
                  </p>

                  {/* Key Features */}
                  {service.features && service.features.length > 0 && (
                    <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                      {service.features.map((feat: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#0b57d0] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Link */}
                <div className="mt-8 pt-4 border-t border-slate-50">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0b57d0] transition-colors hover:text-blue-800"
                  >
                    <span>Discuss Requirements</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
