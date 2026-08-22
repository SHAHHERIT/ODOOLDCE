import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import TripCard from "../components/TripCard";
import { mockTrips } from "../data/mockTrips";
import type { Trip } from "../types";
import api from "../lib/api";

type Filter = "all" | "upcoming" | "completed";

export default function MyTrips() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    api
      .get<Trip[]>("/trips")
      .then((serverTrips) => {
        if (cancelled) return;
        // Backend only returns core fields; enrich with the richer mock
        // data (images, itinerary, etc.) when a matching trip id exists.
        const merged = serverTrips.map((t) => {
          const mock = mockTrips.find((m) => m.id === t.id);
          return mock ? { ...mock, ...t } : t;
        });
        setTrips(merged);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Could not load trips");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return trips.filter((t) => {
      const matchesFilter = filter === "all" ? true : t.status === filter;
      const matchesQuery =
        query.trim() === "" ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.destination.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [query, filter, trips]);

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-36 lg:px-10">
      <p className="eyebrow">Your journeys</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-ivory md:text-5xl">
        My Trips
      </h1>

      {error && (
        <p className="mt-4 text-sm text-red-300">
          Couldn't reach the server ({error}) — showing cached trips.
        </p>
      )}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trips or destinations"
            className="w-full rounded-full border border-white/10 bg-navy-800/60 py-2.5 pl-11 pr-4 text-sm text-ivory placeholder:text-muted focus:border-brass/50 focus:outline-none"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "upcoming", "completed"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? "bg-brass text-navy-deep"
                  : "border border-white/10 text-muted hover:text-ivory"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-20 text-center text-muted">
          No trips match your search yet — try a different destination.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onView={() => navigate(`/trips/${trip.id}`)}
              onEdit={() => navigate(`/trips/${trip.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
