"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  Layers,
} from "lucide-react";
import BusinessOSDashboard from "./BusinessOSDashboard";
import BusinessOSDemoModal from "./BusinessOSDemoModal";

// Business OS presentation section highlighting modular features and interactive demo modal.
const KEY_BENEFITS = [
  {
    title: "Unified Milestone & Task Management",
    desc: "Assign, prioritize, and track cross-department tasks in real time with zero ambiguity.",
  },
  {
    title: "Automated Employee & Attendance Ops",
    desc: "Biometric and cloud mobile check-ins with automated leave and payroll calculations.",
  },
  {
    title: "Instant Invoicing & Tally ERP Sync",
    desc: "One-click professional GST billing with bi-directional accounting synchronization.",
  },
  {
    title: "Executive KPI & Performance Analytics",
    desc: "Make data-backed decisions with live visual graphs, growth metrics, and audit logs.",
  },
];

// ==================== BUSINESS OS COMPONENT ====================

export default function BusinessOS() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <section
      id="business-os"
      className="relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-[#f8fafc] via-white to-[#f0f7ff] py-20 sm:py-28"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-20 top-1/3 -z-10 h-80 w-80 rounded-full bg-blue-200/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-80 w-80 rounded-full bg-orange-200/25 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Product Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#eff6ff] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0b57d0]">
              <Layers className="h-3.5 w-3.5 text-[#f97316]" />
              <span>Flagship Enterprise Platform</span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl lg:text-[2.6rem] leading-tight">
              One Unified OS for All Your Company Operations
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Replace multiple fragmented subscriptions with **AST Business OS** — the all-in-one
              command center built specifically for growing businesses and multi-team enterprises.
            </p>

            {/* Benefit Highlights */}
            <div className="mt-8 space-y-4">
              {KEY_BENEFITS.map((b) => (
                <div key={b.title} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[#0b57d0] mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a]">{b.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick ROI Metrics Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                Saves 15+ hrs/week per manager
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#0b57d0]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Enterprise Security &amp; ISO compliant
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0b57d0] to-[#1e40af] px-7 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-700 hover:to-blue-900 active:scale-[0.98]"
              >
                <span>Schedule Live Demonstration</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Dashboard Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white p-3 sm:p-5 shadow-xl shadow-blue-600/5">
              <BusinessOSDashboard />
            </div>
          </div>
        </div>
      </div>

      <BusinessOSDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </section>
  );
}
