const Trip = require('../models/Trip');
const { catchAsync } = require('../utils/errors');

// Get all trips (My Trips - P0)
exports.getMyTrips = catchAsync(async (req, res) => {
  const trips = await Trip.findByUserId(req.userId);
  res.json(trips);
});

// Create a new trip (Create Trip - P0)
exports.createTrip = catchAsync(async (req, res) => {
  const { name, description, start_date, end_date } = req.body;
  
  // Validate dates
  await Trip.validateDates(start_date, end_date);
  
  const trip = await Trip.create({
    name,
    description,
    start_date,
    end_date,
    owner_id: req.userId
  });

  // Calculate total_days for the client (same formula as findByUserId)
  const start = new Date(trip.start_date);
  const end   = new Date(trip.end_date);
  const total_days = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

  res.status(201).json({
    ...trip,
    stop_count: 0,
    total_days,
    stops: []
  });
});

// Get a single trip
exports.getTrip = catchAsync(async (req, res) => {
  const trip = await Trip.findById(req.params.id, req.userId);
  
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  
  res.json(trip);
});

// Update a trip
exports.updateTrip = catchAsync(async (req, res) => {
  // First apply the update (validates ownership via owner_id scope)
  const updated = await Trip.update(req.params.id, req.userId, req.body);
  
  if (!updated) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  // Return the full trip with nested stops so the client state stays consistent
  const trip = await Trip.findById(req.params.id, req.userId);
  res.json(trip);
});

// Delete a trip
exports.deleteTrip = catchAsync(async (req, res) => {
  const trip = await Trip.delete(req.params.id, req.userId);
  
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  
  res.json({ message: 'Trip deleted successfully' });
});