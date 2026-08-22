import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Compass, Sparkles } from "lucide-react";

import TripCard from "../components/TripCard";
import { mockTrips } from "../data/mockTrips";
import BackgroundVideo from "../components/BackgroundVideo";

type Filter = "all" | "upcoming" | "completed";

export default function MyTrips() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    return mockTrips.filter((t) => {
      const matchesFilter =
        filter === "all" ? true : t.status === filter;

      const matchesQuery =
        query.trim() === "" ||
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.destination.toLowerCase().includes(query.toLowerCase());

      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <BackgroundVideo
      src="/videos/explore.mp4"
      className="min-h-screen"
    >
      <div className="min-h-screen bg-[#0D1224]/82">

        <main className="mx-auto max-w-7xl px-6 pb-28 pt-32 lg:px-10">

          {/* =================================================
              HEADER
          ================================================= */}
          <section className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9A227]" />

                <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#C9A227]">
                  Your journeys
                </p>
              </div>

              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-ivory md:text-7xl">
                My
                <span className="text-[#C9A227]"> Trips</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/50 md:text-lg">
                Every destination you've planned, every journey
                you've completed, all in one place.
              </p>

            </div>

            {/* TRIP COUNT */}
            <div className="hidden rounded-2xl border border-white/10 bg-black/20 px-6 py-5 backdrop-blur-xl sm:block">

              <div className="flex items-center gap-2">
                <Compass
                  size={14}
                  className="text-[#C9A227]"
                />

                <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">
                  Total journeys
                </span>
              </div>

              <p className="mt-2 font-display text-3xl text-ivory">
                {mockTrips.length}
              </p>

            </div>

          </section>

          {/* =================================================
              SEARCH + FILTERS
          ================================================= */}
          <section className="mt-12 rounded-3xl border border-white/10 bg-[#11172B]/70 p-4 shadow-2xl backdrop-blur-xl md:p-5">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              {/* SEARCH */}
              <div className="relative w-full lg:max-w-md">

                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search trips or destinations"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-ivory outline-none transition-all duration-300 placeholder:text-white/25 focus:border-[#C9A227]/50 focus:bg-black/30 focus:ring-2 focus:ring-[#C9A227]/5"
                />

              </div>

              {/* FILTERS */}
              <div className="flex w-full gap-2 overflow-x-auto lg:w-auto">

                {(["all", "upcoming", "completed"] as Filter[]).map(
                  (f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`whitespace-nowrap rounded-xl px-5 py-3 text-xs font-medium capitalize transition-all duration-300 ${
                        filter === f
                          ? "bg-[#C9A227] text-[#0D1224] shadow-lg shadow-[#C9A227]/10"
                          : "border border-white/10 bg-white/[0.02] text-white/40 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* RESULT INFO */}
            <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-4">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={12}
                  className="text-[#C9A227]"
                />

                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                  Showing {filtered.length}{" "}
                  {filtered.length === 1 ? "journey" : "journeys"}
                </p>

              </div>

              {query && (
                <p className="text-xs text-white/25">
                  Search: "{query}"
                </p>
              )}

            </div>

          </section>

          {/* =================================================
              TRIP GRID
          ================================================= */}
          {filtered.length === 0 ? (

            <div className="mt-16 rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-24 text-center backdrop-blur-md">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A227]/20 bg-[#C9A227]/5">

                <Search
                  size={22}
                  className="text-[#C9A227]"
                />

              </div>

              <h2 className="mt-6 font-display text-2xl text-ivory">
                No journeys found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/35">
                No trips match your current search or filter.
                Try another destination or change the filter.
              </p>

            </div>

          ) : (

            <section className="mt-10">

              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

                {filtered.map((trip, index) => (

                  <div
                    key={trip.id}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-[#11172B]/70 shadow-xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227]/30 hover:shadow-2xl"
                  >

                    {/* CARD TOP LABEL */}
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">

                      <div className="flex items-center gap-2">

                        <span className="h-1.5 w-1.5 rounded-full bg-[#C9A227]" />

                        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                          Journey
                        </span>

                      </div>

                      <span className="font-mono text-[10px] text-white/20">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>

                    {/* EXISTING TRIP CARD */}
                    <div className="transition-transform duration-500 group-hover:scale-[1.01]">

                      <TripCard
                        trip={trip}
                        onView={() =>
                          navigate(`/trips/${trip.id}`)
                        }
                        onEdit={() =>
                          navigate(`/trips/${trip.id}`)
                        }
                      />

                    </div>

                    {/* GOLD HOVER LINE */}
                    <div className="h-[2px] w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-full" />

                  </div>

                ))}

              </div>

            </section>

          )}

          {/* =================================================
              BOTTOM STATEMENT
          ================================================= */}
          <section className="mt-28 border-t border-white/10 pt-10">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-[#C9A227]">
                  Your travel archive
                </p>

                <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-ivory md:text-4xl">
                  Every trip starts with
                  <span className="text-white/35">
                    {" "}a destination.
                  </span>
                </h2>

              </div>

              <p className="max-w-sm text-sm leading-6 text-white/30 md:text-right">
                Keep your adventures organized, revisit your
                memories and plan where you're going next.
              </p>

            </div>

          </section>

        </main>

      </div>
    </BackgroundVideo>
  );
}