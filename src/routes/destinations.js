import { Router } from "express";
import db from "../db.js";

const router = Router();

// GET /api/destinations
router.get("/", (_req, res) => {
  res.json(db.get("destinations"));
});

// GET /api/destinations/:id
router.get("/:id", (req, res) => {
  const destination = db.find("destinations", (d) => d.id === req.params.id);
  if (!destination) return res.status(404).json({ error: "Destination not found" });
  res.json(destination);
});

export default router;
