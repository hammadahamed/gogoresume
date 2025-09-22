import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('get-payment-link')
  @UseGuards(JwtAuthGuard)
  async getPaymentLink(
    @Query('planId') productId: string,
    @Query('isUpgrade') isUpgrade: boolean,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const link = await this.paymentService.getPaymentLink(
      productId,
      userId,
      isUpgrade,
    );
    return link;
  }

  @Post('purchase/verify')
  @UseGuards(JwtAuthGuard)
  async verifyPurchase(@Req() req: any, @Body() body: { paymentId: string }) {
    const userId = req.user.id;
    return await this.paymentService.verifyPurchaseAndGrantPlan(
      body.paymentId,
      userId,
    );
  }
}
