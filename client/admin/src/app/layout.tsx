"use client";

import "./globals.css";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import AdminNavbar from "@/components/navbar/AdminNavbar";
import adminApi from "@/services/api";

// Admin portal layout providing authentication gating, navigation bar, and responsive sidebar shell.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isAuth = adminApi.isAuthenticated();
    setAuthenticated(isAuth);
    setLoading(false);

    if (!isAuth && pathname !== "/login") {
      router.replace("/login");
    }
  }, [pathname, router]);

  // Close mobile sidebar automatically whenever the route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // If on login page, render bare without sidebar/navbar
  if (pathname === "/login") {
    return (
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/admin/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/admin/favicon.png" />
          <link rel="icon" type="image/png" href="/admin/icon.png" />
          <link rel="apple-touch-icon" href="/admin/apple-icon.png" />
          <title>Admin Portal | AST Enterprise CMS</title>
        </head>
        <body className="min-h-screen bg-slate-50 font-sans antialiased">{children}</body>
      </html>
    );
  }

  if (loading) {
    return (
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/admin/favicon.ico" sizes="any" />
          <link rel="icon" type="image/png" sizes="32x32" href="/admin/favicon.png" />
          <link rel="icon" type="image/png" href="/admin/icon.png" />
          <link rel="apple-touch-icon" href="/admin/apple-icon.png" />
          <title>Admin Portal | AST Enterprise CMS</title>
        </head>
        <body className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0b57d0] border-t-transparent" />
            <p className="text-xs font-semibold text-slate-500">Loading CMS Security Context...</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/admin/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/admin/favicon.png" />
        <link rel="icon" type="image/png" href="/admin/icon.png" />
        <link rel="apple-touch-icon" href="/admin/apple-icon.png" />
        <title>Admin Dashboard | AST Enterprise CMS</title>
      </head>
      <body className="min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900 flex">
        {/* Responsive Sticky/Drawer Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen w-full">
          <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
