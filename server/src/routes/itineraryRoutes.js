const express = require('express');
const router = express.Router();
const {
  getItinerary,
  getTimeline
} = require('../controllers/itineraryController');
const { authMiddleware, validateRequest } = require('../middleware');
const { validateItinerary } = require('../utils/validators');

// All routes require authentication
router.use(authMiddleware);

// Get itinerary (Dates/Order - P0)
router.get('/trip/:tripId/itinerary',
  validateItinerary.tripId,
  validateRequest,
  getItinerary
);

// Get timeline (Dates/Order - P0)
router.get('/trip/:tripId/timeline',
  validateItinerary.tripId,
  validateRequest,
  getTimeline
);

module.exports = router;