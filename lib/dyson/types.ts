export type DysonMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type DysonChatRequest = {
  messages: DysonMessage[];
  model?: string;
  systemPrompt?: string;
};

export type DysonChatResponse = {
  id: string;
  message: DysonMessage;
  model: string;
  usage?: { inputTokens: number; outputTokens: number };
};

export type DysonProviderContext = {
  userId: string;
  workspaceId: string;
};
