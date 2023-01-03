import {Body, Controller, Get, Post, Param, Patch, Delete} from "@nestjs/common";
import {UsuarioRepository} from "./usuario.repository";

@Controller('/usuarios')
export class UsuarioController {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    @Post()
    async createUser(
        @Body('user') userUser: string,
        @Body('password') userPassword: string,
        @Body('email') userEmail: string,
        @Body('firstName') userFirstName: string,
        @Body('lastName') userLastName: string) {
        const generatedId = await this.usuarioRepository.createUser(
            userUser,
            userPassword,
            userEmail,
            userFirstName,
            userLastName
        );
        return { id: generatedId, status: 'Usuário Cadastrado'};
    }

    @Get()
    async getAllUser() {
        const usuarios = await this.usuarioRepository.getUser();
        return usuarios;
    }

    @Get(':id')
    getUser(@Param('id') userId: string) {
        return this.usuarioRepository.getSingleUser(userId);
    }

    @Patch(':id')
    updateUser(
        @Param('id') userId: string,
        @Body('user') userUser: string,
        @Body('password') userPassword: string,
        @Body('email') userEmail: string,
        @Body('firstName') userFirstName: string,
        @Body('lastName') userLastName: string
    ) {

    }

}