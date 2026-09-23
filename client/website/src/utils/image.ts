export function getWebsiteImageUrl(src?: string | null): string {
  if (!src) return "/portfolio/business-management.png";

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  // Uploaded assets served by Express backend (/uploads/...)
  if (src.startsWith("/uploads/") || src.startsWith("uploads/")) {
    const apiBase = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1")
      .replace(/\/api\/v1\/?$/, "")
      .replace(/\/$/, "");
    const cleanPath = src.startsWith("/") ? src : `/${src}`;
    return `${apiBase}${cleanPath}`;
  }

  // Local static asset (e.g. /portfolio/..., /images/...)
  return src.startsWith("/") ? src : `/${src}`;
}
