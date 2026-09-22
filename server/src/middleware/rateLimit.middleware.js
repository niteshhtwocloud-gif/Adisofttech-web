// Rate-limiting rules protecting auth endpoints and contact submissions from abuse.
import rateLimit from "express-rate-limit";

// Rate limit for authentication attempts: 20 requests per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many login attempts from this IP. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit for contact form submissions: 10 requests per hour
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: "Too many requests submitted. Please wait before submitting again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
