// Concurrently starts both website (Port 3000) and admin (Port 3001) development servers.
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";

console.log("\x1b[36m%s\x1b[0m", "Starting website (Port 3000) and admin panel (Port 3001)...");

const website = spawn(npmCmd, ["run", "dev"], {
  cwd: path.resolve(__dirname, "website"),
  stdio: "inherit",
  shell: true,
});

const admin = spawn(npmCmd, ["run", "dev"], {
  cwd: path.resolve(__dirname, "admin"),
  stdio: "inherit",
  shell: true,
});

const cleanup = () => {
  website.kill();
  admin.kill();
  process.exit();
};

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("exit", cleanup);
