export interface Activity {
  id: string;
  name: string;
  time: string;
  description: string;
  cost: number;
}

export interface ItineraryCity {
  id: string;
  city: string;
  country: string;
  image: string;
  arrivalDate: string;
  departureDate: string;
  coordinates: string; // e.g. "48.8566° N, 2.3522° E"
  activities: Activity[];
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  coverImage: string;
  startDate: string;
  endDate: string;
  cities: number;
  activities: number;
  budget: number;
  progress: number; // 0-100
  status: "upcoming" | "completed";
  travelerName?: string;
  itinerary?: ItineraryCity[];
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  image: string;
  description: string;
  coordinates: string;
}

export interface RecentActivityItem {
  id: string;
  text: string;
  timestamp: string;
  icon: "add" | "update" | "budget";
}
