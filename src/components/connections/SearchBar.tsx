"use client";

import { Input } from "@/components/ui/Input";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <Input
      placeholder="Search users..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}
