import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Matches URL /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Matches URL /auth/register
  register(@Body() body: any) {
    // Note: We use 'any' here for speed, but in real apps we'd use a DTO class!
    return this.authService.register(body.email, body.password);
  }

  @Post('login') // Matches URL /auth/login
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
}
