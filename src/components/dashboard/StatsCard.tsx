import type { ReactNode } from "react";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

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
        group
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[var(--accent)]/40
        hover:shadow-2xl
      "
    >
      <div className="flex items-center justify-between">
        {/* Left */}

        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[var(--muted)]
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-3
              font-display
              text-4xl
              font-bold
              tracking-tight
              text-[var(--text)]
            "
          >
            {typeof value === "number" ? (
                <AnimatedNumber value={value} />
            ) : (
                value
            )}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-[var(--subtle)]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Right */}

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
            transition-all
            duration-300
            group-hover:scale-110
            group-hover:bg-[var(--accent)]
            group-hover:text-white
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}