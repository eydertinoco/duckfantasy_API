import {Body, Controller, Get, Post} from "@nestjs/common";
import {UsuarioRepository} from "./usuario.repository";

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Get()
    async listarUsuarios() {
        return this.usuarioRepository.listar();
    }

    @Post()
    async criarUsuario(@Body() dadosDoUsuario) {
        this.usuarioRepository.salvar(dadosDoUsuario);
        return {status: 'Usuário Cadastrado'};
    }
}