import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";

import { DashboardCard } from "./DashboardCard";

interface ContinueLearningCardProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
  estimatedTime: string;
}

const difficultyColors = {
  Easy: "bg-emerald-500/10 text-emerald-400",
  Medium: "bg-yellow-500/10 text-yellow-400",
  Hard: "bg-red-500/10 text-red-400",
};

export function ContinueLearningCard({
  title,
  difficulty,
  progress,
  estimatedTime,
}: ContinueLearningCardProps) {
  return (
    <DashboardCard title="Continue Learning">
      <div className="space-y-5">
        {/* Problem */}

        <div>
          <h3 className="text-lg font-semibold text-[var(--text)]">
            {title}
          </h3>

          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${difficultyColors[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>

        {/* Progress */}

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-[var(--muted)]">
              Progress
            </span>

            <span className="font-medium text-[var(--text)]">
              {progress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-[var(--surface)]">
            <div
              className="
                h-full
                rounded-full
                bg-[var(--accent)]
                transition-all
                duration-500
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* Time */}

        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
          <Clock3 size={16} />

          <span>{estimatedTime} remaining</span>
        </div>

        {/* Button */}

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
          Continue

          <ArrowRight size={18} />
        </Link>
      </div>
    </DashboardCard>
  );
}