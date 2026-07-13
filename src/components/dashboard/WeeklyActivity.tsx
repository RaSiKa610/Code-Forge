import { DashboardCard } from "./DashboardCard";

interface WeeklyActivityProps {
  activity: number[];
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WeeklyActivity({
  activity,
}: WeeklyActivityProps) {
  return (
    <DashboardCard title="Weekly Activity">
      <div className="grid grid-cols-7 gap-3">
        {activity.map((value, index) => (
          <div
            key={days[index]}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="
                flex
                h-24
                w-full
                items-end
                rounded-xl
                bg-[var(--surface)]
                p-2
              "
            >
              <div
                className="w-full rounded-lg bg-[var(--accent)] transition-all"
                style={{
                  height: `${value}%`,
                }}
              />
            </div>

            <span className="text-xs text-[var(--muted)]">
              {days[index]}
            </span>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}