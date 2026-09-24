import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../../.env");

/**
 * Safely updates key-value pairs in server/.env file, preserving comments and formatting.
 * Also synchronizes process.env and the in-memory config object.
 *
 * @param {Object} updates - Key-value map of environment variables to update
 * @returns {boolean} - True if successfully written, false otherwise
 */
export const updateEnvFile = (updates = {}) => {
  try {
    if (!fs.existsSync(envPath)) {
      console.warn(`.env file not found at ${envPath}, creating a new one.`);
      fs.writeFileSync(envPath, "", "utf-8");
    }

    const content = fs.readFileSync(envPath, "utf-8");
    const lines = content.split(/\r?\n/);
    const updatedKeys = new Set();

    const newLines = lines.map((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        return line;
      }

      const match = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
      if (match) {
        const key = match[1];
        if (key in updates) {
          updatedKeys.add(key);
          const val = updates[key] !== undefined && updates[key] !== null ? String(updates[key]) : "";
          return `${key}=${val}`;
        }
      }
      return line;
    });

    // If any variable wasn't already in .env, append it at the bottom
    for (const [key, val] of Object.entries(updates)) {
      if (!updatedKeys.has(key) && val !== undefined && val !== null) {
        newLines.push(`${key}=${val}`);
      }
    }

    fs.writeFileSync(envPath, newLines.join("\n"), "utf-8");

    // Synchronize process.env
    for (const [key, val] of Object.entries(updates)) {
      if (val !== undefined && val !== null) {
        process.env[key] = String(val);
      }
    }

    // Synchronize in-memory config object
    if (updates.EMAIL_USER !== undefined) config.emailUser = String(updates.EMAIL_USER);
    if (updates.EMAIL_PASS !== undefined) config.emailPass = String(updates.EMAIL_PASS);
    if (updates.EMAIL_TO !== undefined) config.emailTo = String(updates.EMAIL_TO);

    console.log("[ENV UPDATE] Successfully synchronized server/.env with updates:", Object.keys(updates));
    return true;
  } catch (err) {
    console.error("[ENV UPDATE ERROR] Failed to update server/.env file:", err.message);
    return false;
  }
};
