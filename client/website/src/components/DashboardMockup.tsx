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
} from "lucide-react";
import ASTLogo from "./ASTLogo";

export default function DashboardMockup() {
  const sidebarItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: false },
    { label: "Projects", icon: FolderGit2, active: false },
    { label: "Clients", icon: Users, active: false },
    { label: "Tasks", icon: CheckSquare, active: false },
    { label: "Invoices", icon: FileSpreadsheet, active: true },
    { label: "Team", icon: Users2, active: false },
    { label: "Analytics", icon: LineChart, active: false },
    { label: "Settings", icon: Settings, active: false },
  ];

  const statCards = [
    { label: "Total Revenue", value: "₹28.4L", color: "text-emerald-600", border: "border-emerald-100", badge: "+32%" },
    { label: "Pending Dues", value: "₹4.2L", color: "text-[#f97316]", border: "border-orange-100" },
    { label: "Collection Rate", value: "99.2%", color: "text-[#0b57d0]", border: "border-blue-100" },
    { label: "Invoices Cleared", value: "148", color: "text-purple-600", border: "border-purple-100" },
  ];

  const recentActivity = [
    { title: "Enterprise invoice #1042 paid", time: "4 min ago", color: "bg-emerald-100 text-emerald-600" },
    { title: "GST invoice generated & sent", time: "18 min ago", color: "bg-blue-100 text-[#0b57d0]" },
    { title: "Vendor settlement approved", time: "40 min ago", color: "bg-orange-100 text-[#f97316]" },
    { title: "Tally Prime sync successful", time: "1 hour ago", color: "bg-purple-100 text-purple-600" },
  ];

  const barHeights = [35, 45, 52, 60, 58, 72, 80, 88, 95, 90, 84, 98];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="flex h-full w-full flex-col bg-white text-slate-800 font-sans select-none text-left relative">
      {/* ------------------------------------------------------------- */}
      {/* Top Header Bar                                                */}
      {/* ------------------------------------------------------------- */}
      <div className="flex h-11 items-center justify-between border-b border-slate-100 px-3 sm:px-4 bg-white z-10">
        <div className="flex items-center gap-2.5">
          <ASTLogo height={22} />
          {/* Active Badge */}
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200/60 px-2 py-0.5 text-[9px] font-bold text-[#0b57d0]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ERP &amp; Invoicing</span>
          </span>
        </div>

        {/* Search Bar & Indicator Dots */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-[10px] text-slate-400 w-36 lg:w-44">
            <Search className="h-3 w-3 text-slate-400" />
            <span className="truncate">Search admin...</span>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-1 rounded-full bg-slate-100/90 p-1 border border-slate-200/60">
            <span className="h-2 w-4 rounded-full bg-[#0b57d0]" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-2 w-2 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* User Profile & Bell */}
        <div className="flex items-center gap-2">
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
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Dashboard Body: Sidebar + Main Content                        */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div className="w-24 sm:w-28 border-r border-slate-100 p-2 space-y-1 bg-slate-50/50 hidden sm:block shrink-0">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2 py-1 text-[9px] font-semibold transition ${
                  item.active
                    ? "bg-[#0b57d0] text-white shadow-2xs shadow-blue-500/20 translate-x-0.5"
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
        <div className="flex-1 p-2.5 sm:p-3.5 space-y-2.5 overflow-hidden flex flex-col justify-between bg-[#fafbfc]">
          {/* Welcome Greeting */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black tracking-tight text-[#0f172a] sm:text-sm">
                Good Morning, Adisofttech 👋
              </h3>
              <p className="text-[9px] text-slate-400 truncate">
                Automated GST invoices, billing milestones &amp; payment flows
              </p>
            </div>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {statCards.map((c) => (
              <div
                key={c.label}
                className={`rounded-xl border ${c.border} bg-white p-1.5 sm:p-2 text-center shadow-2xs`}
              >
                <div className="flex items-center justify-center gap-1">
                  <p className={`text-xs font-black tracking-tight ${c.color} sm:text-base`}>
                    {c.value}
                  </p>
                  {c.badge && (
                    <span className="hidden md:inline-block rounded bg-emerald-50 text-emerald-600 text-[7px] font-black px-1">
                      {c.badge}
                    </span>
                  )}
                </div>
                <p className="text-[8px] font-semibold text-slate-500 truncate mt-0.5">
                  {c.label}
                </p>
              </div>
            ))}
          </div>

          {/* Charts & Activity Split */}
          <div className="grid grid-cols-12 gap-2 sm:gap-2.5">
            {/* Visual Chart */}
            <div className="col-span-7 rounded-xl border border-slate-100 bg-white p-2 sm:p-2.5 shadow-2xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#0f172a] truncate">
                    Cash Flow Trends
                  </span>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.2 text-[7px] sm:text-[8px] font-bold text-emerald-600 shrink-0">
                    +32% Collections
                  </span>
                </div>
                <span className="text-[7px] sm:text-[8px] font-medium text-slate-400 border border-slate-100 rounded px-1 py-0.5 hidden md:inline">
                  Live ▼
                </span>
              </div>

              {/* Bar visualization */}
              <div className="flex h-16 sm:h-20 items-end gap-1 pt-1">
                {barHeights.map((h, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-0.5">
                    <div
                      style={{ height: `${h}%` }}
                      className={`w-full rounded-t-sm transition-all ${
                        idx >= 6 && idx <= 9
                          ? "bg-gradient-to-t from-emerald-600 to-teal-400 shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200"
                      }`}
                    />
                    <span className="text-[6px] sm:text-[7px] text-slate-400 scale-90">
                      {months[idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed List */}
            <div className="col-span-5 rounded-xl border border-slate-100 bg-white p-2 sm:p-2.5 shadow-2xs flex flex-col justify-between">
              <span className="text-[9px] sm:text-[10px] font-bold text-[#0f172a] block mb-1 truncate">
                Live Invoicing Pipeline
              </span>
              <div className="space-y-1 sm:space-y-1.5">
                {recentActivity.map((act, i) => (
                  <div key={i} className="flex items-center justify-between text-[7px] sm:text-[8px]">
                    <div className="flex items-center gap-1.5 truncate">
                      <span
                        className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                          act.color.split(" ")[1]?.replace("text-", "bg-") || "bg-emerald-500"
                        }`}
                      />
                      <span className="font-semibold text-slate-700 truncate">
                        {act.title}
                      </span>
                    </div>
                    <span className="text-slate-400 flex-shrink-0 ml-1 scale-90">
                      {act.time}
                    </span>
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
