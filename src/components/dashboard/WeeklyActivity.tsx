import { DashboardCard } from "./DashboardCard";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

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
        {/* Activity Graph */}

        <div className="flex h-44 items-end justify-between gap-3">
          {activity.map((value, index) => (
            <div
              key={days[index]}
              className="flex flex-1 flex-col items-center"
            >
              <div
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-t
                  from-[var(--accent)]
                  to-violet-400
                  transition-all
                  duration-700
                  hover:scale-105
                  hover:brightness-110
                "
                style={{
                  height: `${value}%`,
                }}
              />

              <span className="mt-3 text-xs font-medium text-[var(--muted)]">
                {days[index]}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4">
          <div
            className="
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
            "
          >
            <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
              Problems Solved
            </p>

            <h3 className="mt-2 text-3xl font-bold text-[var(--text)]">
              <AnimatedNumber value={solved} />
            </h3>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-[var(--border)]
              bg-[var(--surface)]
              p-4
            "
          >
            <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
              Coding Hours
            </p>

            <h3 className="mt-2 text-3xl font-bold text-[var(--text)]">
              <AnimatedNumber value={hours} />h
            </h3>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}