import type { ThemisChatRequest, ThemisChatResponse, ThemisProviderContext } from "../types";
import type { ThemisProvider } from "../provider";
import { id } from "@/lib/settings/utils";

export class OpenAICompatibleProvider implements ThemisProvider {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = process.env.THEMIS_API_BASE || "";
    this.apiKey = process.env.THEMIS_API_KEY || "";

    if (!this.baseUrl || !this.apiKey) {
      throw new Error(
        "THEMIS_API_BASE and THEMIS_API_KEY must be set for OpenAICompatibleProvider"
      );
    }
  }

  async chat(
    req: ThemisChatRequest,
    _ctx: ThemisProviderContext
  ): Promise<ThemisChatResponse> {
    const messages: { role: string; content: string }[] = [];
    if (req.systemPrompt) {
      messages.push({ role: "system", content: req.systemPrompt });
    }
    messages.push(...req.messages.map((m) => ({ role: m.role, content: m.content })));

    const response = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: req.model || "default",
        messages,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Themis provider error ${response.status}: ${text.slice(0, 200)}`);
    }

    const data = (await response.json()) as {
      id: string;
      model: string;
      choices: { message: { role: string; content: string } }[];
      usage?: { prompt_tokens: number; completion_tokens: number };
    };

    const choice = data.choices?.[0];
    if (!choice) throw new Error("No response from Themis provider");

    return {
      id: data.id || id("msg"),
      message: {
        role: "assistant",
        content: choice.message.content,
      },
      model: data.model || req.model || "unknown",
      usage: data.usage
        ? {
            inputTokens: data.usage.prompt_tokens,
            outputTokens: data.usage.completion_tokens,
          }
        : undefined,
    };
  }
}
