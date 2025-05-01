import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SignUpDto, SignInDto, RefreshTokenDto } from './auth.dto'; // Import the UserDocument type
import { AuthResponse } from './auth.types'; // Import the UserDocument type

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const { name, email, password, jobTitle } = signUpDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newUser = new this.userModel({
      name,
      jobTitle,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const tokens = this.generateTokens(user);

    return {
      user: user,
      ...tokens,
    };
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    const { email, password } = signInDto;

    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      console.error(`User not found for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error(`Invalid password for email: ${email}`);
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = this.generateTokens(user);

    return {
      user: user,
      ...tokens,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponse> {
    try {
      const { refreshToken } = refreshTokenDto;
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      });

      const user = await this.userModel.findById(payload.sub).exec();
      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = this.generateTokens(user);

      return {
        user: user,
        ...tokens,
      };
    } catch (error) {
      console.error('Error verifying refresh token:', error.message);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private generateTokens(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '1h';
    const REFRESH_TOKEN_EXPIRATION =
      process.env.REFRESH_TOKEN_EXPIRATION || '7d';
    if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
      throw new HttpException(
        'JWT secret not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!ACCESS_TOKEN_EXPIRATION || !REFRESH_TOKEN_EXPIRATION) {
      throw new HttpException(
        'JWT expiration not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    return { accessToken, refreshToken };
  }
}
