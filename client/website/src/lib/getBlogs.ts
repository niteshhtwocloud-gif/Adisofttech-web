import { api } from "@/services/api";
import { FALLBACK_BLOGS } from "@/lib/fallbackBlogs";
import type { BlogPost } from "@/lib/types";

// ==================== BLOG RETRIEVAL & FALLBACK STRATEGY ====================
// Fetches published posts from Express REST API (/api/v1/blogs), with automatic graceful fallback
// to static curated content if the backend service is offline.

// Fetches all blog articles from backend API with fallback to static content.
export async function getAllBlogs(): Promise<BlogPost[]> {
  try {
    const data = await api.getBlogs();
    if (data && data.blogs && data.blogs.length > 0) {
      return data.blogs.map((doc: any) => ({
        _id: String(doc._id),
        title: doc.title,
        slug: doc.slug,
        excerpt: doc.excerpt,
        content: doc.content,
        coverImage: doc.coverImage || "",
        category: doc.category || "General",
        author: doc.author || "ADISOFTTECH Team",
        published: doc.published !== false,
        createdAt: doc.createdAt || new Date().toISOString(),
        updatedAt: doc.updatedAt || new Date().toISOString(),
      }));
    }
    return FALLBACK_BLOGS;
  } catch (error) {
    console.warn("getAllBlogs: Express API unavailable, using fallback:", error);
    return FALLBACK_BLOGS;
  }
}

// Fetches a single blog article by slug with fallback.
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await api.getBlogBySlug(slug);
    if (post) {
      return {
        _id: String(post._id),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage || "",
        category: post.category || "General",
        author: post.author || "ADISOFTTECH Team",
        published: post.published !== false,
        createdAt: post.createdAt || new Date().toISOString(),
        updatedAt: post.updatedAt || new Date().toISOString(),
      };
    }
  } catch (error) {
    console.warn(`getBlogBySlug(${slug}): Express API unavailable, checking fallback:`, error);
  }
  return FALLBACK_BLOGS.find((p) => p.slug === slug) ?? null;
}
