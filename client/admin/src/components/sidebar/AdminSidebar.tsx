"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  FileText,
  Mail,
  Layers,
  FolderGit2,
  Users,
  User,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";
import ASTLogo from "../common/ASTLogo";
import ConfirmModal from "../common/ConfirmModal";
import adminApi from "@/services/api";

// CMS navigation sidebar with active route highlighting and logout control.
const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Hero Banners", href: "/hero-slider", icon: Images },
  { name: "All Blogs", href: "/blog", icon: FileText },
  { name: "Client Inquiries", href: "/contacts", icon: Mail },
  { name: "Services", href: "/services", icon: Layers },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
  { name: "Admin Users", href: "/users", icon: Users },
  { name: "My Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    adminApi.logout();
  };

  // Reusable Sidebar Internal Content
  const renderSidebarContent = (isMobile = false) => (
    <>
      {/* Top Brand & Navigation */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200/80 px-5">
          <Link
            href="/dashboard"
            onClick={() => isMobile && onClose?.()}
            className="flex items-center gap-3 group"
          >
            <div className="flex h-10 w-12 items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50 p-1 shadow-2xs transition-transform duration-200 group-hover:scale-105">
              <ASTLogo width={36} height={22} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight text-[#0f172a]">Admin</span>
                <span className="inline-flex rounded bg-blue-50 px-1 py-0.2 text-[9px] font-bold text-[#0b57d0]">
                  CMS
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Enterprise Portal</span>
            </div>
          </Link>

          {/* Close button on mobile */}
          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Modules
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => isMobile && onClose?.()}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${isActive
                    ? "bg-[#0b57d0] text-white shadow-sm shadow-blue-600/20"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div className="border-t border-slate-200/80 p-3 space-y-1 bg-slate-50/50">
        <a
          href={process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200/80"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            <span>View Public Site</span>
          </span>
          <span className="rounded bg-slate-200/80 px-1.5 py-0.5 text-[10px] text-slate-600">Website</span>
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 border border-transparent hover:border-rose-200/60 cursor-pointer"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={confirmLogout}
        title="Sign Out of CMS"
        message="Are you sure you want to sign out of the AST Admin CMS portal? You will need to enter your credentials to access the admin area again."
        confirmText="Yes, Sign Out"
        cancelText="Cancel"
        variant="warning"
      />
    </>
  );

  return (
    <>
      {/* 1. Desktop Persistent Sticky Sidebar */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-64 shrink-0 border-r border-slate-200/90 bg-white flex-col justify-between shadow-xs select-none z-20">
        {renderSidebarContent(false)}
      </aside>

      {/* 2. Mobile Responsive Sliding Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sliding Drawer Body */}
          <aside className="relative z-50 flex h-full w-72 max-w-[85vw] flex-col justify-between bg-white shadow-2xl animate-in slide-in-from-left duration-200 select-none">
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
