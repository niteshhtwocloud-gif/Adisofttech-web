import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Building2,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  ChevronRight,
} from "lucide-react";
import { getProjectByIdOrSlug, fetchProjectByIdOrSlug, getAllProjects, CaseStudy } from "@/lib/portfolioData";

type Props = { params: Promise<{ id: string }> };

// ==================== METADATA GENERATOR ====================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchProjectByIdOrSlug(id);

  if (!project) {
    return { title: "Case Study Not Found | AST" };
  }

  return {
    title: `${project.title} | Enterprise Case Study | AST`,
    description: project.description,
    openGraph: {
      title: `${project.title} - AST Case Study`,
      description: project.description,
      images: [{ url: project.image }],
    },
  };
}

// ==================== CASE STUDY DETAIL PAGE ====================

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const project = await fetchProjectByIdOrSlug(id);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const relatedProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* ==================== TOP NAVIGATION BREADCRUMB ==================== */}
      <section className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-16 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#0b57d0] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <Link href="/portfolio" className="hover:text-[#0b57d0] transition-colors">
              Portfolio
            </Link>
            <ChevronRight className="h-3 w-3 text-slate-300" />
            <span className="text-[#0f172a] font-bold line-clamp-1 max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-blue-300 hover:text-[#0b57d0]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Case Studies</span>
          </Link>
        </div>
      </section>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-16">
        {/* Background glow accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-10 left-1/2 -translate-x-1/2 h-72 w-3/4 rounded-full bg-blue-100/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          {/* Category & Project Index */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/70 px-3 py-1 text-xs font-bold text-[#0b57d0]">
              <Sparkles className="h-3 w-3" />
              {project.category}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Case Study #{project.id}
            </span>
          </div>

          {/* Heading & Tagline */}
          <h1 className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] sm:text-5xl sm:leading-tight">
            {project.title}
          </h1>
          <p className="mt-4 text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
            {project.tagline}
          </p>

          {/* Key Quick Metadata */}
          <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs sm:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5 text-[#0b57d0]">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Target Industry
                </div>
                <div className="mt-0.5 text-xs font-bold text-[#0f172a] sm:text-sm">
                  {project.clientIndustry}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Delivery Timeline
                </div>
                <div className="mt-0.5 text-xs font-bold text-[#0f172a] sm:text-sm">
                  {project.timeline}
                </div>
              </div>
            </div>

            <div className="col-span-2 flex items-start gap-3 sm:col-span-1">
              <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Core Technologies
                </div>
                <div className="mt-0.5 text-xs font-bold text-[#0f172a] sm:text-sm">
                  {project.tags.slice(0, 3).join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HERO SHOWCASE IMAGE ==================== */}
      <section className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-950 shadow-xl shadow-blue-900/5">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover object-center"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
        </div>
      </section>

      {/* ==================== QUANTIFIABLE BUSINESS METRICS ==================== */}
      <section className="mx-auto mt-12 max-w-5xl px-5 sm:px-8">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-slate-50 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b57d0]">
            <TrendingUp className="h-4 w-4" />
            Quantifiable Impact & Results
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white bg-white/90 p-5 shadow-sm backdrop-blur-xs transition hover:border-blue-200"
              >
                <div className="text-3xl font-black tracking-tight text-[#0b57d0] sm:text-4xl">
                  {metric.value}
                </div>
                <div className="mt-1 text-sm font-bold text-[#0f172a]">
                  {metric.label}
                </div>
                <div className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CORE CONTENT DEEP DIVE ==================== */}
      <section className="mx-auto mt-14 max-w-5xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Column (2 cols) */}
          <div className="space-y-10 lg:col-span-2">
            {/* Overview */}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl">
                Executive Overview
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {project.fullOverview}
              </p>
            </div>

            {/* The Challenge */}
            <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-6">
              <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-200/80 text-rose-700 text-xs font-black">
                  !
                </span>
                The Business Challenge
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {project.challenge}
              </p>
            </div>

            {/* The AST Solution */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6">
              <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200/80 text-emerald-700 text-xs font-black">
                  ✓
                </span>
                The Engineering Solution
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {project.solution}
              </p>
            </div>

            {/* Key Capabilities & Deliverables */}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#0f172a] sm:text-2xl">
                Key Capabilities & Deliverables
              </h2>
              <div className="mt-4 space-y-3">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-2xs"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0b57d0] mt-0.5" />
                    <span className="text-sm font-medium text-slate-800 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar (1 col) */}
          <div className="space-y-6">
            {/* Tech Stack Breakdown */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Architecture & Stack
              </h3>
              <div className="mt-4 divide-y divide-slate-100">
                {project.techStack.map((tech, i) => (
                  <div key={i} className="py-3 first:pt-0 last:pb-0">
                    <div className="text-xs font-bold text-[#0f172a]">
                      {tech.name}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {tech.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Pills */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Related Domains
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-[#0b57d0] to-[#1e40af] p-6 text-white shadow-lg shadow-blue-600/20">
              <h3 className="text-base font-bold">
                Need a Similar Architecture?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-blue-100">
                Schedule a technical discovery session with our senior engineers to map out your architecture.
              </p>
              <Link
                href="/#contact"
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#0b57d0] shadow-md transition hover:bg-blue-50 active:scale-[0.98]"
              >
                <span>Consult Our Engineers</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== RELATED CASE STUDIES ==================== */}
      <section className="mx-auto mt-20 max-w-5xl border-t border-slate-200/80 px-5 pt-14 pb-20 sm:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0b57d0]">
              More From AST
            </div>
            <h2 className="mt-1 text-2xl font-black text-[#0f172a]">
              Explore Other Case Studies
            </h2>
          </div>
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0b57d0] hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {relatedProjects.map((rel) => (
            <Link
              key={rel.id}
              href={`/portfolio/${rel.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <Image
                  src={rel.image}
                  alt={rel.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
                    {rel.category}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <h3 className="text-sm font-bold text-[#0f172a] group-hover:text-[#0b57d0] transition-colors line-clamp-1">
                  {rel.title}
                </h3>
                <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#0b57d0]">
                  <span>Read Case Study</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
