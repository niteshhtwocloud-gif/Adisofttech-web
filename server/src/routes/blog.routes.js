// Routes for public blog reading and admin-protected publication management.
import { Router } from "express";
import * as blogController from "../controllers/blog.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = Router();

// Public routes
router.get("/", blogController.getBlogs);
router.get("/:slug", blogController.getBlogBySlug);

// Admin-protected CMS routes
router.post("/", authenticate, requireAdmin, blogController.createBlog);
router.patch("/:slug", authenticate, requireAdmin, blogController.updateBlog);
router.delete("/:slug", authenticate, requireAdmin, blogController.deleteBlog);
router.post("/seed", authenticate, requireAdmin, blogController.seedBlogs);

export default router;
