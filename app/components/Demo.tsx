"use client";

import { useState } from "react";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  XCircle,
  Download,
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Cpu,
} from "lucide-react";
import {
  robots,
  scenes,
  tasks,
  failureModes,
  generateMockResult,
  type GenerationResult,
  type FailureMode,
  type DatasetFile,
} from "../lib/mockData";

export default function Demo() {
  const [prompt, setPrompt] = useState(
    "Generate humanoid training data for resetting a hotel room after checkout: towels on floor, cups on desk, sheets messy, trash near bed, low light, narrow walkway, human interruption."
  );
  const [selectedRobot, setSelectedRobot] = useState(robots[0].id);
  const [selectedScene, setSelectedScene] = useState(scenes[0].id);
  const [selectedTask, setSelectedTask] = useState(tasks[0].id);
  const [selectedFailures, setSelectedFailures] = useState<string[]>([
    "human-interruption",
    "low-light",
  ]);
  const [variations, setVariations] = useState(1000);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["task_0001", "videos", "annotations", "sim", "dataset"])
  );

  const toggleFailure = (id: string) => {
    setSelectedFailures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    setResult(null);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.random() * 12 + 3;
      });
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      const selectedFailureObjects = failureModes.filter((f) =>
        selectedFailures.includes(f.id)
      );
      const mock = generateMockResult(variations, selectedFailureObjects);
      setResult(mock);
      setIsGenerating(false);
    }, 2800);
  };

  const toggleFolder = (name: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const renderTree = (files: DatasetFile[], depth: number = 0): React.ReactNode => {
    return files.map((file) => {
      const isExpanded = expandedFolders.has(file.name);
      return (
        <div key={file.name}>
          <div
            className={`flex cursor-pointer items-center gap-1.5 rounded px-2 py-1 text-sm hover:bg-surface-2 ${
              depth > 0 ? "" : ""
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            onClick={() => file.type === "folder" && toggleFolder(file.name)}
          >
            {file.type === "folder" ? (
              <>
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-muted" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted" />
                )}
                <Folder className="h-3.5 w-3.5 text-accent" />
              </>
            ) : (
              <>
                <span className="w-3.5" />
                <File className="h-3.5 w-3.5 text-muted" />
              </>
            )}
            <span className={file.type === "folder" ? "text-ink" : "text-muted"}>
              {file.name}
            </span>
          </div>
          {file.type === "folder" && isExpanded && file.children && (
            <div>{renderTree(file.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <section id="demo" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 dot-bg opacity-30" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5">
            <Cpu className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium tracking-wide text-muted">
              Interactive Demo
            </span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Generate synthetic task data
          </h2>
          <p className="mt-4 text-lg text-muted">
            Configure your scenario and generate annotated training data for
            humanoid manipulation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left panel: Configuration */}
          <div className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
            <div className="mb-6">
              <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted">
                Scenario Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full resize-none rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent/20"
                placeholder="Describe a scenario for your robot..."
              />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted">
                  Robot
                </label>
                <select
                  value={selectedRobot}
                  onChange={(e) => setSelectedRobot(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-ink focus:border-accent/40 focus:outline-none"
                >
                  {robots.map((r) => (
                    <option key={r.id} value={r.id} className="bg-surface-2">
                      {r.name} — {r.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted">
                  Scene
                </label>
                <select
                  value={selectedScene}
                  onChange={(e) => setSelectedScene(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-ink focus:border-accent/40 focus:outline-none"
                >
                  {scenes.map((s) => (
                    <option key={s.id} value={s.id} className="bg-surface-2">
                      {s.name} — {s.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted">
                Task
              </label>
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-ink focus:border-accent/40 focus:outline-none"
              >
                {tasks.map((t) => (
                  <option key={t.id} value={t.id} className="bg-surface-2">
                    {t.name} — {t.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-3 block text-xs font-medium uppercase tracking-widest text-muted">
                Failure Modes
              </label>
              <div className="flex flex-wrap gap-2">
                {failureModes.map((f: FailureMode) => {
                  const active = selectedFailures.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggleFailure(f.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                        active
                          ? "border-accent/40 bg-accent-dim text-accent"
                          : "border-border bg-surface-2 text-muted hover:text-ink"
                      }`}
                    >
                      {f.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-8">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium uppercase tracking-widest text-muted">
                  Variations
                </label>
                <span className="font-display text-sm font-semibold text-accent">
                  {variations.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={variations}
                onChange={(e) => setVariations(Number(e.target.value))}
                className="w-full"
              />
              <div className="mt-1 flex justify-between text-xs text-muted">
                <span>100</span>
                <span>10,000</span>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(94,234,212,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate {variations.toLocaleString()} Scenarios
                </>
              )}
            </button>
          </div>

          {/* Right panel: Results */}
          <div className="rounded-2xl border border-border bg-surface p-6 lg:p-8">
            {!result && !isGenerating && (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-surface-2">
                  <Sparkles className="h-7 w-7 text-muted" />
                </div>
                <p className="text-sm text-muted">
                  Configure your scenario and click Generate to see results.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center">
                <Loader2 className="mb-6 h-10 w-10 animate-spin text-accent" />
                <p className="mb-4 font-display text-lg font-semibold">
                  Generating {variations.toLocaleString()} scenarios...
                </p>
                <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-accent transition-all duration-200"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="mt-3 text-xs text-muted">
                  {Math.min(Math.floor(progress), 100)}% — Simulating physics,
                  rendering sensors, annotating trajectories...
                </p>
              </div>
            )}

            {result && !isGenerating && (
              <div className="space-y-6">
                {/* Stats bar */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-border bg-surface-2 p-4 text-center">
                    <div className="font-display text-2xl font-bold text-ink">
                      {result.totalScenarios.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs text-muted">trajectories</div>
                  </div>
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
                    <div className="font-display text-2xl font-bold text-emerald-400">
                      {result.successRate}%
                    </div>
                    <div className="mt-1 text-xs text-muted">success</div>
                  </div>
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-center">
                    <div className="font-display text-2xl font-bold text-rose-400">
                      {result.failureRate}%
                    </div>
                    <div className="mt-1 text-xs text-muted">failure</div>
                  </div>
                </div>

                {/* Preview grid */}
                <div>
                  <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                    Preview Scenarios
                  </h4>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {result.previews.map((preview) => (
                      <div
                        key={preview.id}
                        className="group relative aspect-video overflow-hidden rounded-lg border border-border"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${preview.gradient}`}
                        />
                        <div className="absolute inset-0 shimmer opacity-40" />
                        <div className="absolute left-1.5 top-1.5">
                          {preview.success ? (
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 text-rose-400" />
                          )}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1.5">
                          <p className="truncate text-[10px] font-medium text-ink">
                            {preview.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Failure breakdown */}
                {result.failureBreakdown.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                      Failure Distribution
                    </h4>
                    <div className="space-y-2">
                      {result.failureBreakdown.map((fb) => (
                        <div key={fb.label}>
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-ink">{fb.label}</span>
                            <span className="text-muted">
                              {fb.count.toLocaleString()} ({fb.percentage}%)
                            </span>
                          </div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                            <div
                              className="h-full rounded-full bg-rose-400/60"
                              style={{ width: `${fb.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Policy eval summary */}
                <div className="rounded-xl border border-accent/20 bg-accent-dim p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
                    <Cpu className="h-3.5 w-3.5" />
                    Policy Evaluation
                  </h4>
                  <p className="text-sm leading-relaxed text-ink">
                    {result.policySummary}
                  </p>
                </div>

                {/* Dataset tree */}
                <div>
                  <h4 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                    Dataset Package
                  </h4>
                  <div className="rounded-xl border border-border bg-paper/50 p-3 font-mono">
                    {renderTree(result.datasetTree)}
                  </div>
                </div>

                {/* Download button */}
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 px-6 py-3 text-sm font-semibold text-ink transition-all hover:border-accent/40 hover:bg-surface">
                  <Download className="h-4 w-4 text-accent" />
                  Download Dataset Package
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
