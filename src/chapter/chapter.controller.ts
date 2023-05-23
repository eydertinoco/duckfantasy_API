import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards, Request} from "@nestjs/common";
import {ChapterService} from "./chapter.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {NewChapterDto} from "./dto/NewChapter.dto";
import {TrailService} from "../trail/trail.service";

@Controller('/chapter')
export class ChapterController {
    constructor(
        private readonly chapterService: ChapterService,
        private readonly trailService: TrailService,
        ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createChapter(
        @Body() createChapterDto: NewChapterDto,
        @Request() req: any,
    ){
        const validarUsuario = await this.trailService.getTrilhaId(createChapterDto.trialId);
        if (req?.user.id === validarUsuario.teacherId) {
            const generatedId = await this.chapterService.createChapter(createChapterDto);
            await this.trailService.vincularCapituloComTrilha(createChapterDto.trialId, generatedId);
            return { id: generatedId, status: 'Capítulo Cadastrada'};
        } else {
            return { status: 'Você não é professor responsável por essa Trilha'};
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getChapterId(
        @Param('id') id: string,
        @Request() req: any,
    ) {
        return this.chapterService.getChapterId(id, req?.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/nota')
    async atualizarChapter(
        @Param('id') id: string,
        @Body('nota') nota: boolean,
        @Request() req: any,
    ) {
        await this.chapterService.notaAluno(id, nota, req?.user.id);
        return null;
    }
}