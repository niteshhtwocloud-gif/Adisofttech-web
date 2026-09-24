"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Images,
  Plus,
  RefreshCw,
  ExternalLink,
  Trash2,
  Edit2,
  X,
  Save,
  CheckCircle2,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Image as ImageIcon,
  RotateCcw,
  Link2,
} from "lucide-react";
import adminApi from "@/services/api";
import { getAdminImageUrl } from "@/utils/image";
import ConfirmModal from "@/components/common/ConfirmModal";
import ImageUpload from "@/components/common/ImageUpload";

export interface HeroSlideItem {
  _id?: string;
  image: string;
  link?: string;
  order: number;
  active: boolean;
  title?: string;
  subtitle?: string;
  badge?: string;
}

const DEFAULT_STARTER_SLIDES: HeroSlideItem[] = [
  {
    image: "/hero/banner-custom-application.png",
    link: "/#contact",
    order: 1,
    active: true,
  },
  {
    image: "/hero/banner-business-automation.png",
    link: "/#contact",
    order: 2,
    active: true,
  },
  {
    image: "/hero/banner-tally-customization.png",
    link: "/#contact",
    order: 3,
    active: true,
  },
  {
    image: "/hero/banner-tally-integration.png",
    link: "/#contact",
    order: 4,
    active: true,
  },
  {
    image: "/hero/banner-data-migration.png",
    link: "/#contact",
    order: 5,
    active: true,
  },
];

