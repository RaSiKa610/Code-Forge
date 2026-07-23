"use client";

import { useState, useEffect } from "react";
import {
  Swords,
  Zap,
  Trophy,
  Users,
  Flame,
  Clock,
  ShieldAlert,
  Play,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles,
  Search,
  ChevronRight,
  UserCheck,
} from "lucide-react";

interface LiveMatch {
  id: string;
  p1: { name: string; rank: string; rating: number; avatar: string };
  p2: { name: string; rank: string; rating: number; avatar: string };
  problem: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  timeElapsed: string;
  spectators: number;
}

interface MatchHistoryItem {
  id: string;
  opponent: { name: string; rank: string; rating: number };
  result: "VICTORY" | "DEFEAT" | "DRAW";
  problem: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  ratingChange: number;
  date: string;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  title: string;
  rating: number;
  wins: number;
  losses: number;
  winRate: number;
  badge: string;
}

const MOCK_LIVE_MATCHES: LiveMatch[] = [
  {
    id: "m1",
    p1: { name: "Alex_CodeGod", rank: "GRANDMASTER", rating: 2450, avatar: "⚡" },
    p2: { name: "DevNinja99", rank: "MASTER", rating: 2310, avatar: "🥷" },
    problem: "Trapping Rain Water",
    difficulty: "HARD",
    timeElapsed: "04:12",
    spectators: 142,
  },
  {
    id: "m2",
    p1: { name: "SarahCoder", rank: "DIAMOND", rating: 2050, avatar: "🚀" },
    p2: { name: "ByteCrusher", rank: "DIAMOND", rating: 1980, avatar: "👾" },
    problem: "Course Schedule II",
    difficulty: "MEDIUM",
    timeElapsed: "08:45",
    spectators: 89,
  },
  {
    id: "m3",
    p1: { name: "AlgoWizard", rank: "PLATINUM", rating: 1720, avatar: "🧙‍♂️" },
    p2: { name: "PixelPush", rank: "PLATINUM", rating: 1690, avatar: "🎨" },
    problem: "Valid Parentheses",
    difficulty: "EASY",
    timeElapsed: "02:18",
    spectators: 34,
  },
];

const MOCK_HISTORY: MatchHistoryItem[] = [
  {
    id: "h1",
    opponent: { name: "CyberKnight", rank: "DIAMOND", rating: 1950 },
    result: "VICTORY",
    problem: "Longest Consecutive Sequence",
    difficulty: "MEDIUM",
    ratingChange: +32,
    date: "2 hours ago",
  },
  {
    id: "h2",
    opponent: { name: "ShadowCoder", rank: "MASTER", rating: 2210 },
    result: "DEFEAT",
    problem: "Median of Two Sorted Arrays",
    difficulty: "HARD",
    ratingChange: -18,
    date: "Yesterday",
  },
  {
    id: "h3",
    opponent: { name: "CodeWitch", rank: "PLATINUM", rating: 1840 },
    result: "VICTORY",
    problem: "Product of Array Except Self",
    difficulty: "MEDIUM",
    ratingChange: +28,
    date: "2 days ago",
  },
  {
    id: "h4",
    opponent: { name: "NullPointer", rank: "GOLD", rating: 1520 },
    result: "VICTORY",
    problem: "Two Sum",
    difficulty: "EASY",
    ratingChange: +15,
    date: "3 days ago",
  },
];

const MOCK_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "Satoshi_N", title: "LEGEND", rating: 2940, wins: 412, losses: 38, winRate: 91.5, badge: "👑" },
  { rank: 2, name: "Alex_CodeGod", title: "GRANDMASTER", rating: 2810, wins: 380, losses: 52, winRate: 87.9, badge: "⚔️" },
  { rank: 3, name: "KernelPanic", title: "GRANDMASTER", rating: 2750, wins: 345, losses: 61, winRate: 84.9, badge: "🔥" },
  { rank: 4, name: "DeepByte", title: "MASTER", rating: 2620, wins: 298, losses: 74, winRate: 80.1, badge: "💎" },
  { rank: 5, name: "DevNinja99", title: "MASTER", rating: 2540, wins: 270, losses: 82, winRate: 76.7, badge: "🥷" },
];

