const { pool } = require('../config/database');

class TripStop {
  // Find a single stop by ID (used by activityController)
  static async findById(stopId) {
    const query = `
      SELECT id, trip_id, city_id, city_name, city_country,
             city_lat, city_lng, stop_order, start_date, end_date
      FROM trip_stops
      WHERE id = $1
    `;
    const result = await pool.query(query, [stopId]);
    return result.rows[0] || null;
  }

  // Add Stops - P0
  static async addStop(tripId, data) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      const orderQuery = `
        SELECT COALESCE(MAX(stop_order), -1) as max_order
        FROM trip_stops
        WHERE trip_id = $1
      `;
      const orderResult = await client.query(orderQuery, [tripId]);
      const newOrder = parseInt(orderResult.rows[0].max_order) + 1;

      const query = `
        INSERT INTO trip_stops (
          trip_id, city_id, city_name, city_country, city_lat, city_lng,
          stop_order, start_date, end_date
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;
      
      const values = [
        tripId,
        data.city_id,
        data.city_name,
        data.city_country,
        data.city_lat || null,
        data.city_lng || null,
        newOrder,
        data.start_date,
        data.end_date
      ];

      const result = await client.query(query, values);
      
      await client.query(
        'UPDATE trips SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [tripId]
      );

      await client.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async removeStop(stopId) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      const tripQuery = await client.query(
        'SELECT trip_id FROM trip_stops WHERE id = $1',
        [stopId]
      );
      
      if (tripQuery.rows.length === 0) {
        throw new Error('Stop not found');
      }
      
      const tripId = tripQuery.rows[0].trip_id;

      await client.query('DELETE FROM trip_stops WHERE id = $1', [stopId]);

      await client.query(`
        WITH reordered AS (
          SELECT id, ROW_NUMBER() OVER (ORDER BY stop_order) - 1 as new_order
          FROM trip_stops
          WHERE trip_id = $1
          ORDER BY stop_order
        )
        UPDATE trip_stops
        SET stop_order = reordered.new_order
        FROM reordered
        WHERE trip_stops.id = reordered.id
      `, [tripId]);

      await client.query(
        'UPDATE trips SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [tripId]
      );

      await client.query('COMMIT');
      return { success: true, tripId };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  // Dates/Order - P0
  static async reorderStops(tripId, stopIds) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      for (let i = 0; i < stopIds.length; i++) {
        await client.query(
          'UPDATE trip_stops SET stop_order = $1 WHERE id = $2 AND trip_id = $3',
          [i, stopIds[i], tripId]
        );
      }

      await client.query(
        'UPDATE trips SET updated_at = CURRENT_TIMESTAMP WHERE id = $1',
        [tripId]
      );

      await client.query('COMMIT');
      return { success: true };
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async validateStopDates(tripId, startDate, endDate) {
    const query = `
      SELECT start_date, end_date FROM trips WHERE id = $1
    `;
    const result = await pool.query(query, [tripId]);
    
    if (result.rows.length === 0) {
      throw new Error('Trip not found');
    }

    const trip = result.rows[0];
    
    if (new Date(startDate) < new Date(trip.start_date) || 
        new Date(endDate) > new Date(trip.end_date)) {
      throw new Error('Stop dates must be within trip date range');
    }

    if (new Date(endDate) < new Date(startDate)) {
      throw new Error('End date must be after start date');
    }

    return true;
  }
}

module.exports = TripStop;