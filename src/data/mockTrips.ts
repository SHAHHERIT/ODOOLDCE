import type { Trip, RecentActivityItem } from "../types";

export const mockTrips: Trip[] = [
  {
    id: "trip-europe-2026",
    name: "Grand European Loop",
    destination: "Paris → Amsterdam → Rome",
    coverImage:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1400&auto=format&fit=crop",
    startDate: "2026-08-25",
    endDate: "2026-09-06",
    cities: 3,
    activities: 12,
    budget: 4200,
    progress: 68,
    status: "upcoming",
    travelerName: "Bhargav Shah",
    itinerary: [
      {
        id: "city-paris",
        city: "Paris",
        country: "France",
        image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
        arrivalDate: "2026-08-25",
        departureDate: "2026-08-28",
        coordinates: "48.8566° N, 2.3522° E",
        activities: [
          {
            id: "a1",
            name: "Eiffel Tower",
            time: "10:00 AM",
            description: "Summit access + sunset viewing deck.",
            cost: 45,
          },
          {
            id: "a2",
            name: "Louvre Museum",
            time: "2:00 PM",
            description: "Guided tour through the Denon wing.",
            cost: 30,
          },
          {
            id: "a3",
            name: "Seine River Cruise",
            time: "7:30 PM",
            description: "Evening cruise past the illuminated quais.",
            cost: 25,
          },
        ],
      },
      {
        id: "city-amsterdam",
        city: "Amsterdam",
        country: "Netherlands",
        image:
          "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?q=80&w=1200&auto=format&fit=crop",
        arrivalDate: "2026-08-28",
        departureDate: "2026-08-31",
        coordinates: "52.3676° N, 4.9041° E",
        activities: [
          {
            id: "a4",
            name: "Canal Tour",
            time: "9:00 AM",
            description: "Open-boat route through the Jordaan canals.",
            cost: 20,
          },
          {
            id: "a5",
            name: "Van Gogh Museum",
            time: "1:00 PM",
            description: "Self-paced visit, skip-the-line entry.",
            cost: 22,
          },
        ],
      },
      {
        id: "city-rome",
        city: "Rome",
        country: "Italy",
        image:
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop",
        arrivalDate: "2026-08-31",
        departureDate: "2026-09-06",
        coordinates: "41.9028° N, 12.4964° E",
        activities: [
          {
            id: "a6",
            name: "Colosseum & Forum",
            time: "9:30 AM",
            description: "Underground chambers access included.",
            cost: 38,
          },
          {
            id: "a7",
            name: "Trastevere Food Walk",
            time: "6:00 PM",
            description: "Evening tasting route through five stops.",
            cost: 55,
          },
        ],
      },
    ],
  },
  {
    id: "trip-japan-2026",
    name: "Kyoto Autumn Trail",
    destination: "Tokyo → Kyoto → Osaka",
    coverImage:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1400&auto=format&fit=crop",
    startDate: "2026-11-10",
    endDate: "2026-11-20",
    cities: 3,
    activities: 9,
    budget: 5100,
    progress: 32,
    status: "upcoming",
  },
  {
    id: "trip-morocco-2026",
    name: "Sahara & Souks",
    destination: "Marrakech → Fes",
    coverImage:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1400&auto=format&fit=crop",
    startDate: "2026-03-02",
    endDate: "2026-03-10",
    cities: 2,
    activities: 7,
    budget: 2300,
    progress: 100,
    status: "completed",
  },
  {
    id: "trip-peru-2025",
    name: "Andes Ascent",
    destination: "Lima → Cusco → Machu Picchu",
    coverImage:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1400&auto=format&fit=crop",
    startDate: "2025-06-14",
    endDate: "2025-06-24",
    cities: 3,
    activities: 11,
    budget: 3400,
    progress: 100,
    status: "completed",
  },
];

export const recentActivity: RecentActivityItem[] = [
  {
    id: "ra1",
    text: "Added Eiffel Tower to your Paris itinerary",
    timestamp: "2 hours ago",
    icon: "add",
  },
  {
    id: "ra2",
    text: "Updated the budget for Grand European Loop",
    timestamp: "Yesterday",
    icon: "budget",
  },
  {
    id: "ra3",
    text: "Added Amsterdam as a new stop",
    timestamp: "2 days ago",
    icon: "add",
  },
  {
    id: "ra4",
    text: "Shifted Rome arrival date by one day",
    timestamp: "4 days ago",
    icon: "update",
  },
];
