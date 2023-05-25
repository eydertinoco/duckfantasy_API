import {IsBoolean, IsString} from "class-validator";

export class NewTesteDto {

    @IsString()
    testeQuestion: string;

    @IsBoolean()
    testeValue: boolean;

    @IsString()
    chapterId: string;
}