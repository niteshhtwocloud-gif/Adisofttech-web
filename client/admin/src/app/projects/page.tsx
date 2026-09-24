"use client";

import React, { useState, useEffect } from "react";
import {
  FolderGit2,
  Plus,
  RefreshCw,
  ExternalLink,
  Trash2,
  Edit2,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  Image as ImageIcon,
  FileText,
  BarChart3,
  Clock,
  Building2,
  HelpCircle,
  TrendingUp,
  Cpu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import adminApi from "@/services/api";
import ConfirmModal from "@/components/common/ConfirmModal";
import ImageUpload from "@/components/common/ImageUpload";
import { getAdminImageUrl } from "@/utils/image";

interface ProjectItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  client?: string;
  description: string;
  metrics?: string;
  image?: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
  order: number;
  tagline?: string;
  timeline?: string;
  fullOverview?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  caseMetrics?: {
    label: string;
    value: string;
    description: string;
  }[];
}

const CATEGORY_OPTIONS = [
  "Business Management",
  "E-Commerce",
  "Mobile Application",
  "ERP Solutions",
  "Business Automation",
  "Cloud & DevOps",
  "Web Development",
  "AI & Custom Software",
];

export default function ProjectsManagementPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [syncing, setSyncing] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Delete Modal State
  const [projectToDelete, setProjectToDelete] = useState<ProjectItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Expandable Case Study Section State (Visible & Expanded by default)
  const [isCaseStudyExpanded, setIsCaseStudyExpanded] = useState(true);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Business Management");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [metrics, setMetrics] = useState("");
  const [image, setImage] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologiesText, setTechnologiesText] = useState("");
  const [featured, setFeatured] = useState(true);
  const [order, setOrder] = useState(1);

  // Case Study Deep-Dive Form Fields (Empty initially, placeholders show demo format)
  const [tagline, setTagline] = useState("");
  const [timeline, setTimeline] = useState("");
  const [fullOverview, setFullOverview] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [featuresText, setFeaturesText] = useState("");

  // 3 Quantifiable Impact Metrics (Empty initially, placeholders show demo format)
  const [metric1Value, setMetric1Value] = useState("");
  const [metric1Label, setMetric1Label] = useState("");
  const [metric1Desc, setMetric1Desc] = useState("");

  const [metric2Value, setMetric2Value] = useState("");
  const [metric2Label, setMetric2Label] = useState("");
  const [metric2Desc, setMetric2Desc] = useState("");

  const [metric3Value, setMetric3Value] = useState("");
  const [metric3Label, setMetric3Label] = useState("");
  const [metric3Desc, setMetric3Desc] = useState("");

  const [formError, setFormError] = useState("");

  const loadProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getProjects();
      setProjects(res.projects || []);
    } catch (err: any) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingProjectId(null);
    setTitle("");
    setSlug("");
    setCategory("Business Management");
    setClient("");
    setDescription("");
    setMetrics("");
    setImage("");
    setLiveUrl("");
    setTechnologiesText("");
    setFeatured(true);
    setOrder(projects.length + 1);

    // Keep all fields completely empty so demo guidance displays in placeholders
    setTagline("");
    setTimeline("");
    setFullOverview("");
    setChallenge("");
    setSolution("");
    setFeaturesText("");
    setMetric1Value("");
    setMetric1Label("");
    setMetric1Desc("");
    setMetric2Value("");
    setMetric2Label("");
    setMetric2Desc("");
    setMetric3Value("");
    setMetric3Label("");
    setMetric3Desc("");

    // Ensure Expand Case Study section is open by default
    setIsCaseStudyExpanded(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ProjectItem) => {
    setEditingProjectId(proj._id);
    setTitle(proj.title);
    setSlug(proj.slug);
    setCategory(proj.category || "Business Management");
    setClient(proj.client || "");
    setDescription(proj.description || "");
    setMetrics(proj.metrics || "");
    setImage(proj.image || "");
    setLiveUrl(proj.liveUrl || "");
    setTechnologiesText((proj.technologies || []).join(", "));
    setFeatured(proj.featured !== undefined ? proj.featured : true);
    setOrder(proj.order || 0);

    // Case study fields
    setTagline(proj.tagline || "");
    setTimeline(proj.timeline || "10 Weeks to Production");
    setFullOverview(proj.fullOverview || "");
    setChallenge(proj.challenge || "");
    setSolution(proj.solution || "");
    setFeaturesText((proj.features || []).join("\n"));

    const cm = proj.caseMetrics || [];
    setMetric1Value(cm[0]?.value || "");
    setMetric1Label(cm[0]?.label || "");
    setMetric1Desc(cm[0]?.description || "");
    setMetric2Value(cm[1]?.value || "");
    setMetric2Label(cm[1]?.label || "");
    setMetric2Desc(cm[1]?.description || "");
    setMetric3Value(cm[2]?.value || "");
    setMetric3Label(cm[2]?.label || "");
    setMetric3Desc(cm[2]?.description || "");

    // Ensure Expand Case Study section is open by default
    setIsCaseStudyExpanded(true);
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProjectId(null);
    setFormError("");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingProjectId) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Project title is required");
      return;
    }
    if (!description.trim()) {
      setFormError("Description is required");
      return;
    }

    const technologies = technologiesText
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const caseMetrics = [
      { value: metric1Value.trim(), label: metric1Label.trim(), description: metric1Desc.trim() },
      { value: metric2Value.trim(), label: metric2Label.trim(), description: metric2Desc.trim() },
      { value: metric3Value.trim(), label: metric3Label.trim(), description: metric3Desc.trim() },
    ].filter((m) => m.value || m.label || m.description);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      category: category.trim(),
      client: client.trim(),
      description: description.trim(),
      metrics: metrics.trim(),
      image: image.trim(),
      liveUrl: liveUrl.trim(),
      technologies,
      featured,
      order: Number(order) || 0,
      tagline: tagline.trim(),
      timeline: timeline.trim(),
      fullOverview: fullOverview.trim(),
      challenge: challenge.trim(),
      solution: solution.trim(),
      features,
      caseMetrics,
    };

    setIsSubmitting(true);

    try {
      if (editingProjectId) {
        const res = await adminApi.updateProject(editingProjectId, payload);
        setMessage(`Project "${res.project?.title || title}" updated successfully!`);
      } else {
        const res = await adminApi.createProject(payload);
        setMessage(`New project "${res.project?.title || title}" added successfully!`);
      }

      await loadProjects();
      closeModal();
      setTimeout(() => setMessage(""), 4000);
    } catch (err: any) {
      console.error("Save project error:", err);
      setFormError(err.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = (proj: ProjectItem) => {
    setProjectToDelete(proj);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await adminApi.deleteProject(projectToDelete._id);
      setProjects((prev) => prev.filter((p) => p._id !== projectToDelete._id));
      setMessage(`Project "${projectToDelete.title}" deleted successfully.`);
      setProjectToDelete(null);
      setTimeout(() => setMessage(""), 4000);
    } catch (err: any) {
      console.error("Delete project error:", err);
      setError(err.message || "Failed to delete project.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSyncStarterProjects = async () => {
    setSyncing(true);
    try {
      await adminApi.seedStarterProjects();
      await loadProjects();
      setMessage("Default website portfolio case studies synced successfully!");
      setTimeout(() => setMessage(""), 4000);
    } catch (err: any) {
      console.error("Sync error:", err);
      setError(err.message || "Failed to sync starter projects");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Portfolio &amp; Case Studies CMS</h1>
          <p className="text-xs text-slate-500">
            Showcase enterprise case studies deployed for fast-growing companies ({projects.length} total).
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={loadProjects}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleSyncStarterProjects}
            disabled={syncing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-[#0b57d0] hover:bg-blue-100 transition-colors cursor-pointer"
            title="Re-synchronize all 6 official website case studies"
          >
            <Sparkles className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Syncing..." : "Sync Defaults"}</span>
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0b57d0] to-[#155eef] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-blue-800 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {message && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Error Notification */}
      {error && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="group rounded-3xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Image Preview Container */}
            <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
              {proj.image ? (
                <img
                  src={getAdminImageUrl(proj.image)}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e: any) => {
                    e.currentTarget.src = getAdminImageUrl("/portfolio/business-management.png");
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-500">
                  <ImageIcon className="h-10 w-10 opacity-40" />
                </div>
              )}

              {/* Category & Order Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  {proj.category || "Case Study"}
                </span>
                <span className="rounded-md bg-[#0b57d0]/80 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  #{proj.order || 0}
                </span>
              </div>

              {/* Action Buttons Overlay (Edit & Delete) */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(proj)}
                  title="Edit Project"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-700 shadow-sm backdrop-blur-md hover:bg-white hover:text-[#0b57d0] transition-colors cursor-pointer"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteProject(proj)}
                  title="Delete Project"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-rose-600 shadow-sm backdrop-blur-md hover:bg-white hover:text-rose-700 transition-colors cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0f172a] group-hover:text-[#0b57d0] transition-colors">
                  {proj.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Metrics Highlight */}
                {proj.metrics && (
                  <div className="mt-3 rounded-xl bg-blue-50/70 p-2.5 text-[11px] font-semibold text-[#0b57d0]">
                    ⚡ {proj.metrics}
                  </div>
                )}

                {/* Technologies Tags */}
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {proj.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[170px]" title={proj.slug}>
                  Slug: {proj.slug}
                </span>
                <a
                  href={`http://localhost:3000#portfolio`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0b57d0] hover:underline flex items-center gap-1 font-medium shrink-0"
                >
                  <span>Preview</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <FolderGit2 className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No projects found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            You can add new projects or synchronize default website case studies.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={handleSyncStarterProjects}
              className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-[#0b57d0] hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Sync Defaults</span>
            </button>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add First Project</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================== ADD / EDIT PROJECT MODAL ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 sm:p-6 overflow-hidden">
          <div className="relative w-full max-w-3xl sm:max-w-4xl max-h-[88vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header (Fixed at top) */}
            <div className="p-5 sm:px-8 sm:py-5 border-b border-slate-100 flex-shrink-0 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-[#0f172a]">
                      {editingProjectId ? "Edit Portfolio Case Study" : "Add New Portfolio Project"}
                    </h2>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#0b57d0]">
                      Full CMS
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure both the portfolio listing card and all expanded case study fields below.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Quick Jump & Section Toggle Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-100/90 p-1.5 mt-4">
                <div className="flex items-center gap-1.5">
                  <a
                    href="#section-card-info"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs hover:text-[#0b57d0] transition cursor-pointer"
                  >
                    <Layers className="h-3.5 w-3.5 text-blue-600" />
                    <span>1. Card &amp; Basic Info</span>
                  </a>

                  <a
                    href="#section-expand-casestudy"
                    onClick={() => setIsCaseStudyExpanded(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-200/80 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-2xs hover:bg-indigo-100 transition cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#f97316]" />
                    <span>2. EXPAND CASE STUDY CONTENT</span>
                    <span className="rounded bg-indigo-600 text-white px-1.5 py-0.2 text-[9px] font-black uppercase">
                      Expand
                    </span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCaseStudyExpanded((prev) => !prev)}
                  className="inline-flex items-center gap-1 rounded-xl bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200/80 transition cursor-pointer"
                >
                  {isCaseStudyExpanded ? (
                    <>
                      <ChevronUp className="h-3.5 w-3.5 text-slate-500" />
                      <span>Hide Expand Fields</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3.5 w-3.5 text-indigo-600" />
                      <span className="text-indigo-600 font-bold">Show Expand Fields</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Scrollable Form Body */}
            <form
              id="project-form"
              onSubmit={handleFormSubmit}
              className="flex-1 overflow-y-auto p-6 sm:px-8 space-y-6 custom-scrollbar"
            >
              {/* Form Error */}
              {formError && (
                <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* ==================== PART 1: CARD & BASIC INFO ==================== */}
              <div id="section-card-info" className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-xs font-black text-[#0b57d0]">
                      1
                    </span>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Card &amp; Basic Showcase Info (Shown on Portfolio Grid)
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400">Website Card View</span>
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Business Management System"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>

                {/* Slug & Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. business-management-system"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all cursor-pointer"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Target Industry & Delivery Timeline Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Target Industry / Client
                    </label>
                    <input
                      type="text"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      placeholder="e.g. Enterprise Services &amp; B2B Operations"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Delivery Timeline
                    </label>
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="e.g. 10 Weeks to Production"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Project Showcase Image */}
                <div>
                  <ImageUpload
                    value={image}
                    onChange={setImage}
                    label="Project Showcase Image (Direct Upload or URL)"
                    placeholder="/portfolio/business-management.png or https://..."
                  />
                </div>

                {/* Key Metric Summary & Core Technologies Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Key Metric Summary (Card Highlight)
                    </label>
                    <input
                      type="text"
                      value={metrics}
                      onChange={(e) => setMetrics(e.target.value)}
                      placeholder="+45% Alignment, -70% Overhead"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Core Technologies (Comma-Separated)
                    </label>
                    <input
                      type="text"
                      value={technologiesText}
                      onChange={(e) => setTechnologiesText(e.target.value)}
                      placeholder="Next.js, Strategy Tracking, Team Ops"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Display Order & Live Demo URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={order}
                      onChange={(e) => setOrder(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Live Demo URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Listing Card Short Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Listing Card Short Description *
                    </label>
                    <span className="text-[11px] text-slate-400">Card summary shown on portfolio grid</span>
                  </div>
                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. A unified enterprise platform for milestone planning, task tracking, employee performance, and strategic execution."
                    required
                    className="w-full min-h-[125px] rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all leading-relaxed"
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2 pt-1 pb-1">
                  <input
                    id="project-featured"
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#0b57d0] focus:ring-blue-500 accent-[#0b57d0] cursor-pointer"
                  />
                  <label
                    htmlFor="project-featured"
                    className="text-xs font-medium text-slate-700 cursor-pointer select-none"
                  >
                    Featured on homepage portfolio
                  </label>
                </div>
              </div>

              {/* ==================== PART 2: EXPAND CASE STUDY CONTENT ==================== */}
              <div
                id="section-expand-casestudy"
                className="rounded-3xl border-2 border-indigo-200 bg-gradient-to-b from-indigo-50/50 via-white to-white p-5 sm:p-6 shadow-sm space-y-5"
              >
                {/* Expand Header Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-extrabold text-[#0f172a]">
                          EXPAND: CASE STUDY &amp; DEEP-DIVE CONTENT
                        </h3>
                        <span className="rounded-md bg-indigo-600 text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                          EXPAND CONTENT
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        These fields power the expanded case study page (<code className="text-indigo-600 font-semibold">/portfolio/[slug]</code>) — Executive Overview, Business Challenge, Engineering Solution, Key Capabilities &amp; Quantifiable Impact Results.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCaseStudyExpanded(!isCaseStudyExpanded)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-white px-4 py-2 text-xs font-bold text-indigo-700 shadow-2xs hover:bg-indigo-50 transition shrink-0 cursor-pointer"
                  >
                    {isCaseStudyExpanded ? (
                      <>
                        <ChevronUp className="h-4 w-4" />
                        <span>Collapse Expand Fields</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4" />
                        <span>Click to Expand All Fields</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Expandable Section Body */}
                {isCaseStudyExpanded && (
                  <div className="space-y-5 pt-1 animate-in fade-in duration-200">
                    {/* Case Study Tagline / Headline Subtitle */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Case Study Tagline / Headline Subtitle (Expand Top)
                      </label>
                      <input
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="e.g. Centralized execution, role-based workflows, and real-time enterprise performance tracking."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                      />
                      <p className="mt-1 text-[11px] text-slate-400">
                        Displays directly below the main project title at the top of the expanded case study.
                      </p>
                    </div>

                    {/* Executive Overview */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Executive Overview (Expand Body)
                        </label>
                        <span className="text-[11px] text-indigo-600 font-semibold">
                          Main in-depth overview paragraph
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        value={fullOverview}
                        onChange={(e) => setFullOverview(e.target.value)}
                        placeholder="Designed and deployed for mid-to-large enterprises seeking to escape fragmented spreadsheet silos. This solution consolidates team OKRs, sprint milestone tracking, resource allocation, and department budgets into an intuitive, high-velocity operational command center."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all leading-relaxed"
                      />
                    </div>

                    {/* The Business Challenge & Engineering Solution Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* The Business Challenge */}
                      <div className="rounded-2xl border border-rose-200/80 bg-rose-50/40 p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-rose-700">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-xs font-black">
                            !
                          </span>
                          <label className="block text-xs font-bold uppercase tracking-wider">
                            The Business Challenge
                          </label>
                        </div>
                        <textarea
                          rows={5}
                          value={challenge}
                          onChange={(e) => setChallenge(e.target.value)}
                          placeholder="Cross-departmental teams were managing goals across disparate tools and spreadsheets, leading to blind spots, delayed milestone reviews, and misaligned delivery schedules across departments."
                          className="w-full rounded-xl border border-rose-200/80 bg-white p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all leading-relaxed"
                        />
                      </div>

                      {/* The Engineering Solution */}
                      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-emerald-700">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-black">
                            ✓
                          </span>
                          <label className="block text-xs font-bold uppercase tracking-wider">
                            The Engineering Solution
                          </label>
                        </div>
                        <textarea
                          rows={5}
                          value={solution}
                          onChange={(e) => setSolution(e.target.value)}
                          placeholder="AST engineered a bespoke web platform featuring lightning-fast data visualization, role-scoped access privileges, automated milestone reminders, and real-time progress calculations."
                          className="w-full rounded-xl border border-emerald-200/80 bg-white p-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Key Capabilities & Deliverables */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Key Capabilities &amp; Deliverables (Features List)
                        </label>
                        <span className="text-[11px] text-indigo-600 font-bold">
                          One capability per line (Renders with checkmarks)
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        value={featuresText}
                        onChange={(e) => setFeaturesText(e.target.value)}
                        placeholder={"e.g. End-to-end milestone & strategy roadmap tracking\ne.g. Executive KPI dashboards and real-time reports\ne.g. Team collaboration and role-based permissions\ne.g. Automated weekly operational progress digests\ne.g. Audit trail logs and SOC-2 compliant access controls"}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs sm:text-sm text-slate-800 font-mono placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all leading-relaxed"
                      />
                      <p className="mt-1 text-[11px] text-slate-400">
                        Every single line typed above becomes a deliverable item with a checkmark icon under &quot;Key Capabilities &amp; Deliverables&quot; on the expanded case study.
                      </p>
                    </div>

                    {/* Quantifiable Impact & Results (3 Metrics) */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-[#0b57d0]" />
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                            Quantifiable Impact &amp; Results (3 Prominent Metrics)
                          </h4>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          Shows in the 3 large metric cards on the case study
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {/* Metric 1 */}
                        <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2 shadow-2xs">
                          <span className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0b57d0]">
                            Metric 1
                          </span>
                          <input
                            type="text"
                            value={metric1Value}
                            onChange={(e) => setMetric1Value(e.target.value)}
                            placeholder="Value (e.g. +45%)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-[#0b57d0]"
                          />
                          <input
                            type="text"
                            value={metric1Label}
                            onChange={(e) => setMetric1Label(e.target.value)}
                            placeholder="Label (e.g. Operational Alignment)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#0b57d0]"
                          />
                          <textarea
                            rows={2}
                            value={metric1Desc}
                            onChange={(e) => setMetric1Desc(e.target.value)}
                            placeholder="Description (e.g. Improvement in on-time cross-functional milestone completion)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 p-2 text-[11px] text-slate-600 outline-none focus:border-[#0b57d0]"
                          />
                        </div>

                        {/* Metric 2 */}
                        <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2 shadow-2xs">
                          <span className="inline-block rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-[#f97316]">
                            Metric 2
                          </span>
                          <input
                            type="text"
                            value={metric2Value}
                            onChange={(e) => setMetric2Value(e.target.value)}
                            placeholder="Value (e.g. -70%)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-[#0b57d0]"
                          />
                          <input
                            type="text"
                            value={metric2Label}
                            onChange={(e) => setMetric2Label(e.target.value)}
                            placeholder="Label (e.g. Reporting Overhead)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#0b57d0]"
                          />
                          <textarea
                            rows={2}
                            value={metric2Desc}
                            onChange={(e) => setMetric2Desc(e.target.value)}
                            placeholder="Description (e.g. Reduction in hours spent manually consolidating monthly reports)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 p-2 text-[11px] text-slate-600 outline-none focus:border-[#0b57d0]"
                          />
                        </div>

                        {/* Metric 3 */}
                        <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-2 shadow-2xs">
                          <span className="inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                            Metric 3
                          </span>
                          <input
                            type="text"
                            value={metric3Value}
                            onChange={(e) => setMetric3Value(e.target.value)}
                            placeholder="Value (e.g. 98%)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-none focus:border-[#0b57d0]"
                          />
                          <input
                            type="text"
                            value={metric3Label}
                            onChange={(e) => setMetric3Label(e.target.value)}
                            placeholder="Label (e.g. Active User Adoption)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#0b57d0]"
                          />
                          <textarea
                            rows={2}
                            value={metric3Desc}
                            onChange={(e) => setMetric3Desc(e.target.value)}
                            placeholder="Description (e.g. Adoption rate achieved across 250+ employees within 30 days)"
                            className="w-full rounded-lg border border-slate-200 bg-slate-50/60 p-2 text-[11px] text-slate-600 outline-none focus:border-[#0b57d0]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Modal Footer Actions (Fixed at bottom) */}
            <div className="flex items-center justify-between p-4 sm:px-8 sm:py-4 border-t border-slate-100 bg-slate-50/90 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="hidden sm:inline">All card info and expanded case study details will be saved together.</span>
                <span className="sm:hidden">Card &amp; case study saved.</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="project-form"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0b57d0] to-[#155eef] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Saving Everything...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>{editingProjectId ? "Save Changes (Card & Expand Fields)" : "Create Project & Expand Fields"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(projectToDelete)}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This will remove it from the portfolio.`}
        confirmText="Delete Project"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
