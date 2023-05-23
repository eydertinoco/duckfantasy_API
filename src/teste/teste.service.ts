import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Teste } from "./teste.model";

export interface testeType {
    id: string,
    testeQuestion: string,
    testeValue: boolean,
    chapterId: string,
    notaQuestion: [
        {
            alunoId: string;
            nota: boolean;
        }
    ]
}

@Injectable()
export class TesteService {
    private testes: Teste[] = [];

    constructor(
        @InjectModel('Teste')
        private readonly testeModel: Model<Teste>,
    ) {}

}