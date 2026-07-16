import type { CurrentUser } from "@/types/user";

import { CoinBadge } from "./CoinBadge";
import { NotificationButton } from "./NotificationButton";
import { ProfileDropdown } from "./ProfileDropdown";
import { StreakBadge } from "./StreakBadge";

interface TopbarProps {
  user: CurrentUser;
  title: string;
  subtitle?: string;
}

export function Topbar({
  user,
  title,
  subtitle,
}: TopbarProps) {
  return (
    <header
      className="
        flex
        h-16
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
        <h1
          className="
            font-display
            text-2xl
            font-bold
            tracking-tight
            text-[var(--text)]
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-0.5 text-sm text-[var(--muted)]">
            {subtitle}
          </p>
        )}
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