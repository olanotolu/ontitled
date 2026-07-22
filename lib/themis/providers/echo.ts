import type { ThemisChatRequest, ThemisChatResponse, ThemisProviderContext } from "../types";
import type { ThemisProvider } from "../provider";
import { randomBytes } from "node:crypto";

function msgId() {
  return `msg_${randomBytes(8).toString("hex")}`;
}

export class EchoProvider implements ThemisProvider {
  async chat(
    req: ThemisChatRequest,
    _ctx: ThemisProviderContext
  ): Promise<ThemisChatResponse> {
    const lastUser = req.messages
      .filter((m) => m.role === "user")
      .pop();

    const content = lastUser
      ? `Echo: ${lastUser.content.slice(0, 200)}${lastUser.content.length > 200 ? "…" : ""}`
      : "Echo: No message received.";

    return {
      id: msgId(),
      message: { role: "assistant", content },
      model: "echo",
      usage: { inputTokens: 0, outputTokens: 0 },
    };
  }
}
