import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from '../auth.service';
import { AuthMethod } from 'src/schemas/users.schema';
import axios from 'axios';

@Injectable()
export class GoogleService {
  private readonly client: OAuth2Client;

  // Environment variables used in this file
  private readonly GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  private readonly GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  private readonly GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

  constructor(private readonly authService: AuthService) {
    this.client = new OAuth2Client(this.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(
    idToken: string,
  ): Promise<{ email: string; name: string; picture?: string }> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Invalid Google ID token');
    }

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };
  }

  async exchangeAuthCodeForIdToken(authCode: string) {
    const tokenUrl = 'https://oauth2.googleapis.com/token';

    const params = {
      client_id: this.GOOGLE_CLIENT_ID,
      client_secret: this.GOOGLE_CLIENT_SECRET,
      code: authCode,
      grant_type: 'authorization_code',
      redirect_uri: this.GOOGLE_REDIRECT_URI,
    };
    console.log(
      '🚀 ~ GoogleService ~ exchangeAuthCodeForIdToken ~ params:',
      params,
    );

    try {
      const response = await axios.post(tokenUrl, new URLSearchParams(params), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (!response.data.id_token) {
        throw new Error('No ID token received');
      }
      return response.data;
    } catch (error) {
      console.error('Error exchanging authorization code:', error);
      throw new UnauthorizedException('Failed to exchange authorization code');
    }
  }

  async signinWithAuthCode(authCode: string) {
    const data = await this.exchangeAuthCodeForIdToken(authCode);
    return this.signinWithIdToken(data.id_token, data);
  }

  async signinWithIdToken(idToken: string, data?: any) {
    try {
      // Verify the ID token and extract user information
      const googleUser = await this.verifyGoogleToken(idToken);

      if (!googleUser) {
        throw new UnauthorizedException('Invalid Google token');
      }

      const { email, name, picture } = googleUser;

      // Find or create user in your database
      const user = await this.authService.findOrCreateUser(
        email,
        AuthMethod.GOOGLE,
        {
          ...data,
          profilePicture: picture,
        },
      );

      // Generate application JWT or session token
      const appToken = await this.authService.generateTokens(user);

      return {
        message: 'Google Sign-In successful',
        tokens: appToken,
        user: { email: user.email, profilePicture: user.profilePicture },
      };
    } catch (error) {
      console.error('Google sign-in with ID token failed:', error);
      throw new UnauthorizedException('Google Sign-In failed');
    }
  }

  async getNewAccessToken(refreshToken: string) {
    const tokenUrl = 'https://oauth2.googleapis.com/token';

    const params = {
      client_id: this.GOOGLE_CLIENT_ID,
      client_secret: this.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };

    try {
      const response = await axios.post(tokenUrl, new URLSearchParams(params), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (!response.data.access_token) {
        throw new Error('No access token received');
      }

      return response.data; // Contains access_token, expires_in, and scope
    } catch (error) {
      console.error('Error getting new access token:', error);
      throw new UnauthorizedException('Failed to refresh access token');
    }
  }
}
