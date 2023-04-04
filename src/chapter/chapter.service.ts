import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Chapter } from "./chapter.model";


@Injectable()
export class ChapterService {
    private chapters: Chapter[] = [];

    constructor(
        @InjectModel('Chapter') private readonly chapterModel:
            Model<Chapter>
    ) {}

    async createChapter(title: string, text: string, ref: string) {
        // Pegar id da trilha
        //Pegar id do professor
        const newChapter = new this.chapterModel({
            chapterTitle: title,
            chapterText: text,
            chapterRef: ref
        });
        const result = await newChapter.save();
        return result.id as string;
    }

    async getAllChapterInTrail(idTrail: string) {
        // Pegar id do Trail
        // pegar a Lista de Chapter dentro do Trail
        // Vai chamar todos da lista
        const chapter = await this.findChapter(idTrail);
        return {
            id: chapter.id,
            chapterTitle: chapter.chapterTitle,
        };
    }

    async getAllInfoChapter(id: string) {
        const chapter = await this.findChapter(id);
        return {
            id: chapter.id,
            chapterTitle: chapter.chapterTitle,
            chapterText: chapter.chapterText,
            chapterRef: chapter.chapterRef,
        };
    }

    async updateChapter(id: string, title: string, text: string, ref: string) {
        const updatedChapter = await this.findChapter(id);
        if(title) {updatedChapter.chapterTitle = title;}
        if(text) {updatedChapter.chapterText = text;}
        if(ref) {updatedChapter.chapterRef = ref;}
        updatedChapter.save();
    }

    async deleteChapter(id: string) {
        await this.chapterModel.deleteOne({_id: id}).exec();
    }

    private async findChapter(id: string): Promise<Chapter> {
        let chapter;
        try {
            chapter = await this.chapterModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar esse usuário!')
      }
      return chapter;
    }
}