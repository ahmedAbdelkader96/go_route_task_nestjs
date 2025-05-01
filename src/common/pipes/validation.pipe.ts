import {
  ValidationPipe as NestValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const errorMessage = Object.values(firstError.constraints)[0];
        return new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            timestamp: new Date().toISOString(),
            message: errorMessage,
            // field: firstError.property,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    });
  }
}
