"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import adminApi from "@/services/api";
import ConfirmModal from "@/components/common/ConfirmModal";

// Displays and manages all published and draft blog articles in CMS.
export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Delete modal state
  const [blogToDelete, setBlogToDelete] = useState<{ slug: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadBlogs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getBlogs({ search, category });
      setBlogs(res.blogs || []);
    } catch (err: any) {
      console.error("Failed to load blogs:", err);
      setError(err.message || "Failed to load blogs from MongoDB");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [category]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadBlogs();
  };

  const handleTogglePublish = async (blog: any) => {
    try {
      const newStatus = !blog.published;
      await adminApi.updateBlog(blog.slug, { published: newStatus });
      setBlogs((prev) =>
        prev.map((b) => (b.slug === blog.slug ? { ...b, published: newStatus } : b))
      );
      setMessage(`Post "${blog.title}" is now ${newStatus ? "Live" : "Draft"}.`);
      setTimeout(() => setMessage(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update blog status");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleDelete = (slug: string, title: string) => {
    setBlogToDelete({ slug, title });
  };

  const handleConfirmDelete = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      await adminApi.deleteBlog(blogToDelete.slug);
      setBlogs((prev) => prev.filter((b) => b.slug !== blogToDelete.slug));
      setMessage(`Deleted post "${blogToDelete.title}" successfully.`);
      setBlogToDelete(null);
      setTimeout(() => setMessage(""), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to delete blog post");
      setTimeout(() => setError(""), 5000);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setMessage("");
    setError("");
    try {
      const res = await adminApi.seedStarterBlogs();
      setMessage(res.message || "Starter articles synced into MongoDB Atlas!");
      await loadBlogs();
    } catch (err: any) {
      setError(err.message || "Failed to sync starter articles");
    } finally {
      setSeeding(false);
    }
  };

  const categories = ["All", "Business Software", "Web Development", "Mobile Development", "Tally & ERP", "Cloud & Automation"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">All Blog Publications</h1>
          <p className="text-xs text-slate-500">
            Publish, edit, and organize editorial articles connected live to MongoDB Atlas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-50"
          >
            <Sparkles className={`h-3.5 w-3.5 text-amber-500 ${seeding ? "animate-spin" : ""}`} />
            <span>{seeding ? "Syncing..." : "Sync Starter Articles"}</span>
          </button>

          <Link
            href="/blog/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Blog</span>
          </Link>
        </div>
      </div>

      {message && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 animate-in fade-in">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
          {error}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="pointer-events-none absolute inset-y-0 left-3 my-auto h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, excerpt or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#0b57d0] focus:bg-white"
          />
        </form>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#0b57d0]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={loadBlogs}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            title="Reload blogs"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Blog Articles Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5">Article</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Author</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Created</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="inline-flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#0b57d0]" />
                      <span>Fetching publications from MongoDB Atlas...</span>
                    </div>
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <p className="font-semibold">No publications found matching criteria.</p>
                    <p className="mt-1 text-[11px]">Click "Sync Starter Articles" or "Add New Blog" to seed content.</p>
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4 max-w-sm">
                      <div className="font-bold text-slate-900 line-clamp-1">{blog.title}</div>
                      <div className="mt-0.5 text-[11px] text-slate-400 line-clamp-1">{blog.slug}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#0b57d0]">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600 font-medium">{blog.author}</td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleTogglePublish(blog)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold cursor-pointer transition-colors ${
                          blog.published !== false
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${blog.published !== false ? "bg-emerald-500" : "bg-amber-500"}`} />
                        <span>{blog.published !== false ? "Live" : "Draft"}</span>
                      </button>
                    </td>
                    <td className="px-4 py-4 text-slate-500 text-[11px]">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <a
                          href={`http://localhost:3000/blog/${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Preview live on website"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                        <Link
                          href={`/blog/edit/${blog.slug}`}
                          title="Edit article"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-[#0b57d0]"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.slug, blog.title)}
                          title="Delete article"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Post Modal */}
      <ConfirmModal
        isOpen={Boolean(blogToDelete)}
        onClose={() => setBlogToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${blogToDelete?.title}"? This cannot be undone.`}
        confirmText="Delete Post"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
