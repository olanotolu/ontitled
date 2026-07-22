export type ThemisMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ThemisChatRequest = {
  messages: ThemisMessage[];
  model?: string;
  systemPrompt?: string;
};

export type ThemisChatResponse = {
  id: string;
  message: ThemisMessage;
  model: string;
  usage?: { inputTokens: number; outputTokens: number };
};

export type ThemisProviderContext = {
  userId: string;
  workspaceId: string;
};
