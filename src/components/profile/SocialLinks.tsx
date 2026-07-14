import { Card } from "@/components/ui/Card";

export default function SocialLinks({ profile }: { profile: any }) {
  return (
    <Card>
      <h3 className="text-lg font-bold mb-4">Social Links</h3>
      <div className="space-y-2">
        {profile.website && (
          <div>
            <span className="text-[var(--muted)]">Website: </span>
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              {profile.website}
            </a>
          </div>
        )}
        {profile.githubUsername && (
          <div>
            <span className="text-[var(--muted)]">GitHub: </span>
            <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              {profile.githubUsername}
            </a>
          </div>
        )}
        {profile.linkedinUrl && (
          <div>
            <span className="text-[var(--muted)]">LinkedIn: </span>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">
              {profile.linkedinUrl}
            </a>
          </div>
        )}
        {!profile.website && !profile.githubUsername && !profile.linkedinUrl && (
          <p className="text-[var(--muted)]">No social links added yet.</p>
        )}
      </div>
    </Card>
  );
}
