import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SimpleAuthGuard } from 'src/auth/guards/simple-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //  this is protected route
  @UseGuards(SimpleAuthGuard)
  @Get('secret')
  async getUsers() {
    return await this.userService.getUsers();
  }
}
