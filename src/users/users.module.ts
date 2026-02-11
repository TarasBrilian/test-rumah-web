import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

import { UsersController } from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    exports: [UsersService],
    providers: [UsersService, UsersRepository],
})
export class UsersModule { }
