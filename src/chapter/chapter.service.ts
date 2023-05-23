import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Chapter } from "./chapter.model";
import {TrailService} from "../trail/trail.service";
import {NewChapterDto} from "./dto/NewChapter.dto";
import {turmaType} from "../turma/turma.service";
import {Class} from "../turma/turma.model";

export interface chapterType {
    id: string,
    chapterTitle: string,
    chapterText: string,
    trialId: string,
    chapterRef: string,
    notaAlunos: [
        {
            alunoId: string,
            nota: boolean,
        }
    ]
}

@Injectable()
export class ChapterService {
    private chapters: Chapter[] = [];

    constructor(
        @InjectModel('Chapter')
        private readonly chapterModel: Model<Chapter>,
        private readonly trailService: TrailService
    ) {}

    async createChapter(createChapterDto: NewChapterDto) {
        const newChapter = new this.chapterModel({
            ...createChapterDto
        });
        const result = await newChapter.save();
        return result.id as string;
    }

    async getChapterId(chapterId: string, userId: string): Promise<chapterType> {
        const chapter = await this.encontrarCapitulo(chapterId);
        console.log(chapter);
        const notaUsuario = await this.encontrarNotaUsuario(userId, chapter)
        return {
            id: chapter.id,
            chapterTitle: chapter.chapterTitle,
            chapterText: chapter.chapterText,
            trialId: chapter.trialId,
            chapterRef: chapter.chapterRef,
            notaAlunos: chapter.notaAlunos,
        };
    }

    async notaAluno(chapterId: string, nota: boolean, alunoId: string) {
        console.log('Chegando aqui');
        const capituloAtualizado = await this.encontrarCapitulo(chapterId);
        let notaUsuario = await this.encontrarNotaUsuario(alunoId, capituloAtualizado);
        if (notaUsuario === null) {
            capituloAtualizado.notaAlunos.push({alunoId, nota});
            await capituloAtualizado.save();
        } else {
            // Editar nota anterior
            capituloAtualizado.notaAlunos.push({alunoId, nota});
            await capituloAtualizado.save();
        }
    }

    private async encontrarNotaUsuario(userId: string, chapter: Chapter): Promise<{ alunoId: string; nota: boolean }> {
        const notaAlunos = chapter.notaAlunos;
        const quantAlunos = notaAlunos.length;
        let infoAluno = null;
        for (let i=0; i < quantAlunos; i++) {
            if (userId === notaAlunos[i].alunoId) {
                infoAluno = notaAlunos[i];
                return infoAluno;
            }
        }
        return infoAluno;
    }

    private async encontrarCapitulo(id: string): Promise<Chapter> {
        let chapter;
        try {
            chapter = await this.chapterModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar esse capítulo!')
        }
        return chapter;
    }
}