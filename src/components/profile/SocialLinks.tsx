import { Card } from "@/components/ui/Card";

type Props = {
  profile: any;
};

export default function SocialLinks({
  profile,
}: Props) {
  return (
    <Card>
      <h2 className="mb-4 text-xl font-bold">
        Social Links
      </h2>

      <div className="space-y-3">

        {profile.location && (
          <p>
            📍 {profile.location}
          </p>
        )}

        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            className="block text-blue-400"
          >
            🌐 {profile.website}
          </a>
        )}

        {profile.githubUsername && (
          <a
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            className="block text-blue-400"
          >
            🐙 {profile.githubUsername}
          </a>
        )}

        {profile.linkedinUrl && (
          <a
            href={profile.linkedinUrl}
            target="_blank"
            className="block text-blue-400"
          >
            💼 LinkedIn
          </a>
        )}
      </div>
    </Card>
  );
}
