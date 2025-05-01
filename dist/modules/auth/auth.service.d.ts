import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../users/users.schema';
import { SignUpDto, SignInDto, RefreshTokenDto } from './auth.dto';
import { AuthResponse } from './auth.types';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<AuthResponse>;
    signIn(signInDto: SignInDto): Promise<AuthResponse>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponse>;
    private generateTokens;
}
