import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    }
    
    try {
      // Decode and verify the JWT cryptographically using our globally configured JwtService
      const payload = await this.jwtService.verifyAsync(token);
      
      // Attach the payload to the request object. 
      // Route handlers can now access this via `req.user`
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return true; // Allows the request to proceed to the controller
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Looks for a header like "Authorization: Bearer <token>"
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