export default function HeroSliderAdminPage() {
  const [slides, setSlides] = useState<HeroSlideItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<HeroSlideItem>({
    image: "",
    link: "/#contact",
    order: 1,
    active: true,
  });

  // Confirm delete
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null);

  // Fetch Settings on mount
  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await adminApi.getSettings();
      if (res?.success && res.settings) {
        const remoteSlides = res.settings.heroSlides;
        if (Array.isArray(remoteSlides) && remoteSlides.length > 0) {
          const sorted = [...remoteSlides].sort(
            (a, b) => (a.order || 0) - (b.order || 0)
          );
          setSlides(sorted);
        } else {
          setSlides(DEFAULT_STARTER_SLIDES);
        }
      } else {
        setSlides(DEFAULT_STARTER_SLIDES);
      }
    } catch (err: any) {
      console.error("Failed to load hero slides:", err);
      setErrorMessage("Could not load slider configuration. Using default preview.");
      setSlides(DEFAULT_STARTER_SLIDES);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAll = async (newSlides: HeroSlideItem[]) => {
    setIsSaving(true);
    setErrorMessage("");
    setSaveSuccess(false);

    try {
      const res = await adminApi.updateSettings({ heroSlides: newSlides });
      if (res.success) {
        setSlides(newSlides);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3500);
      } else {
        throw new Error(res.message || "Failed to update slides");
      }
    } catch (err: any) {
      console.error("Save error:", err);
      setErrorMessage(err.message || "Failed to save slides to database.");
    } finally {
      setIsSaving(false);
    }
  };

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingIndex(null);
    setFormData({
      image: "",
      link: "/#contact",
      order: slides.length + 1,
      active: true,
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (index: number) => {
    setEditingIndex(index);
    setFormData({
      image: slides[index].image || "",
      link: slides[index].link || "/#contact",
      order: slides[index].order || index + 1,
      active: slides[index].active !== false,
    });
    setIsModalOpen(true);
  };

  // Save Modal Form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image.trim()) {
      setErrorMessage("Please upload or enter an image URL for the banner.");
      return;
    }

    let updated: HeroSlideItem[];
    if (editingIndex !== null) {
      updated = [...slides];
      updated[editingIndex] = { ...updated[editingIndex], ...formData };
    } else {
      updated = [...slides, { ...formData }];
    }

    // Sort by order
    updated.sort((a, b) => (a.order || 0) - (b.order || 0));

    setIsModalOpen(false);
    await handleSaveAll(updated);
  };

  // Toggle active state
  const handleToggleActive = async (index: number) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], active: !updated[index].active };
    await handleSaveAll(updated);
  };

  // Move slide up
  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    updated.forEach((s, idx) => {
      s.order = idx + 1;
    });
    await handleSaveAll(updated);
  };

  // Move slide down
  const handleMoveDown = async (index: number) => {
    if (index >= slides.length - 1) return;
    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    updated.forEach((s, idx) => {
      s.order = idx + 1;
    });
    await handleSaveAll(updated);
  };

  // Delete slide
  const handleDeleteConfirm = async () => {
    if (confirmDeleteIndex === null) return;
    const updated = slides.filter((_, idx) => idx !== confirmDeleteIndex);
    updated.forEach((s, idx) => {
      s.order = idx + 1;
    });
    setConfirmDeleteIndex(null);
    await handleSaveAll(updated);
  };

  // Reset to Defaults
  const handleResetDefaults = async () => {
    if (window.confirm("Are you sure you want to reset to the default 5 showcase banners?")) {
      await handleSaveAll(DEFAULT_STARTER_SLIDES);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* ------------------------------------------------------------- */}
      {/* Top Header Card                                               */}
      {/* ------------------------------------------------------------- */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0b57d0] border border-blue-100">
                <Images className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  Hero Section Banners
                  <span className="rounded-full bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 text-xs font-semibold text-[#0b57d0]">
                    {slides.length} Banners
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Manage homepage hero carousel banners. Upload images and set display order.
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="http://localhost:3000/#home"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Preview Website
            </Link>

            <button
              onClick={handleResetDefaults}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition cursor-pointer"
              title="Reset to 5 default hero banners"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              Reset Defaults
            </button>

            <button
              onClick={handleOpenAdd}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0b57d0] hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Banner
            </button>
          </div>
        </div>

        {/* Status Banners */}
        {saveSuccess && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200/80 p-3 text-xs font-semibold text-emerald-800 animate-fadeIn">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>Hero banner updated and saved to the live website!</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200/80 p-3 text-xs font-semibold text-rose-800">
            <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Slider Items Grid / List                                      */}
      {/* ------------------------------------------------------------- */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-slate-200/80">
          <RefreshCw className="h-8 w-8 text-[#0b57d0] animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-600">Loading hero banners...</p>
        </div>
      ) : slides.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border border-dashed border-slate-300 text-center">
          <div className="h-14 w-14 rounded-2xl bg-blue-50 text-[#0b57d0] flex items-center justify-center mb-4">
            <ImageIcon className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">No hero banners added yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mb-4">
            Upload banner graphics for the homepage hero carousel.
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b57d0] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
          >
            <Plus className="h-4 w-4" />
            Add First Banner
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {slides.map((slide, index) => {
            const imgSrc = getAdminImageUrl(slide.image);
            const isActive = slide.active !== false;

            return (
              <div
                key={slide._id || index}
                className={`group relative flex flex-col md:flex-row items-center justify-between rounded-2xl bg-white border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md p-4 gap-4 ${
                  isActive ? "border-slate-200/90" : "border-slate-200 opacity-60 bg-slate-50/50"
                }`}
              >
                {/* Wide Banner Image Preview */}
                <div className="relative w-full md:w-80 lg:w-96 aspect-[2.4/1] bg-slate-100 rounded-xl overflow-hidden border border-slate-200/80 shrink-0 flex items-center justify-center">
                  {slide.image ? (
                    <img
                      src={imgSrc}
                      alt={`Banner #${slide.order || index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                      <ImageIcon className="h-8 w-8 text-slate-300 mb-1" />
                      <span className="text-[11px] font-medium">No image</span>
                    </div>
                  )}

                  {/* Order Overlay */}
                  <div className="absolute top-2 left-2">
                    <span className="rounded-md bg-black/75 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Banner Info Details: Order, Link, Status */}
                <div className="flex-1 w-full space-y-2 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                      Display Order: <strong className="text-[#0b57d0]">{slide.order || index + 1}</strong>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold rounded-md px-2 py-0.5 ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {isActive ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {isActive ? "Active / Visible" : "Hidden"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono truncate">
                    <Link2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Click Link: {slide.link || "/#contact"}</span>
                  </div>
                </div>

                {/* Actions (Re-order, Edit, Toggle, Delete) */}
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* Order Up/Down */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || isSaving}
                      title="Move Up"
                      className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === slides.length - 1 || isSaving}
                      title="Move Down"
                      className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Visibility Toggle */}
                  <button
                    onClick={() => handleToggleActive(index)}
                    title={isActive ? "Hide banner" : "Show banner"}
                    className={`p-2 rounded-lg transition cursor-pointer ${
                      isActive
                        ? "text-slate-500 hover:text-amber-600 hover:bg-amber-50"
                        : "text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    {isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenEdit(index)}
                    title="Edit Banner"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0b57d0] bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => setConfirmDeleteIndex(index)}
                    title="Delete Banner"
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Add / Edit Slide Modal (Only Image, Order, Link & Active)       */}
      {/* ------------------------------------------------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/70">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-[#0b57d0]">
                  <Images className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingIndex !== null ? "Edit Hero Banner" : "Add New Hero Banner"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload image and set display order.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              {/* 1. Banner Image Upload */}
              <div className="space-y-1.5">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
                  label="Hero Banner Graphic Image"
                  placeholder="e.g. /hero/banner-custom-application.png or upload file"
                />
                <p className="text-[11px] text-slate-400">
                  Recommended size: 2400x1000px or 1920x800px (~2.4:1 ratio). PNG, JPG, WEBP.
                </p>
              </div>

              {/* 2. Display Order & Target Link */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, order: parseInt(e.target.value) || 1 }))
                    }
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 focus:border-[#0b57d0] focus:ring-2 focus:ring-blue-100 outline-none transition"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Click Link (Optional)</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
                    placeholder="e.g. /#contact"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#0b57d0] focus:ring-2 focus:ring-blue-100 outline-none transition"
                  />
                </div>
              </div>

              {/* 3. Active Status Toggle */}
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Active Status</span>
                  <span className="text-[11px] text-slate-500">
                    When active, this banner is displayed in the homepage hero slider.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0b57d0]"></div>
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-[#0b57d0] hover:bg-blue-700 rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmDeleteIndex !== null}
        onClose={() => setConfirmDeleteIndex(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Hero Banner"
        message="Are you sure you want to remove this banner from the hero slider? This action cannot be undone."
        confirmText="Delete Banner"
        variant="danger"
      />
    </div>
  );
}
