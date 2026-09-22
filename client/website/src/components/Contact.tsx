"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Loader2,
  CheckCircle2,
  Check,
  AlertCircle,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
} from "lucide-react";
import CTA from "./CTA";

// ==================== GLOBAL CLOUDFLARE TURNSTILE TYPE DEFINITION ====================

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          appearance?: "always" | "execute" | "interaction-only";
          execution?: "render" | "execute";
          callback?: (token: string) => void;
          "error-callback"?: (errorCode?: string) => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      execute: (containerOrId?: string | HTMLElement | null) => void;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

// ==================== FORM CONFIGURATION & SERVICE OPTIONS ====================

const SERVICES = [
  "Web Application Development",
  "Mobile Application Development",
  "Custom Business Software",
  "Tally & ERP Customization",
  "AST Business OS",
  "Cloud Solutions & Automation",
  "Other Engineering Needs",
];

type Status = "idle" | "loading" | "success" | "error";

// ==================== CONTACT COMPONENT & SUBMISSION HANDLER ====================

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Cloudflare Turnstile CAPTCHA state
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileError, setTurnstileError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  /**
   * Helper: Resets Turnstile widget state and clears token
   */
  const resetTurnstile = () => {
    setTurnstileToken("");
    setIsVerifying(false);
    if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch (e) {
        console.error("Turnstile reset error:", e);
      }
    }
  };

  /**
   * User taps to trigger real Cloudflare Turnstile verification
   */
  const handleTriggerVerification = () => {
    if (turnstileToken || isVerifying) return;
    setIsVerifying(true);
    setTurnstileError("");

    if (typeof window !== "undefined" && window.turnstile && widgetIdRef.current) {
      try {
        window.turnstile.execute(widgetIdRef.current);
      } catch (err: any) {
        console.error("Turnstile execute error:", err);
        try {
          window.turnstile.reset(widgetIdRef.current);
          window.turnstile.execute(widgetIdRef.current);
        } catch (retryErr) {
          console.error("Turnstile retry error:", retryErr);
          setIsVerifying(false);
          setTurnstileError("Could not complete verification. Please tap again.");
        }
      }
    } else {
      setIsVerifying(false);
      setTurnstileError("Verification service is initializing. Please tap again in a moment.");
    }
  };

  /**
   * Load Cloudflare Turnstile script and initialize on-demand widget
   */
  useEffect(() => {
    // Real Cloudflare Turnstile public site key
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAE_3BuWxEMFxi3Qj";

    const renderWidget = () => {
      if (typeof window !== "undefined" && window.turnstile && turnstileContainerRef.current) {
        if (widgetIdRef.current) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch (e) {}
        }

        try {
          widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: siteKey,
            theme: "light",
            size: "normal",
            appearance: "execute",
            execution: "execute",
            callback: (token: string) => {
              setTurnstileToken(token);
              setIsVerifying(false);
              setTurnstileError("");
            },
            "error-callback": () => {
              setTurnstileToken("");
              setIsVerifying(false);
              setTurnstileError("Security verification failed. Please tap to try again.");
            },
            "expired-callback": () => {
              setTurnstileToken("");
              setIsVerifying(false);
              setTurnstileError("Verification expired. Please tap to verify again.");
              if (widgetIdRef.current && window.turnstile) {
                window.turnstile.reset(widgetIdRef.current);
              }
            },
          });
        } catch (renderErr) {
          console.error("Turnstile render error:", renderErr);
        }
      }
    };

    const scriptId = "cf-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderWidget();
      };
      script.onerror = () => {
        setTurnstileError("Unable to load Cloudflare security verification. Please check your network connection.");
      };
      document.head.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
    } else {
      script.addEventListener("load", renderWidget);
    }

    return () => {
      if (widgetIdRef.current && typeof window !== "undefined" && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {}
      }
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setTurnstileError("");

    // Prevent submission if Cloudflare Turnstile is unverified
    if (!turnstileToken) {
      setTurnstileError("Please check the 'I'm not a robot' verification box above before submitting.");
      return;
    }

    setStatus("loading");

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...formData,
      turnstileToken,
    };

    // Submits consultation request and Turnstile token to Express REST API.
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${apiUrl}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      resetTurnstile();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
      // Reset Turnstile token on failure while keeping all entered form data intact
      resetTurnstile();
    }
  }

  return (
    <section id="contact" className="relative bg-white pt-16 pb-20 sm:pt-20 sm:pb-24">
      <CTA />

      <div id="contact-form" className="mx-auto max-w-7xl px-5 pt-12 pb-6 sm:px-8 scroll-mt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left: Contact Info & Value Commitments */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-[#eff6ff] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0b57d0]">
              <MessageSquare className="h-3.5 w-3.5 text-[#f97316]" />
              <span>Get In Touch</span>
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl leading-tight">
              Let&apos;s Build the Right Technology Solution for You
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              Share your software, mobile, or ERP automation goals with our senior engineering team.
              We provide clear architectural roadmaps, milestone planning, and transparent scopes.
            </p>

            {/* Direct Contact Points */}
            <div className="mt-8 space-y-4">
              <a
                href="mailto:info@adisofttech.com"
                className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition hover:border-blue-300 hover:bg-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0b57d0] transition group-hover:bg-[#0b57d0] group-hover:text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Official Email
                  </div>
                  <div className="text-sm font-bold text-[#0f172a] group-hover:text-[#0b57d0]">
                    info@adisofttech.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="group flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 transition hover:border-blue-300 hover:bg-white"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#f97316] transition group-hover:bg-[#f97316] group-hover:text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Direct Phone Support
                  </div>
                  <div className="text-sm font-bold text-[#0f172a] group-hover:text-[#f97316]">
                    +91 98765 43210
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Headquarters
                  </div>
                  <div className="text-sm font-bold text-[#0f172a]">
                    New Delhi, India (Deploying Globally)
                  </div>
                </div>
              </div>
            </div>

            {/* Response SLA Commitment */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 text-xs font-semibold text-emerald-900">
              <Clock className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Guaranteed Response:</strong> Initial technical scope and feasibility
                assessment provided within 2 hours.
              </span>
            </div>
          </div>

          {/* Right: Modern SaaS Inquiry Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-slate-200/90 bg-white p-7 shadow-xl shadow-blue-600/5 sm:p-10"
            >
              <h3 className="text-xl font-black tracking-tight text-[#0f172a]">
                Request a Free Technical Consultation
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Fill in the details below and an engineering lead will connect with you.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Nitesh Sharma"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Business Email <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nitesh@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Contact Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    placeholder="e.g. Apex Enterprises"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="service" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Service Required <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-xs font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="" disabled>
                      Select technology requirement...
                    </option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Project Scope &amp; Deliverables <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Briefly describe your objectives, timeline, or current operational bottlenecks..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs leading-relaxed text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* Cloudflare Turnstile Interactive Tap-to-Verify */}
              <div className="mt-6 flex flex-col items-start w-full max-w-sm">
                {!turnstileToken ? (
                  <button
                    type="button"
                    onClick={handleTriggerVerification}
                    disabled={isVerifying}
                    className={`w-full flex items-center justify-between gap-3.5 rounded-2xl border-2 p-3 px-4.5 shadow-2xs transition-all text-left group cursor-pointer ${
                      isVerifying
                        ? "border-blue-300 bg-blue-50/40 cursor-wait"
                        : "border-slate-200 bg-white hover:border-[#0b57d0] hover:bg-blue-50/20 active:scale-[0.99]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all shrink-0 ${
                          isVerifying
                            ? "border-blue-500 bg-white"
                            : "border-slate-400 bg-white group-hover:border-blue-600 group-hover:scale-105"
                        }`}
                      >
                        {isVerifying ? (
                          <Loader2 className="h-4 w-4 animate-spin text-[#0b57d0]" />
                        ) : (
                          <div className="h-2.5 w-2.5 rounded-xs bg-transparent group-hover:bg-blue-500/20" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#0b57d0] transition-colors">
                          {isVerifying ? "Verifying with Cloudflare..." : "Tap to verify you are human"}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {isVerifying ? "Confirming security credentials" : "Click here before submitting form"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-80 shrink-0 select-none">
                      <svg className="h-5 w-5 text-[#f38020]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                      </svg>
                      <div className="text-[9px] font-bold text-slate-600 leading-tight">
                        Cloudflare<br /><span className="text-[8px] text-slate-400 font-normal">Turnstile</span>
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="w-full flex items-center justify-between gap-3.5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 p-3 px-4.5 shadow-xs transition-all">
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-2xs shrink-0">
                        <Check className="h-4 w-4 stroke-[3]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-900">
                          Human verification confirmed!
                        </p>
                        <p className="text-[10px] text-emerald-700">
                          Ready to submit technical request
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-90 shrink-0 select-none">
                      <svg className="h-5 w-5 text-[#f38020]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                      </svg>
                      <div className="text-[9px] font-bold text-emerald-800 leading-tight">
                        Cloudflare<br /><span className="text-[8px] text-emerald-600 font-normal">Turnstile</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cloudflare challenge container if extra interactive challenge is requested */}
                <div
                  ref={turnstileContainerRef}
                  id="cf-turnstile-container"
                  className={turnstileToken ? "hidden" : "mt-2"}
                />

                {turnstileError && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                    <span>{turnstileError}</span>
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === "loading" || !turnstileToken}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0b57d0] to-[#1e40af] px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition hover:from-blue-700 hover:to-blue-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none sm:w-auto cursor-pointer"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Submit Technical Request</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="h-4 w-4 text-[#0b57d0]" />
                  <span>Strict NDA &amp; Data Confidentiality Guaranteed</span>
                </div>
              </div>

              {status === "success" && (
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                  <span>Thank you! Your request has been logged. An engineer will reach out shortly.</span>
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
                  <AlertCircle className="h-4 w-4 text-rose-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
