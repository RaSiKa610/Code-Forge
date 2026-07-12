"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import type { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui";

const DASHBOARD_URL = "/dashboard";

interface OAuthProvider {
  id: "github" | "google";
  label: string;
  icon: IconType;
}

const providers: readonly OAuthProvider[] = [
  {
    id: "github",
    label: "Continue with GitHub",
    icon: FaGithub,
  },
  {
    id: "google",
    label: "Continue with Google",
    icon: FcGoogle,
  },
];

type Provider = OAuthProvider["id"];

export function OAuthButtons() {
  const [loadingProvider, setLoadingProvider] =
    useState<Provider | null>(null);

  async function handleOAuthLogin(provider: Provider) {
    try {
      setLoadingProvider(provider);

      await signIn(provider, {
        callbackUrl: DASHBOARD_URL,
      });
    } catch (error) {
      console.error("OAuth sign-in failed:", error);
    } finally {
      setLoadingProvider(null);
    }
  }

  return (
    <div className="space-y-3">
      {providers.map((provider) => {
        const Icon = provider.icon;
        const isLoading =
          loadingProvider === provider.id;

        return (
          <Button
            key={provider.id}
            type="button"
            variant="secondary"
            disabled={loadingProvider !== null}
            aria-busy={isLoading}
            onClick={() =>
              handleOAuthLogin(provider.id)
            }
            className="w-full"
          >
            <Icon size={18} />

            <span>
              {isLoading
                ? "Redirecting..."
                : provider.label}
            </span>
          </Button>
        );
      })}
    </div>
  );
}