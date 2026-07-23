"use client";

import React, { useState } from "react";
import {
  FileText,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Clock,
  Flame,
} from "lucide-react";
import type { ProblemDetail } from "@/data/problemDetailData";

interface ProblemDescriptionPanelProps {
  problem: ProblemDetail;
}

export function ProblemDescriptionPanel({ problem }: ProblemDescriptionPanelProps) {
  const [activeTab, setActiveTab] = useState<"description" | "editorial" | "submissions" | "solutions">("description");
  const [showHint, setShowHint] = useState<number | null>(null);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">Easy</span>;
      case "MEDIUM":
        return <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">Medium</span>;
      case "HARD":
        return <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-400 border border-rose-500/20">Hard</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#121319] border-r border-zinc-800/80 overflow-hidden text-zinc-300">
      {/* Top Header Navigation */}
      <div className="flex items-center gap-1 border-b border-zinc-800/80 bg-[#161720] px-3 py-2 overflow-x-auto select-none shrink-0">
        <button
          onClick={() => setActiveTab("description")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeTab === "description"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
          }`}
        >
          <FileText className="h-3.5 w-3.5 text-cyan-400" />
          Description
        </button>

        <button
          onClick={() => setActiveTab("editorial")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeTab === "editorial"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5 text-amber-400" />
          Editorial & Solution
        </button>

        <button
          onClick={() => setActiveTab("submissions")}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            activeTab === "submissions"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
          }`}
        >
          <Clock className="h-3.5 w-3.5 text-indigo-400" />
          Submissions
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {activeTab === "description" && (
          <>
            {/* Title & Metadata */}
            <div className="space-y-3 border-b border-zinc-800/60 pb-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-sm font-semibold text-zinc-500">
                  #{problem.number}
                </span>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {problem.title}
                </h1>
              </div>

              <div className="flex items-center gap-3 text-xs flex-wrap">
                {getDifficultyBadge(problem.difficulty)}
                <span className="text-zinc-600">•</span>
                <div className="flex items-center gap-1 text-zinc-400 font-medium">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  <span>Acceptance {problem.acceptance.toFixed(1)}%</span>
                </div>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{problem.category}</span>
              </div>
            </div>

            {/* Problem Description text */}
            <div className="text-sm leading-relaxed text-zinc-300 space-y-3 whitespace-pre-line font-normal">
              {problem.description}
            </div>

            {/* Testcase Examples */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-semibold text-white">Examples</h3>
              {problem.examples.map((ex, idx) => (
                <div
                  key={ex.id}
                  className="rounded-xl border border-zinc-800/80 bg-[#171822] p-4 space-y-2 text-xs font-mono shadow-sm"
                >
                  <div className="font-semibold text-zinc-400 font-sans text-[11px] uppercase tracking-wider">
                    Example {idx + 1}
                  </div>
                  <div>
                    <span className="text-zinc-500 font-sans">Input: </span>
                    <span className="text-emerald-300 font-mono bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30">
                      {ex.input}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-sans">Output: </span>
                    <span className="text-cyan-300 font-mono bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                      {ex.expectedOutput}
                    </span>
                  </div>
                  {ex.explanation && (
                    <div className="text-zinc-400 font-sans pt-1 text-xs leading-normal">
                      <span className="font-medium text-zinc-300">Explanation: </span>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-semibold text-white">Constraints</h3>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-zinc-400 font-mono bg-[#171822] p-3.5 rounded-xl border border-zinc-800/80">
                {problem.constraints.map((c, i) => (
                  <li key={i} className="leading-normal">
                    <span className="text-zinc-300">{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hints Section */}
            {problem.hints && problem.hints.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  Hints
                </h3>
                <div className="space-y-2">
                  {problem.hints.map((hint, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-zinc-800 bg-[#171822] overflow-hidden"
                    >
                      <button
                        onClick={() => setShowHint(showHint === idx ? null : idx)}
                        className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium text-zinc-400 hover:text-zinc-200 text-left"
                      >
                        <span>Hint {idx + 1}</span>
                        <ChevronRight
                          className={`h-4 w-4 transition-transform ${
                            showHint === idx ? "rotate-90 text-cyan-400" : ""
                          }`}
                        />
                      </button>
                      {showHint === idx && (
                        <div className="px-4 pb-3 text-xs text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-2 bg-[#121319]">
                          {hint}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-zinc-500 font-medium">Topics:</span>
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-zinc-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}

        {activeTab === "editorial" && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-400" />
              Official Editorial & Optimal Solution
            </h2>
            {problem.editorial ? (
              <div className="space-y-4 text-xs">
                <div className="bg-[#171822] border border-zinc-800/80 rounded-xl p-4 space-y-2">
                  <h4 className="font-semibold text-zinc-200 text-sm">Approach</h4>
                  <p className="text-zinc-400 leading-relaxed">{problem.editorial.approach}</p>
                  <div className="flex gap-4 pt-2 font-mono text-[11px]">
                    <div className="bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800">
                      Time Complexity: <span className="text-emerald-400">{problem.editorial.complexity.time}</span>
                    </div>
                    <div className="bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800">
                      Space Complexity: <span className="text-cyan-400">{problem.editorial.complexity.space}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-zinc-200 text-sm">Python Solution</h4>
                  <pre className="bg-[#0e0f14] p-4 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    {problem.editorial.code.python || "# Solution code available"}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-zinc-500 text-xs bg-[#171822] rounded-xl border border-zinc-800">
                Editorial and solution guide will be available shortly after community verification.
              </div>
            )}
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-white">Your Previous Submissions</h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#171822] rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="font-semibold text-emerald-400">Accepted</span>
                  <span className="text-zinc-500 font-mono">• Python 3</span>
                </div>
                <div className="text-zinc-400 font-mono">
                  Runtime: <span className="text-white">42 ms</span> | Memory: <span className="text-white">16.4 MB</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
