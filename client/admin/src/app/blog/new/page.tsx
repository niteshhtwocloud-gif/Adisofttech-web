"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Save,
  Send,
  Sparkles,
} from "lucide-react";
import adminApi from "@/services/api";
import ImageUpload from "@/components/common/ImageUpload";
import RichTextEditor from "@/components/common/RichTextEditor";

const PRESET_CATEGORIES = [
  "Web Development",
  "Mobile Apps",
  "Business Software",
  "Cloud Solutions",
  "Business Automation",
  "Tally & ERP",
  "General",
];

export default function CreateBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [author, setAuthor] = useState("ADISOFTTECH Team");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isSlugCustomized) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (publishNow: boolean) => {
    setFormError("");
    setFormSuccess("");

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      setFormError("Title, excerpt summary, and article body are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        slug: slug.trim() || slugify(title),
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImage,
        category,
        author: author.trim() || "ADISOFTTECH Team",
        published: publishNow,
      };

      await adminApi.createBlog(payload);
      setFormSuccess("Article published and saved to MongoDB Atlas successfully!");

      setTimeout(() => {
        router.push("/blog");
      }, 1200);
    } catch (err: any) {
      console.error("Failed to save article:", err);
      setFormError(err.message || "Failed to persist article in database.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0b57d0]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Publications</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-3.5 w-3.5 text-slate-500" />
            <span>Save Draft</span>
          </button>
          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSubmitting ? "Publishing..." : "Publish to Site"}</span>
          </button>
        </div>
      </div>

      {formError && (
        <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {formSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{formSuccess}</span>
        </div>
      )}

      {/* Editor Form Card */}
      <div className="space-y-6 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Article Title
          </label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="e.g. 5 Signs Your Business Has Outgrown Spreadsheets"
            required
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-base font-bold text-slate-900 placeholder-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            URL Slug
          </label>
          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-xs text-slate-500">
            <span className="text-slate-400">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setIsSlugCustomized(true);
              }}
              placeholder="article-url-slug"
              className="w-full bg-transparent font-medium text-slate-800 outline-none"
            />
          </div>
        </div>

        {/* Category & Author */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#0b57d0] focus:bg-white"
            >
              {PRESET_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="ADISOFTTECH Team"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-[#0b57d0] focus:bg-white"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Short Summary / Excerpt
          </label>
          <textarea
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A compelling 1-2 sentence preview for search engines and article cards..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white"
          />
        </div>

        {/* Cover Image Upload (Presets Removed) */}
        <div>
          <ImageUpload
            value={coverImage}
            onChange={setCoverImage}
            label="Cover Image (Direct File Upload or Custom URL)"
            placeholder="Upload an image from your computer or paste an image URL"
          />
        </div>

        {/* True Visual WYSIWYG Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Article Content (Rich Visual Editor)
            </label>
            <span className="text-[11px] font-semibold text-slate-400">
              Live formatting: Bold, Italic, Headings, Bullets appear instantly!
            </span>
          </div>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Type your article content here. Use Bold, Italic, Headings, Bullets - all formatting appears live visually as you type!"
          />
        </div>
      </div>
    </div>
  );
}
