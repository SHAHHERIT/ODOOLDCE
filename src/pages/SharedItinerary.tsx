import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link2, Share2, Check, Compass } from "lucide-react";
import BackgroundVideo from "../components/BackgroundVideo";
import Timeline from "../components/Timeline";
import Button from "../components/Button";
import { mockTrips } from "../data/mockTrips";
<BackgroundVideo src="c:\Users\HERITSHAH\Downloads\From Klickpin.com- 1149332767436870831-pin-id-1149332767436870831.mp4" className="h-screen min-h-[640px]"></BackgroundVideo>
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function SharedItinerary() {
  const { tripId } = useParams();
  const trip = mockTrips.find((t) => t.id === tripId) ?? mockTrips[0];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* This page is read-only: no edit/delete/admin controls anywhere below. */}
      <BackgroundVideo src="/videos/hero.mp4" className="h-[70vh] min-h-[480px]">
        <div className="mx-auto flex h-[70vh] min-h-[480px] max-w-5xl flex-col justify-end px-6 pb-16 lg:px-10">
          <div className="flex items-center gap-2 text-brass">
            <Compass size={18} strokeWidth={1.5} />
            <span className="font-mono text-xs uppercase tracking-widest">
              Shared Itinerary
            </span>
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold text-ivory md:text-6xl">
            {trip.name}
          </h1>
          <p className="mt-4 text-muted">
            {trip.travelerName ? `Planned by ${trip.travelerName}` : "A GlobeTrotter journey"}{" "}
            · {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="primary"
              icon={copied ? <Check size={15} /> : <Link2 size={15} />}
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button variant="secondary" icon={<Share2 size={15} />}>
              Share Trip
            </Button>
          </div>
        </div>
      </BackgroundVideo>

      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
        <div className="mb-16 grid grid-cols-2 gap-4 rounded-2xl border border-white/[0.06] bg-navy-800/50 p-6 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted">Cities</p>
            <p className="mt-1 font-display text-2xl text-ivory">{trip.cities}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Activities</p>
            <p className="mt-1 font-display text-2xl text-ivory">{trip.activities}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Duration</p>
            <p className="mt-1 font-display text-2xl text-ivory">
              {Math.round(
                (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
                  86400000
              )}{" "}
              days
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Budget</p>
            <p className="mt-1 font-display text-2xl text-ivory">
              ${trip.budget.toLocaleString()}
            </p>
          </div>
        </div>

        {trip.itinerary && <Timeline cities={trip.itinerary} />}

        <p className="mt-20 text-center font-mono text-xs uppercase tracking-widest text-muted">
          Made with GlobeTrotter
        </p>
      </div>
    </div>
  );
}
