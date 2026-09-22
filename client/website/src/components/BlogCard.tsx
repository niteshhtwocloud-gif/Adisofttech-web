"use client";

import Link from "next/link";
import { CalendarDays, User, ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/types";

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function estimateReadTime(content: string = "") {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

// ==================== BLOG CARD COMPONENT ====================

export default function BlogCard({ post }: { post: BlogPost }) {
  const readTime = estimateReadTime(post.content || "");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div>
        {/* Cover Image Thumbnail */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          {post.coverImage ? (
            <img
              src={post.coverImage}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b57d0] to-[#1e40af] text-white">
              <span className="text-xs font-bold">{post.category}</span>
            </div>
          )}
          <div className="absolute left-3 top-3">
            <span className="rounded-lg bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-[#0b57d0] shadow-sm backdrop-blur-md">
              {post.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="mb-2.5 flex items-center gap-2.5 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3 text-slate-400" />
              {formatDate(post.createdAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-400" />
              {readTime}
            </span>
          </div>

          <h3 className="text-base font-bold leading-snug text-[#0f172a] transition-colors group-hover:text-[#0b57d0] line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5 text-xs">
        <span className="flex items-center gap-1.5 font-medium text-slate-500">
          <User className="h-3.5 w-3.5 text-[#0b57d0]" />
          {post.author}
        </span>
        <span className="inline-flex items-center gap-1 font-bold text-[#0b57d0] transition-transform group-hover:translate-x-0.5">
          <span>Read Article</span>
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
