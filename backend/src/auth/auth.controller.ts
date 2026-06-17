import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('send-otp')
  async sendOtp(
    @Body() body: SendOtpDto,
  ) {
    return this.authService.sendOtp(
      body.email,
    );
  }

  @Post('verify-otp')
  async verifyOtp(
    @Body() body: VerifyOtpDto,
  ) {
    return this.authService.verifyOtp(
      body.email,
      body.otp,
    );
  }

  @Post('register')
  async register(
    @Body() body: any,
  ) {
    return this.authService.register(
      body,
    );
  }

  @Post('login')
  async login(
    @Body() body: any,
  ) {
    return this.authService.login(
      body,
    );
  }

  @Post('change-password')
  async changePassword(
    @Body() body: any,
  ) {
    return this.authService.changePassword(
      body,
    );
  }
}