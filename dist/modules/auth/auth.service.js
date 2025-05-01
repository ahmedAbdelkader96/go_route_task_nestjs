"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const users_schema_1 = require("../users/users.schema");
const common_2 = require("@nestjs/common");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { name, email, password, jobTitle } = signUpDto;
        const existingUser = await this.userModel.findOne({ email }).exec();
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
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
    async signIn(signInDto) {
        const { email, password } = signInDto;
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            console.error(`User not found for email: ${email}`);
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.error(`Invalid password for email: ${email}`);
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const tokens = this.generateTokens(user);
        return {
            user: user,
            ...tokens,
        };
    }
    async refreshToken(refreshTokenDto) {
        try {
            const { refreshToken } = refreshTokenDto;
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
            });
            const user = await this.userModel.findById(payload.sub).exec();
            if (!user) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            const tokens = this.generateTokens(user);
            return {
                user: user,
                ...tokens,
            };
        }
        catch (error) {
            console.error('Error verifying refresh token:', error.message);
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
    }
    generateTokens(user) {
        const JWT_SECRET = process.env.JWT_SECRET;
        const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
        const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || '1h';
        const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '7d';
        if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
            throw new common_2.HttpException('JWT secret not found', common_2.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (!ACCESS_TOKEN_EXPIRATION || !REFRESH_TOKEN_EXPIRATION) {
            throw new common_2.HttpException('JWT expiration not found', common_2.HttpStatus.INTERNAL_SERVER_ERROR);
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map