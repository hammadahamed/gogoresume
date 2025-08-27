import { IsString } from 'class-validator';

export class ProcessPaymentDTO {
  @IsString()
  paymentIntentId: string;
}

export class CreateSubscriptionDTO {
  @IsString()
  planId: string;

  @IsString()
  userId: string;
}

export class VerifyPaymentDTO {
  @IsString()
  paymentId: string;

  @IsString()
  planId: string;
}

export class GetPaymentLinkDTO {
  @IsString()
  productId: string;
  userId: string;
}
