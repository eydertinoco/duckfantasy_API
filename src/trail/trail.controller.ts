import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards} from "@nestjs/common";
import {TrailService} from "./trail.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/trial')
export class TrailController {
    constructor(private readonly trailService: TrailService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createTrial(
        @Body('trailName') trailName: string,
        @Body('trailDescription') trailDescription: string,
    ){
        const generatedId = await this.trailService.createTrail(
            trailName,
            trailDescription
        );
        return { id: generatedId, status: 'Trilha Cadastrada'};
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllTurma() {
        const trial = await this.trailService.getAllTrail();
        return trial;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async removeTrail(@Param('id') trailId: string) {
        await this.trailService.deleteTrial(trailId);
        return null
    }



}