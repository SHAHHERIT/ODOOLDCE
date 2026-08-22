import BackgroundVideo from "../components/BackgroundVideo";
import DestinationCard from "../components/DestinationCard";
import { mockDestinations } from "../data/mockDestinations";

export default function Explore() {
  return (
    <BackgroundVideo
      src="/videos/explore.mp4"
      className="min-h-screen"
    >
      <div className="min-h-screen bg-[#0D1224]/75">
        <div className="mx-auto max-w-7xl px-6 pb-28 pt-32 lg:px-10">

          {/* HEADER */}
          <section className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#C9A227]" />
              <p className="eyebrow text-[#C9A227]">
                FIELD NOTES
              </p>
            </div>

            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ivory md:text-7xl">
              Find somewhere
              <span className="block text-[#C9A227]">
                worth going.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-white/65 md:text-lg">
              Discover remarkable places, hidden corners and unforgettable
              destinations curated for travelers who prefer experiences over
              ordinary itineraries.
            </p>
          </section>

          {/* DESTINATION INTRO BAR */}
          <section className="mt-16">
            <div className="flex flex-col justify-between gap-5 border-y border-white/10 py-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Curated destinations
                </p>

                <p className="mt-2 text-sm text-white/60">
                  Places waiting to become your next story.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#C9A227]/30 bg-[#C9A227]/10 px-4 py-2 text-xs font-medium tracking-wide text-[#C9A227]">
                  {mockDestinations.length} destinations
                </span>
              </div>
            </div>
          </section>

          {/* DESTINATION GRID */}
          <section className="mt-10">
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {mockDestinations.map((destination, index) => (
                <div
                  key={destination.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11172B]/70 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A227]/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                >
                  {/* NUMBER */}
                  <div className="pointer-events-none absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-xs font-medium text-white/70 backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* CARD */}
                  <div className="transition-transform duration-500 group-hover:scale-[1.01]">
                    <DestinationCard destination={destination} />
                  </div>

                  {/* HOVER LINE */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C9A227] transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM STATEMENT */}
          <section className="mt-24 border-t border-white/10 pt-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="eyebrow text-[#C9A227]">
                  The journey is yours
                </p>

                <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight text-ivory md:text-4xl">
                  Don't just visit a place.
                  <span className="block text-white/50">
                    Make it part of your story.
                  </span>
                </h2>
              </div>

              <div className="hidden text-right md:block">
                <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                  GLOBETROTTER
                </p>
                <p className="mt-2 text-sm text-white/50">
                  Plan • Discover • Experience
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </BackgroundVideo>
  );
}