import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards} from "@nestjs/common";
import {TurmaService} from "./turma.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/turma')
export class TurmaController {
    constructor(private readonly turmaService: TurmaService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTurma(
        @Body('className') className: string,
        @Body('completionDate') completionDate: string,
    ){
        const generatedId = await this.turmaService.createClass(
            className,
            completionDate
        );
        return { id: generatedId, status: 'Classe Cadastrada'};
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTurma() {
        const classes = await this.turmaService.getAllClass();
        return classes;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeUser(@Param('id') turmaId: string) {
        await this.turmaService.deleteTurma(turmaId);
        return null
    }



}