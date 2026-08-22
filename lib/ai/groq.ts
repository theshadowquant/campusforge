import Groq from 'groq-sdk';
import { AIProvider, AIMessage, AIRequestOptions } from './types';
import { VIDYAARAA_SYSTEM_PROMPT } from './systemPrompt';

export class GroqProvider implements AIProvider {
  name = 'Groq';
  private client: Groq | null = null;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (apiKey) {
      this.client = new Groq({ apiKey });
    }
  }

  async *streamChat(
    messages: AIMessage[],
    options?: AIRequestOptions
  ): AsyncGenerator<string, void, unknown> {
    if (!this.client) {
      throw new Error('GROQ_API_KEY is missing');
    }

    const model = options?.model || process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

    const formattedMessages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [];
    if (!messages.some((m) => m.role === 'system')) {
      formattedMessages.push({ role: 'system', content: VIDYAARAA_SYSTEM_PROMPT });
    }

    for (const msg of messages) {
      formattedMessages.push({
        role: msg.role,
        content: msg.content,
      });
    }

    const stream = await this.client.chat.completions.create({
      model,
      messages: formattedMessages,
      stream: true,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 1024,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        yield content;
      }
    }
  }
}
