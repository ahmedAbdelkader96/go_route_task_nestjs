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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("./users.schema");
const jwt_1 = require("@nestjs/jwt");
let UsersService = class UsersService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async findById(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.HttpException('Invalid user ID format', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'User not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async updateUser(id, updateUserDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.HttpException('Invalid user ID format', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'User not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
    }
    async deleteUser(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.HttpException('Invalid user ID format', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.NOT_FOUND,
                message: 'User not found',
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return this.userModel.findByIdAndDelete(id).exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map