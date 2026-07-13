import {
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import { DashboardCard } from "./DashboardCard";

interface Activity {
  id: string;
  title: string;
  reward: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <DashboardCard title="Recent Activity">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="
              flex
              items-start
              justify-between
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
              transition-all
              duration-200
              hover:border-[var(--accent)]/40
              hover:bg-[var(--card-hover)]
            "
          >
            <div className="flex-1">
              <h3 className="font-medium text-[var(--text)]">
                {activity.title}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-[var(--muted)]">
                <Clock3 size={14} />
                {activity.time}
              </div>
            </div>

            <div className="text-right">
              <div
                className="
                  flex
                  items-center
                  gap-1
                  font-semibold
                  text-emerald-400
                "
              >
                <ArrowUpRight size={16} />
                {activity.reward}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}