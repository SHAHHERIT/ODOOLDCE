import { PlusCircle, RefreshCw, Wallet } from "lucide-react";
import type { RecentActivityItem } from "../types";

const iconMap = {
  add: PlusCircle,
  update: RefreshCw,
  budget: Wallet,
};

export default function ActivityCard({ item }: { item: RecentActivityItem }) {
  const Icon = iconMap[item.icon];
  return (
    <div className="flex items-start gap-4 border-b border-white/[0.06] py-4 last:border-0">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brass/10">
        <Icon size={15} className="text-brass" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-sm text-ivory/90">{item.text}</p>
        <p className="mt-0.5 font-mono text-xs text-muted">{item.timestamp}</p>
      </div>
    </div>
  );
}
