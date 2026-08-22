// Converts an internal trip record (with userId/isPublic bookkeeping fields)
// into the shape the frontend's `Trip` TypeScript interface expects.
export function serializeTrip(trip) {
  const itinerary = trip.itinerary || [];
  const cities = itinerary.length;
  const activities = itinerary.reduce(
    (sum, city) => sum + (city.activities?.length || 0),
    0
  );

  return {
    id: trip.id,
    name: trip.name,
    destination: trip.destination,
    coverImage: trip.coverImage,
    startDate: trip.startDate,
    endDate: trip.endDate,
    cities,
    activities,
    budget: trip.budget,
    progress: trip.progress,
    status: trip.status,
    travelerName: trip.travelerName,
    itinerary,
  };
}

export function serializeTrips(trips) {
  return trips.map(serializeTrip);
}

export function serializeUser(user) {
  return { id: user.id, name: user.name, email: user.email };
}
