"use client";

import { useEffect, useState } from "react";
import EditProfileForm from "@/components/profile/EditProfileForm";

export default function SettingsProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function load() {
      // Mock session username for local testing
      const username = "sujal_maurya";

      const data = await fetch(
        `/api/profile/${username}`
      ).then((res) => res.json());

      setProfile(data);
    }

    load();
  }, []);

  if (!profile) {
    return <div className="p-6 text-[var(--muted)]">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
      <EditProfileForm profile={profile} />
    </div>
  );
}
