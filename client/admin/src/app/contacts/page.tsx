"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Search,
  MessageSquare,
  Briefcase,
  RefreshCw,
  ExternalLink,
  X,
} from "lucide-react";
import adminApi from "@/services/api";
import ConfirmModal from "@/components/common/ConfirmModal";

// Displays and manages incoming consultation inquiries and lead statuses.
export default function ContactsLeadsPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Delete modal state
  const [contactToDelete, setContactToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadContacts = async (isBackground = false) => {
    if (!isBackground) {
      setRefreshing(true);
    }
    setError("");
    try {
      const res = await adminApi.getContacts({});
      setContacts(res.contacts || []);
    } catch (err: any) {
      console.error("Failed to fetch inquiries:", err);
      setError(err.message || "Unable to retrieve leads from database.");
    } finally {
      setInitialLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadContacts(false);
  }, []);

  // Instant client-side search filtering without any layout jumps
  const filteredContacts = useMemo(() => {
    if (!search.trim()) return contacts;
    const q = search.toLowerCase().trim();
    return contacts.filter((c) => {
      return (
        c.name?.toLowerCase().includes(q) ||
        c.company?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.toLowerCase().includes(q) ||
        c.service?.toLowerCase().includes(q) ||
        c.message?.toLowerCase().includes(q)
      );
    });
  }, [contacts, search]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleDelete = (id: string, name: string) => {
    setContactToDelete({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!contactToDelete) return;
    setIsDeleting(true);
    try {
      await adminApi.deleteContact(contactToDelete.id);
      setContacts((prev) => prev.filter((c) => c._id !== contactToDelete.id));
      showToast(`Inquiry from "${contactToDelete.name}" removed successfully.`);
      setContactToDelete(null);
    } catch (err: any) {
      showToast(err.message || "Failed to delete inquiry", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Client Inquiries &amp; Leads</h1>
          <p className="text-xs text-slate-500">
            Incoming technical consultations and prospective client requests stored in MongoDB Atlas.
          </p>
        </div>

        <button
          onClick={() => loadContacts(false)}
          disabled={refreshing}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-60"
        >
          <RefreshCw className={`h-3.5 w-3.5 text-[#0b57d0] ${refreshing ? "animate-spin" : ""}`} />
          <span>{refreshing ? "Refreshing..." : "Refresh Leads"}</span>
        </button>
      </div>

      {toast && (
        <div
          className={`flex items-center gap-2 rounded-2xl p-4 text-xs font-semibold animate-in fade-in duration-200 ${
            toast.type === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 animate-in fade-in duration-200">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search Bar (Stable Fixed Height, Smooth Live Filter) */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-xs transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10"
      >
        <Search className="h-4 w-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search leads by client name, company, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none border-none py-1"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="flex items-center gap-1 rounded-lg bg-slate-100 hover:bg-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600 transition-colors cursor-pointer"
          >
            <X className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}

        <div className="flex items-center gap-1.5 rounded-xl bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-500 border border-slate-200/60">
          <span>{filteredContacts.length} Leads</span>
        </div>
      </form>

      {/* Leads List */}
      <div className="space-y-4 min-h-[200px]">
        {initialLoading ? (
          <div className="flex min-h-[260px] items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-12 shadow-xs">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-500">
              <RefreshCw className="h-4 w-4 animate-spin text-[#0b57d0]" />
              <span>Fetching leads from MongoDB Atlas...</span>
            </div>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="rounded-3xl border border-slate-200/80 bg-white p-12 text-center shadow-xs animate-in fade-in duration-200">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0b57d0] mb-3">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-[#0f172a]">
              {search ? "No Matching Inquiries Found" : "No Inquiries Yet"}
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              {search
                ? `No leads matched "${search}". Try searching by a different name, email, or company.`
                : "When prospective clients submit the technical consultation form on your website, submissions will appear here."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#0b57d0] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Reset Search Filter
              </button>
            )}
          </div>
        ) : (
          filteredContacts.map((lead) => (
            <div
              key={lead._id}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-blue-200/90 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-xs font-black text-[#0b57d0] shrink-0">
                    {(lead.name || "CL").slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0f172a]">{lead.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                      <span className="font-semibold text-slate-700">{lead.company}</span>
                      {lead.service && (
                        <>
                          <span>•</span>
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                            {lead.service}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ""}
                  </span>
                  <button
                    onClick={() => handleDelete(lead._id, lead.name)}
                    className="rounded-xl p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Delete inquiry"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                <div>
                  <a
                    href={`tel:${(lead.phone || "").replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-1.5 font-semibold text-[#0b57d0] no-underline hover:no-underline hover:bg-blue-100/80 hover:border-blue-200 transition-all cursor-pointer group shadow-2xs"
                    title={`Click to call ${lead.phone}`}
                  >
                    <Phone className="h-3.5 w-3.5 text-[#0b57d0] group-hover:scale-110 transition-transform shrink-0" />
                    <span className="no-underline">{lead.phone}</span>
                  </a>
                </div>

                <div>
                  {lead.email ? (
                    <a
                      href={`mailto:${lead.email}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-1.5 font-semibold text-slate-700 no-underline hover:no-underline hover:bg-slate-100 hover:text-[#0b57d0] transition-all cursor-pointer group shadow-2xs"
                      title={`Click to email ${lead.email}`}
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#0b57d0] transition-colors shrink-0" />
                      <span className="no-underline">{lead.email}</span>
                    </a>
                  ) : (
                    <span className="text-slate-400 italic">No email provided</span>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {lead.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Inquiry Modal */}
      <ConfirmModal
        isOpen={Boolean(contactToDelete)}
        onClose={() => setContactToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Client Inquiry"
        message={`Are you sure you want to delete the consultation inquiry from "${contactToDelete?.name}"? This cannot be undone.`}
        confirmText="Delete Inquiry"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
