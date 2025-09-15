import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthErrorCode, AuthErrorMessage } from 'src/auth/constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException({
        message: AuthErrorMessage[AuthErrorCode.NO_TOKEN],
        code: AuthErrorCode.NO_TOKEN,
      });
    }

    try {
      // Step 1: Verify the token (checks if it's valid and not expired)
      const decoded = await this.authService.verifyAccessToken(token);

      // Step 2: Check user status (restricted, etc.)
      await this.authService.checkUserStatus(decoded.id);

      // Step 3: Attach user data to request
      request.user = decoded;
      return true;
    } catch (error) {
      // Pass through any UnauthorizedException with its code and message
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      // Default error if something else went wrong
      throw new UnauthorizedException({
        message: AuthErrorMessage[AuthErrorCode.AUTH_FAILED],
        code: AuthErrorCode.AUTH_FAILED,
      });
    }
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }

    if (!authHeader.startsWith('Bearer ')) {
      return null;
    }

    const [, token] = authHeader.split(' ');
    return token;
  }
}
