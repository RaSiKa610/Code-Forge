"use client";

interface AvatarProps {
  image?: string | null;
  name?: string | null;
  size?: number;
}

export function Avatar({
  image,
  name,
  size = 48,
}: AvatarProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={name ?? "Avatar"}
        className="rounded-full object-cover"
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <div
      className="
        flex
        items-center
        justify-center
        rounded-full
        bg-[var(--accent)]
        font-bold
        text-white
      "
      style={{
        width: size,
        height: size,
      }}
    >
      {name?.charAt(0).toUpperCase() ?? "?"}
    </div>
  );
}