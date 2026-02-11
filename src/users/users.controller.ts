import { Controller, Post, Get, Query, Put, Param, Body, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    async createUser(@Body() registerDto: RegisterDto) {
        const { email, password, name } = registerDto;
        return this.userService.createUser(name, email, password);
    }

    @Get()
    async getAllUsers(@Query() query: any) {
        return this.userService.getAllUsers(query);
    }

    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return this.userService.getUserById(id);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return this.userService.deleteUser(id);
    }
}
