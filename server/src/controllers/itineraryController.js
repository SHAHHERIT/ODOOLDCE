const Itinerary = require('../models/Itinerary');
const Trip = require('../models/Trip');
const { catchAsync } = require('../utils/errors');

// Get itinerary (Dates/Order - P0)
exports.getItinerary = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  
  // Verify trip ownership
  const trip = await Trip.findById(tripId, req.userId);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  
  const itinerary = await Itinerary.getItineraryByTrip(tripId);
  res.json(itinerary);
});

// Get timeline (Dates/Order - P0)
exports.getTimeline = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  
  // Verify trip ownership
  const trip = await Trip.findById(tripId, req.userId);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  
  const timeline = await Itinerary.getTimeline(tripId);
  res.json(timeline);
});