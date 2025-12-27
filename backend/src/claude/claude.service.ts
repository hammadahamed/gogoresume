import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Anthropic from '@anthropic-ai/sdk';

@Injectable()
export class ClaudeService {
  private anthropic: Anthropic;

  constructor(private configService: ConfigService) {
    this.anthropic = new Anthropic({
      apiKey: this.configService.get<string>('CLAUDE_API_KEY'),
    });
  }

  async generateContent(
    prompt: string,
    options?: { temperature?: number; system?: string },
  ): Promise<string> {
    const temperature = options?.temperature ?? 0.15;
    const system =
      options?.system ??
      'You are an ATS keyword optimizer. Your task is to insert missing keywords into existing resume text — NOT to rewrite or improve the content. Preserve the original text structure and only make minimal keyword insertions. Always return valid JSON.';

    try {
      const completion = await this.anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4000,
        temperature,
        system,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      // Extract text content from Claude's response
      const textContent = completion.content[0];
      return textContent?.type === 'text' ? textContent.text : '{}';
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to generate content');
    }
  }
}
