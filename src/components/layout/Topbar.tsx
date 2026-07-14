import type { CurrentUser } from "@/types/user";

import { CoinBadge } from "./CoinBadge";
import { NotificationButton } from "./NotificationButton";
import { ProfileDropdown } from "./ProfileDropdown";
import { StreakBadge } from "./StreakBadge";

interface TopbarProps {
  user: CurrentUser;
}

export function Topbar({
  user,
}: TopbarProps) {
  return (
    <header
      className="
        flex
        h-20
        items-center
        justify-between
        border-b
        border-[var(--border)]
        bg-[var(--surface)]
        px-8
      "
    >
      {/* Left */}

      <div>
        <h1 className="font-display text-3xl font-bold text-[var(--text)]">
          Welcome back, {user.username}
        </h1>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Ready to forge today?
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        <StreakBadge
          streak={user.currentStreak}
        />

        <CoinBadge
          coins={user.forgeCoins}
        />

        <NotificationButton />

        <ProfileDropdown />
      </div>
    </header>
  );
}