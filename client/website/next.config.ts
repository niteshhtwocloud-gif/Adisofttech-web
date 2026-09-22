import type { NextConfig } from "next";

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
        destination: "http://localhost:3001/admin",
      },
      {
        source: "/admin/:path*",
        destination: "http://localhost:3001/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
