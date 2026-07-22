import type { ThemisProvider } from "../provider";
import { EchoProvider } from "./echo";
import { OpenAICompatibleProvider } from "./openai-compatible";

let _provider: ThemisProvider | null = null;

export function buildThemisProvider(): ThemisProvider {
  if (_provider) return _provider;

  if (process.env.THEMIS_API_BASE && process.env.THEMIS_API_KEY) {
    _provider = new OpenAICompatibleProvider();
  } else {
    _provider = new EchoProvider();
  }

  return _provider;
}
