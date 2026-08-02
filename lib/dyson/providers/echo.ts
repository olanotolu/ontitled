import type { DysonChatRequest, DysonChatResponse, DysonProviderContext } from "../types";
import type { DysonProvider } from "../provider";
import { randomBytes } from "node:crypto";

function msgId() {
  return `msg_${randomBytes(8).toString("hex")}`;
}

export class EchoProvider implements DysonProvider {
  async chat(
    req: DysonChatRequest,
    _ctx: DysonProviderContext
  ): Promise<DysonChatResponse> {
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
