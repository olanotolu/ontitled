import type { ThemisChatRequest, ThemisChatResponse, ThemisProviderContext } from "./types";

export interface ThemisProvider {
  chat(
    req: ThemisChatRequest,
    ctx: ThemisProviderContext
  ): Promise<ThemisChatResponse>;
}

export { buildThemisProvider } from "./providers/factory";
