"use client";

import { useState } from "react";
import { AppShell } from "../../components/AppShell";
import type { SessionData } from "@auth0/nextjs-auth0/types";

const SUGGESTIONS = [
  { label: "Surprise me", icon: "spark" },
  { label: "Find the flaw in a proof", icon: "search" },
  { label: "Show me beautiful code", icon: "code" },
  { label: "Have a themis", icon: "bulb" },
  { label: "Pressure-test my idea", icon: "flask" },
] as const;

const DEFAULT_SYSTEM = `You are Themis, a multimodal evaluation model created by [Ontitled] for creative judgment — style, tone, and taste.

<date>
Today's date is {{ current_date }}
</date>

<model_information>
Name: Themis
Overview: You are an actuarial engine for creative judgment — private evaluations with verified creative experts.
Knowledge cutoff: April 2026
Creator: [Ontitled]
Context window: 256,000 tokens
</model_information>`;

function IconCode() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconPanel() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M15 4v16" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconAttach() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v4M8 21h8" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function IconCodeSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconBulb() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c.6.6 1 1.5 1 2.4V18h6v-1.6c0-.9.4-1.8 1-2.4A7 7 0 0 0 12 2z" />
    </svg>
  );
}

function IconFlask() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 3h6M10 3v6.5L4.5 19a2 2 0 0 0 1.7 3h12a2 2 0 0 0 1.7-3L14 9.5V3" />
    </svg>
  );
}

function IconBrackets() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 4H5v16h3M16 4h3v16h-3" />
    </svg>
  );
}

function IconExpand() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
    </svg>
  );
}

function suggestionIcon(kind: (typeof SUGGESTIONS)[number]["icon"]) {
  switch (kind) {
    case "spark":
      return <IconSpark />;
    case "search":
      return <IconSearch />;
    case "code":
      return <IconCodeSmall />;
    case "bulb":
      return <IconBulb />;
    case "flask":
      return <IconFlask />;
  }
}

const REASONING_MARKS = ["None", "Min", "Low", "Medium", "High", "XHigh"] as const;
const TOKEN_MARKS = ["Shorter", "Auto"] as const;

type Props = {
  session: SessionData | null | undefined;
};

