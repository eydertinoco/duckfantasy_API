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
    getAllUser() {
        return this.usuarioRepository.getUser();
    }
}