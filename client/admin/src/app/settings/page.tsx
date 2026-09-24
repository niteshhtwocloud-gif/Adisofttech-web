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
  Send,
  HelpCircle,
  Check,
  Info,
  RefreshCw,
  Inbox,
  AtSign,
} from "lucide-react";
import adminApi from "@/services/api";
import ImageUpload from "@/components/common/ImageUpload";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "branding" | "email">("profile");

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
  const [supportEmail, setSupportEmail] = useState("adisofttech22@gmail.com");
  const [phone, setPhone] = useState("+91 98317 18493");
  const [address, setAddress] = useState("West Bengal, India");
  const [brandLoading, setBrandLoading] = useState(false);
  const [brandSuccess, setBrandSuccess] = useState("");
  const [brandError, setBrandError] = useState("");

  // Email & SMTP Configuration State (.env synchronized)
  const [emailTo, setEmailTo] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [emailPass, setEmailPass] = useState("");
  const [hasEmailPass, setHasEmailPass] = useState(false);
  const [showEmailPass, setShowEmailPass] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailError, setEmailError] = useState("");

  // Test Email Verification State
  const [testEmailTarget, setTestEmailTarget] = useState("");
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testSuccess, setTestSuccess] = useState("");
  const [testError, setTestError] = useState("");

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
      .catch(() => { });

    // 2. Load Brand & Email Settings
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

          // Email & SMTP fields
          if (s.emailTo) {
            setEmailTo(s.emailTo);
            setTestEmailTarget(s.emailTo);
          }
          if (s.emailUser) setEmailUser(s.emailUser);
          if (s.emailPass) setEmailPass(s.emailPass);
          if (s.hasEmailPass) setHasEmailPass(s.hasEmailPass);
        }
      })
      .catch(() => { });
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
      setPasswordError("Current password is required.");
      return;
    }
    if (!newPassword) {
      setPasswordError("New password is required.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);
    try {
      await adminApi.changePassword({
        currentPassword,
        newPassword,
      });
      setPasswordSuccess("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 4000);
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
        companyName: companyName.trim(),
        tagline: tagline.trim(),
        logo: logo.trim(),
        supportEmail: supportEmail.trim(),
        phone: phone.trim(),
        address: address.trim(),
      });
      setBrandSuccess("Brand & System Settings saved successfully!");
      setTimeout(() => setBrandSuccess(""), 4000);
    } catch (err: any) {
      setBrandError(err.message || "Failed to save settings.");
    } finally {
      setBrandLoading(false);
    }
  };

  // Handle Email & SMTP Settings Update (Syncs with server/.env)
  const handleUpdateEmailSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setEmailSuccess("");

    if (!emailTo.trim()) {
      setEmailError("Recipient Email address (EMAIL_TO) is required.");
      return;
    }
    if (!emailUser.trim()) {
      setEmailError("Sender Gmail address (EMAIL_USER) is required.");
      return;
    }

    setEmailLoading(true);
    try {
      const payload: any = {
        emailTo: emailTo.trim(),
        emailUser: emailUser.trim(),
      };

      // Only dispatch new password if the user entered an actual new one
      if (emailPass && !emailPass.includes("••••")) {
        payload.emailPass = emailPass.trim().replace(/\s+/g, "");
      }

      const res: any = await adminApi.updateSettings(payload);
      setEmailSuccess("Email & SMTP settings saved and synchronized with server/.env successfully!");
      if (res.settings) {
        if (res.settings.emailPass) setEmailPass(res.settings.emailPass);
        if (res.settings.hasEmailPass) setHasEmailPass(res.settings.hasEmailPass);
      }
      setTimeout(() => setEmailSuccess(""), 5000);
    } catch (err: any) {
      setEmailError(err.message || "Failed to save email settings.");
    } finally {
      setEmailLoading(false);
    }
  };

  // Handle Test Email Verification Dispatch
  const handleSendTestEmail = async () => {
    setTestError("");
    setTestSuccess("");

    const target = testEmailTarget.trim() || emailTo.trim() || emailUser.trim();
    if (!target) {
      setTestError("Please enter a destination email address to receive the test email.");
      return;
    }

    setIsTestingEmail(true);
    try {
      const payload: any = {
        to: target,
        emailUser: emailUser.trim() || undefined,
      };

      if (emailPass && !emailPass.includes("••••")) {
        payload.emailPass = emailPass.trim().replace(/\s+/g, "");
      }

      const res: any = await adminApi.testEmail(payload);
      setTestSuccess(res.message || `Test email dispatched successfully to ${target}!`);
      setTimeout(() => setTestSuccess(""), 6000);
    } catch (err: any) {
      setTestError(err.message || "Failed to send test email. Please check your credentials.");
    } finally {
      setIsTestingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#0f172a]">Settings &amp; Administration</h1>
          <p className="text-xs text-slate-500">
            Manage your admin profile, brand identity, and SMTP email settings with .env synchronization.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${activeTab === "profile"
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
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${activeTab === "branding"
                ? "bg-white text-[#0b57d0] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
              }`}
          >
            <Building className="h-3.5 w-3.5" />
            <span>Brand &amp; Logo</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${activeTab === "email"
                ? "bg-white text-[#0b57d0] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
              }`}
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email &amp; SMTP (.env)</span>
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
                {/* Avatar Uploader */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Profile Avatar
                  </label>
                  <ImageUpload
                    value={avatar}
                    onChange={(url) => setAvatar(url)}
                    folder="ast-admin/avatars"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Upload a square PNG/JPG or avatar icon.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Administrator"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Admin Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@adisofttech.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Used for logging into this admin panel and receiving password recovery OTPs.
                  </p>
                </div>

                {/* Submit Profile */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0b57d0] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {profileLoading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Updating Profile...</span>
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
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50 text-[#ea580c]">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#0f172a]">Security &amp; Password</h2>
                  <p className="text-xs text-slate-500">Update your account authentication credentials</p>
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
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Current Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPass ? "text" : "password"}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 pr-10 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPass(!showCurrentPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    New Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 pr-10 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Confirm New Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 pr-10 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Password */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-black transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {passwordLoading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="h-3.5 w-3.5" />
                        <span>Update Password</span>
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
        <div className="max-w-4xl rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0f172a]">Brand Identity &amp; System Info</h2>
              <p className="text-xs text-slate-500">Configure global website logo, brand name, and public contact coordinates</p>
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

          <form onSubmit={handleUpdateBrand} className="space-y-5">
            {/* Logo Uploader */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Brand Logo
              </label>
              <ImageUpload
                value={logo}
                onChange={(url) => setLogo(url)}
                folder="ast-admin/brand"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Upload your transparent PNG/SVG header logo. Recommended dimensions: 240x60px.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Company Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="AdiSofTech"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tagline / Brand Mission
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Empowering Enterprises with Scalable Software"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                />
              </div>

              {/* Support Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Public Support Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="adisofttech22@gmail.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Public Phone Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98317 18493"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Corporate Head Office Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="West Bengal, India"
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

      {/* ============================== TAB 3: EMAIL & SMTP SETTINGS (.env AUTO-SYNC) ============================== */}
      {activeTab === "email" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Email Configuration Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#0b57d0]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#0f172a]">Email &amp; SMTP Credentials</h2>
                    <p className="text-xs text-slate-500">Configure Contact Form receiver email &amp; Google App Password</p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Syncs to .env</span>
                </div>
              </div>

              {emailSuccess && (
                <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{emailSuccess}</span>
                </div>
              )}

              {emailError && (
                <div className="flex items-center gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 font-medium">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{emailError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateEmailSettings} className="space-y-5">
                {/* Recipient Email (Where contact leads go) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Contact Form Receiver Email (<code className="text-[#0b57d0] font-mono text-[11px]">EMAIL_TO</code>) <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Destination</span>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      placeholder="e.g. niteshgupta919843@gmail.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                    />
                    <Inbox className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Website ke Contact Form se aane wali saari leads aur inquiries is email address par deliver hongi.
                  </p>
                </div>

                {/* Sender Gmail (Dispatch address) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Sender Gmail Address (<code className="text-[#0b57d0] font-mono text-[11px]">EMAIL_USER</code>) <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Dispatcher</span>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={emailUser}
                      onChange={(e) => setEmailUser(e.target.value)}
                      placeholder="e.g. niteshgupta919843@gmail.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                    />
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Is Gmail account ke zariye emails bheje jayenge. Google App Password is account ka hona chahiye.
                  </p>
                </div>

                {/* Google App Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Google App Password (<code className="text-[#0b57d0] font-mono text-[11px]">EMAIL_PASS</code>)
                    </label>
                    {hasEmailPass ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Check className="h-3 w-3" /> Password Active in .env
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Not Configured
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showEmailPass ? "text" : "password"}
                      value={emailPass}
                      onChange={(e) => setEmailPass(e.target.value)}
                      placeholder={hasEmailPass ? "•••••••••••••••• (Leave blank to keep existing)" : "16-digit Google App Password"}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 pr-10 text-xs font-mono text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                    />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowEmailPass(!showEmailPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showEmailPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Google 16-character App Password (e.g. <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-mono">gotlxybokxlalruf</code>). Agar purana password hi rakhna hai to isko khali chhod dein.
                  </p>
                </div>

                {/* Submit Email Settings */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0b57d0] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {emailLoading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Saving &amp; Syncing .env...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5" />
                        <span>Save &amp; Sync to .env</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Verification Test Card & Instructions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Test Email Verification Box */}
            <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a]">Test SMTP Dispatch</h3>
                  <p className="text-xs text-slate-500">Ek test email bhej kar verify karein</p>
                </div>
              </div>

              {testSuccess && (
                <div className="flex items-start gap-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 text-xs text-emerald-800 font-medium">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{testSuccess}</span>
                </div>
              )}

              {testError && (
                <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-800 font-medium">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{testError}</span>
                </div>
              )}

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Send Test Email To:
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={testEmailTarget}
                    onChange={(e) => setTestEmailTarget(e.target.value)}
                    placeholder="Enter email to receive test message"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 pl-9 text-xs text-slate-900 outline-none transition-colors focus:border-[#0b57d0] focus:bg-white"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Default: Receiver Email (<code className="text-slate-600">{emailTo || "Not set"}</code>)
                </p>

                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={isTestingEmail || (!emailUser && !testEmailTarget)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-black transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isTestingEmail ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Dispatching Test Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Send Verification Test Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Step Guide for Google App Password */}
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-[#0b57d0]">
                <HelpCircle className="h-4 w-4 shrink-0" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider">
                  Google App Password Kaise Banayein?
                </h4>
              </div>

              <ol className="space-y-2 text-xs text-slate-600 list-decimal list-inside leading-relaxed">
                <li>
                  Apne Gmail account me <strong>Google Account Settings &rarr; Security</strong> kholein.
                </li>
                <li>
                  <strong>2-Step Verification</strong> ko <strong>ON</strong> karein (agar pehle se ON nahi hai).
                </li>
                <li>
                  Search bar me <strong>&quot;App Passwords&quot;</strong> search karein ya Security page ke neeche scroll karein.
                </li>
                <li>
                  App Name me <strong>&quot;AdiSofTech Portal&quot;</strong> daal kar <strong>Generate</strong> par click karein.
                </li>
                <li>
                  Google dwara mila hua <strong>16-digit code</strong> copy karke yahan <strong>Google App Password</strong> me paste karein aur Save kar dein!
                </li>
              </ol>

              <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-blue-700 font-semibold">
                <span>⚡ .env Auto-Update Active</span>
                <span>Port 5000 Sync</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
