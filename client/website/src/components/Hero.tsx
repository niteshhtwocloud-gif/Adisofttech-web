"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Smartphone,
  PieChart,
  Cloud,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import api from "@/services/api";
import { getWebsiteImageUrl } from "@/utils/image";

export interface HeroBannerSlide {
  _id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  image: string;
  link?: string;
  order?: number;
  active?: boolean;
}

const DEFAULT_BANNER_SLIDES: HeroBannerSlide[] = [
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

export default function Hero() {
  const [slides, setSlides] = useState<HeroBannerSlide[]>(DEFAULT_BANNER_SLIDES);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch dynamic hero banner slides from settings API (managed in Admin Panel)
  useEffect(() => {
    let isMounted = true;
    async function loadHeroBanners() {
      try {
        let heroSlides: HeroBannerSlide[] = [];
        if (typeof api?.getSettings === "function") {
          const res = await api.getSettings();
          if (res?.success && Array.isArray(res.settings?.heroSlides)) {
            heroSlides = res.settings.heroSlides;
          }
        }

        // Direct fetch fallback if api method is cached/delayed
        if (heroSlides.length === 0) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
          const res = await fetch(`${apiUrl}/settings`, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (data?.success && Array.isArray(data.settings?.heroSlides)) {
              heroSlides = data.settings.heroSlides;
            }
          }
        }

        if (heroSlides.length > 0 && isMounted) {
          const activeSlides = heroSlides
            .filter((s: HeroBannerSlide) => s.active !== false && s.image)
            .sort((a: HeroBannerSlide, b: HeroBannerSlide) => (a.order || 0) - (b.order || 0));

          if (activeSlides.length > 0) {
            setSlides(activeSlides);
          }
        }
      } catch (err) {
        console.error("Failed to load hero banner slides:", err);
      }
    }
    loadHeroBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  const safeIndex = slides.length > 0 ? currentSlide % slides.length : 0;

  // Auto-slide guaranteed every 3 seconds (3000ms)
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      className="relative w-full max-w-full overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-[#f0f7ff] pt-0 pb-14 sm:pb-20"
    >
      {/* ------------------------------------------------------------- */}
      {/* Ambient Glows                                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="pointer-events-none absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-200/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-40 right-10 -z-10 h-[400px] w-[400px] rounded-full bg-orange-200/15 blur-[120px]" />

      {/* ========================================================= */}
      {/* Full-Width Hero Carousel Slider (Flush with Navbar)       */}
      {/* ========================================================= */}
      <div className="group relative w-full max-w-full overflow-hidden bg-white border-b border-slate-100 shadow-xs">
        {/* Slider Slides Track */}
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${safeIndex * 100}%)` }}
        >
          {slides.map((slide, idx) => {
            const imgSrc = getWebsiteImageUrl(slide.image);
            const targetLink = slide.link || "/#contact";

            return (
              <div key={slide._id || idx} className="w-full min-w-full max-w-full shrink-0 basis-full">
                <Link
                  href={targetLink}
                  className="block relative w-full max-w-full select-none cursor-pointer"
                >
                  <img
                    src={imgSrc}
                    alt={slide.title || `Hero banner ${idx + 1}`}
                    className="w-full h-auto max-w-full block"
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Left Arrow Navigation Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Banner"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/85 hover:bg-white text-slate-800 backdrop-blur-md shadow-md sm:shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer hover:scale-105"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-slate-700" />
        </button>

        {/* Right Arrow Navigation Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Banner"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/85 hover:bg-white text-slate-800 backdrop-blur-md shadow-md sm:shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer hover:scale-105"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-slate-700" />
        </button>

        {/* Bottom Pagination Dots & Live Pill */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 sm:gap-2 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 shadow-md">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${safeIndex === idx
                ? "h-1.5 sm:h-2 w-4 sm:w-8 bg-[#0b57d0] shadow-sm"
                : "h-1.5 sm:h-2 w-1.5 sm:w-2 bg-white/60 hover:bg-white"
                }`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ----------------------------------------------------------- */}
        {/* 4 Premium Service Feature Cards                             */}
        {/* ----------------------------------------------------------- */}
        <div className="mt-8 sm:mt-12">
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
        <div className="mt-10 flex items-center justify-between pt-4 text-xs font-semibold text-slate-500">
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
    </section>
  );
}
