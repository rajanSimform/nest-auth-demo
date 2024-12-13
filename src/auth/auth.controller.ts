import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req) {
    return await this.authService.googleLogin(req);
  }

  @Get('microsoft')
  @UseGuards(AuthGuard('AzureAD'))
  public async microsoft() {
    return 'ok';
  }

  @Post('microsoft')
  @UseGuards(AuthGuard('AzureAD'))
  public async microsoftLOgin(@Request() req) {
    return await this.authService.azureLogin(req);
  }

  // @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.MICROSOFT))
  // @Get('microsoft')
  // public async microsoft(@Res() res: FastifyReply): Promise<FastifyReply> {
  //   return this.startRedirect(res, OAuthProvidersEnum.MICROSOFT);
  // }

  // @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.GOOGLE))
  // @Get('google')
  // public async google(@Res() res: FastifyReply): Promise<FastifyReply> {
  //   return this.startRedirect(res, OAuthProvidersEnum.GOOGLE);
  // }

  // @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.FACEBOOK))
  // @Get('facebook')
  // public async facebook(@Res() res: FastifyReply): Promise<FastifyReply> {
  //   return this.startRedirect(res, OAuthProvidersEnum.FACEBOOK);
  // }

  // @UseGuards(OAuthFlagGuard(OAuthProvidersEnum.GITHUB))
  // @Get('github')
  // public async github(@Res() res: FastifyReply): Promise<FastifyReply> {
  //   return this.startRedirect(res, OAuthProvidersEnum.GITHUB);
  // }
}
