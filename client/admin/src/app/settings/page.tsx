"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Shield,
  KeyRound,
  Eye,
  EyeOff,
  Building,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Sparkles,
  Save,
  Layers,
} from "lucide-react";
import adminApi from "@/services/api";
import ImageUpload from "@/components/common/ImageUpload";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "branding">("profile");

  // Profile State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Branding & Company Info State
  const [companyName, setCompanyName] = useState("AdiSofTech");
  const [tagline, setTagline] = useState("Empowering Enterprises with Scalable Software & Cloud Solutions");
  const [logo, setLogo] = useState("/images/ast-logo.png");
  const [supportEmail, setSupportEmail] = useState("contact@adisofttech.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("Plot No. 42, Cyber City, Gurugram, Haryana, India");
  const [brandLoading, setBrandLoading] = useState(false);
  const [brandSuccess, setBrandSuccess] = useState("");
  const [brandError, setBrandError] = useState("");

  // Load User & Settings on Mount
  useEffect(() => {
    // 1. Load Admin User
    const u = adminApi.getUser();
    if (u) {
      setCurrentUser(u);
      setName(u.name || "");
      setEmail(u.email || "");
      setAvatar(u.avatar || "");
    }

    // Refresh user from server
    adminApi
      .getMe()
      .then((res: any) => {
        if (res.user) {
          setCurrentUser(res.user);
          setName(res.user.name || "");
          setEmail(res.user.email || "");
          setAvatar(res.user.avatar || "");
          adminApi.setUser(res.user);
        }
      })
      .catch(() => {});

    // 2. Load Brand Settings
    adminApi
      .getSettings()
      .then((res: any) => {
        if (res.settings) {
          const s = res.settings;
          if (s.companyName) setCompanyName(s.companyName);
          if (s.tagline) setTagline(s.tagline);
          if (s.logo) setLogo(s.logo);
          if (s.supportEmail) setSupportEmail(s.supportEmail);
          if (s.phone) setPhone(s.phone);
          if (s.address) setAddress(s.address);
        }
      })
      .catch(() => {});
  }, []);

  // Handle Profile Update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");

    if (!name.trim()) {
      setProfileError("Full Name is required.");
      return;
    }
    if (!email.trim()) {
      setProfileError("Email address is required.");
      return;
    }

    setProfileLoading(true);
    try {
      const res = await adminApi.updateProfile({
        name: name.trim(),
        email: email.trim(),
        avatar: avatar.trim(),
      });
      setProfileSuccess("Administrator profile updated successfully!");
      if (res.user) {
        setCurrentUser(res.user);
        window.dispatchEvent(new Event("admin_user_updated"));
      }
      setTimeout(() => setProfileSuccess(""), 4000);
    } catch (err: any) {
      setProfileError(err.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle Password Change
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      await adminApi.changePassword({
        currentPassword,
        newPassword,
      });
      setPasswordSuccess("Your password has been changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 5000);
    } catch (err: any) {
      setPasswordError(err.message || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle Brand Settings Update
  const handleUpdateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    setBrandError("");
    setBrandSuccess("");

    setBrandLoading(true);
    try {
      await adminApi.updateSettings({
        companyName,
        tagline,
        logo,
        supportEmail,
        phone,
        address,
      });
      setBrandSuccess("Brand & System Settings saved successfully!");
      setTimeout(() => setBrandSuccess(""), 4000);
    } catch (err: any) {
      setBrandError(err.message || "Failed to save settings.");
    } finally {
      setBrandLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Settings &amp; Administration</h1>
          <p className="text-xs text-slate-500">
            Manage your admin profile, update your security password, and configure brand assets.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "profile"
                ? "bg-white text-[#0b57d0] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>Profile &amp; Security</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("branding")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "branding"
                ? "bg-white text-[#0b57d0] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building className="h-3.5 w-3.5" />
            <span>Brand &amp; Logo Settings</span>
          </button>
        </div>
      </div>

      {/* ============================== TAB 1: PROFILE & SECURITY ============================== */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Admin Profile Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#0b57d0]">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0f172a]">Administrator Profile</h2>
                  <p className="text-xs text-slate-500">Update your display name, email, and admin avatar</p>
                </div>
              </div>

              {profileSuccess && (
                <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{profileSuccess}</span>
                </div>
              )}

              {profileError && (
                <div className="flex items-center gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 font-medium">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{profileError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                {/* Avatar Upload */}
                <ImageUpload
                  value={avatar}
                  onChange={(url) => setAvatar(url)}
                  label="Profile Avatar / Photo"
                  placeholder="https://example.com/avatar.jpg"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. AST Administrator"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@adisofttech.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Role Badge */}
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-[#0b57d0]" />
                    <span className="text-xs font-semibold text-slate-700">Account Access Role</span>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#0b57d0]">
                    {currentUser?.role?.toUpperCase() || "SUPER ADMIN"}
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0b57d0] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {profileLoading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Saving Profile...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        <span>Save Profile Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Password Change Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0f172a]">Change Security Password</h2>
                  <p className="text-xs text-slate-500">Update your account login password</p>
                </div>
              </div>

              {passwordSuccess && (
                <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              {passwordError && (
                <div className="flex items-center gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 font-medium">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                {/* Current Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pr-10 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700">New Password</label>
                    <span className="text-[11px] text-slate-400">Min 6 characters</span>
                  </div>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pr-10 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pr-10 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {passwordLoading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" />
                        <span>Update Security Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ============================== TAB 2: BRAND & LOGO SETTINGS ============================== */}
      {activeTab === "branding" && (
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0f172a]">Company &amp; Brand Identity</h2>
              <p className="text-xs text-slate-500">
                Upload your official brand logo and manage public contact credentials
              </p>
            </div>
          </div>

          {brandSuccess && (
            <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 font-medium">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>{brandSuccess}</span>
            </div>
          )}

          {brandError && (
            <div className="flex items-center gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 font-medium">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{brandError}</span>
            </div>
          )}

          <form onSubmit={handleUpdateBrand} className="space-y-6">
            {/* Logo Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-8">
                <ImageUpload
                  value={logo}
                  onChange={(url) => setLogo(url)}
                  label="Official Company Logo (PNG / SVG / WEBP recommended)"
                  placeholder="/images/ast-logo.png"
                />
              </div>

              {/* Logo Live Preview */}
              <div className="md:col-span-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-3">
                <span className="text-xs font-bold text-slate-700 block">Current Logo Preview</span>
                <div className="flex h-28 w-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white p-3">
                  {logo ? (
                    <img
                      src={logo}
                      alt="Brand Logo Preview"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as any).src = "/images/ast-logo.png";
                      }}
                    />
                  ) : (
                    <span className="text-xs text-slate-400">No logo uploaded</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setLogo("/images/ast-logo.png")}
                  className="text-[11px] font-semibold text-[#0b57d0] hover:underline"
                >
                  Reset to Default AST Logo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Company / Organization Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="AdiSofTech"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                />
              </div>

              {/* Support Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Official Support Email</label>
                <div className="relative">
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="contact@adisofttech.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Tagline */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Brand Tagline / Headline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Empowering Enterprises with Scalable Software & Cloud Solutions"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Contact Phone Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Office Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Registered Office Address</label>
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Cyber City, Gurugram, India"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                  />
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={brandLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0b57d0] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {brandLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Saving Brand Settings...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Brand &amp; System Settings</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
