const express = require('express');
const router = express.Router();
const {
  addActivity,
  getStopActivities,
  getActivity,
  updateActivity,
  deleteActivity,
  getTripBudgetSummary,
  getCategoryBreakdown,
  searchActivities,
  filterActivities,
  bulkCreateActivities
} = require('../controllers/activityController');
const { authMiddleware } = require('../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// ==================== BUDGET & COST ROUTES ====================

// Get complete budget summary for a trip
router.get('/trip/:tripId/budget-summary', getTripBudgetSummary);

// Get category breakdown for a trip
router.get('/trip/:tripId/categories', getCategoryBreakdown);

// ==================== ACTIVITY CRUD ====================

// Add activity to a stop
router.post('/stop/:stopId/activity', addActivity);

// Bulk create activities for a stop
router.post('/stop/:stopId/activities/bulk', bulkCreateActivities);

// Get all activities for a stop
router.get('/stop/:stopId/activities', getStopActivities);

// Get a single activity
router.get('/activity/:activityId', getActivity);

// Update activity
router.put('/activity/:activityId', updateActivity);

// Delete activity
router.delete('/activity/:activityId', deleteActivity);

// ==================== SEARCH & FILTER ====================

// Search activities
router.get('/trip/:tripId/search', searchActivities);

// Filter activities
router.get('/trip/:tripId/filter', filterActivities);

module.exports = router;