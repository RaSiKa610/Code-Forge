"use client";

import { useEffect, useState } from "react";

import SearchBar from "@/components/connections/SearchBar";
import UserCard from "@/components/connections/UserCard";
import FollowersList from "@/components/connections/FollowersList";
import FollowingList from "@/components/connections/FollowingList";
import FriendsList from "@/components/connections/FriendsList";

import { Button } from "@/components/ui/Button";

type User = {
  id: string;
  username: string;
  image?: string | null;
  initialFollowing?: boolean;
};

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] =
    useState("search");

  const [query, setQuery] = useState("");

  const [users, setUsers] =
    useState<User[]>([]);

  const [followers, setFollowers] =
    useState<User[]>([]);

  const [following, setFollowing] =
    useState<User[]>([]);

  const [friends, setFriends] =
    useState<User[]>([]);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] =
    useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    fetch(
      `/api/connections/search?q=${query}&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data.users) ? data.users : []);
        setHasMore(data.hasMore);
        setPage(1);
      });
  }, [query]);

  async function loadMore() {
    const nextPage = page + 1;

    const res = await fetch(
      `/api/connections/search?q=${query}&page=${nextPage}`
    );

    const data = await res.json();

    setUsers((prev) => [
      ...prev,
      ...(Array.isArray(data.users) ? data.users : []),
    ]);

    setHasMore(data.hasMore);

    setPage(nextPage);
  }

  async function fetchTabData(tab: string) {
    let endpoint = "";

    switch (tab) {
      case "followers":
        endpoint = "/api/connections/followers";
        break;

      case "following":
        endpoint = "/api/connections/following";
        break;

      case "friends":
        endpoint = "/api/connections/friends";
        break;

      default:
        return;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (tab === "followers") {
        setFollowers(data);
      }

      if (tab === "following") {
        setFollowing(data);
      }

      if (tab === "friends") {
        setFriends(data);
      }
    } catch (err) {
      console.error("Failed to fetch tab data:", err);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">
        Connections
      </h1>

      <div className="flex gap-3">
        <Button
          variant={
            activeTab === "search"
              ? "primary"
              : "secondary"
          }
          onClick={() =>
            setActiveTab("search")
          }
        >
          Search
        </Button>

        <Button
          variant={
            activeTab === "followers"
              ? "primary"
              : "secondary"
          }
          onClick={() => {
            setActiveTab("followers");
            fetchTabData("followers");
          }}
        >
          Followers
        </Button>

        <Button
          variant={
            activeTab === "following"
              ? "primary"
              : "secondary"
          }
          onClick={() => {
            setActiveTab("following");
            fetchTabData("following");
          }}
        >
          Following
        </Button>

        <Button
          variant={
            activeTab === "friends"
              ? "primary"
              : "secondary"
          }
          onClick={() => {
            setActiveTab("friends");
            fetchTabData("friends");
          }}
        >
          Friends
        </Button>
      </div>

      {activeTab === "search" && (
        <>
          <SearchBar
            value={query}
            onChange={setQuery}
          />

          <div className="space-y-4">
            {Array.isArray(users) &&
              users.map((user) => (
                <UserCard
                  key={user.id}
                  {...user}
                />
              ))}
          </div>

          {hasMore && (
            <Button
              onClick={loadMore}
            >
              Load More
            </Button>
          )}
        </>
      )}

      {activeTab === "followers" && (
        <FollowersList
          users={followers}
        />
      )}

      {activeTab === "following" && (
        <FollowingList
          users={following}
        />
      )}

      {activeTab === "friends" && (
        <FriendsList users={friends} />
      )}
    </div>
  );
}
