"use client";

import UserCard from "./UserCard";

type User = {
  id: string;
  username: string;
  image?: string | null;
};

type Props = {
  users: User[];
};

export default function FollowersList({
  users,
}: Props) {
  if (!Array.isArray(users)) {
    return null;
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          username={user.username}
          image={user.image}
        />
      ))}
    </div>
  );
}
