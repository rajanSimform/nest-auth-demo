import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { OIDCStrategy } from 'passport-azure-ad';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureADStrategy extends PassportStrategy(OIDCStrategy, 'AzureAD') {
  constructor(private readonly configService: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${configService.get<string>('AZURE_DIRECTORY_ID')}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get<string>('AZURE_APPLICATION_ID'),
      audience: configService.get<string>('AZURE_APPLICATION_ID'),
      clientSecret: configService.get<string>('AZURE_OAUTH_SECRET'),
      responseType: 'code id_token',
      responseMode: 'form_post',
      redirectUrl: 'https://rjn-nest-demo.loca.lt/auth/microsoft',
      // allowHttpForRedirectUrl: true,
      // responseMode: 'query',
      // redirectUrl: 'https://localhost:5000/auth/microsoft',
      issuer: `https://sts.windows.net/${configService.get<string>('AZURE_DIRECTORY_ID')}/`,
      scope: ['openid', 'profile', 'email'],
      loggingLevel: 'info',
    });
  }

  async validate(profile: any) {
    return profile; // Return user profile for JWT creation
  }
}
