"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Flame, LayoutPanelLeft, Sparkles } from "lucide-react";
import type { ProblemDetail } from "@/data/problemDetailData";
import { ProblemDescriptionPanel } from "./ProblemDescriptionPanel";
import { CodeEditorPanel } from "./CodeEditorPanel";
import { TestRunnerPanel } from "./TestRunnerPanel";

interface ProblemWorkspaceProps {
  problem: ProblemDetail;
}

export function ProblemWorkspace({ problem }: ProblemWorkspaceProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(problem.templates[0]);
  const [code, setCode] = useState(problem.templates[0].defaultCode);
  const [activeTestCaseIdx, setActiveTestCaseIdx] = useState(0);
  const [activeBottomTab, setActiveBottomTab] = useState<"testcase" | "result" | "console">("testcase");

  const [testResult, setTestResult] = useState<{
    status: "IDLE" | "RUNNING" | "ACCEPTED" | "WRONG_ANSWER" | "ERROR";
    executionTime?: string;
    memoryUsed?: string;
  }>({ status: "IDLE" });

  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRunTests = () => {
    setIsRunning(true);
    setTestResult({ status: "RUNNING" });
    setActiveBottomTab("result");

    setTimeout(() => {
      setIsRunning(false);
      setTestResult({
        status: "ACCEPTED",
        executionTime: "24 ms",
        memoryUsed: "14.1 MB",
      });
    }, 1200);
  };

  const handleSubmitSolution = () => {
    setIsSubmitting(true);
    setTestResult({ status: "RUNNING" });
    setActiveBottomTab("result");

    setTimeout(() => {
      setIsSubmitting(false);
      setTestResult({
        status: "ACCEPTED",
        executionTime: "18 ms",
        memoryUsed: "13.9 MB",
      });
    }, 1800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#0a0b0e] text-white overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#12131b] px-4 py-2 shrink-0 select-none">
        <div className="flex items-center gap-4">
          <Link
            href="/problems"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700/50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Problems List
          </Link>

          <div className="h-4 w-px bg-zinc-800" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-zinc-500">#{problem.number}</span>
            <h1 className="text-sm font-bold text-white tracking-tight">{problem.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-medium">
            <Flame className="h-3.5 w-3.5" />
            <span>{problem.acceptance.toFixed(1)}%</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Compiler Ready</span>
          </div>
        </div>
      </div>

      {/* Main Split Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        {/* Left Column: Problem Description & Editorial Panel (5 cols) */}
        <div className="lg:col-span-5 h-full overflow-hidden">
          <ProblemDescriptionPanel problem={problem} />
        </div>

        {/* Right Column: Code Editor & Testcase Panel (7 cols) */}
        <div className="lg:col-span-7 flex flex-col h-full overflow-hidden">
          {/* Top 65%: Code Editor Panel */}
          <div className="h-[62%] border-b border-zinc-800/80 overflow-hidden">
            <CodeEditorPanel
              templates={problem.templates}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              code={code}
              setCode={setCode}
              onRun={handleRunTests}
              onSubmit={handleSubmitSolution}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Bottom 38%: Testcase & Output Panel */}
          <div className="h-[38%] overflow-hidden">
            <TestRunnerPanel
              testCases={problem.examples}
              activeTestCaseIdx={activeTestCaseIdx}
              setActiveTestCaseIdx={setActiveTestCaseIdx}
              testResult={testResult}
              activeBottomTab={activeBottomTab}
              setActiveBottomTab={setActiveBottomTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
