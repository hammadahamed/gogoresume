import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
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
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: system,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' },
        temperature,
        max_tokens: 4000,
      });

      return completion.choices[0]?.message?.content || '{}';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate content');
    }
  }
}
