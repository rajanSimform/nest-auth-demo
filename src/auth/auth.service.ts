import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async googleLogin(@Req() req: any) {
    if (!req.user) {
      throw new BadRequestException('Error while login with google');
    }

    let user = await this.userService.getUserByEmail(req.user.email);
    if (!user) {
      user = await this.userService.userSignUp(req.user);
    }

    // sign the jwt
    const token = this.jwtService.sign({
      id: req.user.id,
      email: req.user.email,
      avatar: req.user?.avtarUrl,
    });

    return {
      message: 'Logged with google sucessfully',
      user,
      accessToken: token,
      googleAccessToken: req.user.accessToken,
    };
  }

  async azureLogin(@Req() req: any) {
    const user = await this.userService.userSignUp({
      name: req.user.displayName,
      email: req.user?._json?.email,
      provider: 'microsoft ad',
    });

    // sign the jwt
    const token = this.jwtService.sign({
      id: req.user.id,
      email: req.user.email,
      avatar: req.user?.avtarUrl,
    });

    return {
      message: 'Logged with microsoft sucessfully',
      user,
      accessToken: token,
    };
  }
}
