import { Card } from "@/components/ui/Card";

type Props = {
  profile: any;
};

export default function AchievementSection({
  profile,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-bold">
        Achievements
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        {profile.achievements.length === 0 && (
          <p>
            No achievements unlocked yet.
          </p>
        )}

        {profile.achievements.map(
          (item: any) => (
            <div
              key={item.id}
              className="
                rounded-xl
                border
                border-white/10
                p-4
              "
            >
              <div className="text-3xl">
                {
                  item.achievement
                    .emoji
                }
              </div>

              <h3 className="mt-2 font-bold">
                {
                  item.achievement
                    .name
                }
              </h3>

              <p className="text-sm text-gray-400">
                {
                  item.achievement
                    .description
                }
              </p>
            </div>
          )
        )}
      </div>
    </Card>
  );
}
