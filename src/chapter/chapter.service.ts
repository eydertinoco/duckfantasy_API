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
    chapterRef: string
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

    async getChapterId(id: string): Promise<chapterType> {
        const chapter = await this.encontrarCapitulo(id);
        return {
            id: chapter.id,
            chapterTitle: chapter.chapterTitle,
            chapterText: chapter.chapterText,
            trialId: chapter.trialId,
            chapterRef: chapter.chapterRef
        };
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