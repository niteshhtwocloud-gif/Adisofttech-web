"use client";

/**
 * Component: Hero (/components/Hero.tsx)
 * 
 * Exact recreation of the reference design hero section:
 * - Two-column layout with ambient light blue & soft orange glow
 * - Left: Smart Solutions badge, high-impact headline with gradient "Growing Businesses",
 *         primary + video CTA buttons, 3 trust statistics, handwritten playful annotations
 * - Right: Realistic Laptop & Smartphone mockups displaying the AST Business OS
 * - Bottom: 4 floating feature service cards, "Scroll to explore" indicator, and "Let's Talk" bubble
 */

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Users,
  BarChart2,
  Trophy,
  Code2,
  Smartphone,
  PieChart,
  Cloud,
  MessageCircle,
  Mouse,
  X,
} from "lucide-react";
import DashboardMockup from "./DashboardMockup";
import PhoneMockup from "./PhoneMockup";

// ==================== STATS & FEATURE CARDS CONFIG ====================

const STATS = [
  { value: "500+", label: "Happy Clients", icon: Users },
  { value: "1000+", label: "Projects Delivered", icon: BarChart2 },
  { value: "10+", label: "Years Experience", icon: Trophy },
];

const FEATURE_CARDS = [
  {
    icon: Code2,
    title: "Custom Software Development",
    desc: "Tailored solutions for your unique business needs.",
    href: "/#services",
    badgeColor: "bg-blue-50 text-[#0b57d0]",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Android & iOS applications that scale with your business.",
    href: "/#services",
    badgeColor: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: PieChart,
    title: "Tally Customization",
    desc: "Simplify your accounting and business operations.",
    href: "/#services",
    badgeColor: "bg-orange-50 text-[#f97316]",
  },
  {
    icon: Cloud,
    title: "Business OS",
    desc: "All-in-one business management solutions.",
    href: "/#business-os",
    badgeColor: "bg-sky-50 text-sky-600",
  },
];

