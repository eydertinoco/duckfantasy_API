import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Chapter } from "./chapter.model";
import {TrailService} from "../trail/trail.service";
import {UserService} from "../user/user.service";


@Injectable()
export class ChapterService {
    private chapters: Chapter[] = [];

    constructor(
        @InjectModel('Chapter')
        private readonly chapterModel: Model<Chapter>,
        private readonly trailService: TrailService
    ) {}

    async createChapter(title: string, text: string, ref: string) {
        const newChapter = new this.chapterModel({
            chapterTitle: title,
            chapterText: text,
            chapterRef: ref
        });
        const result = await newChapter.save();
        return result.id as string;
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