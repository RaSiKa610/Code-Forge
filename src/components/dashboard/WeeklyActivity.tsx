import { DashboardCard } from "./DashboardCard";

interface WeeklyActivityProps {
  solved: number;
  hours: number;
  activity: number[];
}

const days = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export function WeeklyActivity({
  solved,
  hours,
  activity,
}: WeeklyActivityProps) {
  return (
    <DashboardCard title="Weekly Activity">
      <div className="space-y-6">

        <div className="flex justify-between">

          <div>
            <p className="text-3xl font-bold text-[var(--text)]">
              {solved}
            </p>

            <p className="text-sm text-[var(--muted)]">
              Problems Solved
            </p>
          </div>

          <div className="text-right">

            <p className="text-3xl font-bold text-[var(--text)]">
              {hours}
            </p>

            <p className="text-sm text-[var(--muted)]">
              Hours
            </p>

          </div>

        </div>

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
                    p-1
                "
              >

                <div
                  className="
                    w-full
                    rounded-lg
                    bg-[var(--accent)]
                    transition-all
                    duration-500
                  "
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

      </div>
    </DashboardCard>
  );
}