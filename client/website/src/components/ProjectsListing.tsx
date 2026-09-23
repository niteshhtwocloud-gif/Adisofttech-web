"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Search,
  Filter,
  ArrowUpRight,
  ArrowLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
  TrendingUp,
  ExternalLink,
  RefreshCw,
  FolderGit2,
} from "lucide-react";
import { PROJECTS as STATIC_PROJECTS, CaseStudy } from "@/lib/portfolioData";
import { getWebsiteImageUrl } from "@/utils/image";

function ProjectCardImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src || "/portfolio/business-management.png");

  useEffect(() => {
    setImgSrc(src || "/portfolio/business-management.png");
  }, [src]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
      priority={priority}
      onError={() => {
        if (imgSrc !== "/portfolio/business-management.png") {
          setImgSrc("/portfolio/business-management.png");
        }
      }}
    />
  );
}


const CATEGORIES = [
  "All",
  "Business Management",
  "E-Commerce",
  "Mobile Application",
  "ERP Solutions",
  "Business Automation",
  "Cloud & DevOps",
  "Web Development",
  "AI & Custom Software",
];

export default function ProjectsListing() {
  const [projects, setProjects] = useState<any[]>(STATIC_PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch dynamic projects from API and merge with static case studies
  useEffect(() => {
    const fetchApiProjects = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const res = await fetch(`${apiUrl}/projects`);
        if (res.ok) {
          const data = await res.json();
          if (data.projects && data.projects.length > 0) {
            // Merge API projects with static projects (preventing duplicate titles/slugs)
            const apiProjects = data.projects.map((p: any, idx: number) => ({
              id: p.order || idx + 1,
              slug: p.slug,
              title: p.title,
              category: p.category || "Custom Software",
              description: p.description,
              tags: p.technologies || [],
              image: getWebsiteImageUrl(p.image),
              metrics: p.metrics ? [{ label: "Impact", value: p.metrics, description: "Key Result" }] : [],
              liveUrl: p.liveUrl,
            }));

            // Combine unique by slug
            const existingSlugs = new Set(apiProjects.map((p: any) => p.slug));
            const merged = [
              ...apiProjects,
              ...STATIC_PROJECTS.filter((p) => !existingSlugs.has(p.slug)),
            ];
            setProjects(merged);
          }
        }
      } catch (err) {
        console.warn("Could not load dynamic projects, using static showcase:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApiProjects();
  }, []);

  // Filter projects by search and category
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t: string) => t.toLowerCase().includes(q))) ||
        item.category?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Breadcrumb Header */}
      <section className="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-16 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0b57d0] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-[#0f172a] font-bold">All Projects &amp; Portfolio</span>
          </div>

          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-blue-300 hover:text-[#0b57d0]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-12 pb-10 border-b border-slate-200/80">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-indigo-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-[#0b57d0] shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                COMPLETE PORTFOLIO SHOWCASE
              </div>
              <h1 className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl">
                All Engineered Projects &amp; Case Studies
              </h1>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-slate-600">
                Explore our full library of production-grade software applications, mobile platforms,
                custom ERP integrations, and enterprise automated systems.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-xs border border-slate-200">
                <Layers className="h-4 w-4 text-[#0b57d0]" />
                <span className="text-xs font-bold text-slate-800">
                  {projects.length} Total Projects
                </span>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-10 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by project name, technology, or keyword (e.g., Next.js, Stripe, ERP)..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-xs sm:text-sm font-medium text-slate-800 placeholder:text-slate-400 shadow-xs outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-lg transition"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${isSelected
                        ? "bg-[#0b57d0] text-white shadow-sm shadow-blue-600/25 scale-[1.02]"
                        : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <div className="flex items-center justify-between pb-6 border-b border-slate-200/60">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Showing <span className="text-[#0f172a] font-black">{filteredProjects.length}</span> of{" "}
            {projects.length} Projects
          </p>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <FolderGit2 className="h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-base font-bold text-slate-800">No projects match your search</h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md">
              Try adjusting your search terms or clearing the category filter to view all available case studies.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 rounded-xl bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => {
              const detailHref = project.slug
                ? `/portfolio/${project.slug}`
                : `/portfolio/${project.id || idx + 1}`;

              return (
                <div
                  key={project.slug || project.id || idx}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  {/* Thumbnail / Image Container */}
                  <Link href={detailHref} className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 block">
                    <ProjectCardImage
                      src={project.image}
                      alt={project.title}
                      priority={idx < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />

                    {/* Category Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md border border-white/15">
                        {project.category}
                      </span>
                    </div>

                    {/* Quick Preview Badge */}
                    <div className="absolute right-3.5 bottom-3.5 flex items-center gap-1.5 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <span>View Details</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#0b57d0]" />
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <Link href={detailHref}>
                      <h2 className="text-lg font-bold text-[#0f172a] transition-colors group-hover:text-[#0b57d0]">
                        {project.title}
                      </h2>
                    </Link>

                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Impact Metric Highlight if available */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50/70 p-2.5 border border-blue-100 text-xs">
                        <TrendingUp className="h-4 w-4 text-[#0b57d0] shrink-0" />
                        <span className="font-bold text-slate-900">
                          {project.metrics[0].value}
                        </span>
                        <span className="text-slate-600 text-[11px] line-clamp-1">
                          — {project.metrics[0].label}
                        </span>
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Actions */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        href={detailHref}
                        className="group/btn inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0b57d0] px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 active:scale-[0.98]"
                      >
                        <span>Explore Case Study</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="h-3 w-3 text-slate-400" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Consultation Callout */}
        <div className="mt-16 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/90 via-white to-blue-50/70 p-8 sm:p-12 shadow-sm text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-3.5 py-1 text-xs font-bold text-[#0b57d0]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>CUSTOM ENGINEERING ROADMAPS</span>
          </div>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black text-[#0f172a]">
            Ready to Build Your Next Custom Technology Solution?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Discuss your architecture, integrations, or operational bottlenecks directly with our
            senior engineering team.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#0b57d0] px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition active:scale-[0.98]"
            >
              <span>Schedule Technical Consultation</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
