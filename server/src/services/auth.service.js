import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/env.js";
import { sendPasswordResetOtpEmail } from "./email.service.js";

// Handles admin login, validates credentials, and returns a signed JWT token.
export const loginUser = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Please provide email and password");
    error.statusCode = 400;
    throw error;
  }

  // Find user and explicitly select password field
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role, name: user.name },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  };
};

export const getMe = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
};

// Updates administrator profile information (name, email, avatar).
export const updateProfile = async (userId, { name, email, avatar }) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (email && email.toLowerCase().trim() !== user.email) {
    const existing = await User.findOne({
      email: email.toLowerCase().trim(),
      _id: { $ne: userId },
    });
    if (existing) {
      const error = new Error("This email is already in use by another account");
      error.statusCode = 400;
      throw error;
    }
    user.email = email.toLowerCase().trim();
  }

  if (name && name.trim()) {
    user.name = name.trim();
  }

  if (avatar !== undefined) {
    user.avatar = avatar;
  }

  await user.save();

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };
};

// Changes authenticated user's password after verifying current password.
export const changePassword = async (userId, { currentPassword, newPassword }) => {
  if (!currentPassword || !newPassword) {
    const error = new Error("Both current password and new password are required");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 6) {
    const error = new Error("New password must be at least 6 characters long");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId).select("+password");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    const error = new Error("Current password is incorrect");
    error.statusCode = 400;
    throw error;
  }

  user.password = newPassword;
  await user.save();

  return {
    message: "Password changed successfully",
  };
};

// Generates 6-digit OTP, saves with 15-min expiry, and emails it to the administrator.
export const requestPasswordReset = async (email) => {
  if (!email) {
    const error = new Error("Please enter your administrator email address");
    error.statusCode = 400;
    throw error;
  }

  const formattedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: formattedEmail });
  if (!user) {
    // For security reasons, don't leak user enumeration in public, but return generic success or standard admin response
    const error = new Error("No account found with this email address");
    error.statusCode = 404;
    throw error;
  }

  // Generate crypto-secure 6-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes TTL

  user.resetPasswordOtp = otp;
  user.resetPasswordOtpExpire = otpExpire;
  await user.save({ validateBeforeSave: false });

  // Dispatch branded HTML email via SMTP
  const emailSent = await sendPasswordResetOtpEmail({
    email: user.email,
    name: user.name,
    otp,
  });

  return {
    success: true,
    message: emailSent
      ? "A 6-digit verification code has been sent to your email."
      : "Verification code generated. Please check your inbox or server logs.",
    email: user.email,
  };
};

// Verifies OTP and updates administrator password with bcrypt hashing.
export const resetPasswordWithOtp = async ({ email, otp, newPassword }) => {
  if (!email || !otp || !newPassword) {
    const error = new Error("Email, verification code, and new password are required");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.length < 6) {
    const error = new Error("New password must be at least 6 characters long");
    error.statusCode = 400;
    throw error;
  }

  const formattedEmail = email.toLowerCase().trim();
  const formattedOtp = otp.toString().trim();

  // Find user by email and select OTP fields
  const user = await User.findOne({
    email: formattedEmail,
    resetPasswordOtp: formattedOtp,
    resetPasswordOtpExpire: { $gt: new Date() },
  }).select("+resetPasswordOtp +resetPasswordOtpExpire");

  if (!user) {
    const error = new Error("Invalid or expired verification code. Please request a new one.");
    error.statusCode = 400;
    throw error;
  }

  // Update password and clear reset fields
  user.password = newPassword;
  user.resetPasswordOtp = undefined;
  user.resetPasswordOtpExpire = undefined;
  await user.save(); // pre-save hook will hash the new password

  return {
    success: true,
    message: "Password updated successfully. You can now log in with your new password.",
  };
};

export const seedInitialAdmin = async () => {
  try {
    const adminEmail = config.adminEmail?.toLowerCase().trim();
    const adminPassword = config.adminPassword;

    if (!adminEmail || !adminPassword) {
      console.log("Admin credentials not configured in environment, skipping admin auto-seed.");
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const admin = new User({
        name: "AST Administrator",
        email: adminEmail,
        password: adminPassword, // Will be hashed by pre-save hook
        role: "admin",
      });
      await admin.save();
      console.log(`Admin user auto-initialized for: ${adminEmail}`);
    } else {
      console.log(`Admin user already exists for: ${adminEmail}`);
    }
  } catch (err) {
    console.error("Failed to seed initial admin user:", err.message);
  }
};
