"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Loader2, CheckCircle2, Link as LinkIcon } from "lucide-react";
import adminApi from "@/services/api";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Featured / Cover Image",
  placeholder = "https://example.com/image.jpg",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploadError("");

    // Validate type
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).");
      return;
    }

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Image size must be less than 10MB.");
      return;
    }

    setIsUploading(true);
    try {
      const res = await adminApi.uploadImage(file);
      if (res.url) {
        onChange(res.url);
      } else {
        throw new Error(res.message || "Failed to retrieve uploaded image URL");
      }
    } catch (err: any) {
      console.error("Image upload failed:", err);
      setUploadError(err.message || "Failed to upload image. Please check your backend connection.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0b57d0] hover:underline cursor-pointer"
        >
          <LinkIcon className="h-3 w-3" />
          <span>{showUrlInput ? "Use File Upload" : "Or enter Image URL"}</span>
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-xl border border-slate-200 p-2.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
              title="Clear URL"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          {value ? (
            <div className="relative group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2">
              <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={value}
                  alt="Uploaded Preview"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-md backdrop-blur-xs hover:bg-white transition cursor-pointer"
                  >
                    <UploadCloud className="h-3.5 w-3.5 text-[#0b57d0]" />
                    <span>Change Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange("")}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600/90 px-3 py-1.5 text-xs font-bold text-white shadow-md backdrop-blur-xs hover:bg-rose-700 transition cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-slate-500">
                <span className="truncate max-w-[280px] font-mono text-slate-600">{value}</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold shrink-0">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Ready</span>
                </span>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 transition-all cursor-pointer ${
                isDragOver
                  ? "border-[#0b57d0] bg-blue-50/50 scale-[1.01]"
                  : "border-slate-200 bg-slate-50/60 hover:border-blue-400 hover:bg-blue-50/30"
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-[#0b57d0]" />
                  <p className="mt-3 text-xs font-bold text-slate-700">Uploading image to server...</p>
                  <p className="text-[11px] text-slate-400">Saving securely in server storage</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#0b57d0] shadow-xs mb-3">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-800">
                    <span className="text-[#0b57d0] hover:underline">Click to upload</span> or drag and drop
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    PNG, JPG, WEBP, GIF, or SVG (Max 10MB)
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {uploadError && (
        <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
          <X className="h-3 w-3 shrink-0" />
          <span>{uploadError}</span>
        </p>
      )}
    </div>
  );
}
