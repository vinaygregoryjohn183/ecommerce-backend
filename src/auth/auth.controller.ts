import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth') // Matches URL /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Matches URL /auth/register
  register(@Body() body: AuthDto) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login') // Matches URL /auth/login
  login(@Body() body: AuthDto) {
    return this.authService.login(body.email, body.password);
  }
}
