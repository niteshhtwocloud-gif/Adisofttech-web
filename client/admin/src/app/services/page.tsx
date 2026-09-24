"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Trash2,
  Edit2,
  X,
  Save,
  Check,
} from "lucide-react";
import adminApi from "@/services/api";
import ConfirmModal from "@/components/common/ConfirmModal";

interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  features: string[];
  order: number;
  active: boolean;
}

export default function ServicesManagementPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Delete Modal State
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);
  const [active, setActive] = useState(true);
  const [featuresText, setFeaturesText] = useState("");
  const [formError, setFormError] = useState("");

  const loadServices = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getServices();
      setServices(res.services || []);
    } catch (err: any) {
      setError(err.message || "Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openAddModal = () => {
    setEditingServiceId(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setOrder(services.length + 1);
    setActive(true);
    setFeaturesText("");
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingServiceId(service._id);
    setTitle(service.title);
    setSlug(service.slug);
    setDescription(service.description);
    setOrder(service.order || 0);
    setActive(service.active !== undefined ? service.active : true);
    setFeaturesText((service.features || []).join("\n"));
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingServiceId(null);
    setFormError("");
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingServiceId) {
      // Auto-generate slug when creating
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
      setFormError("Service title is required");
      return;
    }
    if (!description.trim()) {
      setFormError("Description is required");
      return;
    }

    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const payload = {
      title: title.trim(),
      slug: slug.trim() || undefined,
      description: description.trim(),
      features,
      order: Number(order) || 0,
      active,
    };

    setIsSubmitting(true);

    try {
      if (editingServiceId) {
        // Update
        const res = await adminApi.updateService(editingServiceId, payload);
        setMessage(`Service "${res.service?.title || title}" updated successfully!`);
      } else {
        // Create
        const res = await adminApi.createService(payload);
        setMessage(`New service "${res.service?.title || title}" added successfully!`);
      }

      await loadServices();
      closeModal();
      setTimeout(() => setMessage(""), 4000);
    } catch (err: any) {
      console.error("Save service error:", err);
      setFormError(err.message || "Failed to save service");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteService = (service: ServiceItem) => {
    setServiceToDelete(service);
  };

  const handleConfirmDelete = async () => {
    if (!serviceToDelete) return;
    setIsDeleting(true);
    try {
      await adminApi.deleteService(serviceToDelete._id);
      setServices((prev) => prev.filter((s) => s._id !== serviceToDelete._id));
      setMessage(`Service "${serviceToDelete.title}" deleted successfully.`);
      setServiceToDelete(null);
      setTimeout(() => setMessage(""), 4000);
    } catch (err: any) {
      console.error("Delete service error:", err);
      setError(err.message || "Failed to delete service.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Service Offerings CMS</h1>
          <p className="text-xs text-slate-500">
            Configure the core capabilities displayed on the public website.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadServices}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0b57d0] to-[#155eef] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-blue-800 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
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

      {/* Global Error Notification */}
      {error && (
        <div className="flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Top Row: Order, Status & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0b57d0]">#{service.order}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      service.active
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}
                  >
                    {service.active ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(service)}
                    title="Edit Service"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-[#0b57d0] transition-colors cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service)}
                    title="Delete Service"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-3 text-base font-bold text-[#0f172a] group-hover:text-[#0b57d0] transition-colors">
                {service.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              {service.features && service.features.length > 0 && (
                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                  {service.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Slug and Preview */}
            <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate max-w-[170px]" title={service.slug}>
                Slug: {service.slug}
              </span>
              <a
                href={`http://localhost:3000#services`}
                target="_blank"
                rel="noreferrer"
                className="text-[#0b57d0] hover:underline flex items-center gap-1 shrink-0 font-medium"
              >
                <span>Preview</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && services.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Layers className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No services found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Get started by adding your company's core technological service offerings.
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add First Service</span>
          </button>
        </div>
      )}

      {/* ==================== ADD / EDIT SERVICE MODAL ==================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 sm:p-6 overflow-hidden">
          <div className="relative w-full max-w-xl sm:max-w-2xl max-h-[88vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header (Fixed at top) */}
            <div className="flex items-center justify-between p-6 sm:px-8 sm:py-5 border-b border-slate-100 flex-shrink-0 bg-white">
              <div>
                <h2 className="text-lg font-bold text-[#0f172a]">
                  {editingServiceId ? "Edit Service Offering" : "Add New Service Offering"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill in the details to publish or update this service in your catalog.
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

            {/* Scrollable Form Body (Only fields inside scroll smoothly) */}
            <form
              id="service-form"
              onSubmit={handleFormSubmit}
              className="flex-1 overflow-y-auto p-6 sm:px-8 space-y-4 custom-scrollbar"
            >
              {/* Form Error */}
              {formError && (
                <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. AI & Automation Solutions"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Slug & Display Order Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. ai-automation"
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

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an engaging summary of what this service delivers..."
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>

              {/* Key Features (One per line) - Enlarged with comfortable editing */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Key Features / Capabilities (One per line)
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">Expanded View</span>
                </div>
                <textarea
                  rows={6}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Custom AI Workflows&#10;CRM Integration&#10;Automated Ticketing&#10;24/7 Redundancy&#10;Enterprise Scalability&#10;Cloud API Connectors"
                  className="w-full min-h-[160px] rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all font-mono leading-relaxed resize-y"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Har capability ya feature ko nayi line par likhein (Enter daba kar agla point likhein).
                </p>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-1 pb-1">
                <input
                  id="service-active"
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#0b57d0] focus:ring-blue-500 accent-[#0b57d0] cursor-pointer"
                />
                <label
                  htmlFor="service-active"
                  className="text-xs font-medium text-slate-700 cursor-pointer select-none"
                >
                  Active on website (Publicly visible)
                </label>
              </div>
            </form>

            {/* Modal Footer Actions (Fixed at bottom) */}
            <div className="flex items-center justify-end gap-2.5 p-4 sm:px-8 sm:py-4 border-t border-slate-100 bg-slate-50/80 flex-shrink-0">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="service-form"
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
                    <span>{editingServiceId ? "Update Service" : "Create Service"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(serviceToDelete)}
        onClose={() => setServiceToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${serviceToDelete?.title}"? This will remove it from the CMS.`}
        confirmText="Delete Service"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
