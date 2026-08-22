import { Router } from "express";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

// GET /api/activity — recent activity feed for the dashboard
router.get("/", (_req, res) => {
  const items = db.get("recentActivity") || [];
  res.json(items);
});

export default router;
