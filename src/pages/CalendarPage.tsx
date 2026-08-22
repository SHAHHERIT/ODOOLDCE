import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  ListTree,
  List as ListIcon,
  MapPin,
  Sparkles,
} from "lucide-react";

import Calendar from "../components/Calendar";
import BackgroundVideo from "../components/BackgroundVideo";
import { mockTrips } from "../data/mockTrips";

type View = "calendar" | "timeline" | "list";

const viewTabs: {
  id: View;
  label: string;
  icon: typeof CalendarDays;
}[] = [
  {
    id: "calendar",
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: ListTree,
  },
  {
    id: "list",
    label: "List",
    icon: ListIcon,
  },
];

function formatRange(start: string, end: string) {
  const s = new Date(start).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const e = new Date(end).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${s} – ${e}`;
}

export default function CalendarPage() {
  const [view, setView] = useState<View>("calendar");

  const sorted = [...mockTrips].sort(
    (a, b) =>
      new Date(a.startDate).getTime() -
      new Date(b.startDate).getTime()
  );

  return (
    <BackgroundVideo
  src="/videos/hero.mp4"
  overlay="hero"
  className="relative min-h-screen"
>
      {/* =====================================================
          SAME VIDEO OVERLAY STYLE AS DASHBOARD
      ===================================================== */}

      <div className="absolute inset-0 bg-[#0D1224]/55" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0D1224]" />

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-32 lg:px-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="max-w-4xl">

          {/* EYEBROW */}

          <div className="flex items-center gap-3">

            <span className="h-px w-14 bg-gradient-to-r from-[#C9A227] to-transparent" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#C9A227]">
              Your schedule
            </p>

          </div>

          <div className="mt-6 flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <div>

              {/* TITLE */}

              <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-ivory drop-shadow-2xl md:text-7xl lg:text-8xl">

                Travel

                <span className="block text-[#C9A227]">
                  Calendar
                </span>

              </h1>

              {/* DESCRIPTION */}

              <p className="mt-7 max-w-xl text-base leading-7 text-white/60 md:text-lg">
                Keep every journey, destination and important travel
                moment organized in one place.
              </p>

            </div>

            {/* TRIP COUNT */}

            <div className="hidden rounded-[1.5rem] border border-white/10 bg-black/20 px-7 py-6 shadow-2xl backdrop-blur-xl md:block">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={14}
                  className="text-[#C9A227]"
                />

                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Planned journeys
                </span>

              </div>

              <p className="mt-2 font-display text-4xl text-ivory">
                {mockTrips.length}
              </p>

            </div>

          </div>

        </section>

        {/* =================================================
            VIEW SWITCHER
        ================================================= */}

        <section className="mt-14">

          <div className="inline-flex rounded-2xl border border-white/10 bg-black/25 p-1.5 shadow-2xl backdrop-blur-xl">

            {viewTabs.map((tab) => {

              const Icon = tab.icon;
              const active = view === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  className={`relative flex items-center gap-2 rounded-xl px-5 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                    active
                      ? "bg-[#C9A227] text-[#0D1224] shadow-lg shadow-[#C9A227]/20"
                      : "text-white/45 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >

                  <Icon size={15} />

                  <span>
                    {tab.label}
                  </span>

                </button>
              );

            })}

          </div>

        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <AnimatePresence mode="wait">

          <motion.div
            key={view}
            initial={{
              opacity: 0,
              y: 15,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -15,
              filter: "blur(4px)",
            }}
            transition={{
              duration: 0.35,
            }}
            className="mt-10"
          >

            {/* =================================================
                CALENDAR VIEW
            ================================================= */}

            {view === "calendar" && (

              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#11172B]/60 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-7">

                <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-6">

                  <div>

                    <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C9A227]">
                      Monthly view
                    </p>

                    <p className="mt-1.5 text-sm text-white/40">
                      Your trips at a glance
                    </p>

                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#C9A227]/20 bg-[#C9A227]/[0.06]">

                    <CalendarDays
                      size={17}
                      className="text-[#C9A227]"
                    />

                  </div>

                </div>

                <Calendar trips={mockTrips} />

              </div>

            )}

            {/* =================================================
                TIMELINE VIEW
            ================================================= */}

            {view === "timeline" && (

              <div className="rounded-[2rem] border border-white/10 bg-[#11172B]/60 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-10">

                <div className="mb-10 border-b border-white/10 pb-7">

                  <div className="flex items-center gap-3">

                    <span className="h-px w-8 bg-[#C9A227]" />

                    <p className="text-[10px] font-medium uppercase tracking-[0.27em] text-[#C9A227]">
                      Journey timeline
                    </p>

                  </div>

                  <h2 className="mt-3 font-display text-3xl tracking-tight text-ivory md:text-4xl">
                    Your travel story
                  </h2>

                  <p className="mt-2 text-sm text-white/40">
                    Follow every destination in chronological order.
                  </p>

                </div>

                <div className="relative pl-8 md:pl-12">

                  {/* TIMELINE LINE */}

                  <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-[#C9A227] via-[#C9A227]/30 to-transparent md:left-[11px]" />

                  <div className="space-y-10">

                    {sorted.map((trip, index) => (

                      <motion.div
                        key={trip.id}
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.08,
                        }}
                        className="group relative"
                      >

                        {/* DOT */}

                        <div className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#C9A227] bg-[#0D1224] shadow-[0_0_15px_rgba(201,162,39,0.2)] md:-left-[37px]">

                          <div className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />

                        </div>

                        {/* DATE */}

                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#C9A227]">
                          {formatRange(
                            trip.startDate,
                            trip.endDate
                          )}
                        </p>

                        {/* TRIP CARD */}

                        <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-all duration-500 group-hover:border-[#C9A227]/30 group-hover:bg-white/[0.045]">

                          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                            <div>

                              <p className="font-display text-xl text-ivory">
                                {trip.name}
                              </p>

                              <p className="mt-2 flex items-center gap-2 text-sm text-white/45">

                                <MapPin
                                  size={13}
                                  className="text-[#C9A227]"
                                />

                                {trip.destination}

                              </p>

                            </div>

                            <div className="w-fit rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-[9px] uppercase tracking-[0.17em] text-white/35">

                              Trip{" "}
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}

                            </div>

                          </div>

                        </div>

                      </motion.div>

                    ))}

                  </div>

                </div>

              </div>

            )}

            {/* =================================================
                LIST VIEW
            ================================================= */}

            {view === "list" && (

              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#11172B]/60 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-xl">

                {/* LIST HEADER */}

                <div className="border-b border-white/10 bg-white/[0.015] px-6 py-7 md:px-8">

                  <div className="flex items-center justify-between gap-4">

                    <div>

                      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C9A227]">
                        All journeys
                      </p>

                      <h2 className="mt-2 font-display text-3xl text-ivory">
                        Trip schedule
                      </h2>

                    </div>

                    <div className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-white/40">

                      {sorted.length} trips

                    </div>

                  </div>

                </div>

                {/* LIST */}

                <div className="divide-y divide-white/[0.06]">

                  {sorted.map((trip, index) => (

                    <motion.div
                      key={trip.id}
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                      }}
                      className="group flex flex-col gap-5 px-6 py-7 transition-all duration-500 hover:bg-white/[0.025] sm:flex-row sm:items-center sm:justify-between md:px-8"
                    >

                      <div className="flex items-center gap-4">

                        {/* NUMBER */}

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] text-[10px] text-white/35 transition-all duration-300 group-hover:border-[#C9A227]/30 group-hover:bg-[#C9A227]/[0.05] group-hover:text-[#C9A227]">

                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}

                        </div>

                        <div>

                          <p className="font-display text-xl text-ivory">
                            {trip.name}
                          </p>

                          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/40">

                            <MapPin
                              size={12}
                              className="text-[#C9A227]"
                            />

                            {trip.destination}

                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">

                        <span className="text-[9px] uppercase tracking-[0.17em] text-white/25">
                          Dates
                        </span>

                        <p className="font-mono text-[11px] text-white/55">
                          {formatRange(
                            trip.startDate,
                            trip.endDate
                          )}
                        </p>

                      </div>

                    </motion.div>

                  ))}

                </div>

              </div>

            )}

          </motion.div>

        </AnimatePresence>

        {/* =================================================
            BOTTOM MESSAGE
        ================================================= */}

        <section className="mt-28 border-t border-white/10 pt-12">

          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

            <div>

              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#C9A227]">
                Every date has a destination
              </p>

              <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-ivory md:text-5xl">

                Plan the journey.

                <span className="block text-white/30">
                  Then let the journey happen.
                </span>

              </h2>

            </div>

            <p className="max-w-xs text-sm leading-6 text-white/35 md:text-right">
              Keep your adventures organized without losing the
              excitement of what comes next.
            </p>

          </div>

        </section>

      </main>
    </BackgroundVideo>
  );
}