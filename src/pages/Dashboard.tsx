import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, MapPin, Plane, Wallet, ChevronDown } from "lucide-react";
import BackgroundVideo from "../components/BackgroundVideo";
import Button from "../components/Button";
import TripCard from "../components/TripCard";
import DestinationCard from "../components/DestinationCard";
import StatCard from "../components/StatCard";
import ActivityCard from "../components/ActivityCard";
import { mockTrips, recentActivity } from "../data/mockTrips";
import { mockDestinations } from "../data/mockDestinations";
import type { Trip } from "../types";
import api from "../lib/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>(mockTrips);

  useEffect(() => {
    let cancelled = false;
    api
      .get<Trip[]>("/trips")
      .then((serverTrips) => {
        if (cancelled) return;
        const merged = serverTrips.map((t) => {
          const mock = mockTrips.find((m) => m.id === t.id);
          return mock ? { ...mock, ...t } : t;
        });
        setTrips(merged);
      })
      .catch(() => {
        // Fall back silently to mock data — MyTrips surfaces the error.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const upcoming = trips.filter((t) => t.status === "upcoming");

  return (
    <div>
      {/* HERO */}
      <BackgroundVideo src="/videos/hero.mp4" className="h-screen min-h-[640px]">
        <div className="mx-auto flex h-screen min-h-[640px] max-w-7xl flex-col justify-center px-6 lg:px-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            48.8566° N, 2.3522° E — and everywhere else
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 max-w-2xl font-display text-5xl font-semibold leading-[1.08] text-ivory md:text-7xl"
          >
            Your next adventure starts here.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg text-muted"
          >
            Plan, organize and experience unforgettable journeys across
            multiple destinations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              variant="primary"
              icon={<ArrowRight size={16} />}
              onClick={() => navigate("/trips")}
            >
              + Plan New Trip
            </Button>
            <Button variant="secondary" onClick={() => navigate("/explore")}>
              Explore Destinations
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted"
        >
          <ChevronDown size={22} />
        </motion.div>
      </BackgroundVideo>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        {/* UPCOMING TRIPS */}
        <section>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="eyebrow">In motion</p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-ivory">
                Upcoming Trips
              </h2>
            </div>
            <button
              onClick={() => navigate("/trips")}
              className="hidden items-center gap-1 text-sm text-muted transition-colors hover:text-brass md:flex"
            >
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onView={() => navigate(`/trips/${trip.id}`)}
              />
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="mt-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Trips" value={trips.length} icon={Compass} />
            <StatCard
              label="Cities Planned"
              value={trips.reduce((s, t) => s + t.cities, 0)}
              icon={MapPin}
            />
            <StatCard label="Upcoming Trips" value={upcoming.length} icon={Plane} />
            <StatCard
              label="Est. Total Spending"
              value={trips.reduce((s, t) => s + t.budget, 0)}
              prefix="$"
              icon={Wallet}
            />
          </div>
        </section>

        {/* POPULAR DESTINATIONS */}
        <section className="mt-24">
          <p className="eyebrow">Where next</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ivory">
            Popular Destinations
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mockDestinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="mt-24">
          <p className="eyebrow">Log</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ivory">
            Recent Activity
          </h2>
          <div className="card-base mt-8 max-w-2xl px-6">
            {recentActivity.map((item) => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
