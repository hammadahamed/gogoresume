import { Injectable, BadRequestException } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { ClaudeService } from '../claude/claude.service';
import { ParseResumeResponse, UserInfo } from './resume.types';
import { IJwtPayload } from 'src/common/types/app.types';
import { getParsePrompt } from './resume-parser.helper';
import {
  getOrCreateParseUsage,
  getRemainingParses,
  incrementParseUsage,
  isParseUsageAvailable,
} from 'src/common/helpers/resumeParse.helper';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

@Injectable()
export class ResumeParserService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly claudeService: ClaudeService,
  ) {}

  /**
   * Extract text from PDF buffer
   */
  private async extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      return result.text;
    } catch (error) {
      console.error('PDF parsing error:', error);
      throw new BadRequestException('Failed to parse PDF file');
    }
  }

  /**
   * Extract text from DOCX buffer
   */
  private async extractTextFromDOCX(buffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      console.error('DOCX parsing error:', error);
      throw new BadRequestException('Failed to parse DOCX file');
    }
  }

  /**
   * Extract text from uploaded file based on mimetype
   */
  async extractText(file: Express.Multer.File): Promise<string> {
    const { mimetype, buffer } = file;

    if (mimetype === 'application/pdf') {
      return this.extractTextFromPDF(buffer);
    } else if (
      mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimetype === 'application/msword'
    ) {
      return this.extractTextFromDOCX(buffer);
    } else {
      throw new BadRequestException(
        'Unsupported file type. Please upload a PDF or DOCX file.',
      );
    }
  }

  /**
   * Parse resume text using OpenAI
   */
  async parseWithOpenAI(resumeText: string): Promise<UserInfo> {
    const prompt = getParsePrompt(resumeText);

    const response = await this.openAIService.generateContent(prompt, {
      temperature: 0.1,
      system:
        'You are a resume parser that extracts structured data from resume text. Always return valid JSON matching the exact schema provided. Be thorough and accurate.',
    });

    try {
      return JSON.parse(response) as UserInfo;
    } catch (error) {
      console.error('Failed to parse OpenAI response:', error);
      throw new BadRequestException('Failed to parse resume content');
    }
  }

  /**
   * Parse resume text using Claude
   */
  async parseWithClaude(resumeText: string): Promise<UserInfo> {
    const prompt = getParsePrompt(resumeText);

    const response = await this.claudeService.generateContent(prompt, {
      temperature: 0.1,
      system:
        'You are a resume parser that extracts structured data from resume text. Always return valid JSON matching the exact schema provided. Be thorough and accurate.',
    });

    try {
      // Claude might return JSON wrapped in markdown code blocks
      const cleanedResponse = response
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      return JSON.parse(cleanedResponse) as UserInfo;
    } catch (error) {
      console.error('Failed to parse Claude response:', error);
      throw new BadRequestException('Failed to parse resume content');
    }
  }

  /**
   * Parse resume file using OpenAI
   */
  async parseResume(
    user: IJwtPayload,
    file: Express.Multer.File,
  ): Promise<ParseResumeResponse> {
    const { id: userId } = user;

    // Check rate limit
    const parseUsage = await getOrCreateParseUsage(userId);
    const canParse = await isParseUsageAvailable(parseUsage);

    if (!canParse) {
      const remaining = await getRemainingParses(parseUsage);
      throw new BadRequestException(
        `Daily parse limit reached. You have ${remaining} parses remaining today.`,
      );
    }

    // Extract text from file
    const resumeText = await this.extractText(file);

    if (!resumeText || resumeText.trim().length < 50) {
      throw new BadRequestException(
        'Could not extract enough text from the file. Please ensure the file contains readable text.',
      );
    }

    const data = await this.parseWithOpenAI(resumeText);

    // Increment usage after successful parse
    const remainingParses = await incrementParseUsage(userId, parseUsage);

    return {
      data,
      remainingParses,
    };
  }

  /**
   * Parse resume file using Claude
   */
  async parseResumeWithClaude(
    user: IJwtPayload,
    file: Express.Multer.File,
  ): Promise<ParseResumeResponse> {
    const { id: userId } = user;

    // Check rate limit
    const parseUsage = await getOrCreateParseUsage(userId);
    const canParse = await isParseUsageAvailable(parseUsage);

    if (!canParse) {
      const remaining = await getRemainingParses(parseUsage);
      throw new BadRequestException(
        `Daily parse limit reached. You have ${remaining} parses remaining today.`,
      );
    }

    // Extract text from file
    const resumeText = await this.extractText(file);

    if (!resumeText || resumeText.trim().length < 50) {
      throw new BadRequestException(
        'Could not extract enough text from the file. Please ensure the file contains readable text.',
      );
    }

    const data = await this.parseWithClaude(resumeText);

    // Increment usage after successful parse
    const remainingParses = await incrementParseUsage(userId, parseUsage);

    return {
      data,
      remainingParses,
    };
  }
}
