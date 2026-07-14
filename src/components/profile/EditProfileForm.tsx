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
      image: profile.image || "",
      bannerImage: profile.bannerImage || "",
    });

  const [loading, setLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const url = await uploadImage(file);
      setForm((prev) => ({
        ...prev,
        image: url,
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to upload avatar");
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingBanner(true);
      const url = await uploadImage(file);
      setForm((prev) => ({
        ...prev,
        bannerImage: url,
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to upload banner");
    } finally {
      setUploadingBanner(false);
    }
  }

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
      {/* Image Preview and Upload Section */}
      <div className="space-y-6">
        <div className="relative h-48 overflow-hidden rounded-2xl bg-[var(--panel-2)] border border-white/10 flex items-center justify-center">
          <img
            src={form.bannerImage || "/default-banner.jpg"}
            className="h-full w-full object-cover"
            alt="Profile Banner"
            onError={(e) => {
              // fallback if banner is missing
              (e.target as HTMLImageElement).src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='200' style='background:%231e1e2e'></svg>";
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={form.image || "/default-avatar.png"}
            className="h-28 w-28 rounded-full object-cover border-4 border-[var(--panel-2)] bg-[var(--panel-2)]"
            alt="Profile Avatar"
          />

          <div className="space-y-3 w-full sm:w-auto">
            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Upload Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[var(--panel-2)] file:text-[var(--text)] hover:file:opacity-90 cursor-pointer"
              />
              {uploadingAvatar && <span className="text-xs text-[var(--muted)] ml-2">Uploading...</span>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--muted)] mb-1">
                Upload Banner Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                disabled={uploadingBanner}
                className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[var(--panel-2)] file:text-[var(--text)] hover:file:opacity-90 cursor-pointer"
              />
              {uploadingBanner && <span className="text-xs text-[var(--muted)] ml-2">Uploading...</span>}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-white/5" />

      {/* Form Fields */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-[var(--text)]">Name</label>
        <Input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="block text-sm font-semibold text-[var(--text)]">Bio</label>
        <Input
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />

        <label className="block text-sm font-semibold text-[var(--text)]">Headline</label>
        <Input
          placeholder="Headline"
          value={form.headline}
          onChange={(e) => setForm({ ...form, headline: e.target.value })}
        />

        <label className="block text-sm font-semibold text-[var(--text)]">Location</label>
        <Input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <label className="block text-sm font-semibold text-[var(--text)]">Website</label>
        <Input
          placeholder="Website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />

        <label className="block text-sm font-semibold text-[var(--text)]">GitHub Username</label>
        <Input
          placeholder="GitHub Username"
          value={form.githubUsername}
          onChange={(e) => setForm({ ...form, githubUsername: e.target.value })}
        />

        <label className="block text-sm font-semibold text-[var(--text)]">LinkedIn URL</label>
        <Input
          placeholder="LinkedIn URL"
          value={form.linkedinUrl}
          onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
        />

        <Button onClick={saveProfile} disabled={loading || uploadingAvatar || uploadingBanner}>
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
