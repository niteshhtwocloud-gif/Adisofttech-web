import type { NextConfig } from "next";

const ADMIN_PORTAL_URL =
  process.env.ADMIN_PORTAL_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://admin-git-main-ht-wo.vercel.app"
    : "http://localhost:3001");

// Next.js configuration for the public website application.
const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: `${ADMIN_PORTAL_URL}/admin`,
      },
      {
        source: "/admin/:path*",
        destination: `${ADMIN_PORTAL_URL}/admin/:path*`,
      },
    ];
  },
};

export default nextConfig;
