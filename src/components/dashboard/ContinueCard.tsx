import { ArrowRight } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

interface ContinueCardProps {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  progress: number;
  estimatedTime: string;
}

const difficultyColors = {
  Easy: "bg-green-500/10 text-green-400",
  Medium: "bg-yellow-500/10 text-yellow-400",
  Hard: "bg-red-500/10 text-red-400",
};

export function ContinueCard({
  title,
  difficulty,
  progress,
  estimatedTime,
}: ContinueCardProps) {
  return (
    <DashboardCard title="Continue Solving">
      <div className="space-y-5">
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

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-[var(--muted)]">
              Progress
            </span>

            <span className="text-[var(--text)]">
              {progress}%
            </span>
          </div>

          <div className="h-2 rounded-full bg-[var(--surface)]">
            <div
              className="h-2 rounded-full rounded-full bg-[var(--accent)] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <p className="text-sm text-[var(--muted)]">
          Estimated remaining time: {estimatedTime}
        </p>

        <button
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
        </button>
      </div>
    </DashboardCard>
  );
}