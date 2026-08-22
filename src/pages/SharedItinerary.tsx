import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Link2,
  Share2,
  Check,
  Compass,
  MapPin,
  CalendarDays,
  Wallet,
  Sparkles,
} from "lucide-react";

import BackgroundVideo from "../components/BackgroundVideo";
import Timeline from "../components/Timeline";
import Button from "../components/Button";
import { mockTrips } from "../data/mockTrips";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SharedItinerary() {
  const { tripId } = useParams();

  const trip =
    mockTrips.find((t) => t.id === tripId) ?? mockTrips[0];

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const duration = Math.round(
    (new Date(trip.endDate).getTime() -
      new Date(trip.startDate).getTime()) /
      86400000
  );

  return (
    <div className="min-h-screen bg-[#0D1224] text-ivory">

      {/* =====================================================
          HERO
      ===================================================== */}
      <BackgroundVideo
        src="/videos/hero.mp4"
        className="relative min-h-[650px] h-[78vh]"
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-[#0D1224]/50" />

        {/* CINEMATIC GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1224] via-[#0D1224]/20 to-black/10" />

        <div className="relative z-10 mx-auto flex h-[78vh] min-h-[650px] max-w-6xl flex-col justify-end px-6 pb-16 lg:px-10 lg:pb-20">

          {/* SHARED LABEL */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10">
              <Compass
                size={17}
                className="text-[#C9A227]"
                strokeWidth={1.5}
              />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227]">
                Shared itinerary
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/30">
                GlobeTrotter journey
              </p>
            </div>

          </div>

          {/* TITLE */}
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ivory md:text-7xl lg:text-8xl">
            {trip.name}
          </h1>

          {/* TRIP DETAILS */}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-white/50">

            <span className="flex items-center gap-2">
              <MapPin
                size={14}
                className="text-[#C9A227]"
              />

              {trip.destination}
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />

            <span className="flex items-center gap-2">
              <CalendarDays
                size={14}
                className="text-[#C9A227]"
              />

              {formatDate(trip.startDate)}
              {" – "}
              {formatDate(trip.endDate)}
            </span>

          </div>

          {/* TRAVELER */}
          <p className="mt-3 text-sm text-white/35">
            {trip.travelerName
              ? `Planned by ${trip.travelerName}`
              : "A GlobeTrotter journey"}
          </p>

          {/* ACTIONS */}
          <div className="mt-9 flex flex-wrap gap-3">

            <Button
              variant="primary"
              icon={
                copied ? (
                  <Check size={15} />
                ) : (
                  <Link2 size={15} />
                )
              }
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy Link"}
            </Button>

            <Button
              variant="secondary"
              icon={<Share2 size={15} />}
            >
              Share Trip
            </Button>

          </div>

        </div>
      </BackgroundVideo>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="relative">

        {/* DECORATIVE GLOW */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#C9A227]/[0.035] blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6 py-20 lg:px-10">

          {/* =================================================
              TRIP OVERVIEW
          ================================================= */}
          <section>

            <div className="mb-8 flex items-center gap-3">

              <span className="h-px w-8 bg-[#C9A227]" />

              <div className="flex items-center gap-2">

                <Sparkles
                  size={13}
                  className="text-[#C9A227]"
                />

                <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
                  Journey overview
                </p>

              </div>

            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#11172B]/75 shadow-2xl backdrop-blur-xl">

              <div className="grid grid-cols-2 divide-x divide-y divide-white/10 sm:grid-cols-4 sm:divide-y-0">

                {/* CITIES */}
                <div className="group p-6 transition-colors hover:bg-white/[0.025] md:p-7">

                  <div className="flex items-center justify-between">

                    <MapPin
                      size={18}
                      className="text-[#C9A227]"
                      strokeWidth={1.5}
                    />

                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                      01
                    </span>

                  </div>

                  <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/35">
                    Cities
                  </p>

                  <p className="mt-2 font-display text-3xl text-ivory">
                    {trip.cities}
                  </p>

                </div>

                {/* ACTIVITIES */}
                <div className="group p-6 transition-colors hover:bg-white/[0.025] md:p-7">

                  <div className="flex items-center justify-between">

                    <Sparkles
                      size={18}
                      className="text-[#C9A227]"
                    />

                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                      02
                    </span>

                  </div>

                  <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/35">
                    Activities
                  </p>

                  <p className="mt-2 font-display text-3xl text-ivory">
                    {trip.activities}
                  </p>

                </div>

                {/* DURATION */}
                <div className="group p-6 transition-colors hover:bg-white/[0.025] md:p-7">

                  <div className="flex items-center justify-between">

                    <CalendarDays
                      size={18}
                      className="text-[#C9A227]"
                    />

                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                      03
                    </span>

                  </div>

                  <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/35">
                    Duration
                  </p>

                  <p className="mt-2 font-display text-3xl text-ivory">
                    {duration}
                    <span className="ml-1 text-sm text-white/30">
                      days
                    </span>
                  </p>

                </div>

                {/* BUDGET */}
                <div className="group p-6 transition-colors hover:bg-white/[0.025] md:p-7">

                  <div className="flex items-center justify-between">

                    <Wallet
                      size={18}
                      className="text-[#C9A227]"
                    />

                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                      04
                    </span>

                  </div>

                  <p className="mt-6 text-[10px] uppercase tracking-[0.18em] text-white/35">
                    Budget
                  </p>

                  <p className="mt-2 font-display text-3xl text-ivory">
                    ${trip.budget.toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              ITINERARY
          ================================================= */}
          {trip.itinerary && (
            <section className="mt-24">

              <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">

                <div>

                  <div className="flex items-center gap-3">

                    <span className="h-px w-8 bg-[#C9A227]" />

                    <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
                      The journey
                    </p>

                  </div>

                  <h2 className="mt-3 font-display text-3xl font-semibold text-ivory md:text-4xl">
                    Itinerary
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/40">
                    Follow the journey from the first destination
                    to the final stop.
                  </p>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2">

                  <MapPin
                    size={12}
                    className="text-[#C9A227]"
                  />

                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/35">
                    {trip.itinerary.length} stops
                  </span>

                </div>

              </div>

              <div className="rounded-3xl border border-white/10 bg-[#11172B]/65 p-5 shadow-2xl backdrop-blur-xl md:p-8">

                <Timeline
                  cities={trip.itinerary}
                />

              </div>

            </section>
          )}

          {/* =================================================
              SHARE CTA
          ================================================= */}
          <section className="mt-24 overflow-hidden rounded-3xl border border-[#C9A227]/20 bg-gradient-to-br from-[#C9A227]/10 via-transparent to-transparent p-8 md:p-12">

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
                  GlobeTrotter
                </p>

                <h2 className="mt-3 max-w-xl font-display text-3xl leading-tight text-ivory md:text-4xl">
                  Every journey deserves
                  <span className="block text-white/40">
                    to be remembered.
                  </span>
                </h2>

              </div>

              <button
                onClick={handleCopy}
                className="group flex shrink-0 items-center gap-3 rounded-full border border-[#C9A227]/40 px-6 py-3 text-xs uppercase tracking-[0.18em] text-[#C9A227] transition-all duration-300 hover:bg-[#C9A227] hover:text-[#0D1224]"
              >

                {copied ? (
                  <>
                    <Check size={14} />
                    Link Copied
                  </>
                ) : (
                  <>
                    <Link2 size={14} />
                    Share This Journey
                  </>
                )}

              </button>

            </div>

          </section>

          {/* =================================================
              FOOTER
          ================================================= */}
          <footer className="mt-16 border-t border-white/10 pt-8 text-center">

            <div className="flex items-center justify-center gap-3">

              <Compass
                size={14}
                className="text-[#C9A227]"
              />

              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
                Made with GlobeTrotter
              </p>

            </div>

          </footer>

        </div>
      </main>

    </div>
  );
}