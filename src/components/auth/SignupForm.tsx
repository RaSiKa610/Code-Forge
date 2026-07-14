"use client";

export function SignupForm() {
  return (
    <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">

      <h3 className="mb-3 text-lg font-semibold text-white">
        Join CodeForge
      </h3>

      <p className="mb-4 text-sm text-gray-400">
        Create your account instantly using GitHub or Google.
        No passwords.
        No email verification.
      </p>

      <ul className="space-y-2 text-sm text-gray-300">
        <li>✓ Personalized dashboard</li>
        <li>✓ Track coding streaks</li>
        <li>✓ Earn Forge Coins</li>
        <li>✓ Compete in Battles</li>
        <li>✓ Build your developer profile</li>
      </ul>
    </div>
  );
}