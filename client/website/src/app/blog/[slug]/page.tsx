import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, User, ArrowLeft, Clock, Share2, Sparkles } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { getAllBlogs, getBlogBySlug } from "@/lib/getBlogs";
import { enhanceBlogHtml } from "@/utils/media";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(content: string) {
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

// ==================== METADATA GENERATOR ====================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

// ==================== BLOG POST DETAIL COMPONENT ====================

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogs();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const readTime = estimateReadTime(post.content || "");

  // Split content blocks
  const blocks = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="bg-[#fcfdff] min-h-screen">
      {/* Header Container */}
      <div className="border-b border-slate-100 bg-gradient-to-b from-[#f8fafc] to-white py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link
            href="/blog"
            className="group mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-[#0b57d0]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to All Articles
          </Link>

          <div className="mb-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-[#0b57d0]">
              {post.category}
            </span>
            <span className="text-xs text-slate-300">•</span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              {readTime}
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-[#0f172a] sm:text-3xl lg:text-4xl lg:leading-tight">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/60 pt-5 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <User className="h-3.5 w-3.5 text-[#0b57d0]" />
                {post.author}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="mx-auto max-w-3xl px-5 py-6 sm:px-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-sm">
          {post.coverImage ? (
            <img
              src={post.coverImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"}
              alt={post.title}
              className="h-full w-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b57d0] to-[#1e40af] text-white">
              <span className="text-base font-bold">{post.category}</span>
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-4 sm:px-8">
        {/* Key Takeaway Callout */}
        <div className="mb-10 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 sm:p-7">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-600 p-2 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900">
                Quick Summary
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-blue-950/80">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Formatted Content (Supports Rich HTML, Custom Images, and Video Embeds) */}
        <div
          className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg sm:leading-8
            [&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-[#0f172a] [&_h1]:my-5 [&_h1]:tracking-tight
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#0f172a] [&_h2]:my-4 [&_h2]:tracking-tight
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#0f172a] [&_h3]:my-3
            [&_strong]:font-bold [&_strong]:text-slate-900 [&_b]:font-bold [&_b]:text-slate-900
            [&_i]:italic [&_em]:italic
            [&_u]:underline
            [&_p]:my-3.5 [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul_li]:my-1.5
            [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol_li]:my-1.5
            [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:bg-blue-50/50 [&_blockquote]:p-5 [&_blockquote]:rounded-r-2xl [&_blockquote]:italic [&_blockquote]:my-5
            [&_a]:text-[#0b57d0] [&_a]:underline [&_a]:font-semibold
            [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_img]:max-w-full [&_img]:mx-auto [&_img]:h-auto
            [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-2xl [&_iframe]:my-6 [&_iframe]:shadow-md [&_iframe]:border-0
            [&_video]:w-full [&_video]:rounded-2xl [&_video]:my-6 [&_video]:shadow-md
            [&_.ast-video-container]:my-6 [&_.ast-video-container]:rounded-2xl [&_.ast-video-container]:overflow-hidden [&_.ast-video-container]:shadow-md"
          dangerouslySetInnerHTML={{ __html: enhanceBlogHtml(post.content || "") }}
        />
      </article>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-200/70 bg-slate-50/60 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Keep Reading
                </p>
                <h2 className="mt-1 text-2xl font-extrabold text-[#0f172a] sm:text-3xl">
                  Related Insights &amp; Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all articles
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related._id} post={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
