import { auth } from "@/auth";
import { getDashboardData } from "@/services/dashboard/getDashboardData";

import {
  DailyChallengeCard,
  ContinueLearningCard,
  StatsCard,
} from "@/components/dashboard";

import { Flame, Coins, Trophy } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const dashboard = await getDashboardData(
    session.user.id
  );

  return (
    <div className="space-y-8">
      {/* Stats */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Current Streak"
          value={dashboard.user.currentStreak}
          subtitle="Days"
          icon={<Flame size={28} />}
        />

        <StatsCard
          title="Forge Coins"
          value={dashboard.user.forgeCoins}
          subtitle="Available"
          icon={<Coins size={28} />}
        />

        <StatsCard
          title="Current Rank"
          value={dashboard.user.rank}
          subtitle="Keep climbing!"
          icon={<Trophy size={28} />}
        />
      </section>

      {/* Main Content */}

      <section className="grid gap-6 xl:grid-cols-2">
        <DailyChallengeCard
          title={dashboard.dailyChallenge.title}
          difficulty={dashboard.dailyChallenge.difficulty}
          xp={dashboard.dailyChallenge.xp}
          forgeCoins={dashboard.dailyChallenge.forgeCoins}
          estimatedTime={dashboard.dailyChallenge.estimatedTime}
        />

        <ContinueLearningCard
          title={dashboard.continueLearning.title}
          difficulty={dashboard.continueLearning.difficulty}
          progress={dashboard.continueLearning.progress}
          estimatedTime={dashboard.continueLearning.estimatedTime}
        />
      </section>
    </div>
  );
}