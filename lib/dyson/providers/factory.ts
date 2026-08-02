import type { DysonProvider } from "../provider";
import { EchoProvider } from "./echo";
import { OpenAICompatibleProvider } from "./openai-compatible";

let _provider: DysonProvider | null = null;

export function buildDysonProvider(): DysonProvider {
  if (_provider) return _provider;

  if (process.env.DYSON_API_BASE && process.env.DYSON_API_KEY) {
    _provider = new OpenAICompatibleProvider();
  } else {
    _provider = new EchoProvider();
  }

  return _provider;
}
