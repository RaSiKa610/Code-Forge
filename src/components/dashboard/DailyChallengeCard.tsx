import { ArrowRight, Coins, Flame } from "lucide-react";

import { DashboardCard } from "./DashboardCard";

interface DailyChallengeCardProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xp: number;
  forgeCoins: number;
  estimatedTime: string;
}

const difficultyColors = {
  Easy: "text-green-400 bg-green-400/10",
  Medium: "text-yellow-400 bg-yellow-400/10",
  Hard: "text-red-400 bg-red-400/10",
};

export function DailyChallengeCard({
  title,
  difficulty,
  xp,
  forgeCoins,
  estimatedTime,
}: DailyChallengeCardProps) {
  return (
    <DashboardCard title="🎯 Daily Challenge">
      <div className="space-y-5">

        <div>
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${difficultyColors[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>

        <div className="flex gap-6 text-sm text-zinc-400">

          <div className="flex items-center gap-2">
            <Flame size={16} />
            {xp} XP
          </div>

          <div className="flex items-center gap-2">
            <Coins size={16} />
            {forgeCoins} Coins
          </div>

        </div>

        <p className="text-sm text-zinc-500">
          Estimated Time: {estimatedTime}
        </p>

        <button
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-violet-600
            py-3
            font-medium
            text-white
            transition
            hover:bg-violet-500
          "
        >
          Solve Challenge

          <ArrowRight size={18} />
        </button>

      </div>
    </DashboardCard>
  );
}