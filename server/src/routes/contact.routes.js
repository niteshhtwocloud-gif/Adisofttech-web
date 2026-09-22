// Routes for public contact inquiries and admin lead management.
import { Router } from "express";
import * as contactController from "../controllers/contact.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { contactLimiter } from "../middleware/rateLimit.middleware.js";

const router = Router();

// Public submission with rate limiting
router.post("/", contactLimiter, contactController.submitContact);

// Admin-protected lead management
router.get("/", authenticate, requireAdmin, contactController.getContacts);
router.patch("/:id", authenticate, requireAdmin, contactController.updateContactStatus);
router.delete("/:id", authenticate, requireAdmin, contactController.deleteContact);

export default router;
