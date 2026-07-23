"use client";

import React, { useState } from "react";
import {
  Play,
  Send,
  RotateCcw,
  Settings2,
  Code2,
  ChevronDown,
  Check,
  Maximize2,
  Minimize2,
} from "lucide-react";
import type { CodeTemplate } from "@/data/problemDetailData";

interface CodeEditorPanelProps {
  templates: CodeTemplate[];
  selectedLanguage: CodeTemplate;
  setSelectedLanguage: (lang: CodeTemplate) => void;
  code: string;
  setCode: (code: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
}

export function CodeEditorPanel({
  templates,
  selectedLanguage,
  setSelectedLanguage,
  code,
  setCode,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
}: CodeEditorPanelProps) {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<number>(14);

  const handleReset = () => {
    setCode(selectedLanguage.defaultCode);
  };

  const lines = code.split("\n");

  return (
    <div className="flex flex-col h-full bg-[#0d0e12] text-zinc-200 overflow-hidden">
      {/* Editor Header / Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#161720] px-4 py-2 select-none shrink-0">
        <div className="flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 rounded-lg bg-[#1e202d] px-3 py-1.5 text-xs font-semibold text-white border border-zinc-700/60 hover:bg-[#252838] transition-all shadow-sm"
            >
              <Code2 className="h-3.5 w-3.5 text-cyan-400" />
              <span>{selectedLanguage.language}</span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </button>

            {isLangMenuOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-44 rounded-xl border border-zinc-700 bg-[#181a24] p-1.5 shadow-2xl z-50 space-y-0.5">
                {templates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      setSelectedLanguage(tmpl);
                      setCode(tmpl.defaultCode);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all ${
                      selectedLanguage.id === tmpl.id
                        ? "bg-cyan-500/15 text-cyan-400 font-semibold"
                        : "text-zinc-300 hover:bg-zinc-800/60"
                    }`}
                  >
                    <span>{tmpl.language}</span>
                    {selectedLanguage.id === tmpl.id && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            title="Reset to starter code"
            className="p-1.5 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/60 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Font size adjustments */}
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="text-[11px] font-mono text-zinc-500">Size:</span>
          <button
            onClick={() => setFontSize((s) => Math.max(12, s - 1))}
            className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-mono text-white"
          >
            -
          </button>
          <span className="font-mono text-xs text-zinc-300 w-4 text-center">{fontSize}</span>
          <button
            onClick={() => setFontSize((s) => Math.min(20, s + 1))}
            className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-mono text-white"
          >
            +
          </button>
        </div>
      </div>

      {/* Code Textarea / Line-Numbered Editor View */}
      <div className="flex-1 relative flex overflow-hidden bg-[#0d0e12] font-mono">
        {/* Line Numbers Sidebar */}
        <div
          className="select-none py-4 px-3 text-right text-zinc-600 bg-[#0b0c0f] border-r border-zinc-800/50 font-mono text-xs shrink-0"
          style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Editor Input Area */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-4 bg-transparent text-emerald-300 font-mono outline-none resize-none overflow-auto custom-scrollbar border-none leading-relaxed"
          style={{ fontSize: `${fontSize}px`, lineHeight: "1.6" }}
        />
      </div>

      {/* Action Footer Bar */}
      <div className="flex items-center justify-between border-t border-zinc-800/80 bg-[#14151e] px-4 py-2.5 shrink-0 select-none">
        <div className="text-xs text-zinc-500 font-mono">
          Auto-saved • {selectedLanguage.extension.toUpperCase()}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRun}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 shadow-sm transition-all disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 text-cyan-400 fill-cyan-400" />
            <span>{isRunning ? "Running..." : "Run Tests"}</span>
          </button>

          <button
            onClick={onSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-950/40 transition-all disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
