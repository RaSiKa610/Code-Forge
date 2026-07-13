import { ReactNode } from "react";

interface BadgePillProps {
  icon: ReactNode;
  value: string | number;
  color?: "orange" | "gold" | "blue";
}

export function BadgePill({
  icon,
  value,
  color = "orange",
}: BadgePillProps) {
  const colors = {
    orange:
      "border-orange-500/20 bg-orange-500/10 text-orange-400",

    gold:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",

    blue:
      "border-blue-500/20 bg-blue-500/10 text-blue-400",
  };

  return (
    <div
      className={`
        flex
        items-center
        gap-2
        rounded-xl
        border
        px-4
        py-2
        font-semibold
        ${colors[color]}
      `}
    >
      {icon}

      <span>{value}</span>
    </div>
  );
}