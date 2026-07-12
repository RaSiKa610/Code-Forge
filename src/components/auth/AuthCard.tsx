"use client";

import { useState } from "react";

import { AuthHeader } from "./AuthHeader";
import { AuthTabs } from "./AuthTabs";
import { OAuthButtons } from "./OAuthButtons";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { AuthFooter } from "./AuthFooter";

export function AuthCard() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#1a1a26] p-8 shadow-2xl">

      <AuthHeader />

      <AuthTabs
        mode={mode}
        setMode={setMode}
      />

      <OAuthButtons />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-gray-500">
          OR
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {mode === "login" ? (
        <LoginForm />
      ) : (
        <SignupForm />
      )}

      <AuthFooter
        mode={mode}
        setMode={setMode}
      />

    </div>
  );
}