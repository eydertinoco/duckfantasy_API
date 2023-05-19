import {Controller, UseGuards, Request, Post, Get, NotFoundException} from "@nestjs/common";
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {TrailService} from "../trail/trail.service";
import {UserService} from "../user/user.service";

@Controller()
export class AuthController {

    constructor(
        private authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<any> {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/auth/me')
    async getMyInformation(
        @Request() req: any,
    ) {
        const myInformation = await this.userService.getById(req?.user.id);
        if(myInformation) {
            delete myInformation.password;
        } else {
            throw new NotFoundException("Usuário não encontrado");
        }
        return myInformation;
    }

}