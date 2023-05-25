import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Teste } from "./teste.model";
import {NewChapterDto} from "../chapter/dto/NewChapter.dto";
import {NewTesteDto} from "./dto/NewTeste.dto";
import {Chapter} from "../chapter/chapter.model";

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

    async createTeste(createTesteDto: NewTesteDto) {
        const newTeste = new this.testeModel({
            ...createTesteDto
        });
        const result = await newTeste.save();
        return result.id as string;
    }

    async getAllTeste(chapterId) {
        const todosTeste = await this.testeModel.find().exec();

        const quantTeste = todosTeste.length;
        let testesCapitulo = [];
        for(let i=0; i < quantTeste; i++) {
            if (chapterId === todosTeste[i].chapterId) {
                testesCapitulo.push(todosTeste[i]);
            }
        }
        return testesCapitulo.map((testeCapitulo) => ({
            id: testeCapitulo.id,
            testeQuestion: testeCapitulo.testeQuestion,
            testeValue: testeCapitulo.testeValue,
            chapterId: testeCapitulo.chapterId,
            notaQuestion: testeCapitulo.notaQuestion
        }));
    }

    async addNota(id: string, nota: boolean, alunoId: string) {
        const testeEspecifico = await this.encontrarTeste(id);

        let notaUsuario = await this.encontrarNotaUsuario(alunoId, testeEspecifico);
        if (notaUsuario === null) {
            testeEspecifico.notaQuestion.push({alunoId, nota});
            await testeEspecifico.save();
        } else {
            // Editar nota anterior
            testeEspecifico.notaQuestion.push({alunoId, nota});
            await testeEspecifico.save();
        }
    }

    private async encontrarNotaUsuario(userId: string, teste: Teste): Promise<{ alunoId: string; nota: boolean }> {
        const notaAlunos = teste.notaQuestion;
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

    private async encontrarTeste(id: string): Promise<Teste> {
        let teste;
        try {
            teste = await this.testeModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar esse capítulo!')
        }
        return teste;
    }
}