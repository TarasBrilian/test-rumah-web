import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./repositories/users.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) { }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.isRegisteredUser(email);
        if (existingUser) {
            throw new BadRequestException("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = this.userRepository.createUser(name, email, hashedPassword);

        return user;
    }

    async validateUser(email: string, password: string): Promise<User> {
        return this.userRepository.validateUser(email, password);
    }

    async getAllUsers(paginationDto: any): Promise<User[]> {
        const { page = 1, limit = 10 } = paginationDto;
        const { data, total } = await this.userRepository.findAll(page, limit);

        return data;
    }

    async updateUser(id: string, updateUserDto: any): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        return this.userRepository.updateUser(id, updateUserDto);
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        return user;
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        return this.userRepository.deleteUser(id);
    }
}