export default function PlaygroundClient({ session }: Props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [model, setModel] = useState("Themis");
  const [reasoning, setReasoning] = useState(4);
  const [maxTokens, setMaxTokens] = useState(100);
  const [webSearch, setWebSearch] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(() =>
    DEFAULT_SYSTEM.replace("{{ current_date }}", new Date().toISOString().slice(0, 10))
  );
  const [settingsOpen, setSettingsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const charCount = systemPrompt.length;
  const hasChat = messages.length > 0;

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setInput("");
    setError(null);

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/themis/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.text })),
            { role: "user", content: trimmed },
          ],
          model: model === "Themis Mini" ? "themis-mini" : "themis",
          systemPrompt,
        }),
      });

      if (res.status === 401) {
        setError("Session expired. Please log in again.");
        return;
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }

      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.message?.content || "No response received.",
        },
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <AppShell session={session}>
      <div className={`pg-layout${settingsOpen ? "" : " pg-layout-collapsed"}`}>
        <div className="pg-center">
          <header className="pg-topbar">
            <div className="pg-topbar-left">
              <h1 className="pg-title">Playground</h1>
              <span className="pg-note">Chats are never stored.</span>
            </div>
            <div className="pg-topbar-right">
              <button type="button" className="pg-icon-btn" title="View code">
                <IconCode />
                <span>View code</span>
              </button>
              <button
                type="button"
                className="pg-icon-btn pg-icon-only"
                title={settingsOpen ? "Hide settings" : "Show settings"}
                aria-pressed={settingsOpen}
                onClick={() => setSettingsOpen((s) => !s)}
              >
                <IconPanel />
              </button>
            </div>
          </header>

          <div className="pg-stage">
            {error ? (
              <div className="pg-error" role="alert">
                {error}
                {error.includes("Session expired") ? (
                  <a href="/login" style={{ marginLeft: 12, color: "inherit", textDecoration: "underline" }}>
                    Log in
                  </a>
                ) : null}
              </div>
            ) : null}
            {!hasChat ? (
              <div className="pg-empty">
                <h2 className="pg-headline">Science is better when shared.</h2>
                <p className="pg-sub">
                  Test our new model, Themis, right here —{" "}
                  <button type="button" className="pg-inline-link">
                    or learn more about it
                  </button>
                  .
                </p>
                <div className="pg-suggestions">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      className="pg-chip"
                      onClick={() => send(s.label)}
                    >
                      <span className="pg-chip-icon">{suggestionIcon(s.icon)}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pg-messages">
                {messages.map((m, i) => (
                  <div key={i} className={`pg-msg pg-msg-${m.role}`}>
                    <div className="pg-msg-body">{m.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pg-composer-wrap">
            <form className="pg-composer" onSubmit={onSubmit}>
              <input
                className="pg-input"
                type="text"
                placeholder="Start typing…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                aria-label="Message"
              />
              <div className="pg-composer-actions">
                <button type="button" className="pg-tool-btn" aria-label="Attach file">
                  <IconAttach />
                </button>
                <button type="button" className="pg-tool-btn" aria-label="Voice input">
                  <IconMic />
                </button>
                <button
                  type="submit"
                  className="pg-send"
                  aria-label={loading ? "Sending…" : "Send"}
                  disabled={!input.trim() || loading}
                >
                  {loading ? "…" : <IconSend />}
                </button>
              </div>
            </form>
            <p className="pg-disclaimer">
              Themis is AI and can make mistakes. Your use must follow our{" "}
              <button type="button" className="pg-inline-link">
                Acceptable Use Policy
              </button>
              .
            </p>
          </div>
        </div>

        {settingsOpen ? (
          <aside className="pg-settings" aria-label="Model settings">
            <div className="pg-setting-block">
              <div className="pg-setting-label">Model</div>
              <div className="pg-model-select">
                <button
                  type="button"
                  className="pg-model-btn"
                  aria-expanded={modelOpen}
                  onClick={() => setModelOpen((o) => !o)}
                >
                  <span>{model}</span>
                  <IconChevronDown />
                </button>
                {modelOpen ? (
                  <div className="pg-model-menu" role="listbox">
                    {["Themis", "Themis Mini"].map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`pg-model-option${m === model ? " active" : ""}`}
                        role="option"
                        aria-selected={m === model}
                        onClick={() => {
                          setModel(m);
                          setModelOpen(false);
                        }}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="pg-setting-block">
              <div className="pg-setting-row">
                <div>
                  <div className="pg-setting-label">Reasoning effort</div>
                  <div className="pg-setting-hint">How much the model thinks before answering.</div>
                </div>
                <div className="pg-setting-value">{(reasoning / 5).toFixed(1)}</div>
              </div>
              <input
                className="pg-range"
                type="range"
                min={0}
                max={5}
                step={1}
                value={reasoning}
                onChange={(e) => setReasoning(Number(e.target.value))}
                aria-label="Reasoning effort"
              />
              <div className="pg-range-marks">
                {REASONING_MARKS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            <div className="pg-setting-block">
              <div className="pg-setting-row">
                <div>
                  <div className="pg-setting-label">Max tokens</div>
                  <div className="pg-setting-hint">Caps response length.</div>
                </div>
                <div className="pg-setting-value">{maxTokens >= 100 ? "Auto" : maxTokens}</div>
              </div>
              <input
                className="pg-range"
                type="range"
                min={0}
                max={100}
                step={1}
                value={maxTokens}
                onChange={(e) => setMaxTokens(Number(e.target.value))}
                aria-label="Max tokens"
              />
              <div className="pg-range-marks pg-range-marks-2">
                {TOKEN_MARKS.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            <div className="pg-setting-block pg-setting-toggle-row">
              <div>
                <div className="pg-setting-label">Web search</div>
                <div className="pg-setting-hint">Search the web while responding.</div>
              </div>
              <button
                type="button"
                className={`pg-toggle${webSearch ? " on" : ""}`}
                role="switch"
                aria-checked={webSearch}
                onClick={() => setWebSearch((v) => !v)}
              >
                <span className="pg-toggle-knob" />
              </button>
            </div>

            <div className="pg-setting-block pg-system-block">
              <div className="pg-setting-label">System prompt</div>
              <textarea
                className="pg-system"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                spellCheck={false}
              />
              <div className="pg-system-foot">
                <div className="pg-system-tools">
                  <button type="button" className="pg-tool-btn" aria-label="Format" title="Format">
                    <IconBrackets />
                  </button>
                  <button type="button" className="pg-tool-btn" aria-label="Expand" title="Expand">
                    <IconExpand />
                  </button>
                </div>
                <span className="pg-char-count">{charCount.toLocaleString()} characters</span>
              </div>
            </div>
          </aside>
        ) : null}
      </div>
    </AppShell>
  );
}
