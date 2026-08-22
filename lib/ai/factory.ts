import { AIProvider, AIMessage, AIRequestOptions } from './types';
import { GroqProvider } from './groq';
import { GeminiProvider } from './gemini';

export function getPrimaryProvider(): AIProvider {
  return new GroqProvider();
}

export function getFallbackProvider(): AIProvider {
  return new GeminiProvider();
}

export async function* streamChatWithFallback(
  messages: AIMessage[],
  options?: AIRequestOptions
): AsyncGenerator<string, void, unknown> {
  const groqProvider = getPrimaryProvider();
  const geminiProvider = getFallbackProvider();

  let startedStreaming = false;

  try {
    const groqStream = groqProvider.streamChat(messages, options);
    for await (const chunk of groqStream) {
      startedStreaming = true;
      yield chunk;
    }
  } catch (groqError: any) {
    console.warn('[Vidyaaraa AI] Groq primary provider failed:', groqError?.message || groqError);

    if (startedStreaming) {
      // Stream already partially sent, output error message gracefully
      yield '\n\n[Vidyaaraa AI Stream interrupted]';
      return;
    }

    try {
      console.log('[Vidyaaraa AI] Executing Gemini fallback...');
      const geminiStream = geminiProvider.streamChat(messages, options);
      for await (const chunk of geminiStream) {
        yield chunk;
      }
    } catch (geminiError: any) {
      console.error('[Vidyaaraa AI] Gemini fallback also failed:', geminiError?.message || geminiError);
      throw new Error('Vidyaaraa AI is temporarily unavailable. Please try again.');
    }
  }
}
