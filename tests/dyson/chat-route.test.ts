import { describe, it, expect } from "vitest";
import { EchoProvider } from "@/lib/dyson/providers/echo";

describe("EchoProvider", () => {
  it("returns echo of last user message", async () => {
    const provider = new EchoProvider();
    const res = await provider.chat(
      {
        messages: [
          { role: "user", content: "hello world" },
        ],
      },
      { userId: "u1", workspaceId: "ws1" }
    );
    expect(res.message.role).toBe("assistant");
    expect(res.message.content).toContain("hello world");
    expect(res.model).toBe("echo");
  });

  it("returns fallback when no user messages", async () => {
    const provider = new EchoProvider();
    const res = await provider.chat(
      { messages: [] },
      { userId: "u1", workspaceId: "ws1" }
    );
    expect(res.message.role).toBe("assistant");
    expect(res.message.content).toContain("No message received");
  });

  it("handles systemPrompt in request", async () => {
    const provider = new EchoProvider();
    const res = await provider.chat(
      {
        messages: [{ role: "user", content: "test" }],
        systemPrompt: "You are a tester",
      },
      { userId: "u1", workspaceId: "ws1" }
    );
    expect(res.message.content).toContain("test");
  });

  it("truncates long messages", async () => {
    const provider = new EchoProvider();
    const long = "a".repeat(300);
    const res = await provider.chat(
      { messages: [{ role: "user", content: long }] },
      { userId: "u1", workspaceId: "ws1" }
    );
    expect(res.message.content.length).toBeLessThan(220);
    expect(res.message.content).toContain("…");
  });
});

describe("provider factory", () => {
  it("buildDysonProvider returns EchoProvider without env vars", async () => {
    const { buildDysonProvider } = await import("@/lib/dyson/providers/factory");
    const provider = buildDysonProvider();
    const res = await provider.chat(
      { messages: [{ role: "user", content: "hi" }] },
      { userId: "u1", workspaceId: "ws1" }
    );
    expect(res.model).toBe("echo");
  });
});
