// Routes for portfolio case studies and project showcase management.
import { Router } from "express";
import * as projectController from "../controllers/project.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = Router();

// Public routes
router.get("/", projectController.getProjects);
router.get("/:slug", projectController.getProjectBySlug);

// Admin routes
router.post("/seed", authenticate, requireAdmin, projectController.seedStarterProjects);
router.post("/", authenticate, requireAdmin, projectController.createProject);
router.patch("/:id", authenticate, requireAdmin, projectController.updateProject);
router.delete("/:id", authenticate, requireAdmin, projectController.deleteProject);

export default router;
