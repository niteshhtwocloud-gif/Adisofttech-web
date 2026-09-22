"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, Shield, User, Menu } from "lucide-react";
import adminApi from "@/services/api";

interface AdminNavbarProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  onMenuClick?: () => void;
}

// Top header bar displaying section titles, mobile sidebar toggle, and administrator profile info.
export default function AdminNavbar({
  title = "Dashboard",
  subtitle = "Executive Overview",
  actions,
  onMenuClick,
}: AdminNavbarProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = () => {
      const u = adminApi.getUser();
      if (u) setUser(u);
    };
    loadUser();
    window.addEventListener("admin_user_updated", loadUser);
    return () => window.removeEventListener("admin_user_updated", loadUser);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Mobile Menu Toggle + Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs hover:bg-slate-50 lg:hidden cursor-pointer shrink-0"
          aria-label="Open sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-sm sm:text-base font-extrabold text-[#0f172a] truncate">
            {title}
          </h1>
          <p className="text-[11px] text-slate-500 hidden sm:block truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions + Profile Pill */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {actions}

        {/* Admin Profile Pill */}
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 py-1 pl-2 pr-2.5 sm:pr-3 transition-colors hover:bg-slate-100 cursor-pointer"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0b57d0] text-white shrink-0">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user?.name || "Admin"}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-3.5 w-3.5" />
            )}
          </div>
          <span className="text-xs font-bold text-slate-700 max-w-[100px] sm:max-w-[140px] truncate">
            {user?.name || "Admin"}
          </span>
        </Link>
      </div>
    </header>
  );
}
