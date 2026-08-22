import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Wallet, Calendar as CalendarIcon, TrendingUp, Plus } from "lucide-react";
import Timeline from "../components/Timeline";
import Button from "../components/Button";
import { mockTrips } from "../data/mockTrips";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Itinerary() {
  const { tripId } = useParams();
  const trip = mockTrips.find((t) => t.id === tripId) ?? mockTrips[0];

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 lg:px-10">
      <Link
        to="/trips"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-brass"
      >
        <ArrowLeft size={14} />
        Back to My Trips
      </Link>

      <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">{trip.destination}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-ivory md:text-5xl">
            {trip.name}
          </h1>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" icon={<Plus size={14} />}>
            Add City
          </Button>
          <Button variant="primary">Edit Itinerary</Button>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to={`/share/${trip.id}`}
          className="text-sm text-brass transition-opacity hover:opacity-80"
        >
          Preview public shared page →
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-white/[0.06] bg-navy-800/50 p-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <CalendarIcon size={18} className="text-brass" strokeWidth={1.5} />
          <div>
            <p className="text-xs text-muted">Dates</p>
            <p className="text-sm text-ivory">
              {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Wallet size={18} className="text-brass" strokeWidth={1.5} />
          <div>
            <p className="text-xs text-muted">Total budget</p>
            <p className="text-sm text-ivory">${trip.budget.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TrendingUp size={18} className="text-brass" strokeWidth={1.5} />
          <div>
            <p className="text-xs text-muted">Journey progress</p>
            <p className="text-sm text-ivory">{trip.progress}% complete</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        {trip.itinerary ? (
          <Timeline cities={trip.itinerary} />
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center text-muted">
            No cities added yet — start by adding your first stop.
          </div>
        )}
      </div>
    </div>
  );
}
