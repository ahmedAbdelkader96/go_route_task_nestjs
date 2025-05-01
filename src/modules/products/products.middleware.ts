import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProductsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const authHeader = req.headers['authorization'];

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   throw new UnauthorizedException('Authorization token is missing or invalid');
    // }

    // const token = authHeader.split(' ')[1];

    // // Add your token validation logic here
    // if (token !== 'valid-token') {
    //   throw new UnauthorizedException('Invalid token');
    // }
    throw new UnauthorizedException('Invalid token 000');

    // If valid, proceed to the next middleware or route handler
    next();
  }
}