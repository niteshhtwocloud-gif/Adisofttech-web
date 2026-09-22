"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import BlogCard from "@/components/BlogCard";

// ==================== CATEGORIES ====================

const CATEGORIES = [
  "All",
  "Business Software",
  "Web Development",
  "Mobile Development",
  "Tally & ERP",
  "Cloud & Automation",
] as const;

interface BlogListingProps {
  initialPosts: BlogPost[];
}

// ==================== BLOG LISTING COMPONENT ====================

export default function BlogListing({ initialPosts }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter posts by category and search query
  const filteredPosts = useMemo(() => {
    let list = initialPosts;

    if (selectedCategory !== "All") {
      list = list.filter((post) => {
        if (selectedCategory === "Cloud & Automation") {
          return (
            (post.category || "").includes("Cloud") ||
            (post.category || "").includes("Automation")
          );
        }
        return (post.category || "").toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(q) ||
          (p.excerpt || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q)
      );
    }

    return list;
  }, [initialPosts, selectedCategory, searchQuery]);

  return (
    <div>
      {/* ==================== SEARCH & CATEGORY CONTROLS ==================== */}
      <div className="mb-7 flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0b57d0] text-white shadow-sm shadow-blue-600/30"
                    : "border border-slate-200/90 bg-white text-slate-600 hover:border-blue-300 hover:bg-slate-50 hover:text-[#0b57d0]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-full border border-slate-200/90 bg-white py-1.5 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#0b57d0] focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        /* Empty State */
        <div className="my-12 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-10 text-center">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-slate-400" />
          <h3 className="text-sm font-bold text-[#0f172a]">No Articles Found</h3>
          <p className="mt-1 text-xs text-slate-500">
            We couldn&apos;t find any publications matching your filter or search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#0b57d0] px-4 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* ==================== ARTICLE CARDS GRID ==================== */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Editorial Bottom Consultation Banner                          */}
      {/* ------------------------------------------------------------- */}
      <div className="mt-20 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-white to-slate-50 p-8 sm:p-12 shadow-xs">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <span className="rounded-md border border-blue-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0b57d0]">
              AST Engineering Team
            </span>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-[#0f172a]">
              Have a Custom Software, Mobile or Tally Challenge?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
              Schedule a 1-on-1 discovery consultation with our technical leads to architect
              your next platform with zero guesswork.
            </p>
          </div>

          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0b57d0] px-7 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 active:scale-[0.98]"
          >
            <span>Consult an Engineer</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
