import { InputHTMLAttributes } from "react";

type InputProps =
  InputHTMLAttributes<HTMLInputElement>;

export function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`
        w-full
        rounded-xl
        border
        border-white/10
        bg-[var(--panel)]
        px-4
        py-3
        text-[var(--text)]
        outline-none
        transition
        focus:border-[var(--accent)]
        ${className}
      `}
      {...props}
    />
  );
}