"use client";

import { Coins } from "lucide-react";

interface CoinBadgeProps {
  coins: number;
}

export function CoinBadge({
  coins,
}: CoinBadgeProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-yellow-500/20
        bg-yellow-500/10
        px-3
        py-2
      "
    >
      <Coins
        size={18}
        className="text-yellow-400"
      />

      <span className="text-sm font-medium text-white">
        {coins.toLocaleString()}
      </span>
    </div>
  );
}