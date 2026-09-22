"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, Star, Users, Award, TrendingUp } from "lucide-react";

/**
 * Component: TrustSection (/components/TrustSection.tsx)
 * 
 * Purpose:
 * Renders an ultra-premium, light corporate trust section without any third-party logos.
 * Uses high-credibility text-based metrics, verified satisfaction scores, and corporate badges.
 */
// ==================== TRUST & CREDIBILITY COMPONENT ====================

export default function TrustSection() {
  const trustMetrics = [
    {
      value: "500+",
      label: "Businesses Scaled",
      desc: "From ambitious startups to established multi-branch enterprises",
      icon: Users,
      color: "text-[#0b57d0]",
    },
    {
      value: "1000+",
      label: "Delivered Deployments",
      desc: "Custom ERPs, mobile applications, and web platforms",
      icon: TrendingUp,
      color: "text-[#f97316]",
    },
    {
      value: "10+",
      label: "Years of Engineering",
      desc: "Continuous technical excellence and innovation since 2014",
      icon: Award,
      color: "text-indigo-600",
    },
    {
      value: "99%",
      label: "Client Satisfaction",
      desc: "Measured via ongoing SLA reliability and support ratings",
      icon: Star,
      color: "text-amber-500",
    },
  ];

  const trustHighlights = [
    "Enterprise-grade Security & Data Encryption",
    "Tailored Microservice & ERP Architecture",
    "Rapid 24/7 Dedicated Technical Support",
    "99.98% High Availability SLA Guarantee",
  ];

  return (
    <section className="relative border-y border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#eff6ff] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0b57d0]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Proven Engineering Excellence</span>
          </div>

          <h2 className="mt-4 text-2xl font-black tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
            Trusted by Growing Businesses
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            We deliver reliable, production-ready software solutions built to scale operations,
            automate workflows, and drive verifiable business returns.
          </p>
        </div>

        {/* 4 Trust Metrics */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-3xl font-black tracking-tight ${item.color} sm:text-4xl`}>
                    {item.value}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-[#0b57d0]">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mt-3 text-base font-bold text-[#0f172a]">
                  {item.label}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Value Highlights Pill Bar */}
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-slate-700">
            {trustHighlights.map((hl) => (
              <div key={hl} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#0b57d0] flex-shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
