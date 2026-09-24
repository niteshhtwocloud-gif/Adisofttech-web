// Centralized REST client for the public website to communicate with the Express backend.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface ContactSubmissionPayload {
  name: string;
  email?: string;
  phone: string;
  company: string;
  service?: string;
  message: string;
  turnstileToken: string;
}

export const api = {
  // Fetch published blogs
  async getBlogs(params?: { category?: string; search?: string; page?: number; limit?: number }) {
    try {
      const url = new URL(`${API_BASE_URL}/blogs`);
      url.searchParams.set("published", "true");
      if (params?.category && params.category !== "All") url.searchParams.set("category", params.category);
      if (params?.search) url.searchParams.set("search", params.search);
      if (params?.page) url.searchParams.set("page", String(params.page));
      if (params?.limit) url.searchParams.set("limit", String(params.limit));

      const res = await fetch(url.toString(), { next: { revalidate: 60 } });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("api.getBlogs error:", error);
      return { success: false, blogs: [], total: 0 };
    }
  },

  // Fetch single blog post by slug
  async getBlogBySlug(slug: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${encodeURIComponent(slug)}`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.blog || null;
    } catch (error) {
      console.error(`api.getBlogBySlug(${slug}) error:`, error);
      return null;
    }
  },

  // Submit contact consultation form
  async submitContact(payload: ContactSubmissionPayload) {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Failed to submit request. Please try again.");
    }
    return data;
  },

  // Fetch active services
  async getServices() {
    try {
      const res = await fetch(`${API_BASE_URL}/services?activeOnly=true`, {
        next: { revalidate: 120 },
      });
      if (!res.ok) throw new Error("Failed to fetch services");
      return await res.json();
    } catch (error) {
      console.error("api.getServices error:", error);
      return { success: false, services: [] };
    }
  },

  // Fetch portfolio projects
  async getProjects() {
    try {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        next: { revalidate: 120 },
      });
      if (!res.ok) throw new Error("Failed to fetch projects");
      return await res.json();
    } catch (error) {
      console.error("api.getProjects error:", error);
      return { success: false, projects: [] };
    }
  },

  // Fetch site settings including heroSlides
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/settings`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch settings");
      return await res.json();
    } catch (error) {
      console.error("api.getSettings error:", error);
      return { success: false, settings: null };
    }
  },
};

export default api;
