const { pool, transaction } = require('../config/database');

class Activity {
  // ==================== CREATE OPERATIONS ====================

  // Create a new activity for a stop
  static async create(stopId, data) {
    const query = `
      INSERT INTO activities (
        stop_id, name, description, cost, currency, category,
        activity_time, duration_hours, location_lat, location_lng,
        location_address, image_url, rating, booking_url,
        contact_phone, contact_email, website, is_prepaid
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
      RETURNING 
        id, stop_id, name, description, cost, currency, category,
        activity_time as time, duration_hours as duration,
        location_lat, location_lng, location_address, image_url, rating,
        booking_url, contact_phone, contact_email, website, is_prepaid,
        created_at, updated_at
    `;

    const values = [
      stopId,
      data.name,
      data.description || null,
      data.cost || 0,
      data.currency || 'USD',
      data.category || 'other',
      data.time || null,
      data.duration || null,
      data.location_lat || null,
      data.location_lng || null,
      data.location_address || null,
      data.image_url || null,
      data.rating || null,
      data.booking_url || null,
      data.contact_phone || null,
      data.contact_email || null,
      data.website || null,
      data.is_prepaid || false
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Bulk create activities
  static async bulkCreate(stopId, activities) {
    return await transaction(async (client) => {
      const created = [];
      
      for (const activity of activities) {
        const query = `
          INSERT INTO activities (
            stop_id, name, description, cost, currency, category,
            activity_time, duration_hours, location_lat, location_lng,
            location_address, image_url, rating, booking_url,
            contact_phone, contact_email, website, is_prepaid
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          RETURNING *
        `;

        const values = [
          stopId,
          activity.name,
          activity.description || null,
          activity.cost || 0,
          activity.currency || 'USD',
          activity.category || 'other',
          activity.time || null,
          activity.duration || null,
          activity.location_lat || null,
          activity.location_lng || null,
          activity.location_address || null,
          activity.image_url || null,
          activity.rating || null,
          activity.booking_url || null,
          activity.contact_phone || null,
          activity.contact_email || null,
          activity.website || null,
          activity.is_prepaid || false
        ];

        const result = await client.query(query, values);
        created.push(result.rows[0]);
      }

      return created;
    });
  }

  // ==================== READ OPERATIONS ====================

  // Get all activities for a stop
  static async findByStopId(stopId) {
    const query = `
      SELECT 
        id, stop_id, name, description, cost, currency, category,
        activity_time as time, duration_hours as duration,
        location_lat, location_lng, location_address, image_url, rating,
        booking_url, contact_phone, contact_email, website, is_prepaid,
        created_at, updated_at
      FROM activities
      WHERE stop_id = $1
      ORDER BY activity_time ASC, created_at ASC
    `;

    const result = await pool.query(query, [stopId]);
    return result.rows;
  }

  // Get a single activity by ID
  static async findById(activityId) {
    const query = `
      SELECT 
        a.*,
        ts.trip_id,
        ts.city_name,
        ts.city_country,
        t.name as trip_name,
        t.start_date as trip_start_date,
        t.end_date as trip_end_date
      FROM activities a
      JOIN trip_stops ts ON a.stop_id = ts.id
      JOIN trips t ON ts.trip_id = t.id
      WHERE a.id = $1
    `;

    const result = await pool.query(query, [activityId]);
    return result.rows[0];
  }

  // ==================== UPDATE OPERATIONS ====================

  // Update an activity
  static async update(activityId, data) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    const fieldMap = {
      name: 'name',
      description: 'description',
      cost: 'cost',
      currency: 'currency',
      category: 'category',
      time: 'activity_time',
      duration: 'duration_hours',
      location_lat: 'location_lat',
      location_lng: 'location_lng',
      location_address: 'location_address',
      image_url: 'image_url',
      rating: 'rating',
      booking_url: 'booking_url',
      contact_phone: 'contact_phone',
      contact_email: 'contact_email',
      website: 'website',
      is_prepaid: 'is_prepaid'
    };

    for (const [key, dbField] of Object.entries(fieldMap)) {
      if (data[key] !== undefined) {
        fields.push(`${dbField} = $${paramCount}`);
        values.push(data[key]);
        paramCount++;
      }
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(activityId);
    const query = `
      UPDATE activities
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING 
        id, stop_id, name, description, cost, currency, category,
        activity_time as time, duration_hours as duration,
        location_lat, location_lng, location_address, image_url, rating,
        booking_url, contact_phone, contact_email, website, is_prepaid,
        created_at, updated_at
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // ==================== DELETE OPERATIONS ====================

  // Delete an activity
  static async delete(activityId) {
    const query = `
      DELETE FROM activities
      WHERE id = $1
      RETURNING id, stop_id
    `;

    const result = await pool.query(query, [activityId]);
    return result.rows[0];
  }

  // Delete all activities for a stop
  static async deleteByStopId(stopId) {
    const query = `
      DELETE FROM activities
      WHERE stop_id = $1
      RETURNING id
    `;

    const result = await pool.query(query, [stopId]);
    return result.rows;
  }

  // ==================== COST CALCULATIONS ====================

  // Get total cost for a stop
  static async getTotalCostByStop(stopId) {
    const query = `
      SELECT 
        COALESCE(SUM(cost), 0) as total_cost,
        COUNT(*) as activity_count,
        COALESCE(AVG(cost), 0) as average_cost,
        COALESCE(MIN(cost), 0) as min_cost,
        COALESCE(MAX(cost), 0) as max_cost,
        COUNT(CASE WHEN is_prepaid = true THEN 1 END) as prepaid_count,
        COALESCE(SUM(CASE WHEN is_prepaid = true THEN cost ELSE 0 END), 0) as prepaid_total
      FROM activities
      WHERE stop_id = $1
    `;

    const result = await pool.query(query, [stopId]);
    return result.rows[0];
  }

  // Get total cost for a trip
  static async getTotalCostByTrip(tripId) {
    const query = `
      SELECT 
        COALESCE(SUM(a.cost), 0) as total_cost,
        COUNT(a.id) as total_activities,
        COUNT(DISTINCT a.stop_id) as stops_with_activities,
        COUNT(DISTINCT a.category) as categories_used,
        COALESCE(AVG(a.cost), 0) as average_activity_cost,
        COUNT(CASE WHEN a.is_prepaid = true THEN 1 END) as prepaid_activities,
        COALESCE(SUM(CASE WHEN a.is_prepaid = true THEN a.cost ELSE 0 END), 0) as prepaid_total,
        COALESCE(SUM(CASE WHEN a.is_prepaid = false THEN a.cost ELSE 0 END), 0) as pending_total
      FROM activities a
      JOIN trip_stops ts ON a.stop_id = ts.id
      WHERE ts.trip_id = $1
    `;

    const result = await pool.query(query, [tripId]);
    return result.rows[0];
  }

  // Get cost by category for a stop
  static async getCategoryCostByStop(stopId) {
    const query = `
      SELECT 
        category,
        COUNT(*) as count,
        COALESCE(SUM(cost), 0) as total_cost,
        COALESCE(AVG(cost), 0) as average_cost,
        COALESCE(MIN(cost), 0) as min_cost,
        COALESCE(MAX(cost), 0) as max_cost,
        COUNT(CASE WHEN is_prepaid = true THEN 1 END) as prepaid_count,
        COALESCE(SUM(CASE WHEN is_prepaid = true THEN cost ELSE 0 END), 0) as prepaid_total
      FROM activities
      WHERE stop_id = $1
      GROUP BY category
      ORDER BY total_cost DESC
    `;

    const result = await pool.query(query, [stopId]);
    return result.rows;
  }

  // Get category breakdown for a trip
  static async getCategoryBreakdown(tripId) {
    const query = `
      SELECT 
        a.category,
        COUNT(a.id) as count,
        COALESCE(SUM(a.cost), 0) as total_cost,
        COALESCE(AVG(a.cost), 0) as average_cost,
        COALESCE(MIN(a.cost), 0) as min_cost,
        COALESCE(MAX(a.cost), 0) as max_cost,
        COUNT(CASE WHEN a.is_prepaid = true THEN 1 END) as prepaid_count,
        COALESCE(SUM(CASE WHEN a.is_prepaid = true THEN a.cost ELSE 0 END), 0) as prepaid_total,
        COUNT(DISTINCT a.stop_id) as stops_count
      FROM activities a
      JOIN trip_stops ts ON a.stop_id = ts.id
      WHERE ts.trip_id = $1
      GROUP BY a.category
      ORDER BY total_cost DESC
    `;

    const result = await pool.query(query, [tripId]);
    return result.rows;
  }

  // Get daily cost breakdown for a trip
  static async getDailyCostBreakdown(tripId) {
    const query = `
      WITH date_series AS (
        SELECT generate_series(
          (SELECT start_date FROM trips WHERE id = $1),
          (SELECT end_date FROM trips WHERE id = $1),
          '1 day'::interval
        )::date as date
      )
      SELECT 
        ds.date,
        COALESCE(SUM(a.cost), 0) as total_cost,
        COUNT(a.id) as activity_count,
        COALESCE(SUM(CASE WHEN a.is_prepaid = true THEN a.cost ELSE 0 END), 0) as prepaid_cost,
        COALESCE(SUM(CASE WHEN a.is_prepaid = false THEN a.cost ELSE 0 END), 0) as pending_cost,
        json_agg(
          DISTINCT jsonb_build_object(
            'category', a.category,
            'cost', a.cost,
            'name', a.name
          )
        ) FILTER (WHERE a.id IS NOT NULL) as activities
      FROM date_series ds
      LEFT JOIN trip_stops ts ON ts.trip_id = $1 
        AND ds.date BETWEEN ts.start_date AND ts.end_date
      LEFT JOIN activities a ON a.stop_id = ts.id
      GROUP BY ds.date
      ORDER BY ds.date
    `;

    const result = await pool.query(query, [tripId]);
    return result.rows;
  }

  // Get cost breakdown by stop for a trip
  static async getCostByStop(tripId) {
    const query = `
      SELECT 
        ts.id as stop_id,
        ts.city_name,
        ts.city_country,
        ts.start_date,
        ts.end_date,
        COUNT(a.id) as activity_count,
        COALESCE(SUM(a.cost), 0) as total_cost,
        COALESCE(AVG(a.cost), 0) as average_cost,
        COUNT(CASE WHEN a.is_prepaid = true THEN 1 END) as prepaid_count,
        COALESCE(SUM(CASE WHEN a.is_prepaid = true THEN a.cost ELSE 0 END), 0) as prepaid_total,
        json_agg(
          json_build_object(
            'category', a.category,
            'count', a.id
          )
        ) FILTER (WHERE a.id IS NOT NULL) as categories
      FROM trip_stops ts
      LEFT JOIN activities a ON a.stop_id = ts.id
      WHERE ts.trip_id = $1
      GROUP BY ts.id, ts.city_name, ts.city_country, ts.start_date, ts.end_date
      ORDER BY ts.stop_order
    `;

    const result = await pool.query(query, [tripId]);
    return result.rows;
  }

  // Get estimated vs actual cost comparison
  static async getCostComparison(tripId) {
    const query = `
      SELECT 
        COALESCE(SUM(a.cost), 0) as actual_cost,
        COALESCE(SUM(a.estimated_cost), 0) as estimated_cost,
        COALESCE(SUM(a.cost - a.estimated_cost), 0) as variance,
        COUNT(CASE WHEN a.cost > a.estimated_cost THEN 1 END) as over_budget_count,
        COUNT(CASE WHEN a.cost < a.estimated_cost THEN 1 END) as under_budget_count,
        COUNT(CASE WHEN a.cost = a.estimated_cost THEN 1 END) as on_budget_count
      FROM activities a
      JOIN trip_stops ts ON a.stop_id = ts.id
      WHERE ts.trip_id = $1 AND a.estimated_cost IS NOT NULL
    `;

    const result = await pool.query(query, [tripId]);
    return result.rows[0];
  }

  // ==================== BUDGET SUMMARY ====================

  // Get complete budget summary for a trip
  static async getBudgetSummary(tripId) {
    const total = await this.getTotalCostByTrip(tripId);
    const categoryBreakdown = await this.getCategoryBreakdown(tripId);
    const dailyBreakdown = await this.getDailyCostBreakdown(tripId);
    const stopBreakdown = await this.getCostByStop(tripId);
    const comparison = await this.getCostComparison(tripId);

    // Calculate remaining days
    const tripQuery = `
      SELECT 
        start_date,
        end_date,
        EXTRACT(DAY FROM (end_date - start_date)) + 1 as total_days
      FROM trips WHERE id = $1
    `;
    const tripResult = await pool.query(tripQuery, [tripId]);
    const trip = tripResult.rows[0];
    
    const totalDays = parseInt(trip.total_days);
    const daysElapsed = Math.ceil((new Date() - new Date(trip.start_date)) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, totalDays - daysElapsed);
    const averageDailyCost = totalDays > 0 ? total.total_cost / totalDays : 0;
    const projectedTotal = daysRemaining * averageDailyCost + total.total_cost;

    return {
      summary: {
        total_cost: parseFloat(total.total_cost),
        total_activities: parseInt(total.total_activities),
        average_activity_cost: parseFloat(total.average_activity_cost),
        prepaid_total: parseFloat(total.prepaid_total),
        pending_total: parseFloat(total.pending_total),
        prepaid_activities: parseInt(total.prepaid_activities)
      },
      category_breakdown: categoryBreakdown.map(cat => ({
        ...cat,
        total_cost: parseFloat(cat.total_cost),
        average_cost: parseFloat(cat.average_cost),
        prepaid_total: parseFloat(cat.prepaid_total)
      })),
      daily_breakdown: dailyBreakdown.map(day => ({
        date: day.date,
        total_cost: parseFloat(day.total_cost),
        activity_count: parseInt(day.activity_count),
        prepaid_cost: parseFloat(day.prepaid_cost),
        pending_cost: parseFloat(day.pending_cost)
      })),
      stop_breakdown: stopBreakdown.map(stop => ({
        ...stop,
        total_cost: parseFloat(stop.total_cost),
        average_cost: parseFloat(stop.average_cost),
        prepaid_total: parseFloat(stop.prepaid_total)
      })),
      comparison: comparison ? {
        actual_cost: parseFloat(comparison.actual_cost),
        estimated_cost: parseFloat(comparison.estimated_cost),
        variance: parseFloat(comparison.variance),
        over_budget_count: parseInt(comparison.over_budget_count),
        under_budget_count: parseInt(comparison.under_budget_count),
        on_budget_count: parseInt(comparison.on_budget_count)
      } : null,
      projections: {
        total_days: totalDays,
        days_elapsed: daysElapsed,
        days_remaining: daysRemaining,
        average_daily_cost: parseFloat(averageDailyCost),
        projected_total: parseFloat(projectedTotal)
      }
    };
  }

  // ==================== VALIDATION ====================

  // Validate activity data
  static validate(data) {
    const errors = [];

    if (!data.name || data.name.trim() === '') {
      errors.push('Activity name is required');
    }

    if (data.cost !== undefined && data.cost !== null && data.cost < 0) {
      errors.push('Cost cannot be negative');
    }

    if (data.estimated_cost !== undefined && data.estimated_cost !== null && data.estimated_cost < 0) {
      errors.push('Estimated cost cannot be negative');
    }

    if (data.rating !== undefined && data.rating !== null) {
      if (data.rating < 0 || data.rating > 5) {
        errors.push('Rating must be between 0 and 5');
      }
    }

    if (data.duration !== undefined && data.duration !== null && data.duration < 0) {
      errors.push('Duration cannot be negative');
    }

    if (data.currency) {
      const validCurrencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'NZD'];
      if (!validCurrencies.includes(data.currency.toUpperCase())) {
        errors.push(`Currency must be one of: ${validCurrencies.join(', ')}`);
      }
    }

    if (data.category) {
      const validCategories = ['attraction', 'restaurant', 'hotel', 'transport', 'shopping', 'entertainment', 'other'];
      if (!validCategories.includes(data.category.toLowerCase())) {
        errors.push(`Category must be one of: ${validCategories.join(', ')}`);
      }
    }

    if (data.booking_url && !data.booking_url.match(/^https?:\/\/.+/)) {
      errors.push('Booking URL must be a valid URL');
    }

    if (data.contact_email && !data.contact_email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Contact email must be a valid email address');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // ==================== SEARCH & FILTER ====================

  // Search activities by name or description
  static async search(tripId, searchTerm) {
    const query = `
      SELECT 
        a.*,
        ts.city_name,
        ts.city_country,
        t.name as trip_name
      FROM activities a
      JOIN trip_stops ts ON a.stop_id = ts.id
      JOIN trips t ON ts.trip_id = t.id
      WHERE t.id = $1 AND (
        a.name ILIKE $2 OR 
        a.description ILIKE $2 OR
        a.category ILIKE $2
      )
      ORDER BY a.created_at DESC
    `;

    const result = await pool.query(query, [tripId, `%${searchTerm}%`]);
    return result.rows;
  }

  // Filter activities by category and cost range
  static async filterByCriteria(tripId, filters) {
    let query = `
      SELECT 
        a.*,
        ts.city_name,
        ts.city_country
      FROM activities a
      JOIN trip_stops ts ON a.stop_id = ts.id
      WHERE ts.trip_id = $1
    `;
    
    const values = [tripId];
    let paramCount = 2;

    if (filters.category) {
      query += ` AND a.category = $${paramCount}`;
      values.push(filters.category);
      paramCount++;
    }

    if (filters.min_cost !== undefined) {
      query += ` AND a.cost >= $${paramCount}`;
      values.push(filters.min_cost);
      paramCount++;
    }

    if (filters.max_cost !== undefined) {
      query += ` AND a.cost <= $${paramCount}`;
      values.push(filters.max_cost);
      paramCount++;
    }

    if (filters.is_prepaid !== undefined) {
      query += ` AND a.is_prepaid = $${paramCount}`;
      values.push(filters.is_prepaid);
      paramCount++;
    }

    if (filters.rating_min !== undefined) {
      query += ` AND a.rating >= $${paramCount}`;
      values.push(filters.rating_min);
      paramCount++;
    }

    if (filters.start_date) {
      query += ` AND ts.start_date >= $${paramCount}`;
      values.push(filters.start_date);
      paramCount++;
    }

    if (filters.end_date) {
      query += ` AND ts.end_date <= $${paramCount}`;
      values.push(filters.end_date);
      paramCount++;
    }

    query += ` ORDER BY a.cost DESC`;

    const result = await pool.query(query, values);
    return result.rows;
  }
}

module.exports = Activity;