import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { BadRequestException } from "@nestjs/common";

@Injectable()
export class UsersRepository {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async isRegisteredUser(email: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ email });
        return !!user;
    }

    async createUser(name: string, email: string, password: string): Promise<User> {
        const user = this.userRepository.create({ name, email, password });
        return this.userRepository.save(user);
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new BadRequestException("User not found");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new BadRequestException("Invalid password");
        }
        return user;
    }

    async findAll(page: number = 1, limit: number = 10): Promise<{ data: User[], total: number }> {
        const [data, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return { data, total };
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findOneBy({ id });
    }

    async updateUser(id: string, data: Partial<User>): Promise<User> {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        await this.userRepository.update(id, data);
        const updatedUser = await this.findById(id);
        if (!updatedUser) {
            throw new BadRequestException("User not found after update");
        }
        return updatedUser;
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.findById(id);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        return this.userRepository.remove(user);
    }
}
