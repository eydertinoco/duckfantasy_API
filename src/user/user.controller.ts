import {Body, Controller, Get, Post, Param, Patch, Delete} from "@nestjs/common";
import {UserService} from "./user.service";

@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async createUser(
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
        @Body('name') userName: string) {
        const generatedId = await this.userService.createUser(
            userEmail,
            userPassword,
            userName
        );
        return { id: generatedId, status: 'Usuário Cadastrado'};
    }

    @Get()
    async getAllUser() {
        const usuarios = await this.userService.getUser();
        return usuarios;
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.userService.getSingleUser(userId);
    }

    @Patch(':id')
    async updateUser(
        @Param('id') userId: string,
        @Body('email') userEmail: string,
        @Body('password') userPassword: string,
        @Body('name') userName: string
    ) {
        await this.userService.updateUser(userId, userEmail, userPassword, userName,);
        return null;
    }

    @Delete(':id')
    async removeUser(@Param('id') userId: string) {
        await this.userService.deleteUser(userId);
        return null
    }
}