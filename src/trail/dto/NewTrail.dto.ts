import {IsString} from "class-validator";

export class NewTrailDto {

    @IsString()
    trailName: string;

    @IsString()
    trailDescription: string;
}