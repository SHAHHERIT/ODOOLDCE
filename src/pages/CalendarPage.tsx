import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, ListTree, List as ListIcon, MapPin } from "lucide-react";
import Calendar from "../components/Calendar";
import { mockTrips } from "../data/mockTrips";

type View = "calendar" | "timeline" | "list";

const viewTabs: { id: View; label: string; icon: typeof CalendarDays }[] = [
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "timeline", label: "Timeline", icon: ListTree },
  { id: "list", label: "List", icon: ListIcon },
];

function formatRange(start: string, end: string) {
  const s = new Date(start).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const e = new Date(end).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return `${s} – ${e}`;
}

export default function CalendarPage() {
  const [view, setView] = useState<View>("calendar");
  const sorted = [...mockTrips].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32 lg:px-10">
      <p className="eyebrow">Your schedule</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-ivory md:text-5xl">
        Calendar
      </h1>

      <div className="mt-8 inline-flex rounded-full border border-white/10 p-1">
        {viewTabs.map((tab) => {
          const Icon = tab.icon;
          const active = view === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active ? "bg-brass text-navy-deep" : "text-muted hover:text-ivory"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-10"
        >
          {view === "calendar" && <Calendar trips={mockTrips} />}

          {view === "timeline" && (
            <div className="relative pl-8">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-brass/30" />
              <div className="space-y-8">
                {sorted.map((trip) => (
                  <div key={trip.id} className="relative">
                    <div className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-brass bg-navy-deep" />
                    <p className="font-mono text-xs text-brass">
                      {formatRange(trip.startDate, trip.endDate)}
                    </p>
                    <p className="mt-1 font-display text-lg text-ivory">{trip.name}</p>
                    <p className="text-sm text-muted">{trip.destination}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "list" && (
            <div className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06]">
              {sorted.map((trip) => (
                <div
                  key={trip.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="text-ivory">{trip.name}</p>
                    <p className="flex items-center gap-1 text-sm text-muted">
                      <MapPin size={12} />
                      {trip.destination}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-muted">
                    {formatRange(trip.startDate, trip.endDate)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
