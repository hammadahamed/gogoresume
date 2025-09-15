import {
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';

export interface OrderPayload {
  orderId: string;
  userId: string;
  productId: string;
  iat?: number;
}

export class OrderHelper {
  private static readonly JWT_SECRET = process.env.JWT_SECRET_ORDER_ID;
  private static readonly jwtService = new JwtService();
  private static readonly logger = new Logger(OrderHelper.name);

  static createIdAndToken(
    userId: string,
    productId: string,
    orderIdOnly = false,
  ) {
    if (!this.JWT_SECRET) {
      throw new InternalServerErrorException(
        'JWT_SECRET_ORDER_ID is not configured',
      );
    }

    const orderId = nanoid();
    if (orderIdOnly) {
      return { orderId, token: null };
    }
    const payload: OrderPayload = {
      orderId,
      userId,
      productId,
    };

    try {
      const token = this.jwtService.sign(payload, {
        secret: this.JWT_SECRET,
      });

      return { token, orderId };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create order token: ${error.message}`,
      );
    }
  }

  static parseToken(token: string): OrderPayload {
    try {
      if (!this.JWT_SECRET) {
        throw new InternalServerErrorException(
          'JWT_SECRET_ORDER_ID is not configured',
        );
      }

      if (!token) {
        throw new UnauthorizedException('Order token is required');
      }

      try {
        const decoded = this.jwtService.verify(token, {
          secret: this.JWT_SECRET,
        }) as OrderPayload;

        // Validate required fields
        if (!decoded.orderId || !decoded.userId || !decoded.productId) {
          throw new UnauthorizedException('Invalid order token payload');
        }

        return decoded;
      } catch (error) {
        if (error.name === 'JsonWebTokenError') {
          throw new UnauthorizedException('Invalid order token');
        }

        throw new UnauthorizedException(
          `Failed to verify order token: ${error.message}`,
        );
      }
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
