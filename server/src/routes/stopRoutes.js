const express = require('express');
const router = express.Router();
const {
  addStop,
  removeStop,
  reorderStops
} = require('../controllers/stopController');
const { authMiddleware, validateRequest, validateTripOwnership } = require('../middleware');
const { validateStop } = require('../utils/validators');

// All routes require authentication
router.use(authMiddleware);

// Add a stop to a trip (Add Stops - P0)
router.post('/trip/:tripId/stop',
  validateStop.tripId,
  validateStop.create,
  validateRequest,
  validateTripOwnership,
  addStop
);

// Reorder stops (Dates/Order - P0)
router.patch('/trip/:tripId/stops/reorder',
  validateStop.tripId,
  validateStop.reorder,
  validateRequest,
  validateTripOwnership,
  reorderStops
);

// Remove a stop
router.delete('/stop/:stopId',
  validateStop.id,
  validateRequest,
  removeStop
);

module.exports = router;