// ==================== HERO COMPONENT ====================

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-[#f0f7ff] pt-6 pb-16 sm:pt-10 sm:pb-24"
    >
      {/* ------------------------------------------------------------- */}
      {/* Ambient Glows and Decorative Curved Blobs                     */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-[550px] w-[550px] rounded-full bg-blue-200/30 blur-[130px]" />
      <div className="pointer-events-none absolute top-40 right-10 -z-10 h-[450px] w-[450px] rounded-full bg-orange-200/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 left-10 -z-10 h-[400px] w-[400px] rounded-full bg-blue-100/40 blur-[100px]" />

      {/* Large subtle background curve */}
      <svg
        className="pointer-events-none absolute top-10 left-0 -z-10 w-full opacity-40"
        height="600"
        viewBox="0 0 1440 600"
        fill="none"
      >
        <path
          d="M-100 250 C 300 450, 900 100, 1600 350"
          stroke="rgba(11, 87, 208, 0.08)"
          strokeWidth="2"
        />
        <path
          d="M-100 280 C 400 480, 1000 130, 1600 380"
          stroke="rgba(249, 115, 22, 0.08)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* ----------------------------------------------------------- */}
        {/* Main Hero Grid                                              */}
        {/* ----------------------------------------------------------- */}
        <div className="grid grid-cols-1 items-center gap-10 xl:grid-cols-12 xl:gap-8 pt-2 sm:pt-4">
          {/* ========================================================= */}
          {/* Left Column: Headline, CTAs, Stats                        */}
          {/* ========================================================= */}
          <div className="relative z-10 xl:col-span-6">
            {/* Small Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0b57d0] shadow-2xs backdrop-blur-xs">
              <span className="h-2 w-2 rounded-full bg-[#f97316] animate-pulse" />
              <span>SMART SOLUTIONS FOR A BETTER TOMORROW</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-5xl xl:text-[3.25rem] font-black tracking-tight text-[#0f172a] leading-tight xl:leading-[1.12]">
              Web, Mobile &amp; <br />
              Business Software for <br />
              <span className="relative inline-block bg-gradient-to-r from-[#0b57d0] via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Growing Businesses
                {/* Subtle Orange Accent Wave Underline */}
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full text-[#f97316]"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2 5.5 C 50 1.5, 150 1.5, 198 5.5"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Subtext */}
            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600">
              We help businesses streamline operations with modern web applications,
              mobile apps, Tally customization and custom business software.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#0b57d0] to-[#1e40af] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:from-blue-700 hover:to-blue-900 hover:shadow-blue-600/40 active:scale-[0.98]"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center rounded-full border border-slate-200/90 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 shadow-2xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-[#0b57d0] active:scale-[0.98]"
              >
                <span>Watch Demo</span>
              </a>
            </div>

            {/* Three Statistics with Clean Icons */}
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-6 border-t border-slate-200/70 pt-6 sm:pt-8">
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1.5 sm:gap-3">
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0b57d0] shadow-2xs shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#0f172a]">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs font-semibold text-slate-500 leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* Right Column: Realistic SaaS Laptop & Phone Mockup        */}
          {/* ========================================================= */}
          <div className="relative xl:col-span-6 w-full mt-4 sm:mt-6 xl:mt-0">
            {/* Playful Handwritten Annotation 1: Your Technology Partner */}
            <div className="absolute -top-10 left-6 hidden select-none lg:block z-20">
              <div className="rotate-[-6deg] text-xs font-bold text-slate-700 font-sans tracking-wide">
                Your <br />
                Technology Partner <br />
                for Growth
              </div>
              <svg
                className="ml-8 mt-1 text-slate-700"
                width="40"
                height="32"
                viewBox="0 0 40 32"
                fill="none"
              >
                <path
                  d="M 5 2 C 15 15, 25 22, 34 26"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M 28 28 L 35 27 L 33 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Playful Handwritten Annotation 2: Ideas Strategy Technology Growth */}
            <div className="absolute -top-12 -right-2 hidden select-none sm:block z-20 text-right">
              <div className="rotate-[4deg] text-xs font-bold text-slate-700 leading-tight">
                Ideas <br />
                Strategy <br />
                Technology <br />
                <span className="relative inline-block text-[#f97316]">
                  Growth
                  <span className="absolute bottom-0 left-0 h-1 w-full bg-[#f97316]/30 -rotate-1 rounded" />
                </span>
              </div>
            </div>

            {/* Main Mockup Stage Container */}
            <div className="relative mx-auto w-full max-w-[460px] sm:max-w-xl xl:max-w-2xl pt-4 pb-6 sm:pt-6 sm:pb-8">
              {/* Laptop Mockup */}
              <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[460px] xl:max-w-[540px] drop-shadow-[0_20px_30px_rgba(11,87,208,0.12)] transition-transform duration-500 hover:scale-[1.01]">
                {/* Laptop Screen Bezel */}
                <div className="relative rounded-t-2xl border-[6px] sm:border-[9px] border-b-0 border-[#0f172a] bg-[#0f172a] p-1 sm:p-1.5 shadow-2xl ring-1 ring-slate-700/40">
                  {/* Specular glass reflection overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-t-xl bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] z-20" />

                  {/* Laptop Camera dot */}
                  <div className="mx-auto mb-1 h-1.5 w-1.5 rounded-full bg-slate-800 ring-1 ring-slate-700" />

                  {/* Screen Content */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white shadow-inner">
                    <DashboardMockup />
                  </div>
                </div>

                {/* Laptop Lower Chassis / Keyboard Base */}
                <div className="relative -mt-[1px] h-3 sm:h-3.5 w-full rounded-b-xl bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 shadow-md border-t border-slate-400/40">
                  {/* Notch cutout to open laptop */}
                  <div className="mx-auto h-1 sm:h-1.5 w-16 sm:w-20 rounded-b-md bg-slate-600/70" />
                </div>
                {/* Laptop Foot rubber pads */}
                <div className="mx-auto h-1.5 w-[96%] rounded-b bg-slate-900/20 blur-xs" />
              </div>

              {/* Smartphone Mockup (Overlapping bottom right of laptop with floating animation) */}
              <div className="absolute -right-1 sm:-right-4 bottom-0 w-28 sm:w-36 md:w-44 z-30 drop-shadow-[0_15px_25px_rgba(15,23,42,0.25)] animate-float">
                {/* Phone Chassis */}
                <div className="relative aspect-[9/18.5] rounded-[24px] sm:rounded-[32px] border-[5px] sm:border-[7px] border-[#0f172a] bg-[#0f172a] p-0.5 shadow-2xl ring-1 ring-slate-700/60 transition-transform duration-300 hover:scale-105">
                  {/* Phone specular light sheen */}
                  <div className="pointer-events-none absolute inset-0 rounded-[20px] sm:rounded-[25px] bg-gradient-to-tr from-transparent via-white/[0.06] to-white/[0.15] z-20" />
                  <PhoneMockup />
                </div>
              </div>

              {/* Playful Handwritten Annotation 3: Software That Works For You */}
              <div className="absolute -bottom-6 left-4 sm:left-16 select-none z-20 hidden sm:block">
                <span className="rotate-[-3deg] inline-block text-xs font-bold text-slate-700 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-xs">
                  Software <br />
                  That Works <br />
                  <span className="text-[#f97316] font-extrabold">For You</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* 4 Premium Floating Service Feature Cards                    */}
        {/* ----------------------------------------------------------- */}
        <div className="mt-16 sm:mt-24">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.badgeColor} shadow-2xs transition-transform group-hover:scale-105`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition-all group-hover:border-blue-500 group-hover:bg-[#0b57d0] group-hover:text-white">
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm font-black text-[#0f172a] group-hover:text-[#0b57d0] transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {card.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------------- */}
        {/* Bottom Hero Indicators: Scroll + Let's Talk Bubble         */}
        {/* ----------------------------------------------------------- */}
        <div className="mt-12 flex items-center justify-between pt-4 text-xs font-semibold text-slate-500">
          {/* Scroll to explore */}
          <div className="flex items-center gap-2 select-none">
            <div className="flex h-7 w-4 items-center justify-center rounded-full border-2 border-slate-300 p-0.5">
              <span className="h-1.5 w-1 rounded-full bg-slate-400 animate-bounce" />
            </div>
            <span>Scroll to explore</span>
          </div>

          {/* Floating 'Let's Talk' Button */}
          <Link
            href="/#contact"
            className="flex items-center gap-2 rounded-full bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Let&apos;s Talk</span>
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Video Modal Demo                                              */}
      {/* ------------------------------------------------------------- */}
      {videoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-black text-[#0f172a]">
              AST Enterprise Solutions &amp; Platform Tour
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Discover how AST software and business automation empower growing businesses.
            </p>
            <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center text-white">
              <div className="text-center p-6">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b57d0] shadow-lg shadow-blue-500/30">
                  <Play className="h-6 w-6 fill-current ml-1" />
                </div>
                <h4 className="text-base font-bold">Interactive Product Demo</h4>
                <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
                  Experience full ERP integration, custom workflow pipelines, and analytics in real time.
                </p>
                <Link
                  href="/#contact"
                  onClick={() => setVideoOpen(false)}
                  className="mt-4 inline-block rounded-full bg-[#0b57d0] px-5 py-2 text-xs font-bold text-white"
                >
                  Schedule Live 1-on-1 Demo &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
