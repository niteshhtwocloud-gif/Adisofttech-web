// Aggregates and mounts all API v1 domain routes and system health check.
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import blogRoutes from "./blog.routes.js";
import contactRoutes from "./contact.routes.js";
import serviceRoutes from "./service.routes.js";
import projectRoutes from "./project.routes.js";
import uploadRoutes from "./upload.routes.js";
import settingsRoutes from "./settings.routes.js";
import mongoose from "mongoose";

const router = Router();

// Health check endpoint
router.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus,
  });
});

// Mount modules
router.use("/auth", authRoutes);
router.use("/blogs", blogRoutes);
router.use("/contacts", contactRoutes);
router.use("/services", serviceRoutes);
router.use("/projects", projectRoutes);
router.use("/upload", uploadRoutes);
router.use("/settings", settingsRoutes);

export default router;
