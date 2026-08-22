import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth.js";
import tripsRoutes from "./src/routes/trips.js";
import destinationsRoutes from "./src/routes/destinations.js";
import shareRoutes from "./src/routes/share.js";
import activityRoutes from "./src/routes/activity.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "src", "data", "db.json");

// Auto-seed on first run so `npm install && npm run dev` just works.
if (!fs.existsSync(DB_PATH)) {
  console.log("No database found — seeding demo data...");
  await import("./src/data/seed.js");
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/destinations", destinationsRoutes);
app.use("/api/share", shareRoutes);
app.use("/api/activity", activityRoutes);

// 404 handler
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Central error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`GlobeTrotter API running on http://localhost:${PORT}`);
  console.log(`Demo login -> email: traveler@example.com  password: password`);
});
