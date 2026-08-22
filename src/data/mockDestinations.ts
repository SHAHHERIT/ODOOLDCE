import type { Destination } from "../types";

export const mockDestinations: Destination[] = [
  {
    id: "dest-santorini",
    city: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    description: "Whitewashed cliffs above a caldera turned volcanic sea.",
    coordinates: "36.3932° N, 25.4615° E",
  },
  {
    id: "dest-kyoto",
    city: "Kyoto",
    country: "Japan",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    description: "A thousand temples, and quiet still finds you in each one.",
    coordinates: "35.0116° N, 135.7681° E",
  },
  {
    id: "dest-reykjavik",
    city: "Reykjavik",
    country: "Iceland",
    image:
      "https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=1200&auto=format&fit=crop",
    description: "Glaciers, geysers, and skies that rarely sit still.",
    coordinates: "64.1466° N, 21.9426° W",
  },
  {
    id: "dest-marrakech",
    city: "Marrakech",
    country: "Morocco",
    image:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1200&auto=format&fit=crop",
    description: "Souks that spiral into color, and rooftop calls to prayer.",
    coordinates: "31.6295° N, 7.9811° W",
  },
];
