<<<<<<< HEAD
# GlobeTrotter — Frontend UI

Premium travel-planning UI: Dashboard, My Trips, Trip Itinerary, Calendar,
and a public Shared Itinerary page. Built with React + TypeScript + Tailwind.

## Design system

- **Palette** — deep navy (`#0D1224`) base, aged-brass accent (`#C9A227`),
  teal for secondary data, ivory text. Evokes an old travel atlas rather
  than a generic SaaS dashboard.
- **Type** — Fraunces (display/headlines), Inter (body/UI), JetBrains Mono
  (coordinates, dates, data labels).
- **Signature element** — the dashed "route line" that runs down the spine
  of the itinerary timeline and calendar timeline view, echoing a route
  drawn across a paper map.

## Run it

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`. Build with `npm run build`.

## Structure

```
src/
  components/   Navbar, BackgroundVideo, TripCard, DestinationCard,
                StatCard, ActivityCard, Timeline, Calendar,
                PageTransition, Button, RoutePath
  pages/        Login (placeholder), Dashboard, MyTrips, Itinerary,
                Explore, CalendarPage, SharedItinerary
  data/         mockTrips.ts, mockDestinations.ts — swap for real API calls
  types/        shared TypeScript interfaces (Trip, ItineraryCity, Activity, Destination)
public/videos/hero.mp4   the cinematic hero background video
```

## Integrating with your existing project

This was built standalone since I didn't have your existing repo to inspect.
To merge it in:

1. **Replace `src/pages/Login.tsx`** with your team's real Login page and
   real auth — the one here is a placeholder stub only, clearly marked as
   such at the top of the file.
2. **Copy `src/components/`, `src/pages/` (except Login), `src/data/`,
   `src/types/`, `src/index.css`, and `tailwind.config.js`** into your
   existing project, adjusting import paths if your folder layout differs.
3. **Swap mock data for real API calls.** Every component takes data via
   props/TypeScript interfaces (see `src/types/index.ts`) — no component
   reaches into `mockTrips.ts` directly except the pages, so replacing
   `mockTrips` / `mockDestinations` with fetched data is a page-level change,
   not a component rewrite.
4. If your project already has Tailwind configured, merge the `theme.extend`
   block from `tailwind.config.js` into your existing config instead of
   overwriting it.

## Routes

| Path | Page |
|---|---|
| `/` , `/login` | Login (placeholder — replace with existing) |
| `/dashboard` | Dashboard (video hero, trips, stats, destinations, activity) |
| `/trips` | My Trips |
| `/trips/:tripId` | Trip Itinerary (editable view) |
| `/explore` | Explore Destinations |
| `/calendar` | Calendar / Timeline / List views |
| `/share/:tripId` | Public read-only Shared Itinerary |