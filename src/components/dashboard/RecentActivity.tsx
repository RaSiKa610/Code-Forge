import { Clock } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

interface ActivityItem {
  id: string;
  title: string;
  reward: string;
  time: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <DashboardCard title="Recent Activity">
      <div className="space-y-5">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4"
          >
            <div className="mt-1 rounded-full bg-[var(--accent)] p-2">
              <Clock size={14} className="text-white" />
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-[var(--text)]">
                {activity.title}
              </h3>

              <p className="text-sm text-[var(--muted)]">
                {activity.reward}
              </p>

              <p className="mt-1 text-xs text-[var(--subtle)]">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}