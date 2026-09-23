"use client";

import React from "react";
import {
  FolderGit2,
  CheckSquare,
  Users,
  FileSpreadsheet,
  Home,
  MessageSquare,
  Plus,
  BarChart3,
  MoreHorizontal,
} from "lucide-react";
import ASTLogo from "./ASTLogo";

export default function PhoneMockup() {
  const tiles = [
    { label: "Projects", icon: FolderGit2, bg: "bg-blue-50", text: "text-[#0b57d0]" },
    { label: "Tasks", icon: CheckSquare, bg: "bg-orange-50", text: "text-[#f97316]" },
    { label: "Clients", icon: Users, bg: "bg-emerald-50", text: "text-emerald-600" },
    { label: "Invoices", icon: FileSpreadsheet, bg: "bg-purple-50", text: "text-purple-600" },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[26px] bg-white font-sans select-none text-left">
      {/* Speaker / Camera Notch */}
      <div className="mx-auto mt-2 h-3.5 w-16 rounded-full bg-slate-900/90" />

      {/* Top Header with AST Logo */}
      <div className="flex items-center justify-between px-3 pt-2">
        <ASTLogo height={20} />
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[7.5px] font-bold text-slate-400">9:41</span>
        </div>
      </div>

      {/* Greeting */}
      <div className="px-3 pt-3">
        <h4 className="text-[11px] font-black text-[#0f172a]">
          Hi, Adisofttech 👋
        </h4>
        <p className="text-[8px] text-slate-500">
          Manage your business anywhere
        </p>
      </div>

      {/* 2x2 App Grid */}
      <div className="grid grid-cols-2 gap-2 p-3 flex-1">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.label}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50/70 p-2 shadow-2xs transition hover:bg-white"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg ${t.bg} ${t.text} mb-1 shadow-2xs`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[8.5px] font-bold text-slate-700">
                {t.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Phone Navigation Bar */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-white px-3 py-2 text-[7px] text-slate-400">
        <div className="flex flex-col items-center gap-0.5 text-[#0b57d0] font-bold">
          <Home className="h-3 w-3" />
          <span>Home</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <MessageSquare className="h-3 w-3" />
          <span>Chat</span>
        </div>
        {/* Floating Action Button */}
        <div className="flex h-6 w-6 -translate-y-2 items-center justify-center rounded-full bg-[#0b57d0] text-white shadow-md shadow-blue-500/30">
          <Plus className="h-3.5 w-3.5" />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <BarChart3 className="h-3 w-3" />
          <span>Reports</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <MoreHorizontal className="h-3 w-3" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