export function BattlesClient() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimer, setSearchTimer] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"ANY" | "EASY" | "MEDIUM" | "HARD">("ANY");
  const [selectedMode, setSelectedMode] = useState<"RANKED" | "SPEED" | "CUSTOM">("RANKED");
  const [activeTab, setActiveTab] = useState<"ARENA" | "LIVE" | "HISTORY" | "LEADERBOARD">("ARENA");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSearching) {
      interval = setInterval(() => {
        setSearchTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setSearchTimer(0);
    }
    return () => clearInterval(interval);
  }, [isSearching]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-r from-purple-900/30 via-[var(--card)] to-zinc-900/40 p-8">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20">
              <Swords className="h-3.5 w-3.5" /> 1v1 Battle Arena
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)] font-display">
              Prove Your Coding Mastery
            </h1>
            <p className="text-sm text-[var(--subtle)] leading-relaxed">
              Race head-to-head against real-time opponents to solve algorithmic challenges first. Earn Elo, climb the global ranks, and claim Forge Coins!
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 p-4 text-center min-w-[110px]">
              <p className="text-xs font-semibold uppercase text-[var(--muted)]">Rating</p>
              <p className="text-2xl font-bold text-purple-400 mt-1 font-mono">1,840</p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/80 p-4 text-center min-w-[110px]">
              <p className="text-xs font-semibold uppercase text-[var(--muted)]">Win Rate</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1 font-mono">68.4%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: "ARENA", label: "Battle Queue", icon: Swords },
          { id: "LIVE", label: "Live Matches (3)", icon: Eye },
          { id: "HISTORY", label: "Match History", icon: Clock },
          { id: "LEADERBOARD", label: "Top Duelists", icon: Trophy },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all whitespace-nowrap
                ${
                  isActive
                    ? "bg-[var(--accent)] text-white shadow-md shadow-purple-500/20"
                    : "text-[var(--muted)] hover:bg-zinc-800/40 hover:text-[var(--text)]"
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: BATTLE QUEUE & MATCHMAKING */}
      {activeTab === "ARENA" && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Matchmaking Card */}
          <div className="lg:col-span-2 space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-bold text-[var(--text)] flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400" /> Enter Matchmaking
              </h2>
              <p className="text-xs text-[var(--muted)] mt-1">Select your battle parameters and find an opponent.</p>
            </div>

            {/* Mode Select */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Battle Mode</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { id: "RANKED", name: "Ranked 1v1", desc: "Gain or lose Elo rating points", icon: Trophy, color: "border-purple-500/40 bg-purple-500/10 text-purple-300" },
                  { id: "SPEED", name: "Speed Coding", desc: "5-minute rapid execution", icon: Zap, color: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
                  { id: "CUSTOM", name: "Custom Duel", desc: "Private match with a friend", icon: Users, color: "border-blue-500/40 bg-blue-500/10 text-blue-300" },
                ].map((mode) => {
                  const Icon = mode.icon;
                  const selected = selectedMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id as any)}
                      className={`
                        rounded-xl border p-4 text-left transition-all duration-200
                        ${
                          selected
                            ? `${mode.color} ring-1 ring-purple-500/50 shadow-lg`
                            : "border-[var(--border)] bg-[var(--background)]/50 hover:border-zinc-700 text-[var(--text)]"
                        }
                      `}
                    >
                      <Icon className="h-5 w-5 mb-2" />
                      <h4 className="font-semibold text-sm">{mode.name}</h4>
                      <p className="text-xs text-[var(--subtle)] mt-1">{mode.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Select */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Problem Difficulty</label>
              <div className="flex flex-wrap gap-3">
                {(["ANY", "EASY", "MEDIUM", "HARD"] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`
                      rounded-xl px-5 py-2.5 text-xs font-semibold transition-all border
                      ${
                        selectedDifficulty === diff
                          ? "border-purple-500 bg-purple-500/20 text-white"
                          : "border-[var(--border)] bg-[var(--background)]/50 text-[var(--muted)] hover:text-white"
                      }
                    `}
                  >
                    {diff === "ANY" ? "⚡ Any Difficulty" : diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-[var(--border)]">
              {isSearching ? (
                <div className="rounded-2xl border border-purple-500/40 bg-purple-500/10 p-6 text-center space-y-4 animate-pulse">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-purple-300">
                    <Swords className="h-6 w-6 animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Searching for Rival Coder...</h3>
                    <p className="text-xs text-purple-300/80 mt-1 font-mono">Time Elapsed: {formatTimer(searchTimer)}</p>
                  </div>
                  <button
                    onClick={() => setIsSearching(false)}
                    className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-6 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-all"
                  >
                    Cancel Matchmaking
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearching(true)}
                  className="
                    w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4
                    font-semibold text-white shadow-xl shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500
                    active:scale-[0.99] transition-all duration-200 text-base
                  "
                >
                  <Play className="h-5 w-5 fill-current" /> Find Match Now
                </button>
              )}
            </div>
          </div>

          {/* Side Info Panel */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
              <h3 className="font-semibold text-base text-[var(--text)] flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-purple-400" /> Arena Rules
              </h3>
              <ul className="space-y-2.5 text-xs text-[var(--subtle)] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span> Both players receive the exact same problem simultaneously.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span> First to pass all test cases wins the battle and gains Elo.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span> Unsportsmanlike conduct or tab switches trigger cheat detection.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
              <h3 className="font-semibold text-base text-[var(--text)] flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" /> Season Rewards
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--subtle)]">Ranked Tier</span>
                  <span className="font-bold text-purple-400">Diamond II</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--subtle)]">Season Forge Coins</span>
                  <span className="font-bold text-amber-400">+1,450 🪙</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE MATCHES */}
      {activeTab === "LIVE" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_LIVE_MATCHES.map((match) => (
            <div key={match.id} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-rose-400 border border-rose-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" /> LIVE
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">{match.timeElapsed}</span>
                </div>

                <h3 className="font-bold text-base text-[var(--text)] line-clamp-1">{match.problem}</h3>
              </div>

              {/* VS Players */}
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-[var(--background)]/60 p-3 border border-[var(--border)] items-center">
                <div className="text-center space-y-1">
                  <span className="text-2xl">{match.p1.avatar}</span>
                  <p className="text-xs font-bold text-[var(--text)] truncate">{match.p1.name}</p>
                  <span className="text-[10px] text-purple-400 font-semibold">{match.p1.rating} Elo</span>
                </div>

                <div className="text-center space-y-1">
                  <span className="text-2xl">{match.p2.avatar}</span>
                  <p className="text-xs font-bold text-[var(--text)] truncate">{match.p2.name}</p>
                  <span className="text-[10px] text-purple-400 font-semibold">{match.p2.rating} Elo</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5 text-zinc-400" /> {match.spectators} watching
                </span>

                <button className="flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 text-xs font-semibold text-white transition-all">
                  <Eye className="h-3.5 w-3.5" /> Spectate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: MATCH HISTORY */}
      {activeTab === "HISTORY" && (
        <div className="space-y-3">
          {MOCK_HISTORY.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:px-6 gap-3"
            >
              <div className="flex items-center gap-4">
                {item.result === "VICTORY" ? (
                  <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-rose-400 flex-shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text)] text-base">{item.problem}</span>
                    <span className="text-xs text-[var(--muted)] font-mono">({item.difficulty})</span>
                  </div>
                  <p className="text-xs text-[var(--subtle)] mt-0.5">
                    vs <span className="font-semibold text-[var(--text)]">{item.opponent.name}</span> ({item.opponent.rating} Elo)
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                <span className="text-xs text-[var(--muted)]">{item.date}</span>
                <span
                  className={`font-mono font-bold text-sm ${
                    item.ratingChange > 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {item.ratingChange > 0 ? `+${item.ratingChange}` : item.ratingChange} Elo
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: LEADERBOARD */}
      {activeTab === "LEADERBOARD" && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <div className="divide-y divide-[var(--border)]">
            {MOCK_LEADERBOARD.map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-4 sm:px-6 hover:bg-zinc-800/30 transition-all">
                <div className="flex items-center gap-4">
                  <span className="w-6 text-center font-mono font-bold text-lg text-purple-400">
                    {user.badge} #{user.rank}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-[var(--text)]">{user.name}</h4>
                      <span className="rounded-md bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[10px] font-semibold text-purple-400">
                        {user.title}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--subtle)] mt-0.5">
                      {user.wins}W - {user.losses}L ({user.winRate}% Win Rate)
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-mono font-bold text-lg text-purple-400">{user.rating}</p>
                  <p className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Elo Rating</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
