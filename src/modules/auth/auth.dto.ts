import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class SignUpDto {
  @MinLength(3, { message: 'Name must be at least 3 characters long' }) // Minimum length validation
  @IsNotEmpty({ message: 'Name is required' }) // Custom error message
  name: string;

  @MinLength(3, { message: 'Job title must be at least 3 characters long' })
  @IsNotEmpty({ message: 'Job title is required' })
  jobTitle: string;

  @IsEmail({}, { message: 'Email must be a valid email address' }) // Custom error message
  @IsNotEmpty({ message: 'Email is required' }) // Custom error message
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
    message:
      'Password requirements are as follows: Minimum length of 8 characters, at least one letter, one number, and one special character.',
  })
  @IsNotEmpty({ message: 'Password is required' }) // Custom error message
  password: string;
}

export class SignInDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'Refresh token is required' })
  refreshToken: string;
}
