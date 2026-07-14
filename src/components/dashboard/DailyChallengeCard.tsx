import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Coins,
  Flame,
} from "lucide-react";

import { DashboardCard } from "./DashboardCard";

interface DailyChallengeCardProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  forgeCoins: number;
  estimatedTime: string;
}

const difficultyColors = {
  Easy: "bg-emerald-500/10 text-emerald-400",
  Medium: "bg-yellow-500/10 text-yellow-400",
  Hard: "bg-red-500/10 text-red-400",
};

export function DailyChallengeCard({
  title,
  difficulty,
  xp,
  forgeCoins,
  estimatedTime,
}: DailyChallengeCardProps) {
  return (
    <DashboardCard title="🔥 Daily Challenge">
      <div className="space-y-6">

        <div>
          <h2 className="text-2xl font-bold text-[var(--text)]">
            {title}
          </h2>

          <span
            className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-xl bg-[var(--surface)] p-4">
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <Flame size={18} />
              <span className="text-sm font-medium">XP</span>
            </div>

            <p className="mt-2 text-2xl font-bold text-[var(--text)]">
              {xp}
            </p>
          </div>

          <div className="rounded-xl bg-[var(--surface)] p-4">
            <div className="flex items-center gap-2 text-yellow-400">
              <Coins size={18} />
              <span className="text-sm font-medium">Coins</span>
            </div>

            <p className="mt-2 text-2xl font-bold text-[var(--text)]">
              {forgeCoins}
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <Clock3 size={16} />
          <span>{estimatedTime}</span>
        </div>

        <Link
          href="/problems"
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[var(--accent)]
            py-3
            font-medium
            text-white
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[var(--accent-hover)]
          "
        >
          Start Challenge

          <ArrowRight size={18} />
        </Link>

      </div>
    </DashboardCard>
  );
}