// Routes for public service browsing and admin service catalog updates.
import { Router } from "express";
import * as serviceController from "../controllers/service.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = Router();

// Public routes
router.get("/", serviceController.getServices);
router.get("/:slug", serviceController.getServiceBySlug);

// Admin routes
router.post("/", authenticate, requireAdmin, serviceController.createService);
router.patch("/:id", authenticate, requireAdmin, serviceController.updateService);
router.delete("/:id", authenticate, requireAdmin, serviceController.deleteService);

export default router;
