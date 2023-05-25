import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards, Request} from "@nestjs/common";
import {TesteService} from "./teste.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ChapterService} from "../chapter/chapter.service";
import {NewTesteDto} from "../teste/dto/NewTeste.dto";

@Controller('/teste')
export class TesteController {
    constructor(
        private readonly testeService: TesteService,
        private readonly chapterService: ChapterService
        ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTeste(
        @Body() createTesteDto: NewTesteDto,
    ){
        const generatedId = await this.testeService.createTeste(createTesteDto);
        return { id: generatedId, status: 'Teste Cadastrada'};
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTeste(
        @Body('chapterId') chapterId: string,
    ){
        const testes = await this.testeService.getAllTeste(chapterId);
        return testes;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/addnota')
    async addNota(
        @Param('id') id: string,
        @Body('nota') nota: boolean,
        @Request() req: any,
    ){
        await this.testeService.addNota(id, nota, req?.user.id);
        return null;
    }

}