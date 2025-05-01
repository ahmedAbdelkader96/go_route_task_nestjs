import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, RefreshTokenDto } from '../auth/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<import("./auth.types").AuthResponse>;
    signIn(signInDto: SignInDto): Promise<import("./auth.types").AuthResponse>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<import("./auth.types").AuthResponse>;
}
