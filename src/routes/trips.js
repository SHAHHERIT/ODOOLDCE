import { Router } from "express";
import { nanoid } from "nanoid";
import db from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { serializeTrip, serializeTrips } from "../utils/serialize.js";

const router = Router();
router.use(requireAuth);

function findOwnedTrip(req, res) {
  const trip = db.find(
    "trips",
    (t) => t.id === req.params.tripId && t.userId === req.user.id
  );
  if (!trip) {
    res.status(404).json({ error: "Trip not found" });
    return null;
  }
  return trip;
}

// GET /api/trips
router.get("/", (req, res) => {
  const trips = db.filter("trips", (t) => t.userId === req.user.id);
  res.json(serializeTrips(trips));
});

// POST /api/trips
router.post("/", (req, res) => {
  const { name, destination, coverImage, startDate, endDate, budget, status, travelerName } =
    req.body || {};

  if (!name || !destination || !startDate || !endDate) {
    return res.status(400).json({
      error: "name, destination, startDate, and endDate are required",
    });
  }

  const trip = {
    id: `trip-${nanoid(10)}`,
    userId: req.user.id,
    name,
    destination,
    coverImage: coverImage || "",
    startDate,
    endDate,
    budget: Number(budget) || 0,
    progress: 0,
    status: status === "completed" ? "completed" : "upcoming",
    travelerName: travelerName || req.user.email,
    isPublic: false,
    itinerary: [],
  };

  db.insert("trips", trip);
  res.status(201).json(serializeTrip(trip));
});

// GET /api/trips/:tripId
router.get("/:tripId", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;
  res.json(serializeTrip(trip));
});

// PUT /api/trips/:tripId
router.put("/:tripId", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;

  const allowed = [
    "name",
    "destination",
    "coverImage",
    "startDate",
    "endDate",
    "budget",
    "progress",
    "status",
    "travelerName",
    "isPublic",
  ];
  const updates = {};
  for (const key of allowed) {
    if (key in (req.body || {})) updates[key] = req.body[key];
  }

  const updated = db.update(
    "trips",
    (t) => t.id === trip.id,
    (existing) => ({ ...existing, ...updates })
  );
  res.json(serializeTrip(updated));
});

// DELETE /api/trips/:tripId
router.delete("/:tripId", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;
  db.remove("trips", (t) => t.id === trip.id);
  res.status(204).send();
});

// POST /api/trips/:tripId/cities
router.post("/:tripId/cities", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;

  const { city, country, image, arrivalDate, departureDate, coordinates } = req.body || {};
  if (!city || !arrivalDate || !departureDate) {
    return res.status(400).json({
      error: "city, arrivalDate, and departureDate are required",
    });
  }

  const newCity = {
    id: `city-${nanoid(10)}`,
    city,
    country: country || "",
    image: image || "",
    arrivalDate,
    departureDate,
    coordinates: coordinates || "",
    activities: [],
  };

  const updated = db.update(
    "trips",
    (t) => t.id === trip.id,
    (existing) => ({
      ...existing,
      itinerary: [...(existing.itinerary || []), newCity],
    })
  );
  res.status(201).json(serializeTrip(updated));
});

// PUT /api/trips/:tripId/cities/:cityId
router.put("/:tripId/cities/:cityId", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;

  const cityExists = (trip.itinerary || []).some((c) => c.id === req.params.cityId);
  if (!cityExists) return res.status(404).json({ error: "City not found on this trip" });

  const allowed = ["city", "country", "image", "arrivalDate", "departureDate", "coordinates"];
  const updates = {};
  for (const key of allowed) {
    if (key in (req.body || {})) updates[key] = req.body[key];
  }

  const updated = db.update(
    "trips",
    (t) => t.id === trip.id,
    (existing) => ({
      ...existing,
      itinerary: existing.itinerary.map((c) =>
        c.id === req.params.cityId ? { ...c, ...updates } : c
      ),
    })
  );
  res.json(serializeTrip(updated));
});

// DELETE /api/trips/:tripId/cities/:cityId
router.delete("/:tripId/cities/:cityId", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;

  const updated = db.update(
    "trips",
    (t) => t.id === trip.id,
    (existing) => ({
      ...existing,
      itinerary: (existing.itinerary || []).filter((c) => c.id !== req.params.cityId),
    })
  );
  res.json(serializeTrip(updated));
});

// POST /api/trips/:tripId/cities/:cityId/activities
router.post("/:tripId/cities/:cityId/activities", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;

  const city = (trip.itinerary || []).find((c) => c.id === req.params.cityId);
  if (!city) return res.status(404).json({ error: "City not found on this trip" });

  const { name, time, description, cost } = req.body || {};
  if (!name) return res.status(400).json({ error: "name is required" });

  const newActivity = {
    id: `activity-${nanoid(10)}`,
    name,
    time: time || "",
    description: description || "",
    cost: Number(cost) || 0,
  };

  const updated = db.update(
    "trips",
    (t) => t.id === trip.id,
    (existing) => ({
      ...existing,
      itinerary: existing.itinerary.map((c) =>
        c.id === req.params.cityId
          ? { ...c, activities: [...(c.activities || []), newActivity] }
          : c
      ),
    })
  );
  res.status(201).json(serializeTrip(updated));
});

// PUT /api/trips/:tripId/cities/:cityId/activities/:activityId
router.put("/:tripId/cities/:cityId/activities/:activityId", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;

  const city = (trip.itinerary || []).find((c) => c.id === req.params.cityId);
  if (!city) return res.status(404).json({ error: "City not found on this trip" });

  const allowed = ["name", "time", "description", "cost"];
  const updates = {};
  for (const key of allowed) {
    if (key in (req.body || {})) updates[key] = req.body[key];
  }

  const updated = db.update(
    "trips",
    (t) => t.id === trip.id,
    (existing) => ({
      ...existing,
      itinerary: existing.itinerary.map((c) =>
        c.id === req.params.cityId
          ? {
              ...c,
              activities: c.activities.map((a) =>
                a.id === req.params.activityId ? { ...a, ...updates } : a
              ),
            }
          : c
      ),
    })
  );
  res.json(serializeTrip(updated));
});

// DELETE /api/trips/:tripId/cities/:cityId/activities/:activityId
router.delete("/:tripId/cities/:cityId/activities/:activityId", (req, res) => {
  const trip = findOwnedTrip(req, res);
  if (!trip) return;

  const updated = db.update(
    "trips",
    (t) => t.id === trip.id,
    (existing) => ({
      ...existing,
      itinerary: existing.itinerary.map((c) =>
        c.id === req.params.cityId
          ? { ...c, activities: (c.activities || []).filter((a) => a.id !== req.params.activityId) }
          : c
      ),
    })
  );
  res.json(serializeTrip(updated));
});

export default router;
