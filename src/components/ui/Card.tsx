import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
};

export function Card({
  children,
  className = "",
  padded = true,
}: CardProps) {
  return (
    <div
      className={`
        rounded-xl
        border
        border-white/10
        bg-[var(--panel)]
        shadow-lg
        ${padded ? "p-6" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}