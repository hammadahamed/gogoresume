import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClaudeService } from './claude.service';

@Module({
  imports: [ConfigModule],
  providers: [ClaudeService],
  exports: [ClaudeService],
})
export class ClaudeModule {}
