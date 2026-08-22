const { pool } = require('../config/database');

class Trip {
  // My Trips - P0
  static async findByUserId(userId) {
    const query = `
      SELECT 
        t.id,
        t.name,
        t.description,
        t.start_date,
        t.end_date,
        t.created_at,
        t.updated_at,
        COUNT(ts.id)::int AS stop_count,
        (EXTRACT(DAY FROM (t.end_date - t.start_date)) + 1)::int AS total_days
      FROM trips t
      LEFT JOIN trip_stops ts ON t.id = ts.trip_id
      WHERE t.owner_id = $1
      GROUP BY t.id
      ORDER BY t.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  // Get single trip with stops
  static async findById(tripId, userId) {
    const query = `
      SELECT 
        t.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', ts.id,
              'cityId', ts.city_id,
              'city', json_build_object(
                'id', ts.city_id,
                'name', ts.city_name,
                'country', ts.city_country,
                'lat', ts.city_lat,
                'lng', ts.city_lng
              ),
              'order', ts.stop_order,
              'startDate', ts.start_date,
              'endDate', ts.end_date,
              'activities', (
                SELECT COALESCE(
                  json_agg(
                    json_build_object(
                      'id', a.id,
                      'name', a.name,
                      'description', a.description,
                      'cost', a.cost,
                      'currency', a.currency,
                      'time', a.activity_time
                    )
                  ),
                  '[]'::json
                )
                FROM activities a
                WHERE a.stop_id = ts.id
              )
            )
            ORDER BY ts.stop_order
          ) FILTER (WHERE ts.id IS NOT NULL),
          '[]'::json
        ) as stops
      FROM trips t
      LEFT JOIN trip_stops ts ON t.id = ts.trip_id
      WHERE t.id = $1 AND t.owner_id = $2
      GROUP BY t.id
    `;
    const result = await pool.query(query, [tripId, userId]);
    return result.rows[0];
  }

  // Create Trip - P0
  static async create(data) {
    const { name, description, start_date, end_date, owner_id } = data;
    const query = `
      INSERT INTO trips (name, description, start_date, end_date, owner_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [name, description, start_date, end_date, owner_id]);
    return result.rows[0];
  }

  static async update(tripId, userId, data) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (data.name !== undefined) {
      fields.push(`name = $${paramCount}`);
      values.push(data.name);
      paramCount++;
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount}`);
      values.push(data.description);
      paramCount++;
    }
    if (data.start_date !== undefined) {
      fields.push(`start_date = $${paramCount}`);
      values.push(data.start_date);
      paramCount++;
    }
    if (data.end_date !== undefined) {
      fields.push(`end_date = $${paramCount}`);
      values.push(data.end_date);
      paramCount++;
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(tripId, userId);
    const query = `
      UPDATE trips
      SET ${fields.join(', ')}
      WHERE id = $${paramCount} AND owner_id = $${paramCount + 1}
      RETURNING *
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(tripId, userId) {
    const query = `
      DELETE FROM trips
      WHERE id = $1 AND owner_id = $2
      RETURNING id
    `;
    const result = await pool.query(query, [tripId, userId]);
    return result.rows[0];
  }

  static async validateDates(startDate, endDate) {
    if (new Date(endDate) < new Date(startDate)) {
      throw new Error('End date must be after start date');
    }
    return true;
  }
}

module.exports = Trip;