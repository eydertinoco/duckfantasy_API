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
    @Get('/')
    async getTodasTurma() {
        const todasTurmas = await this.turmaService.getTodasTurmas();
        return todasTurmas;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/professor')
    async getMinhasTurmas(
        @Request() req: any,
    ) {
        const turmasCriadasPeloProfessor = await this.turmaService.getTodasMinhasTurmas(req?.user.id);
        return turmasCriadasPeloProfessor;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/aluno')
    async getTurmasVinculadas(
        @Request() req: any,
    ) {
        const turmasQueAlunoPossui = await this.turmaService.getTodasTurmasVinculadas(req?.user.id);
        return turmasQueAlunoPossui;
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
        @Body() trailId: string,
        @Request() req: any,
    ) {
        await this.turmaService.updateTurma(turmaId, trailId);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/aluno/vincular')
    async vincularTurma(
        @Param('id') turmaId: string,
        @Request() req: any,
    ) {
        await this.turmaService.vincularAlunoTurma(turmaId, req?.user.id);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id/aluno/desvincular')
    async desvincularAlunoTurma(
        @Param('id') turmaId: string,
        @Request() req: any,
    ) {
        await this.turmaService.desvincularAlunoTurma(turmaId, req?.user.id);
        return null
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removerTurma(@Param('id') turmaId: string) {
        await this.turmaService.deletarTurma(turmaId);
        return null
    }



}