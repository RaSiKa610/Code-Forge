import {
  DailyChallengeCard,
  StatsCard,
} from "@/components/dashboard";

import {
  Coins,
  Flame,
  Trophy,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* Greeting */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          Good Evening, Rasika 👋
        </h1>

        <p className="mt-2 text-zinc-400">
          Ready to continue your coding journey?
        </p>

      </div>

      {/* Stats */}

      <div className="grid gap-5 md:grid-cols-3">

        <StatsCard
          title="Current Streak"
          value="412"
          subtitle="days"
          icon={<Flame size={28} />}
        />

        <StatsCard
          title="Forge Coins"
          value="2,480"
          icon={<Coins size={28} />}
        />

        <StatsCard
          title="Rank"
          value="Diamond II"
          icon={<Trophy size={28} />}
        />

      </div>

      {/* Daily Challenge */}

      <DailyChallengeCard
        title="Binary Search"
        difficulty="Medium"
        xp={80}
        forgeCoins={25}
        estimatedTime="18 min"
      />

    </div>
  );
}