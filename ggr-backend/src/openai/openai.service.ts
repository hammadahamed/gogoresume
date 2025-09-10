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

  async generateContent(prompt: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content:
              'You are a professional resume writer. Your task is to enhance resume content while maintaining truthfulness and professional tone. Always return responses in valid JSON format as specified in the user prompt.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        response_format: { type: 'json_object' }, // Force JSON response
        temperature: 0.7,
        max_tokens: 4000, // Increased for GPT-4
      });

      return completion.choices[0]?.message?.content || '{}';
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate content');
    }
  }
}
