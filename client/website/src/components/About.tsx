"use client";

import React from "react";
import {
  Award,
  Users2,
  ShieldCheck,
  Headphones,
  Sparkles,
  CheckCircle2,
  Cpu,
  Zap,
} from "lucide-react";

// Company overview section detailing core value pillars, leadership experience, and client trust.
const REASONS = [
  {
    icon: Award,
    badge: "10+ Years Track Record",
    title: "Deep Domain Expertise",
    description:
      "Over a decade of hands-on software development, ERP engineering, and business automation across multiple diverse industry sectors.",
  },
  {
    icon: Users2,
    badge: "Tailored to Your Operations",
    title: "100% Custom Architecture",
    description:
      "We never force generic templates. Every workflow, database schema, and interface is custom-architected to your exact requirements.",
  },
  {
    icon: ShieldCheck,
    badge: "Bank-Grade Standards",
    title: "Security & Reliability",
    description:
      "Scalable cloud infrastructure, automated failovers, strict end-to-end encryption, and rigorous code audit standards.",
  },
  {
    icon: Headphones,
    badge: "Rapid Response SLA",
    title: "Dedicated Ongoing Support",
    description:
      "Our partnership continues well after launch. Enjoy proactive monitoring, feature enhancements, and 24/7 priority support.",
  },
];

const METRICS_STRIP = [
  { value: "99.98%", label: "Platform Uptime SLA" },
  { value: "< 2 hrs", label: "Critical Response Time" },
  { value: "100%", label: "In-House Senior Engineers" },
  { value: "4.9 / 5", label: "Client Satisfaction Rating" },
];

// ==================== ABOUT COMPONENT ====================

export default function About() {
  return (
    <section id="about" className="relative bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#eff6ff] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0b57d0]">
            <Sparkles className="h-3.5 w-3.5 text-[#f97316]" />
            <span>Why Choose AST</span>
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl lg:text-[2.5rem] leading-tight">
            Engineered for Companies That Cannot Afford Downtime
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            We bridge the gap between complex software engineering and real-world business
            operations, giving your team the tools they need to operate faster and smarter.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0b57d0] shadow-2xs transition-colors group-hover:bg-[#0b57d0] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  <span className="mt-5 inline-block rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 border border-slate-100">
                    {reason.badge}
                  </span>

                  <h3 className="mt-3 text-lg font-black tracking-tight text-[#0f172a]">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Credibility Metrics Bar */}
        <div className="mt-12 rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 p-6 sm:p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 text-center">
            {METRICS_STRIP.map((m) => (
              <div key={m.label} className="border-r border-slate-200/60 last:border-0">
                <div className="text-2xl font-black text-[#0b57d0] sm:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-600">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
