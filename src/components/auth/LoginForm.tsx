"use client";

export function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Email
        </label>

        <input
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-violet-500"
          disabled
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-gray-300">
          Password
        </label>

        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-white/10 bg-[#111118] px-4 py-3 text-white outline-none transition focus:border-violet-500"
          disabled
        />
      </div>

      <button
        disabled
        className="w-full rounded-xl bg-violet-600 py-3 font-semibold text-white opacity-40"
      >
        Coming Soon
      </button>
    </form>
  );
}