import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";
const bcryptjs = require('bcrypt');
//
// export interface UserAuthProps {
//     email: string;
//     id: string;
// }

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        ) {}

    async validateUser(userEmail: string, userPassword: string) {
        // try {
        //     const user = await this.userService.getByEmail(userEmail);
        //     if (user) {
        //         const validadePass = await bcryptjs.compare(
        //             userPassword,
        //             user.password,
        //         );
        //         if (validadePass) {
        //             delete user.password;
        //             return {
        //                 email: user.email,
        //                 id: user.id,
        //             }
        //         }
        //     } else {
        //         throw new Error('Usuário não encontrado')
        //     }
        // } catch(err) {
        //     throw new Error(err);
        // }
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