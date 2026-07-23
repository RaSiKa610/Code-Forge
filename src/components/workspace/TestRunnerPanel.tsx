"use client";

import React from "react";
import { CheckCircle2, XCircle, Clock, Terminal, Play, Check } from "lucide-react";
import type { TestCase } from "@/data/problemDetailData";

interface TestRunnerPanelProps {
  testCases: TestCase[];
  activeTestCaseIdx: number;
  setActiveTestCaseIdx: (idx: number) => void;
  testResult: {
    status: "IDLE" | "RUNNING" | "ACCEPTED" | "WRONG_ANSWER" | "ERROR";
    output?: string;
    executionTime?: string;
    memoryUsed?: string;
    details?: { caseId: number; passed: boolean; actual: string; expected: string }[];
  };
  activeBottomTab: "testcase" | "result" | "console";
  setActiveBottomTab: (tab: "testcase" | "result" | "console") => void;
}

export function TestRunnerPanel({
  testCases,
  activeTestCaseIdx,
  setActiveTestCaseIdx,
  testResult,
  activeBottomTab,
  setActiveBottomTab,
}: TestRunnerPanelProps) {
  return (
    <div className="flex flex-col h-full bg-[#121319] border-t border-zinc-800/80 overflow-hidden text-zinc-300">
      {/* Tab Navigation Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#161720] px-3 py-1.5 select-none shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveBottomTab("testcase")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
              activeBottomTab === "testcase"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-indigo-400" />
            Testcase
          </button>

          <button
            onClick={() => setActiveBottomTab("result")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all ${
              activeBottomTab === "result"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {testResult.status === "ACCEPTED" ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            ) : testResult.status === "WRONG_ANSWER" ? (
              <XCircle className="h-3.5 w-3.5 text-rose-400" />
            ) : (
              <Play className="h-3.5 w-3.5 text-cyan-400" />
            )}
            Test Result
            {testResult.status !== "IDLE" && (
              <span
                className={`ml-1 px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  testResult.status === "ACCEPTED"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : testResult.status === "WRONG_ANSWER"
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {testResult.status}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeBottomTab === "testcase" && (
          <div className="space-y-4">
            {/* Case Selection Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {testCases.map((tc, idx) => (
                <button
                  key={tc.id}
                  onClick={() => setActiveTestCaseIdx(idx)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border transition-all ${
                    activeTestCaseIdx === idx
                      ? "bg-zinc-800 text-white border-zinc-700 shadow-sm"
                      : "bg-[#171822] text-zinc-400 border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  Case {idx + 1}
                </button>
              ))}
            </div>

            {/* Selected Case Inputs */}
            {testCases[activeTestCaseIdx] && (
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-[11px] font-sans font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Input Parameters
                  </label>
                  <div className="bg-[#171822] border border-zinc-800 rounded-lg p-3 text-emerald-300 font-mono overflow-x-auto">
                    {testCases[activeTestCaseIdx].input}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-sans font-semibold text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Expected Output
                  </label>
                  <div className="bg-[#171822] border border-zinc-800 rounded-lg p-3 text-cyan-300 font-mono overflow-x-auto">
                    {testCases[activeTestCaseIdx].expectedOutput}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeBottomTab === "result" && (
          <div className="space-y-4">
            {testResult.status === "IDLE" && (
              <div className="text-center py-8 text-zinc-500 text-xs">
                Click <span className="text-cyan-400 font-semibold">"Run Tests"</span> to compile and execute your code against test cases.
              </div>
            )}

            {testResult.status === "RUNNING" && (
              <div className="flex flex-col items-center justify-center py-8 space-y-3 text-xs text-zinc-400">
                <div className="h-6 w-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p>Executing test cases & compiling solution...</p>
              </div>
            )}

            {testResult.status === "ACCEPTED" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-emerald-950/30 border border-emerald-800/40 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Accepted</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                    <span>Runtime: <strong className="text-white">{testResult.executionTime || "28 ms"}</strong></span>
                    <span>Memory: <strong className="text-white">{testResult.memoryUsed || "14.2 MB"}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {testCases.map((_, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      <Check className="h-3 w-3" /> Case {idx + 1}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {testResult.status === "WRONG_ANSWER" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-rose-950/30 border border-rose-800/40 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <XCircle className="h-5 w-5" />
                    <span>Wrong Answer</span>
                  </div>
                </div>

                <div className="bg-[#171822] border border-zinc-800 rounded-xl p-4 space-y-2 font-mono text-xs">
                  <div className="text-rose-400">Output mismatch on Case 1:</div>
                  <div><span className="text-zinc-500 font-sans">Your Output: </span><span className="text-rose-300">[0, 0]</span></div>
                  <div><span className="text-zinc-500 font-sans font-medium">Expected Output: </span><span className="text-cyan-300">[0, 1]</span></div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
