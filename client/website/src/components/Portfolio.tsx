import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Layers, ArrowRight } from "lucide-react";
import { PROJECTS } from "@/lib/portfolioData";

// Displays featured client case studies, live previews, and technology stacks.
export default function Portfolio() {
  return (
    <section id="portfolio" className="relative bg-slate-50/60 py-12 sm:py-16">
      <span id="projects" className="sr-only" />

      {/* Background Accent Gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              OUR PORTFOLIO & RECENT WORK
            </div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl md:text-5xl">
              Engineered for Real Impact
            </h2>
            <p className="mt-3.5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Explore our proven software systems, mobile solutions, and business platforms
              built for fast-growing companies and enterprises.
            </p>
          </div>

          {/* Header Action & Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 shadow-xs border border-slate-200/80">
              <Layers className="h-4 w-4 text-blue-600" />
              <span className="text-xs font-semibold text-slate-700">
                {PROJECTS.length} Featured Case Studies
              </span>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 active:scale-95"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ==================== PROJECTS GRID ==================== */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => {
            const detailHref = `/portfolio/${project.slug || project.id}`;
            return (
              <div
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5"
              >
                {/* Image Container with Link */}
                <Link
                  href={detailHref}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 block"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={project.id <= 3}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />

                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur-md border border-white/15">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Quick Preview Action */}
                  <div className="absolute right-3.5 bottom-3.5 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <span>View Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  <Link href={detailHref}>
                    <h3 className="text-lg font-bold text-[#0f172a] transition-colors group-hover:text-[#0b57d0]">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button linking to Dedicated Page */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={detailHref}
                      className="group/btn inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0b57d0] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 active:scale-[0.98]"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                    <span className="text-xs font-semibold text-slate-400 shrink-0">
                      Project #{project.id}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ==================== VIEW ALL PROJECTS ACTION ==================== */}
        <div className="mt-14 flex flex-col items-center justify-center gap-3.5 text-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0b57d0] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>View All Projects &amp; Case Studies</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-md">
            Explore our complete portfolio, filter by technology &amp; category, and inspect detailed enterprise architectures.
          </p>
        </div>
      </div>
    </section>
  );
}
