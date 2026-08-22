const Activity = require('../models/Activity');
const TripStop = require('../models/TripStop');
const Trip = require('../models/Trip');
const { catchAsync } = require('../utils/errors');

// ==================== CREATE OPERATIONS ====================

// Add activity to a stop
exports.addActivity = catchAsync(async (req, res) => {
  const { stopId } = req.params;
  const activityData = req.body;

  // Verify stop exists and belongs to user's trip
  const stop = await TripStop.findById(stopId);
  if (!stop) {
    return res.status(404).json({ error: 'Stop not found' });
  }

  const trip = await Trip.findById(stop.trip_id, req.userId);
  if (!trip) {
    return res.status(403).json({ error: 'You do not have permission' });
  }

  // Validate activity data
  const validation = Activity.validate(activityData);
  if (!validation.isValid) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: validation.errors 
    });
  }

  const activity = await Activity.create(stopId, activityData);
  
  // Get updated cost summary
  const costSummary = await Activity.getTotalCostByStop(stopId);
  
  res.status(201).json({
    activity,
    stop_cost_summary: costSummary
  });
});

// Bulk create activities
exports.bulkCreateActivities = catchAsync(async (req, res) => {
  const { stopId } = req.params;
  const { activities } = req.body;

  if (!activities || !Array.isArray(activities) || activities.length === 0) {
    return res.status(400).json({ error: 'Activities array is required' });
  }

  // Verify stop exists and belongs to user's trip
  const stop = await TripStop.findById(stopId);
  if (!stop) {
    return res.status(404).json({ error: 'Stop not found' });
  }

  const trip = await Trip.findById(stop.trip_id, req.userId);
  if (!trip) {
    return res.status(403).json({ error: 'You do not have permission' });
  }

  // Validate all activities
  const errors = [];
  activities.forEach((activity, index) => {
    const validation = Activity.validate(activity);
    if (!validation.isValid) {
      errors.push({ index, errors: validation.errors });
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors 
    });
  }

  const created = await Activity.bulkCreate(stopId, activities);
  const costSummary = await Activity.getTotalCostByStop(stopId);

  res.status(201).json({
    created,
    count: created.length,
    stop_cost_summary: costSummary
  });
});

// ==================== READ OPERATIONS ====================

// Get all activities for a stop
exports.getStopActivities = catchAsync(async (req, res) => {
  const { stopId } = req.params;

  const stop = await TripStop.findById(stopId);
  if (!stop) {
    return res.status(404).json({ error: 'Stop not found' });
  }

  const activities = await Activity.findByStopId(stopId);
  const costSummary = await Activity.getTotalCostByStop(stopId);
  const categoryCost = await Activity.getCategoryCostByStop(stopId);

  res.json({
    activities,
    summary: costSummary,
    category_breakdown: categoryCost
  });
});

// Get a single activity
exports.getActivity = catchAsync(async (req, res) => {
  const { activityId } = req.params;

  const activity = await Activity.findById(activityId);
  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  // Verify ownership
  const trip = await Trip.findById(activity.trip_id, req.userId);
  if (!trip) {
    return res.status(403).json({ error: 'You do not have permission' });
  }

  res.json(activity);
});

// ==================== UPDATE OPERATIONS ====================

// Update activity
exports.updateActivity = catchAsync(async (req, res) => {
  const { activityId } = req.params;
  const activityData = req.body;

  // Verify ownership
  const existing = await Activity.findById(activityId);
  if (!existing) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  const trip = await Trip.findById(existing.trip_id, req.userId);
  if (!trip) {
    return res.status(403).json({ error: 'You do not have permission' });
  }

  // Validate activity data
  const validation = Activity.validate(activityData);
  if (!validation.isValid) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: validation.errors 
    });
  }

  const activity = await Activity.update(activityId, activityData);
  res.json(activity);
});

// ==================== DELETE OPERATIONS ====================

// Delete activity
exports.deleteActivity = catchAsync(async (req, res) => {
  const { activityId } = req.params;

  // Verify ownership
  const existing = await Activity.findById(activityId);
  if (!existing) {
    return res.status(404).json({ error: 'Activity not found' });
  }

  const trip = await Trip.findById(existing.trip_id, req.userId);
  if (!trip) {
    return res.status(403).json({ error: 'You do not have permission' });
  }

  await Activity.delete(activityId);
  res.json({ message: 'Activity deleted successfully' });
});

// ==================== BUDGET SUMMARY ====================

// Get complete budget summary for a trip
exports.getTripBudgetSummary = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  // Verify trip ownership
  const trip = await Trip.findById(tripId, req.userId);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  const budgetSummary = await Activity.getBudgetSummary(tripId);
  res.json(budgetSummary);
});

// Get category breakdown for a trip
exports.getCategoryBreakdown = catchAsync(async (req, res) => {
  const { tripId } = req.params;

  // Verify trip ownership
  const trip = await Trip.findById(tripId, req.userId);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  const breakdown = await Activity.getCategoryBreakdown(tripId);
  res.json(breakdown);
});

// ==================== SEARCH & FILTER ====================

// Search activities
exports.searchActivities = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  const trip = await Trip.findById(tripId, req.userId);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  const results = await Activity.search(tripId, q);
  res.json(results);
});

// Filter activities
exports.filterActivities = catchAsync(async (req, res) => {
  const { tripId } = req.params;
  const filters = req.query;

  const trip = await Trip.findById(tripId, req.userId);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }

  const results = await Activity.filterByCriteria(tripId, filters);
  res.json(results);
});