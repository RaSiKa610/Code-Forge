import { Card } from "@/components/ui/Card";

export default function AchievementSection({ profile }: { profile: any }) {
  return (
    <Card>
      <h3 className="text-lg font-bold mb-4">Achievements</h3>
      {profile.achievements && profile.achievements.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {profile.achievements.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--panel-2)] border border-white/5">
              <span className="text-2xl">{item.achievement.emoji}</span>
              <div>
                <p className="font-semibold text-sm">{item.achievement.name}</p>
                <p className="text-[var(--muted)] text-xs">{item.achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted)]">No achievements unlocked yet.</p>
      )}
    </Card>
  );
}
