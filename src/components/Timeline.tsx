import { motion } from "framer-motion";
import { Clock, DollarSign, Plane } from "lucide-react";
import type { ItineraryCity } from "../types";

function formatDate(d: string) {
  return new Date(d)
    .toLocaleDateString("en-US", { day: "2-digit", month: "short" })
    .toUpperCase();
}

export default function Timeline({ cities }: { cities: ItineraryCity[] }) {
  return (
    <div className="relative">
      {/* the continuous route line running down the spine of the timeline */}
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-brass/60 via-brass/30 to-transparent md:left-[39px]" />

      <div className="space-y-16">
        {cities.map((city, cityIdx) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative pl-16 md:pl-24"
          >
            {/* city marker */}
            <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-full border border-brass/40 bg-navy-800 md:h-20 md:w-20">
              <Plane
                size={20}
                className="text-brass"
                strokeWidth={1.5}
                style={{ transform: `rotate(${cityIdx % 2 === 0 ? 45 : 135}deg)` }}
              />
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-navy-800/60">
              <div className="relative h-44 md:h-56">
                <img
                  src={city.image}
                  alt={city.city}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/20 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <p className="eyebrow">{formatDate(city.arrivalDate)} — {formatDate(city.departureDate)}</p>
                  <h3 className="font-display text-3xl font-semibold text-ivory">
                    {city.city}
                  </h3>
                  <p className="font-mono text-xs text-muted">{city.coordinates}</p>
                </div>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {city.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start justify-between gap-4 px-6 py-4"
                  >
                    <div>
                      <p className="font-medium text-ivory">{activity.name}</p>
                      <p className="mt-1 text-sm text-muted">{activity.description}</p>
                      <p className="mt-2 flex items-center gap-1.5 font-mono text-xs text-brass">
                        <Clock size={12} />
                        {activity.time}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1 font-mono text-sm text-ivory/80">
                      <DollarSign size={13} className="text-muted" />
                      {activity.cost}
                    </div>
                  </div>
                ))}
                <button className="w-full px-6 py-3 text-left text-sm text-muted transition-colors hover:text-brass">
                  + Add Activity
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
