import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  MapPin,
  Plane,
  Wallet,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import BackgroundVideo from "../components/BackgroundVideo";
import Button from "../components/Button";
import TripCard from "../components/TripCard";
import DestinationCard from "../components/DestinationCard";
import StatCard from "../components/StatCard";
import ActivityCard from "../components/ActivityCard";

import { mockTrips, recentActivity } from "../data/mockTrips";
import { mockDestinations } from "../data/mockDestinations";

export default function Dashboard() {
  const navigate = useNavigate();

  const upcoming = mockTrips.filter(
    (trip) => trip.status === "upcoming"
  );

  return (
    <div className="bg-[#0D1224] text-ivory">

      {/* =====================================================
          HERO
      ===================================================== */}
      <BackgroundVideo
        src="/videos/hero.mp4"
        className="relative h-screen min-h-[680px]"
      >
        <div className="absolute inset-0 bg-[#0D1224]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0D1224]" />

        <div className="relative z-10 mx-auto flex h-screen min-h-[680px] max-w-7xl flex-col justify-center px-6 lg:px-10">

          {/* LOCATION */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#C9A227]" />

            <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#C9A227]">
              48.8566° N, 2.3522° E
            </p>

            <span className="text-xs text-white/30">
              — and everywhere else
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ivory md:text-7xl lg:text-8xl"
          >
            Your next
            <span className="block text-[#C9A227]">
              adventure
            </span>
            starts here.
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-7 max-w-xl text-base leading-7 text-white/60 md:text-lg"
          >
            Plan, organize and experience unforgettable journeys
            across multiple destinations — all in one place.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Button
              variant="primary"
              icon={<ArrowRight size={16} />}
              onClick={() => navigate("/trips")}
            >
              + Plan New Trip
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate("/explore")}
            >
              Explore Destinations
            </Button>
          </motion.div>

          {/* HERO MINI INFO */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 flex flex-wrap items-center gap-8 text-xs uppercase tracking-[0.2em] text-white/40"
          >
            <div className="flex items-center gap-2">
              <Compass size={14} className="text-[#C9A227]" />
              <span>{mockTrips.length} trips planned</span>
            </div>

            <div className="hidden h-4 w-px bg-white/10 sm:block" />

            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#C9A227]" />
              <span>
                {mockTrips.reduce((sum, trip) => sum + trip.cities, 0)} cities
              </span>
            </div>
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Scroll
            </span>
            <ChevronDown size={20} />
          </div>
        </motion.div>
      </BackgroundVideo>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="relative overflow-hidden">

        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9A227]/[0.035] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">

          {/* =================================================
              UPCOMING TRIPS
          ================================================= */}
          <section>
            <div className="mb-10 flex items-end justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C9A227]" />

                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#C9A227]">
                    In motion
                  </p>
                </div>

                <h2 className="mt-3 font-display text-3xl font-semibold text-ivory md:text-4xl">
                  Upcoming Trips
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  Your next chapters are already taking shape.
                </p>
              </div>

              <button
                onClick={() => navigate("/trips")}
                className="hidden items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-white/50 transition-all duration-300 hover:border-[#C9A227]/40 hover:text-[#C9A227] md:flex"
              >
                View all
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/30 hover:bg-white/[0.04]">
                    <TripCard
                      trip={trip}
                      onView={() => navigate(`/trips/${trip.id}`)}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* =================================================
              STATS
          ================================================= */}
          <section className="mt-24">

            <div className="mb-8">
              <div className="flex items-center gap-3">
                <Sparkles
                  size={15}
                  className="text-[#C9A227]"
                />

                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Your journey at a glance
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-1 transition-all hover:border-[#C9A227]/30">
                <StatCard
                  label="Total Trips"
                  value={mockTrips.length}
                  icon={Compass}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-1 transition-all hover:border-[#C9A227]/30">
                <StatCard
                  label="Cities Planned"
                  value={mockTrips.reduce(
                    (sum, trip) => sum + trip.cities,
                    0
                  )}
                  icon={MapPin}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-1 transition-all hover:border-[#C9A227]/30">
                <StatCard
                  label="Upcoming Trips"
                  value={upcoming.length}
                  icon={Plane}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-1 transition-all hover:border-[#C9A227]/30">
                <StatCard
                  label="Est. Total Spending"
                  value={mockTrips.reduce(
                    (sum, trip) => sum + trip.budget,
                    0
                  )}
                  prefix="$"
                  icon={Wallet}
                />
              </div>
            </div>
          </section>

          {/* =================================================
              POPULAR DESTINATIONS
          ================================================= */}
          <section className="mt-28">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C9A227]" />

                  <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
                    Where next
                  </p>
                </div>

                <h2 className="mt-3 font-display text-3xl font-semibold text-ivory md:text-4xl">
                  Popular Destinations
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-white/40">
                  Places travelers are dreaming about right now.
                </p>
              </div>

              <button
                onClick={() => navigate("/explore")}
                className="flex w-fit items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-[#C9A227]"
              >
                Explore all
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mockDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                  }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227]/30"
                >
                  <DestinationCard destination={destination} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* =================================================
              RECENT ACTIVITY
          ================================================= */}
          <section className="mt-28">

            <div className="flex items-end justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-[#C9A227]" />

                  <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
                    Log
                  </p>
                </div>

                <h2 className="mt-3 font-display text-3xl font-semibold text-ivory md:text-4xl">
                  Recent Activity
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  A timeline of your latest travel planning.
                </p>
              </div>

              <div className="hidden rounded-full border border-white/10 px-4 py-2 text-xs text-white/40 md:block">
                LIVE LOG
              </div>
            </div>

            <div className="mt-8 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-sm">

              <div className="border-b border-white/10 px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#C9A227]" />

                  <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Activity stream
                  </span>
                </div>
              </div>

              <div className="px-6">
                {recentActivity.map((item) => (
                  <ActivityCard
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              FOOTER STATEMENT
          ================================================= */}
          <section className="mt-32 border-t border-white/10 pt-12">

            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
                  GlobeTrotter
                </p>

                <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-tight text-ivory md:text-5xl">
                  The world is waiting.
                  <span className="block text-white/30">
                    Start planning.
                  </span>
                </h2>
              </div>

              <button
                onClick={() => navigate("/trips")}
                className="flex w-fit items-center gap-3 rounded-full border border-[#C9A227]/40 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#C9A227] transition-all duration-300 hover:bg-[#C9A227] hover:text-[#0D1224]"
              >
                Plan your journey
                <ArrowRight size={15} />
              </button>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}