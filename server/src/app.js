import express from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import corsMiddleware from "./config/cors.js";
import routes from "./routes/index.js";
import { errorHandler } from "./middleware/error.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security headers with cross-origin resource policy to allow client image fetching
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Cross-origin resource sharing
app.use(corsMiddleware);

// Serve uploaded static assets
app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

// Request body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    name: "AdiSofTech API Service",
    version: "1.0.0",
    docs: "/api/v1/health",
  });
});

// Mount API v1 routes
app.use("/api/v1", routes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized Error Handler
app.use(errorHandler);

export default app;
