import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Trail } from "./trail.model";
import {UserService} from "../user/user.service";
import {NewTurmaDto} from "../turma/dto/NewTurma.dto";
import {NewTrailDto} from "./dto/NewTrail.dto";
import {turmaType} from "../turma/turma.service";
import {Class} from "../turma/turma.model";

export interface trilhaType {
    id: string,
    trailName: string,
    trailDescription: string,
    teacherId: string,
    listChapter: [{ chapterId: string }],
}

@Injectable()
export class TrailService {
    private trails: Trail[] = [];

    constructor(
        @InjectModel('Trail')
        private readonly trailModel: Model<Trail>,
        private readonly userService: UserService
    ) {}

    async createTrail(teacher: string, createTrialDto: NewTrailDto) {
        const novaTrilha = new this.trailModel({
            ...createTrialDto,
            teacherId: teacher,
            listChapter: []
        });
        const result = await novaTrilha.save();
        return result.id as string;
    }

    async getTodasMinhasTrilhas(userId) {
        const todasTrilhas = await this.trailModel.find().exec();

        const numeroTodasTrilhas = todasTrilhas.length;
        let minhasTrilhas = [];
        for(let i=0; i < numeroTodasTrilhas; i++) {
            if (userId === todasTrilhas[i].teacherId) {
                minhasTrilhas.push(todasTrilhas[i]);
            }
        }
        return minhasTrilhas.map((minhaTrilha) => ({
            id: minhaTrilha.id,
            trailName: minhaTrilha.trailName,
            trailDescription: minhaTrilha.trailDescription,
            teacherId: minhaTrilha.teacherId,
            listChapter: minhaTrilha.listChapter
        }));
    }

    async getTrilhaId(id: string): Promise<trilhaType> {
        const trilha = await this.encontrarTrilha(id);
        return {
            id: trilha.id,
            trailName: trilha.trailName,
            trailDescription: trilha.trailDescription,
            teacherId: trilha.teacherId,
            listChapter: trilha.listChapter
        };
    }

    async vincularCapituloComTrilha(id: string, chapterId) {
        const updatedTrilha = await this.encontrarTrilha(id);
        if(chapterId) {updatedTrilha.listChapter.push(chapterId); }
        updatedTrilha.save();
    }

    async deleteTrial(id: string) {
        await this.trailModel.deleteOne({_id: id}).exec();
    }

    private async encontrarTrilha(id: string): Promise<Trail> {
        let trilha;
        try {
            trilha = await this.trailModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar essa turma!')
        }
        return trilha;
    }
}