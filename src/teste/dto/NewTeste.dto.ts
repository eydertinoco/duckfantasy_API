import {IsBoolean, IsString} from "class-validator";

export class NewChapterDto {

    @IsString()
    testeQuestion: string;

    @IsBoolean()
    testeValue: boolean;

    @IsString()
    chapterId: string;
}