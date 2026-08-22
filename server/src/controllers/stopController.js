const TripStop = require('../models/TripStop');
const Trip = require('../models/Trip');
const { catchAsync } = require('../utils/errors');

// Add a stop (Add Stops - P0)
exports.addStop = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const { city_id, city_name, city_country, city_lat, city_lng, start_date, end_date } = req.body;
  
  // Verify trip ownership
  const trip = await Trip.findById(tripId, req.userId);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  
  // Validate stop dates
  await TripStop.validateStopDates(tripId, start_date, end_date);
  
  const stop = await TripStop.addStop(tripId, {
    city_id,
    city_name,
    city_country,
    city_lat,
    city_lng,
    start_date,
    end_date
  });
  
  // Get updated trip with stops
  const updatedTrip = await Trip.findById(tripId, req.userId);
  res.status(201).json(updatedTrip);
});

// Remove a stop
exports.removeStop = catchAsync(async (req, res) => {
  const { stopId } = req.params;

  // removeStop returns { success, tripId } — or throws if not found
  const result = await TripStop.removeStop(stopId);
  if (!result) {
    return res.status(404).json({ error: 'Stop not found' });
  }

  // Verify the authenticated user owns this trip, then return the updated trip
  const updatedTrip = await Trip.findById(result.tripId, req.userId);
  if (!updatedTrip) {
    return res.status(403).json({ error: 'You do not have permission' });
  }

  res.json(updatedTrip);
});

// Reorder stops (Dates/Order - P0)
exports.reorderStops = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const { stopIds } = req.body;
  
  // Verify trip ownership
  const trip = await Trip.findById(tripId, req.userId);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  
  await TripStop.reorderStops(tripId, stopIds);
  
  // Get updated trip with stops
  const updatedTrip = await Trip.findById(tripId, req.userId);
  res.json(updatedTrip);
});