import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {} // Dependency Injection!

  async register(email: string, plainTextPassword: string) {
    // 1. Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // 2. Hash the password (10 "salt rounds" is the secure standard)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    // 3. Save to database using the UsersService
    return this.usersService.create(email, hashedPassword);
  }

  async login(email: string, plainTextPassword: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(plainTextPassword, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
      },
      // Note for Session 2: Replace this with an actual signed JWT using @nestjs/jwt!
      access_token: 'mock-jwt-token-replace-in-session-2'
    };
  }
}
