import { notFound } from "next/navigation";
import { getProfile } from "@/services/profile/getProfile";
import ProfileHeader from "@/components/profile/ProfileHeader";

export default async function ProfilePage(props: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await props.params;
  const user = await getProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <ProfileHeader user={user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border border-white/10 bg-[var(--panel)] p-6">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="text-[var(--text)] whitespace-pre-wrap">
              {user.bio || "No bio added yet."}
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-[var(--panel)] p-6">
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Solved Problems</span>
                <span className="font-semibold">{user.solvedProblemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Submissions</span>
                <span className="font-semibold">{user.totalSubmissions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Acceptance Rate</span>
                <span className="font-semibold">{user.acceptanceRate}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
