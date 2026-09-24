"use client";

import React, { useState, useEffect } from "react";
import { Shield, LogOut } from "lucide-react";
import adminApi from "@/services/api";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const u = adminApi.getUser();
    if (u) setUser(u);
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-xl font-extrabold text-[#0f172a]">My Administrator Profile</h1>
        <p className="text-xs text-slate-500">
          Account credentials, authenticated session, and role assignments.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-5 border-b border-slate-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0b57d0] to-blue-800 text-xl font-black text-white shadow-lg shadow-blue-500/20">
            AST
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0f172a]">{user?.name || "AST Administrator"}</h2>
            <p className="text-xs text-slate-500">{user?.email || "adisofttech22@gmail.com"}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#0b57d0]">
              <Shield className="h-3 w-3" />
              <span>Role: {user?.role || "admin"}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="text-slate-400 block font-semibold mb-1">Session Protocol</span>
            <span className="font-bold text-slate-800">JSON Web Token (JWT) Bearer</span>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
            <span className="text-slate-400 block font-semibold mb-1">Token Validity</span>
            <span className="font-bold text-slate-800">7 Days (Configured via server .env)</span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-4">
          <div />

          <button
            onClick={() => adminApi.logout()}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
