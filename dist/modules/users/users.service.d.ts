import { Model } from 'mongoose';
import { User } from './users.schema';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './users.dto';
export declare class UsersService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
