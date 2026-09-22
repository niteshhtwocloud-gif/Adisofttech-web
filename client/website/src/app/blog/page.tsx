import type { Metadata } from "next";
import BlogListing from "@/components/BlogListing";
import { getAllBlogs } from "@/lib/getBlogs";
import { Sparkles, BookOpen } from "lucide-react";

// ==================== PAGE METADATA & CONFIG ====================

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AST Insights | Engineering, Cloud & Business Automation Blog",
  description:
    "Actionable engineering strategies, cloud architectures, and business automation playbooks from the technical team at AST.",
  alternates: { canonical: "/blog" },
};

// ==================== BLOG INDEX PAGE COMPONENT ====================

export default async function BlogPage() {
  const posts = await getAllBlogs();

  return (
    <div className="min-h-screen bg-[#fcfdff] font-sans">
      {/* ==================== SLEEK EDITORIAL HEADER ==================== */}
      <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-[#f8fafc] via-white to-[#f0f7ff] pt-8 pb-10 sm:pt-12 sm:pb-12">
        {/* Soft background ambient glow orbs */}
        <div className="pointer-events-none absolute -top-28 left-1/3 -z-10 h-80 w-80 rounded-full bg-blue-200/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-10 right-10 -z-10 h-72 w-72 rounded-full bg-orange-200/20 blur-[90px]" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#eff6ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0b57d0]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f97316] animate-pulse" />
                <span>AST Editorial Insights</span>
              </div>

              <h1 className="mt-3 text-2xl font-black tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl">
                Engineering, Cloud &amp;{" "}
                <span className="bg-gradient-to-r from-[#0b57d0] via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Automation
                </span>
              </h1>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-xl">
                Practical architectures, software strategies, and automation playbooks curated by senior engineers at AST.
              </p>
            </div>

            <div className="hidden rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-2xs md:flex items-center gap-2.5 text-xs text-slate-600">
              <Sparkles className="h-4 w-4 text-[#0b57d0]" />
              <span>
                <strong className="text-[#0f172a] font-bold">{posts.length}</strong> Published Articles
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MAIN BLOG CATALOG ==================== */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <BlogListing initialPosts={posts} />
      </section>
    </div>
  );
}
