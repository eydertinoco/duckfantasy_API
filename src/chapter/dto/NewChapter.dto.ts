import {IsString} from "class-validator";

export class NewChapterDto {

    @IsString()
    chapterTitle: string;

    @IsString()
    chapterText: string;

    @IsString()
    chapterRef: string;

    @IsString()
    trialId: string;
}