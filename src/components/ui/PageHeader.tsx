import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-[var(--border)] pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">
          {title}
        </h1>

        <p className="mt-2 text-sm text-[var(--muted)]">
          {description}
        </p>
      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}