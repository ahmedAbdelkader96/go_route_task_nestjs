import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global() // Makes the module globally available
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Use the secret from .env
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }, // Default expiration time
    }),
  ],
  exports: [JwtModule], // Export JwtModule for use in other modules
})
export class SharedModule {}
