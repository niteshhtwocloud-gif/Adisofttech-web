"use client";

import React, { useState, useEffect } from "react";
import { Users, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";
import adminApi from "@/services/api";

export default function AdminUsersPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const u = adminApi.getUser();
    if (u) setCurrentUser(u);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-xl font-extrabold text-[#0f172a]">Administrator Accounts</h1>
        <p className="text-xs text-slate-500">
          User access control and cryptographic roles configured for your MongoDB Atlas cluster.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-sm font-bold text-[#0f172a]">Active Administrators</h2>
          <p className="text-xs text-slate-500">Authentication backed by bcrypt password hashes and JWT bearer tokens</p>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 font-black text-[#0b57d0]">
                AST
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{currentUser?.name || "AST Administrator"}</span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    Super Admin
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{currentUser?.email || "adisofttech22@gmail.com"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <ShieldCheck className="h-4 w-4" />
              <span>Full CMS Privileges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
