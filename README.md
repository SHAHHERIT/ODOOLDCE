# GlobeTrotter — Backend API

Node.js + Express API for the GlobeTrotter frontend (Dashboard, Itinerary,
Calendar/Timeline, Shared/Public view). Plain JSON-file storage — zero
external database to install, so it runs anywhere `node` runs.

Matches the frontend's `src/lib/api.ts` client exactly:
base URL `/api`, `Authorization: Bearer <token>` header, JSON in/out.

## Run it

```bash
npm install
npm run dev
```

Starts on `http://localhost:5000` (matches the frontend's Vite proxy:
`"/api": "http://localhost:5000"`). The database auto-seeds on first run.

Demo login (also the default values pre-filled in the frontend's Login
page):

```
email:    traveler@example.com
password: password
```

To reset the demo data at any time: delete `src/data/db.json` and restart
the server (or run `npm run seed`).

Copy `.env.example` to `.env` to override the port, JWT secret, etc.

## Data model

`src/data/db.json` (created from `src/data/seed.js`) holds:

- **users** — `id, name, email, passwordHash, createdAt`
- **trips** — `id, userId, name, destination, coverImage, startDate,
  endDate, budget, progress, status, travelerName, isPublic, itinerary[]`
  - **itinerary[].city** — `id, city, country, image, arrivalDate,
    departureDate, coordinates, activities[]`
    - **activities[]** — `id, name, time, description, cost`
- **destinations** — `id, city, country, image, description, coordinates`
- **recentActivity** — `id, text, timestamp, icon`

Every trip is scoped to a `userId`; all `/api/trips` routes only ever
read/write the logged-in user's own trips. The seeded trip ids
(`trip-europe-2026`, `trip-japan-2026`, `trip-morocco-2026`,
`trip-peru-2025`) intentionally match `src/data/mockTrips.ts` in the
frontend, so the frontend's "merge server trip with mock trip" logic in
`Dashboard.tsx` / `MyTrips.tsx` fills in the richer mock fields (images,
full itinerary) seamlessly against the real server response.

## API reference

All routes are prefixed with `/api`. Routes marked 🔒 require
`Authorization: Bearer <token>`.

### Auth

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/auth/register` | `{ name?, email, password }` | `{ token, user }` |
| POST | `/auth/login` | `{ email, password }` | `{ token, user }` |
| GET 🔒 | `/auth/me` | — | `{ user }` |

### Trips

| Method | Path | Body | Returns |
|---|---|---|---|
| GET 🔒 | `/trips` | — | `Trip[]` (current user only) |
| POST 🔒 | `/trips` | `{ name, destination, startDate, endDate, coverImage?, budget?, status?, travelerName? }` | `Trip` |
| GET 🔒 | `/trips/:tripId` | — | `Trip` |
| PUT 🔒 | `/trips/:tripId` | any subset of trip fields, incl. `isPublic` | `Trip` |
| DELETE 🔒 | `/trips/:tripId` | — | `204` |

### Cities (within a trip's itinerary)

| Method | Path | Body |
|---|---|---|
| POST 🔒 | `/trips/:tripId/cities` | `{ city, country?, image?, arrivalDate, departureDate, coordinates? }` |
| PUT 🔒 | `/trips/:tripId/cities/:cityId` | any subset of city fields |
| DELETE 🔒 | `/trips/:tripId/cities/:cityId` | — |

All three return the full updated `Trip`.

### Activities (within a city)

| Method | Path | Body |
|---|---|---|
| POST 🔒 | `/trips/:tripId/cities/:cityId/activities` | `{ name, time?, description?, cost? }` |
| PUT 🔒 | `/trips/:tripId/cities/:cityId/activities/:activityId` | any subset of activity fields |
| DELETE 🔒 | `/trips/:tripId/cities/:cityId/activities/:activityId` | — |

All three return the full updated `Trip`.

### Destinations (Explore page)

| Method | Path | Returns |
|---|---|---|
| GET | `/destinations` | `Destination[]` |
| GET | `/destinations/:id` | `Destination` |

### Shared / public itinerary

| Method | Path | Returns |
|---|---|---|
| GET | `/share/:tripId` | `Trip` — only if the trip's owner set `isPublic: true` via `PUT /trips/:tripId`; otherwise `404`. No auth required, read-only. |

### Recent activity (Dashboard)

| Method | Path | Returns |
|---|---|---|
| GET 🔒 | `/activity` | `RecentActivityItem[]` |

### Health check

| Method | Path | Returns |
|---|---|---|
| GET | `/health` | `{ status: "ok", timestamp }` |

## Wiring it to the frontend

The frontend already calls `GET /trips` from `Dashboard.tsx` and
`MyTrips.tsx` via `src/lib/api.ts`, and stores the JWT under the
`token` localStorage key on login — no frontend changes needed beyond
making sure a real login happens first (`Login.tsx` already posts to
`/auth/login`). To wire up the remaining pages:

- **Itinerary.tsx** currently reads from `mockTrips` — swap in
  `api.get(`/trips/${tripId}`)`.
- **SharedItinerary.tsx** currently reads from `mockTrips` — swap in
  `api.get(`/share/${tripId}`)` (no auth header needed/sent).
- **CalendarPage.tsx** currently reads from `mockTrips` — swap in
  `api.get("/trips")`, same as Dashboard/MyTrips.
- To make a trip visible on its public share link, `PUT /trips/:tripId`
  with `{ "isPublic": true }`.

## Project structure

```
server.js                    Express app entry point
src/
  db.js                      Tiny synchronous JSON-file data layer
  middleware/auth.js         JWT sign + requireAuth/optionalAuth middleware
  routes/
    auth.js                  register, login, me
    trips.js                 trips + nested cities + nested activities CRUD
    destinations.js          Explore page data
    share.js                 public read-only shared itinerary
    activity.js              recent activity feed
  utils/serialize.js         DB record -> frontend Trip/Destination shape
  data/
    seed.js                  writes db.json with demo user + 4 trips
    db.json                  generated on first run (gitignored)
```
