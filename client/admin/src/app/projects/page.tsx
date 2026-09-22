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
} from "lucide-react";
import adminApi from "@/services/api";
import ConfirmModal from "@/components/common/ConfirmModal";
import ImageUpload from "@/components/common/ImageUpload";

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
    setImage("/portfolio/business-management.png");
    setLiveUrl("");
    setTechnologiesText("Next.js, React, Node.js");
    setFeatured(true);
    setOrder(projects.length + 1);
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
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e: any) => {
                    e.currentTarget.src = "/portfolio/business-management.png";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0f172a]">
                {editingProjectId ? "Edit Portfolio Case Study" : "Add New Portfolio Project"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure case study showcase details for the public website.
              </p>
            </div>

            {/* Form Error */}
            {formError && (
              <div className="mb-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Title */}
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
                    Slug
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

              {/* Client & Display Order Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Client / Industry
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Enterprise Services & B2B Operations"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>

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
              </div>

              {/* Project Image Upload & Preview */}
              <div>
                <ImageUpload
                  value={image}
                  onChange={setImage}
                  label="Project Showcase Image (Direct Upload or URL)"
                  placeholder="/portfolio/business-management.png or https://..."
                />
              </div>

              {/* Key Metric / Impact */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Key Metric / Impact
                </label>
                <input
                  type="text"
                  value={metrics}
                  onChange={(e) => setMetrics(e.target.value)}
                  placeholder="+45% Alignment, -70% Overhead"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Technologies (Comma-separated) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Technologies Used (Comma-separated)
                </label>
                <input
                  type="text"
                  value={technologiesText}
                  onChange={(e) => setTechnologiesText(e.target.value)}
                  placeholder="Next.js, Strategy Tracking, Team Ops, PostgreSQL, Tailwind CSS"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an overview of the challenge solved and the solution delivered..."
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2 pt-1">
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

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0b57d0] to-[#155eef] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-3.5 w-3.5" />
                      <span>{editingProjectId ? "Update Project" : "Create Project"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
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
