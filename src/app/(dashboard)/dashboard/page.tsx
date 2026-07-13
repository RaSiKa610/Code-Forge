import { auth } from "@/auth";
import { getDashboardData } from "@/services/dashboard/getDashboardData";

import {
    ContinueCard,
    DailyChallengeCard,
    StatsCard,
    WeeklyActivity,
} from "@/components/dashboard";

import { PageHeader } from "@/components/ui";

import {
  Coins,
  Flame,
  Trophy,
} from "lucide-react";

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
      <PageHeader
        title={`Welcome back, ${session.user.username}!`}
        description="Let's forge your coding destiny today."
      />

      {/* Stats */}

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard
          title="Current Streak"
          value={dashboard.user.currentStreak}
          subtitle="days"
          icon={<Flame size={28} />}
        />

        <StatsCard
          title="Forge Coins"
          value={dashboard.user.forgeCoins}
          subtitle="earned"
          icon={<Coins size={28} />}
        />

        <StatsCard
          title="Rank"
          value={dashboard.user.rank}
          subtitle="Current Rank"
          icon={<Trophy size={28} />}
        />
      </section>

      {/* Main Content */}

      <section className="grid gap-6 xl:grid-cols-2">
        <DailyChallengeCard
            {...dashboard.dailyChallenge}
        />
        <ContinueCard
            {...dashboard.continueLearning}
        />
        <WeeklyActivity
            {...dashboard.weeklyActivity}
        />

      </section>
    </div>
  );
}