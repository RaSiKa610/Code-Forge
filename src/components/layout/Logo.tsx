import { APP_NAME, APP_TAGLINE } from "@/config/app";

interface LogoProps {
  compact?: boolean;
}

export function Logo({
  compact = false,
}: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-xl
          bg-gradient-to-br
          from-violet-500
          to-fuchsia-600
          text-lg
          font-bold
          text-white
          shadow-lg
        "
      >
        C
      </div>

      {!compact && (
        <div className="leading-tight">
          <h1 className="text-lg font-bold text-white">
            {APP_NAME}
          </h1>

          <p className="text-xs text-zinc-400">
            {APP_TAGLINE}
          </p>
        </div>
      )}
    </div>
  );
}