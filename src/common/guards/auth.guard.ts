import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest(); // Get the request object
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const secret = process.env.JWT_SECRET || 'default_secret'; // Use the secret from .env
      const decoded = this.jwtService.verify(token, { secret }); // Verify the token
      request.user = decoded; // Attach the decoded token payload to the request object
      return true; // Allow access if the token is verified
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}