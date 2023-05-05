import {IsString} from "class-validator";

export class NewTurmaDto{

    @IsString()
    className: string;

    @IsString()
    createdDate: string;

    @IsString()
    completionDate: string;
}