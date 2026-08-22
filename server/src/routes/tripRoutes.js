const express = require('express');
const { param } = require('express-validator');
const router = express.Router();
const {
  getMyTrips,
  createTrip,
  getTrip,
  updateTrip,
  deleteTrip
} = require('../controllers/tripController');
const { authMiddleware, validateRequest } = require('../middleware');
const { validateTrip } = require('../utils/validators');

// All routes require authentication
router.use(authMiddleware);

// Get all trips for the authenticated user (My Trips - P0)
router.get('/', getMyTrips);

// Create a new trip (Create Trip - P0)
router.post('/', validateTrip.create, validateRequest, createTrip);

// Get a single trip
router.get('/:id', validateTrip.id, validateRequest, getTrip);

// Update a trip
router.put('/:id', validateTrip.id, validateTrip.update, validateRequest, updateTrip);

// Delete a trip
router.delete('/:id', validateTrip.id, validateRequest, deleteTrip);

module.exports = router;