interface Props {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
}

export function AuthTabs({
  mode,
  setMode,
}: Props) {
  return (
    <div className="mb-6 grid grid-cols-2 rounded-lg bg-[#12121a] p-1">

      <button
        onClick={() => setMode("login")}
        className={`rounded-md py-2 text-sm font-medium transition ${
          mode === "login"
            ? "bg-violet-600 text-white"
            : "text-gray-400"
        }`}
      >
        Sign In
      </button>

      <button
        onClick={() => setMode("signup")}
        className={`rounded-md py-2 text-sm font-medium transition ${
          mode === "signup"
            ? "bg-violet-600 text-white"
            : "text-gray-400"
        }`}
      >
        Join Free
      </button>

    </div>
  );
}