const { validationResult } = require('express-validator');
const { pool } = require('../config/database');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

const validateTripOwnership = async (req, res, next) => {
  try {
    const tripId = req.params.tripId || req.params.id;
    const userId = req.userId;

    const query = 'SELECT owner_id FROM trips WHERE id = $1';
    const result = await pool.query(query, [tripId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    
    if (result.rows[0].owner_id !== userId) {
      return res.status(403).json({ error: 'You do not have permission' });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { validateRequest, validateTripOwnership };