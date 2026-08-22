import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Wallet,
  Calendar as CalendarIcon,
  TrendingUp,
  Plus,
  Share2,
  MapPin,
  Sparkles,
} from "lucide-react";

import Timeline from "../components/Timeline";
import Button from "../components/Button";
import { mockTrips } from "../data/mockTrips";
import BackgroundVideo from "../components/BackgroundVideo";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Itinerary() {
  const { tripId } = useParams();

  const trip =
    mockTrips.find((t) => t.id === tripId) ?? mockTrips[0];

  return (
    <BackgroundVideo
      src="/videos/explore.mp4"
      className="min-h-screen"
    >
      {/* CINEMATIC OVERLAY */}
      <div className="min-h-screen bg-[#0D1224]/85">

        <main className="mx-auto max-w-6xl px-6 pb-28 pt-28 lg:px-10">

          {/* =================================================
              BACK NAVIGATION
          ================================================= */}

          <Link
            to="/trips"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#11172B]/60 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-[#C9A227]/50 hover:bg-[#C9A227]/10 hover:text-[#C9A227] hover:shadow-[0_0_25px_rgba(201,162,39,0.12)]"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to My Trips
          </Link>

          {/* =================================================
              HERO / TRIP HEADER
          ================================================= */}

          <section className="mt-10">

            <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

              <div className="max-w-4xl">

                {/* DESTINATION */}

                <div className="flex items-center gap-3">

                  <span className="h-px w-14 bg-gradient-to-r from-[#C9A227] to-transparent" />

                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#C9A227]">
                    {trip.destination}
                  </p>

                </div>

                {/* TITLE */}

                <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-ivory drop-shadow-2xl md:text-7xl lg:text-8xl">
                  {trip.name}
                </h1>

                {/* DESCRIPTION */}

                <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-white/40">

                  <MapPin
                    size={15}
                    className="text-[#C9A227]"
                  />

                  <span>
                    {trip.destination}
                  </span>

                  <span className="h-1 w-1 rounded-full bg-white/20" />

                  <span>
                    {formatDate(trip.startDate)} —{" "}
                    {formatDate(trip.endDate)}
                  </span>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-wrap gap-3">

                <Button
                  variant="secondary"
                  icon={<Plus size={14} />}
                >
                  Add City
                </Button>

                <Button
                  variant="primary"
                >
                  Edit Itinerary
                </Button>

              </div>

            </div>

            {/* SHARE LINK */}

            <div className="mt-8">

              <Link
                to={`/share/${trip.id}`}
                className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.19em] text-[#C9A227] transition-all duration-300 hover:text-[#e0bd48]"
              >

                <Share2
                  size={13}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                Preview public shared page

                <ArrowLeft
                  size={12}
                  className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

            </div>

          </section>

          {/* =================================================
              TRIP OVERVIEW
          ================================================= */}

          <section className="mt-14 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#11172B]/75 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl">

            {/* TOP LABEL */}

            <div className="border-b border-white/[0.08] bg-white/[0.015] px-6 py-5 md:px-8">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={14}
                  className="text-[#C9A227]"
                />

                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                  Trip overview
                </p>

              </div>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-1 divide-y divide-white/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">

              {/* DATES */}

              <div className="group relative overflow-hidden p-6 transition-all duration-500 hover:bg-white/[0.035] md:p-8">

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C9A227]/15 bg-[#C9A227]/[0.06] shadow-[0_0_25px_rgba(201,162,39,0.06)] transition-all duration-300 group-hover:border-[#C9A227]/30 group-hover:bg-[#C9A227]/10">

                    <CalendarIcon
                      size={18}
                      className="text-[#C9A227]"
                      strokeWidth={1.5}
                    />

                  </div>

                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/20">
                    Dates
                  </span>

                </div>

                <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.17em] text-white/35">
                  Travel period
                </p>

                <p className="mt-2 text-sm leading-6 text-ivory">
                  {formatDate(trip.startDate)}

                  <span className="mx-2 text-white/20">
                    —
                  </span>

                  {formatDate(trip.endDate)}
                </p>

              </div>

              {/* BUDGET */}

              <div className="group relative overflow-hidden p-6 transition-all duration-500 hover:bg-white/[0.035] md:p-8">

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C9A227]/15 bg-[#C9A227]/[0.06] shadow-[0_0_25px_rgba(201,162,39,0.06)] transition-all duration-300 group-hover:border-[#C9A227]/30 group-hover:bg-[#C9A227]/10">

                    <Wallet
                      size={18}
                      className="text-[#C9A227]"
                      strokeWidth={1.5}
                    />

                  </div>

                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/20">
                    Budget
                  </span>

                </div>

                <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.17em] text-white/35">
                  Total estimated
                </p>

                <p className="mt-2 font-display text-3xl tracking-tight text-ivory">
                  ${trip.budget.toLocaleString()}
                </p>

              </div>

              {/* PROGRESS */}

              <div className="group relative overflow-hidden p-6 transition-all duration-500 hover:bg-white/[0.035] md:p-8">

                <div className="flex items-start justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#C9A227]/15 bg-[#C9A227]/[0.06] shadow-[0_0_25px_rgba(201,162,39,0.06)] transition-all duration-300 group-hover:border-[#C9A227]/30 group-hover:bg-[#C9A227]/10">

                    <TrendingUp
                      size={18}
                      className="text-[#C9A227]"
                      strokeWidth={1.5}
                    />

                  </div>

                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/20">
                    Progress
                  </span>

                </div>

                <div className="mt-6 flex items-end justify-between">

                  <div>

                    <p className="text-[10px] font-medium uppercase tracking-[0.17em] text-white/35">
                      Journey complete
                    </p>

                    <p className="mt-2 font-display text-3xl tracking-tight text-ivory">
                      {trip.progress}%
                    </p>

                  </div>

                </div>

                {/* PROGRESS BAR */}

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.07] shadow-inner">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${trip.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-[#9C7915] via-[#C9A227] to-[#E4C45A] shadow-[0_0_14px_rgba(201,162,39,0.45)]"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              ITINERARY
          ================================================= */}

          <section className="mt-24">

            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <div className="flex items-center gap-3">

                  <span className="h-px w-8 bg-[#C9A227]" />

                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#C9A227]">
                    Journey plan
                  </p>

                </div>

                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ivory md:text-5xl">
                  Your Itinerary
                </h2>

                <p className="mt-3 max-w-lg text-sm leading-6 text-white/40">
                  Every stop, experience and destination along
                  your journey.
                </p>

              </div>

              {trip.itinerary && (

                <div className="flex items-center gap-2 rounded-full border border-[#C9A227]/15 bg-[#C9A227]/[0.05] px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/45 backdrop-blur-md">

                  <MapPin
                    size={12}
                    className="text-[#C9A227]"
                  />

                  {trip.itinerary.length} stops

                </div>

              )}

            </div>

            {trip.itinerary ? (

              <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#11172B]/65 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:p-10">

                {/* SUBTLE DECORATIVE GLOW */}

                <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[#C9A227]/[0.04] blur-3xl" />

                <div className="relative">
                  <Timeline
                    cities={trip.itinerary}
                  />
                </div>

              </div>

            ) : (

              <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-24 text-center backdrop-blur-md">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A227]/20 bg-[#C9A227]/5 shadow-[0_0_30px_rgba(201,162,39,0.08)]">

                  <MapPin
                    size={22}
                    className="text-[#C9A227]"
                  />

                </div>

                <p className="mt-6 font-display text-2xl text-ivory">
                  Your journey is waiting.
                </p>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
                  No cities have been added yet. Start building
                  your itinerary by adding your first destination.
                </p>

                <div className="mt-7">

                  <Button
                    variant="primary"
                    icon={<Plus size={14} />}
                  >
                    Add First City
                  </Button>

                </div>

              </div>

            )}

          </section>

          {/* =================================================
              BOTTOM CTA
          ================================================= */}

          <section className="relative mt-28 overflow-hidden border-t border-white/[0.08] pt-12">

            {/* DECORATIVE GLOW */}

            <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-[#C9A227]/[0.025] blur-3xl" />

            <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-end">

              <div>

                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#C9A227]">
                  Keep exploring
                </p>

                <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-ivory md:text-5xl">

                  One itinerary.

                  <span className="block text-white/30">
                    A thousand memories.
                  </span>

                </h2>

              </div>

              <Link
                to="/trips"
                className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition-all duration-300 hover:text-[#C9A227]"
              >

                View all trips

                <ArrowLeft
                  size={14}
                  className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>

            </div>

          </section>

        </main>

      </div>
    </BackgroundVideo>
  );
}