import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WaitlistService } from './waitlist.service';
import { JoinWaitlistDTO } from './waitlist.types';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('waitlist')
@UseGuards(ThrottlerGuard)
export class WaitlistController {
  constructor(private readonly waitlistService: WaitlistService) {}

  @Post('/join')
  async joinWaitlist(@Body() waitlistData: JoinWaitlistDTO) {
    return await this.waitlistService.joinWaitlist(waitlistData);
  }
}
