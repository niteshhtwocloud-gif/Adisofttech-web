"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface BusinessOSDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_SLIDES = [
  {
    id: "01",
    title: "Business OS Dashboard",
    description: "Manage your business from one powerful dashboard.",
    image: "/images/business-os/dashboard.png",
  },
  {
    id: "02",
    title: "Task & Employee Management",
    description: "Manage employees, tasks and daily operations in one place.",
    image: "/images/business-os/tasks-employees.png",
  },
  {
    id: "03",
    title: "Attendance, Leave & Reports",
    description: "Track attendance, manage leaves and monitor business reports.",
    image: "/images/business-os/attendance-reports.png",
  },
];

export default function BusinessOSDemoModal({ isOpen, onClose }: BusinessOSDemoModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide || index < 0 || index >= DEMO_SLIDES.length) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsFading(false);
    }, 150);
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const nextSlide = useCallback(() => {
    if (currentSlide < DEMO_SLIDES.length - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, goToSlide]);

  // Lock background scroll when open & reset to first slide
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setCurrentSlide(0);
      setIsFading(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation: ESC to close, Left/Right arrows for slides
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, prevSlide, nextSlide, onClose]);

  if (!isOpen) return null;

  const slide = DEMO_SLIDES[currentSlide];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ADISOFTTECH Business OS Interactive Demo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-5 md:p-6 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full max-h-[88vh] sm:max-h-[90vh] w-[94vw] sm:w-[88vw] max-w-[1150px] flex-col overflow-hidden rounded-[20px] sm:rounded-[24px] border border-slate-200/80 bg-white shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Compact Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-3.5 sm:px-7 sm:py-4">
          <div>
            <span className="text-sm font-extrabold tracking-tight text-[#0f172a] sm:text-base">
              ADISOFT<span className="text-blue-600">TECH</span> Business OS
            </span>
            <p className="text-[11px] font-semibold text-blue-600 sm:text-xs">
              Interactive Product Demo
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close demo"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 sm:h-9 sm:w-9"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Slide Info Sub-Header */}
        <div className="shrink-0 border-b border-slate-100/80 bg-slate-50/50 px-5 py-2.5 sm:px-7 sm:py-3">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
            <h3 className="text-sm font-bold text-[#0f172a] sm:text-base">
              {slide.title}
            </h3>
            <span className="hidden text-slate-300 sm:inline">•</span>
            <p className="text-xs text-slate-500 sm:text-sm">
              {slide.description}
            </p>
          </div>
        </div>

        {/* Image Display Area (Dominates the popup) */}
        <div className="relative flex flex-1 min-h-0 w-full items-center justify-center overflow-hidden bg-slate-900/5 p-3 sm:p-5">
          <div
            className={`relative h-full w-full transition-opacity duration-300 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="(max-width: 1200px) 90vw, 1150px"
              className="rounded-xl object-contain object-center shadow-md"
            />
          </div>
        </div>

        {/* Slider Navigation Bar */}
        <div className="flex shrink-0 items-center justify-between border-t border-slate-100 px-5 py-3.5 sm:px-7 sm:py-4">
          {/* Slide Counter */}
          <div className="text-xs font-bold tracking-wider text-slate-500 sm:text-sm">
            <span className="text-[#0f172a] font-extrabold">{slide.id}</span> / 03
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {DEMO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${s.title}`}
                className={`transition-all duration-200 ${
                  currentSlide === idx
                    ? "h-2.5 w-6 rounded-full bg-blue-600"
                    : "h-2.5 w-2.5 rounded-full bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
              className={`inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                currentSlide === 0
                  ? "invisible opacity-0 pointer-events-none"
                  : "hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              disabled={currentSlide === DEMO_SLIDES.length - 1}
              aria-label="Next slide"
              className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                currentSlide === DEMO_SLIDES.length - 1
                  ? "invisible opacity-0 pointer-events-none"
                  : "hover:bg-slate-50 hover:border-slate-300 hover:text-blue-600"
              }`}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
