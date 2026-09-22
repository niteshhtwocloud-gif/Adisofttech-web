// Loads and validates server environment configuration.
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env from the server root is loaded
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "fallback_default_jwt_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  corsOrigin: (process.env.CORS_ORIGIN || "http://localhost:3000,http://localhost:3001")
    .split(",")
    .map((origin) => origin.trim()),
  emailUser: process.env.EMAIL_USER || "",
  emailPass: process.env.EMAIL_PASS || "",
  emailTo: process.env.EMAIL_TO || "",
  turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || "0x4AAAAAAE_3BsAFzlfo_BM38Dn1rQ6uh9w",
  adminEmail: process.env.ADMIN_EMAIL || "nitesh.htwocloud@gmail.com",
  adminPassword: process.env.ADMIN_PASSWORD || "Nitesh@321",
};

export default config;
