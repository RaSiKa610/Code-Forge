"use client";

import { useState, useMemo } from "react";
import { Search, Sparkles, Filter, CheckCircle, Code2, Layers, Award } from "lucide-react";
import { PROBLEMS_DATA, ProblemItem } from "@/data/problemsData";
import { ProblemRow } from "@/components/problems/ProblemRow";

export function ProblemsClient() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"ALL" | "EASY" | "MEDIUM" | "HARD">("ALL");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | "SOLVED" | "UNSOLVED">("ALL");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    PROBLEMS_DATA.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet).sort();
  }, []);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return PROBLEMS_DATA.filter((problem) => {
      // Difficulty match
      if (selectedDifficulty !== "ALL" && problem.difficulty !== selectedDifficulty) {
        return false;
      }

      // Tag match
      if (selectedTag !== "ALL" && !problem.tags.includes(selectedTag)) {
        return false;
      }

      // Status match
      if (selectedStatus === "SOLVED" && problem.solvedStatus !== "SOLVED") {
        return false;
      }
      if (selectedStatus === "UNSOLVED" && problem.solvedStatus === "SOLVED") {
        return false;
      }

      // Search match
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesTitle = problem.title.toLowerCase().includes(query);
        const matchesNumber = problem.number.toString().includes(query);
        const matchesCategory = problem.category.toLowerCase().includes(query);
        const matchesTag = problem.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesNumber || matchesCategory || matchesTag;
      }

      return true;
    });
  }, [search, selectedDifficulty, selectedTag, selectedStatus]);

  // Statistics
  const stats = useMemo(() => {
    const total = PROBLEMS_DATA.length;
    const easyCount = PROBLEMS_DATA.filter((p) => p.difficulty === "EASY").length;
    const mediumCount = PROBLEMS_DATA.filter((p) => p.difficulty === "MEDIUM").length;
    const hardCount = PROBLEMS_DATA.filter((p) => p.difficulty === "HARD").length;
    const solvedCount = PROBLEMS_DATA.filter((p) => p.solvedStatus === "SOLVED").length;

    return { total, easyCount, mediumCount, hardCount, solvedCount };
  }, []);

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <Code2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">Total Problems</p>
            <h3 className="text-2xl font-bold text-[var(--text)] mt-0.5">{stats.total}</h3>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/80">Easy</p>
            <h3 className="text-2xl font-bold text-[var(--text)] mt-0.5">{stats.easyCount}</h3>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-400/80">Medium</p>
            <h3 className="text-2xl font-bold text-[var(--text)] mt-0.5">{stats.mediumCount}</h3>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-400/80">Hard</p>
            <h3 className="text-2xl font-bold text-[var(--text)] mt-0.5">{stats.hardCount}</h3>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search problems by title, tag, or #number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full rounded-xl border border-[var(--border)] bg-[var(--background)]/60 py-2.5 pl-10 pr-4
                text-sm text-[var(--text)] placeholder-[var(--muted)] focus:border-[var(--accent)]
                focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-all
              "
            />
          </div>

          {/* Difficulty Tabs */}
          <div className="flex items-center gap-1 rounded-xl bg-[var(--background)]/60 p-1 border border-[var(--border)]">
            {(["ALL", "EASY", "MEDIUM", "HARD"] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`
                  rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all
                  ${
                    selectedDifficulty === diff
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }
                `}
              >
                {diff === "ALL" ? "All" : diff.charAt(0) + diff.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Tags bar & Status filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border)]/60">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none max-w-full">
            <span className="text-xs text-[var(--muted)] font-medium flex items-center gap-1 flex-shrink-0">
              <Filter className="h-3.5 w-3.5" /> Topic:
            </span>
            <button
              onClick={() => setSelectedTag("ALL")}
              className={`
                rounded-lg px-2.5 py-1 text-xs font-medium transition-all flex-shrink-0
                ${
                  selectedTag === "ALL"
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    : "bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                }
              `}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`
                  rounded-lg px-2.5 py-1 text-xs font-medium transition-all flex-shrink-0
                  ${
                    selectedTag === tag
                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                      : "bg-zinc-800/40 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  }
                `}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() =>
                setSelectedStatus((prev) => (prev === "SOLVED" ? "ALL" : "SOLVED"))
              }
              className={`
                flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all border
                ${
                  selectedStatus === "SOLVED"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    : "border-[var(--border)] bg-zinc-800/30 text-zinc-400 hover:text-zinc-200"
                }
              `}
            >
              <CheckCircle className="h-3.5 w-3.5" /> Solved Only
            </button>
          </div>
        </div>
      </section>

      {/* Problems List */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
            Showing {filteredProblems.length} of {stats.total} Problems
          </p>
        </div>

        {filteredProblems.length > 0 ? (
          <div className="grid gap-3">
            {filteredProblems.map((problem) => (
              <ProblemRow key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
            <Code2 className="mx-auto h-10 w-10 text-[var(--muted)] opacity-50" />
            <h3 className="mt-4 text-lg font-semibold text-[var(--text)]">No problems found</h3>
            <p className="mt-1 text-sm text-[var(--subtle)]">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
