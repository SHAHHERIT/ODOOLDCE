import { Router } from "express";
import db from "../db.js";
import { serializeTrip } from "../utils/serialize.js";

const router = Router();

// GET /api/share/:tripId
// Public, unauthenticated. Only returns a trip if its owner has marked it
// public (trip.isPublic === true). Never exposes userId or other trips.
router.get("/:tripId", (req, res) => {
  const trip = db.find(
    "trips",
    (t) => t.id === req.params.tripId && t.isPublic === true
  );
  if (!trip) {
    return res.status(404).json({ error: "This itinerary isn't shared or doesn't exist" });
  }
  res.json(serializeTrip(trip));
});

export default router;
