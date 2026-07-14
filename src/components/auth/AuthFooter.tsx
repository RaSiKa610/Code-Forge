interface Props {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
}

export function AuthFooter({
  mode,
  setMode,
}: Props) {
  return (
    <div className="mt-6 text-center text-sm text-gray-400">

      {mode === "login" ? (
        <>
          New to CodeForge?{" "}

          <button
            onClick={() => setMode("signup")}
            className="font-semibold text-violet-400 hover:text-violet-300"
          >
            Join Free
          </button>
        </>
      ) : (
        <>
          Already have an account?{" "}

          <button
            onClick={() => setMode("login")}
            className="font-semibold text-violet-400 hover:text-violet-300"
          >
            Sign In
          </button>
        </>
      )}

    </div>
  );
}