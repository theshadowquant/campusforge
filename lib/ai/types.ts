export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIRequestOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIProvider {
  name: string;
  streamChat(
    messages: AIMessage[],
    options?: AIRequestOptions
  ): AsyncGenerator<string, void, unknown>;
}
