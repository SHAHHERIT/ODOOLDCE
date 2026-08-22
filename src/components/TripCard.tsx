import { motion } from "framer-motion";
import { MapPin, Calendar, Layers, Wallet } from "lucide-react";
import type { Trip } from "../types";
import Button from "./Button";

interface TripCardProps {
  trip: Trip;
  onView?: (trip: Trip) => void;
  onEdit?: (trip: Trip) => void;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function TripCard({ trip, onView, onEdit }: TripCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="card-base group overflow-hidden shadow-card"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.coverImage}
          alt={trip.destination}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-navy-deep/70 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-brass backdrop-blur-sm">
          {trip.status === "upcoming" ? "Upcoming" : "Completed"}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-ivory">
          {trip.name}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={13} />
          {trip.destination}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted">
            <Calendar size={14} className="text-brass" />
            {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
          </div>
          <div className="flex items-center gap-2 text-muted">
            <Layers size={14} className="text-brass" />
            {trip.cities} cities · {trip.activities} activities
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-muted">
          <Wallet size={14} className="text-brass" />
          Est. budget ${trip.budget.toLocaleString()}
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs text-muted">
            <span>Trip progress</span>
            <span>{trip.progress}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brass-dim to-brass transition-all duration-700"
              style={{ width: `${trip.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            variant="primary"
            className="flex-1 justify-center !py-2.5 text-xs"
            onClick={() => onView?.(trip)}
          >
            View Itinerary
          </Button>
          {onEdit && (
            <Button
              variant="secondary"
              className="!py-2.5 text-xs"
              onClick={() => onEdit(trip)}
            >
              Edit
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
