import { Controller, Put, Body, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('users/profile')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put()
  async updateProfile(
    @Req() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  @Get('tweaks-usage')
  async getTweaksUsage(@Req() req: any) {
    return this.usersService.getTweaksUsage(req.user.id, req.user.currentPlan);
  }
}
