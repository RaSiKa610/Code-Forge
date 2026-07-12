"use client";

import { CoinBadge } from "./CoinBadge";
import { NotificationButton } from "./NotificationButton";
import { ProfileDropdown } from "./ProfileDropdown";
import { StreakBadge } from "./StreakBadge";

export function Topbar() {
  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-white/10
        bg-[#18181B]
        px-8
      "
    >
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-zinc-400">
          Welcome back! Ready to forge today?
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <StreakBadge streak={412} />

        <CoinBadge coins={2480} />

        <NotificationButton />

        <ProfileDropdown />
      </div>
    </header>
  );
}