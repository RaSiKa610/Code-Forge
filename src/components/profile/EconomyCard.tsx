import { Coins, Star } from "lucide-react";

import { Card } from "@/components/ui/Card";
import type { ProfileData } from "@/types/profile";

type Props = {
  profile: ProfileData;
};

export default function EconomyCard({
  profile,
}: Props) {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-bold text-[var(--text)]">
        Economy
      </h2>

      <div className="space-y-4">

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            bg-[var(--surface)]
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <Coins
              size={20}
              className="text-[var(--warning)]"
            />

            <span className="text-[var(--muted)]">
              Forge Coins
            </span>
          </div>

          <span className="font-display text-2xl font-bold text-[var(--text)]">
            {profile.forgeCoins}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            rounded-xl
            bg-[var(--surface)]
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <Star
              size={20}
              className="text-[var(--accent)]"
            />

            <span className="text-[var(--muted)]">
              Season Points
            </span>
          </div>

          <span className="font-display text-2xl font-bold text-[var(--text)]">
            {profile.seasonPoints}
          </span>
        </div>

      </div>
    </Card>
  );
}