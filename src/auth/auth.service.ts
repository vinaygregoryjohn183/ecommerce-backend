import { Injectable, ConflictException } from '@nestjs/common';
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
}
