// Defines authentication routing for login and user profile retrieval.
import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

// Authenticates admin credentials with brute-force rate-limiting.
router.post("/login", authLimiter, authController.login);

// Sends 6-digit verification code to admin email.
router.post("/forgot-password", authLimiter, authController.forgotPassword);

// Resets admin password using verified 6-digit OTP.
router.post("/reset-password", authLimiter, authController.resetPassword);

// Returns currently authenticated administrator account details.
router.get("/me", authenticate, authController.getMe);

// Updates authenticated administrator profile details (name, email, avatar).
router.put("/profile", authenticate, authController.updateProfile);

// Changes authenticated administrator password with current password verification.
router.put("/change-password", authenticate, authController.changePassword);

export default router;

