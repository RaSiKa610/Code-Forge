import type { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  subtitle,
}: StatsCardProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-[#18181B]
        p-5
        transition-all
        hover:border-violet-500/40
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-1 text-xs text-zinc-500">
              {subtitle}
            </p>
          )}

        </div>

        <div className="text-violet-400">
          {icon}
        </div>

      </div>
    </div>
  );
}