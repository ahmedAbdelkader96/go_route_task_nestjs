import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { User } from './users.schema';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid user ID format', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid user ID format', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async deleteUser(id: string): Promise<User> {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid user ID format', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.userModel.findByIdAndDelete(id).exec();
  }
}
