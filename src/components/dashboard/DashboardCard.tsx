import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <section
      className={`
        rounded-2xl
        border
        border-white/10
        bg-[#18181B]
        p-6
        shadow-lg
        ${className}
      `}
    >
      <h3 className="mb-5 text-lg font-semibold text-white">
        {title}
      </h3>

      {children}
    </section>
  );
}