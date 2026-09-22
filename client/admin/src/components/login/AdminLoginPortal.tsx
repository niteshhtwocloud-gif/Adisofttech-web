"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  RefreshCw,
} from "lucide-react";
import ASTLogo from "../common/ASTLogo";
import adminApi from "@/services/api";

type ViewMode = "login" | "forgot-request" | "forgot-verify" | "forgot-success";

export default function AdminLoginPortal() {
  const router = useRouter();

  // Mode state
  const [mode, setMode] = useState<ViewMode>("login");

  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Forgot password form state
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccessMsg, setResetSuccessMsg] = useState("");
  const [isResetSubmitting, setIsResetSubmitting] = useState(false);

  // ==================== LOGIN SUBMIT ====================
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const inputEmail = email.trim().toLowerCase();
    const inputPassword = password.trim();

    if (!inputEmail || !inputPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }

    setIsLoggingIn(true);

    try {
      const data = await adminApi.login(inputEmail, inputPassword);
      if (data && data.token) {
        router.push("/dashboard");
      } else {
        throw new Error(data.message || "Failed to authenticate with server");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setLoginError(err.message || "Invalid credentials. Please verify your email and password.");
      setIsLoggingIn(false);
    }
  };

  // ==================== FORGOT PASSWORD - STEP 1: REQUEST OTP ====================
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetSuccessMsg("");

    const targetEmail = resetEmail.trim().toLowerCase();
    if (!targetEmail) {
      setResetError("Please enter your administrator email address.");
      return;
    }

    setIsResetSubmitting(true);

    try {
      const res = await adminApi.forgotPassword(targetEmail);
      setResetSuccessMsg(res.message || "A 6-digit verification code has been sent to your email.");
      setMode("forgot-verify");
    } catch (err: any) {
      console.error("Forgot password request failed:", err);
      setResetError(err.message || "Unable to send verification code. Please check your email.");
    } finally {
      setIsResetSubmitting(false);
    }
  };

  // ==================== FORGOT PASSWORD - STEP 2: VERIFY OTP & RESET ====================
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");

    const targetEmail = resetEmail.trim().toLowerCase();
    const targetOtp = otp.trim();

    if (!targetOtp || targetOtp.length !== 6) {
      setResetError("Please enter a valid 6-digit verification code.");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setResetError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError("Passwords do not match. Please re-enter.");
      return;
    }

    setIsResetSubmitting(true);

    try {
      const res = await adminApi.resetPassword({
        email: targetEmail,
        otp: targetOtp,
        newPassword,
      });
      setResetSuccessMsg(res.message || "Password updated successfully!");
      setEmail(targetEmail);
      setPassword("");
      setMode("forgot-success");
    } catch (err: any) {
      console.error("Password reset failed:", err);
      setResetError(err.message || "Failed to reset password. Please check your verification code.");
    } finally {
      setIsResetSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-white text-slate-900 font-sans selection:bg-[#0b57d0] selection:text-white">
      {/* ==================== BACKGROUND DECORATIVE ELEMENTS ==================== */}

      {/* Top-Left Organic Curved Ribbon Waves (Vibrant Blue & Orange) */}
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] md:h-[580px] md:w-[580px]">
        <svg
          viewBox="0 0 500 500"
          className="h-full w-full object-contain"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveBlueGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B57D0" />
              <stop offset="50%" stopColor="#155EEF" />
              <stop offset="100%" stopColor="#0A42A5" />
            </linearGradient>
            <linearGradient id="waveOrangeGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* Main Blue Outer Wave */}
          <path
            d="M -50 -50 L 320 -50 C 260 90 230 180 120 230 C 40 270 -20 280 -50 280 Z"
            fill="url(#waveBlueGradTop)"
          />
          {/* Layered Orange Accent Wave */}
          <path
            d="M -50 240 C 20 230 90 210 140 160 C 190 110 220 30 250 -50 L 190 -50 C 160 20 130 90 90 130 C 40 170 -10 190 -50 195 Z"
            fill="url(#waveOrangeGradTop)"
          />
          {/* Secondary Blue Highlight Swirl */}
          <path
            d="M -50 -50 L 260 -50 C 210 50 170 120 90 160 C 30 190 -20 195 -50 200 Z"
            fill="#104CC3"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Bottom-Right Organic Curved Ribbon Waves (Vibrant Blue & Orange) */}
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] md:h-[580px] md:w-[580px]">
        <svg
          viewBox="0 0 500 500"
          className="h-full w-full object-contain"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="waveBlueGradBottom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#155EEF" />
              <stop offset="60%" stopColor="#0B57D0" />
              <stop offset="100%" stopColor="#0A3C94" />
            </linearGradient>
            <linearGradient id="waveOrangeGradBottom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          {/* Inner Orange Accent Wave */}
          <path
            d="M 550 260 C 470 270 410 300 360 350 C 310 400 270 470 250 550 L 320 550 C 340 490 370 430 420 390 C 460 360 510 340 550 330 Z"
            fill="url(#waveOrangeGradBottom)"
          />
          {/* Outer Main Blue Swirl */}
          <path
            d="M 550 550 L 550 310 C 490 325 430 360 380 410 C 330 460 300 515 280 550 Z"
            fill="url(#waveBlueGradBottom)"
          />
          {/* Deep Navy/Blue Base Fill */}
          <path
            d="M 550 550 L 550 370 C 480 390 430 440 370 510 C 350 530 340 540 330 550 Z"
            fill="#093C93"
          />
        </svg>
      </div>

      {/* Left Dot Matrix Accent (4x4 Dots) */}
      <div className="pointer-events-none absolute left-6 sm:left-12 top-[60%] -translate-y-1/2 -z-10 hidden sm:grid grid-cols-4 gap-3.5 opacity-60">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={`dot-left-${i}`} className="h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
        ))}
      </div>

      {/* Right Dot Matrix Accent (4x4 Dots) */}
      <div className="pointer-events-none absolute right-6 sm:right-12 top-[25%] -z-10 hidden sm:grid grid-cols-4 gap-3.5 opacity-60">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={`dot-right-${i}`} className="h-1.5 w-1.5 rounded-full bg-[#94a3b8]" />
        ))}
      </div>

      {/* Subtle soft ambient light glow behind card */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-20 h-[500px] w-[500px] rounded-full bg-blue-50/50 blur-[120px]" />

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        {/* Centered White Floating Card */}
        <div className="relative w-full max-w-[440px] rounded-[32px] sm:rounded-[36px] bg-white p-7 sm:p-10 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.12),0_4px_16px_-2px_rgba(15,23,42,0.04)] border border-slate-100/90 transition-all duration-300">
          {/* ==================== BRAND HEADER ==================== */}
          <div className="flex flex-col items-center text-center">
            {/* AST Logo Icon */}
            <div className="mb-2 flex items-center justify-center">
              <ASTLogo height={58} width={90} />
            </div>

            {/* AdiSofTech Text Brand */}
            <div className="flex items-center justify-center text-[22px] sm:text-[24px] font-black tracking-tight leading-tight">
              <span className="text-[#0B57D0]">Adi</span>
              <span className="text-[#FF7A00]">SofTech</span>
            </div>

            {/* ADMIN PANEL Subtitle with tracking */}
            <div className="mt-1 text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-slate-600 uppercase">
              ADMIN PANEL
            </div>

            {/* Small Dual-Color Divider Line (Orange on left, Blue on right) */}
            <div className="mt-2.5 h-[2.5px] w-14 rounded-full bg-gradient-to-r from-[#FF7A00] via-[#FF7A00] 50% to-[#0B57D0]" />

            {/* Dynamic View Header */}
            {mode === "login" && (
              <>
                <h1 className="mt-6 text-[22px] sm:text-[26px] font-extrabold text-[#0f172a] tracking-tight">
                  Welcome Back
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                  Login to access your admin panel
                </p>
              </>
            )}

            {mode === "forgot-request" && (
              <>
                <h1 className="mt-6 text-[22px] sm:text-[24px] font-extrabold text-[#0f172a] tracking-tight">
                  Reset Password
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                  Enter your admin email to receive a verification code
                </p>
              </>
            )}

            {mode === "forgot-verify" && (
              <>
                <h1 className="mt-6 text-[22px] sm:text-[24px] font-extrabold text-[#0f172a] tracking-tight">
                  Verify & Set Password
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                  Enter the 6-digit code sent to <strong className="text-slate-700">{resetEmail}</strong>
                </p>
              </>
            )}

            {mode === "forgot-success" && (
              <>
                <div className="mt-6 mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h1 className="text-[22px] sm:text-[24px] font-extrabold text-[#0f172a] tracking-tight">
                  Password Updated!
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                  Your administrator password has been reset successfully.
                </p>
              </>
            )}
          </div>

          {/* ==================== VIEW: LOGIN FORM ==================== */}
          {mode === "login" && (
            <div className="mt-6">
              {loginError && (
                <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/90 p-3 text-xs font-semibold text-rose-700 animate-in fade-in duration-200">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email Address Input */}
                <div className="relative rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-[#0B57D0] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (loginError) setLoginError("");
                    }}
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl sm:rounded-2xl bg-transparent py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                  />
                </div>

                {/* Password Input */}
                <div className="relative rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-[#0B57D0] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (loginError) setLoginError("");
                    }}
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl sm:rounded-2xl bg-transparent py-3.5 pl-11 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Remember Me & Forgot Password Row */}
                <div className="flex items-center justify-between pt-0.5 text-xs sm:text-[13px]">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 hover:text-slate-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#0B57D0] focus:ring-blue-500 cursor-pointer accent-[#0B57D0]"
                    />
                    <span className="font-normal">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setResetEmail(email || "nitesh.htwocloud@gmail.com");
                      setResetError("");
                      setResetSuccessMsg("");
                      setMode("forgot-request");
                    }}
                    className="font-medium text-[#0B57D0] hover:text-[#084298] hover:underline transition-all cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button with Blue-to-Orange Gradient */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0B57D0] via-[#1E40AF] to-[#E65100] py-3.5 px-6 text-sm sm:text-base font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:opacity-95 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 cursor-pointer"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-xs font-normal text-slate-400">
                  OR
                </span>
              </div>

              {/* Bottom Card Footer */}
              <p className="text-center text-xs text-slate-500">
                Not an admin?{" "}
                <a
                  href="mailto:contact@adisofttech.com"
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                >
                  Contact your system administrator.
                </a>
              </p>
            </div>
          )}

          {/* ==================== VIEW: FORGOT PASSWORD - STEP 1 (REQUEST OTP) ==================== */}
          {mode === "forgot-request" && (
            <div className="mt-6">
              {resetError && (
                <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/90 p-3 text-xs font-semibold text-rose-700 animate-in fade-in duration-200">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{resetError}</span>
                </div>
              )}

              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div className="relative rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-[#0B57D0] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      if (resetError) setResetError("");
                    }}
                    placeholder="Administrator email address"
                    autoFocus
                    required
                    className="w-full rounded-xl sm:rounded-2xl bg-transparent py-3.5 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isResetSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0B57D0] via-[#1E40AF] to-[#E65100] py-3.5 px-6 text-sm sm:text-base font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:opacity-95 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 cursor-pointer"
                >
                  {isResetSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setResetError("");
                      setMode("login");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B57D0] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== VIEW: FORGOT PASSWORD - STEP 2 (VERIFY OTP & RESET) ==================== */}
          {mode === "forgot-verify" && (
            <div className="mt-6">
              {resetSuccessMsg && (
                <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/90 p-3 text-xs font-semibold text-emerald-700 animate-in fade-in duration-200">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{resetSuccessMsg}</span>
                </div>
              )}

              {resetError && (
                <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50/90 p-3 text-xs font-semibold text-rose-700 animate-in fade-in duration-200">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{resetError}</span>
                </div>
              )}

              <form onSubmit={handleResetSubmit} className="space-y-3.5">
                {/* 6-Digit OTP */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    6-Digit Verification Code
                  </label>
                  <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-[#0B57D0] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                      <KeyRound className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.replace(/\D/g, ""));
                        if (resetError) setResetError("");
                      }}
                      placeholder="123456"
                      autoFocus
                      required
                      className="w-full rounded-xl bg-transparent py-3 pl-11 pr-4 text-base font-bold tracking-[0.3em] text-slate-800 placeholder:text-slate-300 placeholder:tracking-normal outline-none text-center"
                    />
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    New Password
                  </label>
                  <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-[#0B57D0] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (resetError) setResetError("");
                      }}
                      placeholder="At least 6 characters"
                      required
                      className="w-full rounded-xl bg-transparent py-3 pl-11 pr-11 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative rounded-xl border border-slate-200 bg-slate-50/50 transition-all duration-200 focus-within:border-[#0B57D0] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (resetError) setResetError("");
                      }}
                      placeholder="Re-enter new password"
                      required
                      className="w-full rounded-xl bg-transparent py-3 pl-11 pr-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isResetSubmitting}
                  className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0B57D0] via-[#1E40AF] to-[#E65100] py-3.5 px-6 text-sm sm:text-base font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:opacity-95 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 cursor-pointer"
                >
                  {isResetSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <>
                      <span>Reset & Update Password</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={isResetSubmitting}
                    className="inline-flex items-center gap-1 font-semibold text-[#0B57D0] hover:underline cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Resend Code
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setResetError("");
                      setMode("login");
                    }}
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ==================== VIEW: FORGOT PASSWORD - STEP 3 (SUCCESS) ==================== */}
          {mode === "forgot-success" && (
            <div className="mt-6 space-y-4 text-center">
              <p className="text-xs sm:text-sm text-slate-600">
                You can now log in to the admin portal with your newly created password.
              </p>

              <button
                type="button"
                onClick={() => {
                  setLoginError("");
                  setMode("login");
                }}
                className="group flex w-full items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0B57D0] via-[#1E40AF] to-[#E65100] py-3.5 px-6 text-sm sm:text-base font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:opacity-95 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Proceed to Login</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ==================== BOTTOM SCREEN FOOTER ==================== */}
      <footer className="pb-6 text-center text-xs font-normal tracking-wider text-slate-400">
        <span>Innovate</span>
        <span className="mx-2.5 text-slate-300">|</span>
        <span>Build</span>
        <span className="mx-2.5 text-slate-300">|</span>
        <span>Grow Together</span>
      </footer>
    </div>
  );
}
