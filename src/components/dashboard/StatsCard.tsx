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
        hover:-translate-y-1
        hover:border-[var(--accent)]/30
        hover:shadow-xl
        duration-200
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--subtle)]">
            {title}
          </p>

          <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-[var(--text)]">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-1 text-xs text-zinc-500">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[var(--accent)]/10
            text-[var(--accent)]
          "
        >
          {icon}
        </div>

      </div>
    </div>
  );
}