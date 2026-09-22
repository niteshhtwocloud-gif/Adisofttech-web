// Standalone seed script for MongoDB Atlas blog publications.
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

import connectDB from "../src/config/database.js";
import { seedStarterBlogs } from "../src/services/blog.service.js";

// Connects to MongoDB Atlas and populates initial blog posts.
async function seed() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await connectDB();
    const count = await seedStarterBlogs();
    console.log(`Successfully seeded ${count} starter publications into MongoDB Atlas.`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message || error);
    process.exit(1);
  }
}

seed();
