import type { DysonChatRequest, DysonChatResponse, DysonProviderContext } from "./types";

export interface DysonProvider {
  chat(
    req: DysonChatRequest,
    ctx: DysonProviderContext
  ): Promise<DysonChatResponse>;
}

export { buildDysonProvider } from "./providers/factory";
