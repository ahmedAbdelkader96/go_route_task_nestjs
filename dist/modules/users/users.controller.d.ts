import { UsersService } from './users.service';
import { UpdateUserDto } from './users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./users.schema").User[]>;
    findById(id: string): Promise<import("./users.schema").User>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<import("./users.schema").User>;
    deleteUser(id: string): Promise<import("./users.schema").User>;
}
