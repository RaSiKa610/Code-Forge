import { Award, Crown, Gem } from "lucide-react";

import { Card } from "@/components/ui/Card";
import type { ProfileData } from "@/types/profile";

type Props = {
  profile: ProfileData;
};

export default function AchievementSection({
  profile,
}: Props) {
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--text)]">
          Achievements
        </h2>

        <span className="text-sm text-[var(--muted)]">
          {profile.achievements.length} Unlocked
        </span>
      </div>

      {profile.achievements.length === 0 ? (
        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-[var(--border)]
            py-10
          "
        >
          <Award
            size={42}
            className="mb-3 text-[var(--muted)]"
          />

          <p className="font-medium text-[var(--text)]">
            No achievements yet
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Solve problems and win battles to unlock achievements.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {profile.achievements.map((item) => (
            <div
              key={item.achievement.id}
              className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-[var(--surface)]
                p-5
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--accent)]/40
              "
            >
              <div className="mb-4 flex items-center justify-between">

                <div className="text-4xl">
                  {item.achievement.emoji}
                </div>

                {item.achievement.isLegendary ? (
                  <Crown
                    size={20}
                    className="text-yellow-400"
                  />
                ) : item.achievement.isRare ? (
                  <Gem
                    size={18}
                    className="text-violet-400"
                  />
                ) : (
                  <Award
                    size={18}
                    className="text-[var(--muted)]"
                  />
                )}

              </div>

              <h3 className="font-semibold text-[var(--text)]">
                {item.achievement.name}
              </h3>

              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.achievement.description}
              </p>
            </div>
          ))}

        </div>
      )}
    </Card>
  );
}