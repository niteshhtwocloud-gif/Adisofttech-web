"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Mail,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Edit,
  ShieldCheck,
  Briefcase,
  Layers,
  Phone,
  Building2,
  ExternalLink,
} from "lucide-react";
import adminApi from "@/services/api";

// Displays admin dashboard metrics, recent client leads, and publication overviews.
export default function AdminDashboardPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [blogsRes, contactsRes] = await Promise.all([
        adminApi.getBlogs({ limit: 10 }),
        adminApi.getContacts({ limit: 10 }),
      ]);
      setBlogs(blogsRes.blogs || []);
      setContacts(contactsRes.contacts || []);
    } catch (err: any) {
      console.error("Dashboard error:", err);
      setError(err.message || "Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b) => b.published !== false).length;
  const draftBlogs = totalBlogs - publishedBlogs;
  const totalContacts = contacts.length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Clean Dashboard Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Dashboard Overview</h1>
          <p className="text-xs text-slate-500">
            Real-time telemetry, lead tracking, and content metrics from MongoDB Atlas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0b57d0] ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Data</span>
          </button>

          <Link
            href="/blog/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0b57d0] px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Blog</span>
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
          {error}
        </div>
      )}

      {/* Metrics Row (Entire Cards Are Clickable With Pointer Cursor) */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Inquiries Card */}
        <Link
          href="/contacts"
          className="group block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Client Inquiries</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#0b57d0] transition-colors group-hover:bg-[#0b57d0] group-hover:text-white">
              <Mail className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0f172a]">{totalContacts}</span>
            <span className="text-[11px] font-semibold text-emerald-600">Saved in Atlas</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#0b57d0]">
            <span>View all leads</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Total Articles Card */}
        <Link
          href="/blog"
          className="group block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">All Blogs</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0f172a]">{totalBlogs}</span>
            <span className="text-[11px] font-semibold text-slate-500">Articles</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-purple-600">
            <span>Manage publications</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </Link>

        {/* Published Card */}
        <a
          href="http://localhost:3000/blog"
          target="_blank"
          rel="noreferrer"
          className="group block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Published</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0f172a]">{publishedBlogs}</span>
            <span className="text-[11px] font-semibold text-emerald-600">Live on Website</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span>View public feed</span>
            <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>

        {/* Drafts Card */}
        <Link
          href="/blog"
          className="group block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Drafts</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-600 group-hover:text-white">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-[#0f172a]">{draftBlogs}</span>
            <span className="text-[11px] font-semibold text-amber-600">Unpublished</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-amber-600">
            <span>Review drafts</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </Link>
      </div>

      {/* Two Columns: Recent Inquiries & Recent Articles */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Client Inquiries */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-[#0f172a]">Recent Consultation Inquiries</h2>
              <p className="text-[11px] text-slate-500">Submissions verified via Cloudflare Turnstile</p>
            </div>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-[#0b57d0] hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {contacts.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No inquiries received yet. Form submissions will appear here.
              </div>
            ) : (
              contacts.slice(0, 5).map((contact) => (
                <Link
                  key={contact._id}
                  href="/contacts"
                  className="group block py-3.5 px-2 -mx-2 rounded-xl transition-colors hover:bg-slate-50/90 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800 group-hover:text-[#0b57d0] transition-colors">
                          {contact.name}
                        </span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                          {contact.company}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-slate-400" />
                          {contact.phone}
                        </span>
                        {contact.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-slate-400" />
                            {contact.email}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 italic">
                        "{contact.message}"
                      </p>
                    </div>
                    <span className="shrink-0 text-[10px] text-slate-400">
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-sm font-bold text-[#0f172a]">Recent Publications</h2>
              <p className="text-[11px] text-slate-500">Editorial articles and technical insights</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-[#0b57d0] hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {blogs.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No blog posts found. Click "Create Blog" or "Sync Starter Articles" to begin.
              </div>
            ) : (
              blogs.slice(0, 5).map((blog) => (
                <div key={blog._id} className="py-3.5 px-2 -mx-2 rounded-xl flex items-center justify-between gap-3 hover:bg-slate-50/90 transition-colors">
                  <Link href={`/blog/edit/${blog.slug}`} className="min-w-0 flex-1 group cursor-pointer">
                    <span className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-[#0b57d0] transition-colors">
                      {blog.title}
                    </span>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-[#0b57d0]">
                        {blog.category}
                      </span>
                      <span>•</span>
                      <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
                    </div>
                  </Link>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        blog.published !== false
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {blog.published !== false ? "Live" : "Draft"}
                    </span>
                    <Link
                      href={`/blog/edit/${blog.slug}`}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-blue-50 hover:text-[#0b57d0] transition-colors cursor-pointer"
                      title="Edit article"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
