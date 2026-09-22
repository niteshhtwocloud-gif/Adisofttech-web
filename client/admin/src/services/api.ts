// Authenticated API client for Admin CMS with automatic JWT Bearer token injection.
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

class AdminApiClient {
  private getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("ast_admin_token");
  }

  private setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("ast_admin_token", token);
    }
  }

  public setUser(user: any) {
    if (typeof window !== "undefined") {
      localStorage.setItem("ast_admin_user", JSON.stringify(user));
    }
  }

  public getUser(): any | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("ast_admin_user");
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  public logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ast_admin_token");
      localStorage.removeItem("ast_admin_user");
      window.location.href = "/login";
    }
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      // Auto-logout on unauthorized token
      this.logout();
      throw new Error("Session expired. Please log in again.");
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  }

  // ==================== AUTHENTICATION ====================
  async login(email: string, password: string) {
    const data = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.token) {
      this.setToken(data.token);
      this.setUser(data.user);
    }
    return data;
  }

  async getMe() {
    return this.request("/auth/me");
  }

  async forgotPassword(email: string) {
    return this.request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(data: { email: string; otp: string; newPassword: string }) {
    return this.request("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProfile(data: { name?: string; email?: string; avatar?: string }) {
    const res = await this.request("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (res.user) {
      this.setUser(res.user);
    }
    return res;
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.request("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // ==================== FILE UPLOAD ====================
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const token = this.getToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (res.status === 401) {
      this.logout();
      throw new Error("Session expired. Please log in again.");
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message || `Upload failed with status ${res.status}`);
    }

    return data;
  }

  // ==================== BLOG CMS ====================
  async getBlogs(params?: { page?: number; limit?: number; search?: string; category?: string }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);
    if (params?.category && params.category !== "All") query.set("category", params.category);

    const qs = query.toString() ? `?${query.toString()}` : "";
    return this.request(`/blogs${qs}`);
  }

  async getBlogBySlug(slug: string) {
    return this.request(`/blogs/${encodeURIComponent(slug)}`);
  }

  async createBlog(data: any) {
    return this.request("/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateBlog(slug: string, data: any) {
    return this.request(`/blogs/${encodeURIComponent(slug)}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteBlog(slug: string) {
    return this.request(`/blogs/${encodeURIComponent(slug)}`, {
      method: "DELETE",
    });
  }

  async seedStarterBlogs() {
    return this.request("/blogs/seed", {
      method: "POST",
    });
  }

  // ==================== CONTACTS / LEADS ====================
  async getContacts(params?: { page?: number; limit?: number; search?: string; status?: string }) {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);
    if (params?.status) query.set("status", params.status);

    const qs = query.toString() ? `?${query.toString()}` : "";
    return this.request(`/contacts${qs}`);
  }

  async updateContactStatus(id: string, status: string) {
    return this.request(`/contacts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }

  async deleteContact(id: string) {
    return this.request(`/contacts/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== SERVICES CMS ====================
  async getServices() {
    return this.request("/services");
  }

  async createService(data: any) {
    return this.request("/services", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: any) {
    return this.request(`/services/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, {
      method: "DELETE",
    });
  }

  // ==================== PROJECTS CMS ====================
  async getProjects() {
    return this.request("/projects");
  }

  async createProject(data: any) {
    return this.request("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: "DELETE",
    });
  }

  async seedStarterProjects() {
    return this.request("/projects/seed", {
      method: "POST",
    });
  }

  // ==================== SYSTEM & BRAND SETTINGS ====================
  async getSettings() {
    return this.request("/settings");
  }

  async updateSettings(data: any) {
    return this.request("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
}

export const adminApi = new AdminApiClient();
export default adminApi;
