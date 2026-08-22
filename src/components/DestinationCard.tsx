import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "../types";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative h-80 overflow-hidden rounded-2xl"
    >
      <img
        src={destination.image}
        alt={destination.city}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />

      <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-brass/90">
        {destination.coordinates}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-2xl font-semibold text-ivory">
          {destination.city}
        </h3>
        <p className="text-sm text-muted">{destination.country}</p>
        <p className="mt-2 text-sm text-ivory/70 line-clamp-2">
          {destination.description}
        </p>
        <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brass opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Explore
          <ArrowUpRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
