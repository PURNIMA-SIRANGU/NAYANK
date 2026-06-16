import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    console.log('REGISTER HIT');
    console.log(body);

    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: any) {
    console.log('LOGIN HIT');
    console.log(body);

    return this.authService.login(body);
  }
}