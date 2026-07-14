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
      name:
        profile.name || "",

      bio:
        profile.bio || "",

      headline:
        profile.headline || "",

      location:
        profile.location || "",

      website:
        profile.website || "",

      githubUsername:
        profile.githubUsername ||
        "",

      linkedinUrl:
        profile.linkedinUrl ||
        "",

      image:
        profile.image || "",

      bannerImage:
        profile.bannerImage ||
        "",
    });

  const [loading,
    setLoading] =
    useState(false);

  async function saveProfile() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/profile/update",
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                form
              ),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to update profile"
        );
      }

      alert(
        "Profile updated successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">

      <Input
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name:
              e.target.value,
          })
        }
      />

      <Input
        placeholder="Bio"
        value={form.bio}
        onChange={(e) =>
          setForm({
            ...form,
            bio:
              e.target.value,
          })
        }
      />

      <Input
        placeholder="Headline"
        value={form.headline}
        onChange={(e) =>
          setForm({
            ...form,
            headline:
              e.target.value,
          })
        }
      />

      <Input
        placeholder="Location"
        value={form.location}
        onChange={(e) =>
          setForm({
            ...form,
            location:
              e.target.value,
          })
        }
      />

      <Input
        placeholder="Website"
        value={form.website}
        onChange={(e) =>
          setForm({
            ...form,
            website:
              e.target.value,
          })
        }
      />

      <Input
        placeholder="GitHub Username"
        value={
          form.githubUsername
        }
        onChange={(e) =>
          setForm({
            ...form,
            githubUsername:
              e.target.value,
          })
        }
      />

      <Input
        placeholder="LinkedIn URL"
        value={
          form.linkedinUrl
        }
        onChange={(e) =>
          setForm({
            ...form,
            linkedinUrl:
              e.target.value,
          })
        }
      />

      <Input
        placeholder="Profile Image URL"
        value={form.image}
        onChange={(e) =>
          setForm({
            ...form,
            image:
              e.target.value,
          })
        }
      />

      <Input
        placeholder="Banner Image URL"
        value={
          form.bannerImage
        }
        onChange={(e) =>
          setForm({
            ...form,
            bannerImage:
              e.target.value,
          })
        }
      />

      <Button
        onClick={
          saveProfile
        }
        disabled={
          loading
        }
      >
        {loading
          ? "Saving..."
          : "Save Profile"}
      </Button>
    </div>
  );
}
