import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ) {}

    async validateUser(userEmail: string, userPassword: string) {
        const user = await this.userService.getByEmail(userEmail);
        if(user && user.password === userPassword) {
            const { id, email, name } = user;
            return { id: id, email: email, name: name};
        }
        return null;
    }

    async login(user: any) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}