-- Create trip stops table
CREATE TABLE IF NOT EXISTS trip_stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    city_id VARCHAR(100) NOT NULL,
    city_name VARCHAR(255) NOT NULL,
    city_country VARCHAR(100) NOT NULL,
    city_lat DECIMAL(10, 8),
    city_lng DECIMAL(11, 8),
    stop_order INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_stop_dates CHECK (end_date >= start_date),
    CONSTRAINT unique_stop_order UNIQUE (trip_id, stop_order)
);

CREATE INDEX idx_trip_stops_trip_id ON trip_stops(trip_id);
CREATE INDEX idx_trip_stops_order ON trip_stops(trip_id, stop_order);
CREATE INDEX idx_trip_stops_dates ON trip_stops(start_date, end_date);

CREATE TRIGGER update_trip_stops_updated_at 
    BEFORE UPDATE ON trip_stops 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();