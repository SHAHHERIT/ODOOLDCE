import { useNavigate } from "react-router-dom";
import { Compass, ArrowRight, MapPin, Sparkles } from "lucide-react";

import Button from "../components/Button";
import BackgroundVideo from "../components/BackgroundVideo";

export default function Login() {
  const navigate = useNavigate();

  return (
    <BackgroundVideo
      src="/videos/explore.mp4"
      className="min-h-screen"
    >
      {/* CINEMATIC OVERLAY */}
      <div className="relative min-h-screen overflow-hidden bg-[#0D1224]/70">

        {/* DECORATIVE GRADIENTS */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#C9A227]/10 blur-[120px]" />

        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-teal-500/5 blur-[120px]" />

        {/* MAIN */}
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">

          <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D1224]/70 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

            {/* =================================================
                LEFT — BRAND PANEL
            ================================================= */}
            <div className="relative hidden min-h-[600px] flex-col justify-between overflow-hidden border-r border-white/10 p-10 lg:flex">

              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C9A227]/10 via-transparent to-transparent" />

              <div className="relative z-10">

                {/* LOGO */}
                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/5">
                    <Compass
                      size={21}
                      className="text-[#C9A227]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="font-display text-lg font-semibold text-ivory">
                      GlobeTrotter
                    </p>

                    <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                      Travel intelligence
                    </p>
                  </div>

                </div>

              </div>

              {/* QUOTE */}
              <div className="relative z-10">

                <div className="mb-6 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#C9A227]" />

                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A227]">
                    Begin your journey
                  </span>
                </div>

                <h2 className="max-w-md font-display text-4xl font-medium leading-tight text-ivory">
                  The world is
                  <span className="block text-[#C9A227]">
                    bigger than your map.
                  </span>
                </h2>

                <p className="mt-6 max-w-sm text-sm leading-6 text-white/40">
                  Plan remarkable journeys, organize every destination
                  and turn your travel ideas into experiences worth
                  remembering.
                </p>

              </div>

              {/* LOCATION */}
              <div className="relative z-10 flex items-center gap-3 border-t border-white/10 pt-6">

                <MapPin
                  size={14}
                  className="text-[#C9A227]"
                />

                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Everywhere is closer than you think
                </span>

              </div>

            </div>

            {/* =================================================
                RIGHT — LOGIN PANEL
            ================================================= */}
            <div className="flex min-h-[600px] flex-col justify-center p-7 sm:p-10 md:p-14">

              {/* MOBILE BRAND */}
              <div className="mb-12 flex items-center justify-center gap-3 lg:hidden">

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A227]/40 bg-[#C9A227]/5">
                  <Compass
                    size={21}
                    className="text-[#C9A227]"
                    strokeWidth={1.5}
                  />
                </div>

                <p className="font-display text-xl font-semibold text-ivory">
                  GlobeTrotter
                </p>

              </div>

              {/* HEADER */}
              <div className="text-center lg:text-left">

                <div className="mb-4 flex items-center justify-center gap-2 lg:justify-start">

                  <Sparkles
                    size={14}
                    className="text-[#C9A227]"
                  />

                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A227]">
                    Welcome back
                  </span>

                </div>

                <h1 className="font-display text-4xl font-semibold tracking-tight text-ivory md:text-5xl">
                  Ready to
                  <span className="block text-white/40">
                    explore?
                  </span>
                </h1>

                <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-white/40 lg:mx-0">
                  Your journeys, destinations and travel plans are
                  waiting for you.
                </p>

              </div>

              {/* LOGIN CARD */}
              <div className="mt-10">

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A227]/10">
                      <Compass
                        size={18}
                        className="text-[#C9A227]"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-ivory">
                        Continue your journey
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        Access your GlobeTrotter dashboard
                      </p>
                    </div>

                  </div>

                  <Button
                    className="mt-6 w-full justify-center"
                    icon={<ArrowRight size={15} />}
                    onClick={() => navigate("/dashboard")}
                  >
                    Continue to Dashboard
                  </Button>

                </div>

              </div>

              {/* DIVIDER */}
              <div className="my-8 flex items-center gap-4">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                  GlobeTrotter
                </span>

                <div className="h-px flex-1 bg-white/10" />

              </div>

              {/* FOOTER */}
              <div className="text-center lg:text-left">

                <p className="text-xs leading-5 text-white/25">
                  Plan better.
                  <span className="mx-2 text-[#C9A227]/50">
                    •
                  </span>
                  Travel further.
                  <span className="mx-2 text-[#C9A227]/50">
                    •
                  </span>
                  Remember everything.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </BackgroundVideo>
  );
}