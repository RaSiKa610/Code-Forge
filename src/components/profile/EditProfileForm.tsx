"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function EditProfileForm({
  profile,
}: {
  profile: any;
}) {
  const [form, setForm] =
    useState({
      name: profile.name || "",
      bio: profile.bio || "",
      headline: profile.headline || "",
      location: profile.location || "",
      website: profile.website || "",
      githubUsername: profile.githubUsername || "",
      linkedinUrl: profile.linkedinUrl || "",
    });

  const [loading, setLoading] = useState(false);

  async function saveProfile() {
    try {
      setLoading(true);

      const response = await fetch("/api/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[var(--text)] mb-1">Name</label>
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--text)] mb-1">Bio</label>
          <Input
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--text)] mb-1">Headline</label>
          <Input
            placeholder="Headline"
            value={form.headline}
            onChange={(e) => setForm({ ...form, headline: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--text)] mb-1">Location</label>
          <Input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--text)] mb-1">Website</label>
          <Input
            placeholder="Website"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--text)] mb-1">GitHub Username</label>
          <Input
            placeholder="GitHub Username"
            value={form.githubUsername}
            onChange={(e) => setForm({ ...form, githubUsername: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--text)] mb-1">LinkedIn URL</label>
          <Input
            placeholder="LinkedIn URL"
            value={form.linkedinUrl}
            onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
          />
        </div>

        <Button onClick={saveProfile} disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
