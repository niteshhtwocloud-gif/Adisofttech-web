/**
 * Resolves static and uploaded asset URLs for the Admin CMS.
 * Because Next.js admin app runs under `basePath: "/admin"`,
 * relative assets like `/portfolio/...` or `/images/...` must be prefixed with `/admin`
 * so the browser requests them under the correct basePath route.
 */
export function getAdminImageUrl(src?: string | null): string {
  if (!src) return "";
  
  // External HTTP/HTTPS or data/blob URLs are used as-is
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

  // Already prefixed with /admin
  if (src.startsWith("/admin/") || src === "/admin") {
    return src;
  }

  // Prepend /admin for local static assets (e.g. /portfolio/..., /images/...)
  return `/admin${src.startsWith("/") ? "" : "/"}${src}`;
}
