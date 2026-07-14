"use client";

import { Flame } from "lucide-react";

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({
  streak,
}: StreakBadgeProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-orange-500/20
        bg-orange-500/10
        px-3
        py-2
      "
    >
      <Flame
        size={18}
        className="text-orange-400"
      />

      <span className="text-sm font-medium text-white">
        {streak}
      </span>
    </div>
  );
}