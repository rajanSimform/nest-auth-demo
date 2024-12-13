import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private config: ConfigService) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:5000/auth/google-redirect',
      scope: ['email', 'profile', 'openid'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id, displayName, provider } = profile;
    const user = {
      openId: id,
      email: emails[0].value,
      emailVerified: emails[0].verified,
      name: displayName,
      provider,
      firstName: name.givenName,
      lastName: name.familyName,
      avtarUrl: photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
