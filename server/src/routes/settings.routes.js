import { Router } from "express";
import * as settingsController from "../controllers/settings.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

// Public: Fetch site and company branding
router.get("/", settingsController.getSettings);

// Protected: Update site settings, brand logo, company info
router.put("/", authenticate, settingsController.updateSettings);

export default router;
