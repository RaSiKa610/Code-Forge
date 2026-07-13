import { DashboardCard } from "./DashboardCard";

interface WeeklyActivityProps {
  solved: number;
  hours: number;
  activity: number[];
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function WeeklyActivity({
  solved,
  hours,
  activity,
}: WeeklyActivityProps) {
  return (
    <DashboardCard title="Weekly Activity">
      <div className="space-y-6">

        {/* Graph */}

        <div className="flex items-end justify-between gap-3 h-44">
          {activity.map((value, index) => (
            <div
              key={days[index]}
              className="flex flex-col items-center flex-1"
            >
              <div
                className="
                  w-full
                  rounded-xl
                  bg-[var(--accent)]
                  transition-all
                  duration-700
                  hover:bg-[var(--accent-hover)]
                "
                style={{
                  height: `${value}%`,
                }}
              />

              <span className="mt-3 text-xs text-[var(--muted)]">
                {days[index]}
              </span>
            </div>
          ))}
        </div>

        {/* Summary */}

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">
              Problems Solved
            </p>

            <h3 className="mt-1 text-2xl font-bold text-[var(--text)]">
              {solved}
            </h3>
          </div>

          <div className="rounded-xl bg-[var(--surface)] p-4">
            <p className="text-xs text-[var(--muted)]">
              Coding Hours
            </p>

            <h3 className="mt-1 text-2xl font-bold text-[var(--text)]">
              {hours}h
            </h3>
          </div>

        </div>

      </div>
    </DashboardCard>
  );
}