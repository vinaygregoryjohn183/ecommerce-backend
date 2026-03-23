import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ADD THIS LINE 
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // We export this so AuthModule can use it later!
})
export class UsersModule {}
