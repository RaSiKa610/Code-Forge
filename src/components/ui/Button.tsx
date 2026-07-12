import { ButtonHTMLAttributes } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants = {
  primary:
    "bg-[var(--accent)] text-white hover:opacity-90",

  secondary:
    "bg-[var(--panel-2)] text-[var(--text)]",

  ghost:
    "border border-white/10 bg-transparent text-[var(--text)]",

  danger:
    "bg-red-500 text-white hover:bg-red-600",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        px-5
        py-3
        font-medium
        transition-all
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}