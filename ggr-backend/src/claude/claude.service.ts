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

  async generateContent(prompt: string): Promise<string> {
    try {
      const completion = await this.anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4000,
        temperature: 0.7,
        system:
          'You are a professional resume writer. Your task is to enhance resume content while maintaining truthfulness and professional tone. Always return responses in valid JSON format as specified in the user prompt.',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      console.log(
        '🚀 ~ ClaudeService ~ generateContent ~ completion:',
        completion,
      );

      console.log('\n\n\n>>>>>>');
      console.dir(completion.content[0], { depth: 10 });

      // Extract text content from Claude's response
      const textContent = completion.content[0];
      return textContent?.type === 'text' ? textContent.text : '{}';
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to generate content');
    }
  }
}
