import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Trip } from "../types";

interface CalendarProps {
  trips: Trip[];
  onSelectDate?: (date: Date) => void;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function isWithinTrip(date: Date, trip: Trip) {
  const t = date.setHours(0, 0, 0, 0);
  const start = new Date(trip.startDate).setHours(0, 0, 0, 0);
  const end = new Date(trip.endDate).setHours(0, 0, 0, 0);
  return t >= start && t <= end;
}

export default function Calendar({ trips, onSelectDate }: CalendarProps) {
  const [cursor, setCursor] = useState(new Date(2026, 7, 1)); // Aug 2026

  const monthLabel = cursor.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [cursor]);

  const changeMonth = (delta: number) => {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
  };

  return (
    <div className="card-base p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-ivory">
          {monthLabel}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => changeMonth(-1)}
            className="rounded-full border border-white/10 p-2 text-muted transition-colors hover:text-ivory"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="rounded-full border border-white/10 p-2 text-muted transition-colors hover:text-ivory"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] uppercase tracking-wider text-muted">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2">
            {w}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={monthLabel}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-7 gap-1"
        >
          {days.map((date, idx) => {
            if (!date) return <div key={idx} />;
            const tripsOnDay = trips.filter((t) => isWithinTrip(new Date(date), t));
            const isTravelDay = tripsOnDay.length > 0;

            return (
              <button
                key={idx}
                onClick={() => onSelectDate?.(date)}
                className={`group relative aspect-square rounded-lg border text-sm transition-colors ${
                  isTravelDay
                    ? "border-brass/30 bg-brass/[0.08] text-ivory hover:bg-brass/[0.15]"
                    : "border-transparent text-muted hover:border-white/10 hover:text-ivory"
                }`}
              >
                {date.getDate()}
                {isTravelDay && (
                  <span className="absolute bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brass" />
                )}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center gap-2 text-xs text-muted">
        <span className="h-2 w-2 rounded-full bg-brass" />
        Travel day
      </div>
    </div>
  );
}
