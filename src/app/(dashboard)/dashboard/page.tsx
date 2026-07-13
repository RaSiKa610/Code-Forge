import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getDashboardData } from "@/services/dashboard/getDashboardData";

import {
  DailyChallengeCard,
  StatsCard,
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
    prisma,
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
          value={dashboard.currentStreak}
          subtitle="days"
          icon={<Flame size={28} />}
        />

        <StatsCard
          title="Forge Coins"
          value={dashboard.forgeCoins}
          subtitle="earned"
          icon={<Coins size={28} />}
        />

        <StatsCard
          title="Rank"
          value={dashboard.rank}
          subtitle="Current Rank"
          icon={<Trophy size={28} />}
        />
      </section>

      {/* Main Content */}

      <section className="grid gap-6 xl:grid-cols-2">
        <DailyChallengeCard
          title="Binary Search"
          difficulty="Medium"
          xp={80}
          forgeCoins={25}
          estimatedTime="18 min"
        />

        {/* ContinueCard will go here */}
      </section>
    </div>
  );
}