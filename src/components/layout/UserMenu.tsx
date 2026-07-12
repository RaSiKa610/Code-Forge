"use client";

export function UserMenu() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-semibold text-white">
        R
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-white">
          Rasika
        </p>

        <p className="text-xs text-zinc-400">
          Diamond II
        </p>
      </div>
    </div>
  );
}