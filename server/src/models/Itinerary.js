const { pool } = require('../config/database');

class Itinerary {
  // Get itinerary grouped by day (Dates/Order - P0)
  static async getItineraryByTrip(tripId) {
    const query = `
      WITH trip_data AS (
        SELECT start_date, end_date
        FROM trips
        WHERE id = $1
      ),
      date_series AS (
        SELECT generate_series(
          (SELECT start_date FROM trip_data),
          (SELECT end_date FROM trip_data),
          '1 day'::interval
        )::date as date
      )
      SELECT 
        ds.date,
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
              'startDate', ts.start_date,
              'endDate', ts.end_date
            )
            ORDER BY ts.stop_order
          ) FILTER (WHERE ts.id IS NOT NULL),
          '[]'::json
        ) as stops,
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'stopId', ts.id,
              'activityId', a.id,
              'name', a.name,
              'time', a.activity_time,
              'cost', a.cost
            )
          ) FILTER (WHERE a.id IS NOT NULL),
          '[]'::json
        ) as activities
      FROM date_series ds
      LEFT JOIN trip_stops ts ON ts.trip_id = $1 
        AND ds.date BETWEEN ts.start_date AND ts.end_date
      LEFT JOIN activities a ON a.stop_id = ts.id
      GROUP BY ds.date
      ORDER BY ds.date
    `;
    
    const result = await pool.query(query, [tripId]);

    // PostgreSQL returns date columns as JS Date objects.
    // Serialize to plain YYYY-MM-DD strings so the client can use them directly.
    return result.rows.map(row => ({
      ...row,
      date: row.date instanceof Date
        ? row.date.toISOString().slice(0, 10)
        : row.date
    }));
  }

  // Get timeline data (Dates/Order - P0)
  static async getTimeline(tripId) {
    const stopsQuery = `
      SELECT 
        ts.id,
        ts.city_name as "cityName",
        ts.start_date as "startDate",
        ts.end_date as "endDate",
        COALESCE(
          json_agg(
            json_build_object(
              'id', a.id,
              'name', a.name,
              'time', a.activity_time
            )
          ) FILTER (WHERE a.id IS NOT NULL),
          '[]'::json
        ) as activities
      FROM trip_stops ts
      LEFT JOIN activities a ON a.stop_id = ts.id
      WHERE ts.trip_id = $1
      GROUP BY ts.id
      ORDER BY ts.stop_order
    `;
    
    const stopsResult = await pool.query(stopsQuery, [tripId]);
    
    // Get date range
    const dateQuery = `
      SELECT 
        start_date as "startDate",
        end_date as "endDate",
        array_agg(generate_series) as dates
      FROM (
        SELECT 
          start_date,
          end_date,
          generate_series(start_date, end_date, '1 day'::interval)::date
        FROM trips
        WHERE id = $1
      ) s
      GROUP BY start_date, end_date
    `;
    const datesResult = await pool.query(dateQuery, [tripId]);
    
    let dates = [];
    if (datesResult.rows.length > 0) {
      dates = datesResult.rows[0].dates.map(d =>
        d instanceof Date ? d.toISOString().slice(0, 10) : String(d)
      );
    }
    
    return {
      dates,
      stops: stopsResult.rows
    };
  }
}

module.exports = Itinerary;