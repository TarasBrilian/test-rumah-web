import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }

    async register(name: string, email: string, password: string) {
        const user = await this.userService.createUser(name, email, password);
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.userService.validateUser(email, password);
        const payload = { sub: user.id, email: user.email };
        return { accessToken: this.jwtService.sign(payload) };
    }
}