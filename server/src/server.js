// Server entry point: loads environment, establishes MongoDB connection, and starts Express listener.
import config from "./config/env.js";

// 2. MongoDB connection
import connectDB from "./config/database.js";

// 3. Express application
import app from "./app.js";

// Auto-seeders
import { seedInitialAdmin } from "./services/auth.service.js";
import { seedInitialServices } from "./services/service.service.js";
import { seedInitialProjects } from "./services/project.service.js";

const PORT = config.port;

// Connects to database, seeds baseline data if needed, and starts HTTP server.
const startServer = async () => {
  try {
    // Connect to MongoDB Atlas
    await connectDB();

    // Initialize required baseline admin & services if needed
    await seedInitialAdmin();
    await seedInitialServices();
    await seedInitialProjects();

    // 5. Server listener
    app.listen(PORT, () => {
      console.log(`Express server running in ${config.nodeEnv} mode on port ${PORT}`);
      console.log(`API Base URL: http://localhost:${PORT}/api/v1`);
      console.log(`Health Check: http://localhost:${PORT}/api/v1/health`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();

