"use client";

import React from "react";
import {
  Search,
  Bell,
  LayoutDashboard,
  FolderGit2,
  Users,
  CheckSquare,
  FileSpreadsheet,
  Users2,
  LineChart,
  Settings,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import ASTLogo from "./ASTLogo";

export default function DashboardMockup() {
  const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Projects", icon: FolderGit2, active: false },
    { label: "Clients", icon: Users, active: false },
    { label: "Tasks", icon: CheckSquare, active: false },
    { label: "Invoices", icon: FileSpreadsheet, active: false },
    { label: "Team", icon: Users2, active: false },
    { label: "Analytics", icon: LineChart, active: false },
    { label: "Settings", icon: Settings, active: false },
  ];

  const statCards = [
    { label: "Active Projects", value: "12", color: "text-[#0b57d0]", border: "border-blue-100" },
    { label: "In Progress", value: "8", color: "text-[#f97316]", border: "border-orange-100" },
    { label: "Overdue", value: "4", color: "text-rose-500", border: "border-rose-100" },
    { label: "Completed", value: "28", color: "text-emerald-600", border: "border-emerald-100" },
  ];

  const recentActivity = [
    { title: "New project assigned", time: "2 min ago", color: "bg-blue-100 text-[#0b57d0]" },
    { title: "Client request approved", time: "15 min ago", color: "bg-emerald-100 text-emerald-600" },
    { title: "Meeting scheduled", time: "1 hour ago", color: "bg-orange-100 text-[#f97316]" },
    { title: "New message from client", time: "2 hours ago", color: "bg-purple-100 text-purple-600" },
  ];

  // 12 Monthly bars (Jan - Dec)
  const barHeights = [28, 38, 48, 42, 55, 68, 85, 76, 92, 88, 70, 62];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="flex h-full w-full flex-col bg-white text-slate-800 font-sans select-none text-left">
      {/* ------------------------------------------------------------- */}
      {/* Top Header Bar                                                */}
      {/* ------------------------------------------------------------- */}
      <div className="flex h-11 items-center justify-between border-b border-slate-100 px-4">
        <div className="flex items-center gap-3">
          <ASTLogo height={24} />
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1 text-[10px] text-slate-400 w-44 sm:w-56">
          <Search className="h-3 w-3 text-slate-400" />
          <span>Search anything...</span>
        </div>

        {/* User Profile & Bell */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Bell className="h-3.5 w-3.5 text-slate-500" />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-[#f97316]" />
          </div>
          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[#0b57d0] to-blue-400 text-[10px] font-bold text-white shadow-2xs">
              A
            </div>
            <span className="text-[10px] font-semibold text-slate-700 hidden sm:inline">Adisofttech</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Dashboard Body: Sidebar + Main Content                        */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-28 border-r border-slate-100 p-2 space-y-1 bg-slate-50/40 hidden sm:block">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2 py-1 text-[9px] font-semibold transition ${
                  item.active
                    ? "bg-[#0b57d0] text-white shadow-2xs shadow-blue-500/20"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Workspace Canvas */}
        <div className="flex-1 p-3.5 space-y-3 overflow-hidden bg-[#fafbfc]">
          {/* Welcome Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black tracking-tight text-[#0f172a] sm:text-sm">
                Good Morning, Adisofttech 👋
              </h3>
              <p className="text-[9px] text-slate-400">
                Let&apos;s make today productive!
              </p>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-4 gap-2">
            {statCards.map((c) => (
              <div
                key={c.label}
                className={`rounded-xl border ${c.border} bg-white p-2 text-center shadow-2xs`}
              >
                <p className={`text-sm font-black tracking-tight ${c.color} sm:text-base`}>
                  {c.value}
                </p>
                <p className="text-[8px] font-semibold text-slate-500 truncate mt-0.5">
                  {c.label}
                </p>
              </div>
            ))}
          </div>

          {/* Charts & Activity Split */}
          <div className="grid grid-cols-12 gap-2.5">
            {/* Project Growth Chart */}
            <div className="col-span-7 rounded-xl border border-slate-100 bg-white p-2.5 shadow-2xs">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-[#0f172a]">Project Growth</span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-blue-50 px-1.5 py-0.2 text-[8px] font-bold text-[#0b57d0]">
                    +40%
                  </span>
                </div>
                <span className="text-[8px] font-medium text-slate-400 border border-slate-100 rounded px-1.5 py-0.5">
                  This Year ▼
                </span>
              </div>

              {/* Bar visualization */}
              <div className="flex h-20 items-end gap-1 pt-2">
                {barHeights.map((h, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t-sm transition-all ${
                        idx >= 6 && idx <= 9
                          ? "bg-gradient-to-t from-[#0b57d0] to-blue-400 shadow-xs"
                          : "bg-blue-100"
                      }`}
                    />
                    <span className="text-[7px] text-slate-400 scale-90">
                      {months[idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity List */}
            <div className="col-span-5 rounded-xl border border-slate-100 bg-white p-2.5 shadow-2xs">
              <span className="text-[10px] font-bold text-[#0f172a] block mb-1.5">
                Recent Activity
              </span>
              <div className="space-y-1.5">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center justify-between text-[8px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${act.color.split(" ")[1].replace("text-", "bg-")}`} />
                      <span className="font-semibold text-slate-700 truncate">{act.title}</span>
                    </div>
                    <span className="text-slate-400 flex-shrink-0 ml-1">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
