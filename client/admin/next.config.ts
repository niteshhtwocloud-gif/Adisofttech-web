import type { NextConfig } from "next";

// Next.js configuration for the admin CMS dashboard.
const nextConfig: NextConfig = {
  basePath: "/admin",
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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/admin/login",
        permanent: false,
        basePath: false,
      },
      {
        source: "/login",
        destination: "/admin/login",
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
