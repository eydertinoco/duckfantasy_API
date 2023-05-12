import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards, Request} from "@nestjs/common";
import {TrailService} from "./trail.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {NewTurmaDto} from "../turma/dto/NewTurma.dto";
import {NewTrailDto} from "./dto/NewTrail.dto";

@Controller('/trial')
export class TrailController {
    constructor(private readonly trailService: TrailService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTrial(
        @Body() createTrialDto: NewTrailDto,
        @Request() req: any,
    ){
        console.log('Chegou aqui')
        const generatedId = await this.trailService.createTrail(
            req?.user.id,
            createTrialDto
        );
        return { id: generatedId, status: 'Trilha Cadastrada'};
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTodasMinhasTrilhas(
        @Request() req: any,
    ) {
        const trilhas = await this.trailService.getTodasMinhasTrilhas(req?.user.id);
        return trilhas;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getTrilhaId(
        @Param('id') trilhaId: string
    ) {
        return this.trailService.getTrilhaId(trilhaId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeTrail(@Param('id') trailId: string) {
        await this.trailService.deleteTrial(trailId);
        return null
    }



}