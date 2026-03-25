import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers(@Request() req) {
        // The user payload is now available via req.user!
        // We could console.log(req.user) to verify who is making the request.
        return this.usersService.findAll();
    }
}
