import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIProvider, AIMessage, AIRequestOptions } from './types';
import { VIDYAARAA_SYSTEM_PROMPT } from './systemPrompt';

export class GeminiProvider implements AIProvider {
  name = 'Gemini';
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  async *streamChat(
    messages: AIMessage[],
    options?: AIRequestOptions
  ): AsyncGenerator<string, void, unknown> {
    if (!this.genAI) {
      throw new Error('GEMINI_API_KEY is missing');
    }

    const modelName = options?.model || process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    const model = this.genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: VIDYAARAA_SYSTEM_PROMPT,
    });

    // Build chat history without system messages (handled by systemInstruction)
    const history = messages
      .slice(0, -1)
      .filter((msg) => msg.role !== 'system')
      .map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

    const lastMessage = messages[messages.length - 1];
    const prompt = lastMessage ? lastMessage.content : '';

    const chat = model.startChat({ history });
    const result = await chat.sendMessageStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        yield text;
      }
    }
  }
}
