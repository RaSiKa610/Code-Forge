"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Clock, Flame } from "lucide-react";
import type { ProblemItem } from "@/data/problemsData";

interface ProblemRowProps {
  problem: ProblemItem;
}

export function ProblemRow({ problem }: ProblemRowProps) {
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return (
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            Easy
          </span>
        );
      case "MEDIUM":
        return (
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20">
            Medium
          </span>
        );
      case "HARD":
        return (
          <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-400 border border-rose-500/20">
            Hard
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = (status?: string) => {
    if (status === "SOLVED") {
      return <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />;
    }
    if (status === "ATTEMPTED") {
      return <Clock className="h-5 w-5 text-amber-400 flex-shrink-0" />;
    }
    return <Circle className="h-5 w-5 text-zinc-600 flex-shrink-0" />;
  };

  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="
        group flex flex-col md:flex-row md:items-center justify-between
        rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 sm:px-6
        transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/40 hover:bg-[var(--card)]/80 hover:shadow-lg gap-3
      "
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="pt-0.5">{getStatusIcon(problem.solvedStatus)}</div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[var(--muted)] font-mono">
              #{problem.number}
            </span>
            <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate text-base">
              {problem.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-xs text-[var(--subtle)]">{problem.category}</span>
            <span className="text-xs text-zinc-600">•</span>
            {problem.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-zinc-800/60 px-2 py-0.5 text-[11px] font-medium text-zinc-400 border border-zinc-700/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/40">
        <div className="flex items-center gap-1.5 text-xs text-[var(--muted)] font-medium">
          <Flame className="h-3.5 w-3.5 text-amber-500/80" />
          <span>{problem.acceptance.toFixed(1)}%</span>
        </div>

        <div>{getDifficultyBadge(problem.difficulty)}</div>
      </div>
    </Link>
  );
}
