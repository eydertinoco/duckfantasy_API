import {Body, Controller, Get, Post, Param, Request, Patch, Delete, UseGuards} from "@nestjs/common";
import {TurmaService} from "./turma.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {NewTurmaDto} from "./dto/NewTurma.dto";

@Controller('/turma')
export class TurmaController {
    constructor(private readonly turmaService: TurmaService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTurma(
        @Body() createTurmaDto: NewTurmaDto,
        @Request() req: any,
    ){
        console.log(createTurmaDto);
        if (req?.user.office === "Professor") {
            const generatedId = await this.turmaService.criarNovaTurma(
                req?.user.id,
                createTurmaDto
            );
            return { id: generatedId, status: 'Turma Cadastrada'};
        } else {
            return { status: 'Você não é Professor para cadastrar Turmas'};
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTurma(
        @Request() req: any,
    ) {
        const turmas = await this.turmaService.getTodasMinhasTurmas(req?.user.id);
        return turmas;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTurmaId(
        @Param('id') turmaId: string
    ) {
        return this.turmaService.getTurmaId(turmaId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateTurma(
        @Param('id') turmaId: string,
        @Body() createTurmaDto: NewTurmaDto,
        @Request() req: any,
    ) {
        await this.turmaService.updateTurma(turmaId, createTurmaDto);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removerTurma(@Param('id') turmaId: string) {
        await this.turmaService.deletarTurma(turmaId);
        return null
    }



}