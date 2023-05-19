import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Class } from "./turma.model";
import {UserService} from "../user/user.service";

import {userType} from "../user/user.service";
import {NewTurmaDto} from "./dto/NewTurma.dto";
import {User} from "../user/user.model";

export interface turmaType {
    id: string,
    className: string,
    teacherId: string,
    createdDate: string,
    completionDate: string,
    listTrail: [{ trailId: string }],
    listStudent: [{ studentId: string }],
}

@Injectable()
export class TurmaService {
    private classes: Class[] = [];

    constructor(
        @InjectModel('Class')
        private readonly classModel: Model<Class>,
        private readonly userService: UserService
    ) {}

    async criarNovaTurma(teacher: string, createTurmaDto: NewTurmaDto) {
        const novaTurma = new this.classModel({
            ...createTurmaDto,
            teacherId: teacher,
            listTrail: [],
            listStudent: [],
        });
        const result = await novaTurma.save();
        return result.id as string;
    }

    async getTodasTurmas() {
        const todasTurmas = await this.classModel.find().exec();
        return todasTurmas.map((minhaTurma) => ({
            id: minhaTurma.id,
            className: minhaTurma.className,
            teacherId: minhaTurma.teacherId,
            createdDate: minhaTurma.createdDate,
            completionDate: minhaTurma.completionDate,
            listTrail: minhaTurma.listTrail,
            listStudent: minhaTurma.listStudent,
        }));
    }

    async getTodasMinhasTurmas(userId) {
        const todasTurmas = await this.classModel.find().exec();

        const numeroTodasTurmas = todasTurmas.length;
        let minhasTurmas = [];
        for(let i=0; i < numeroTodasTurmas; i++) {
            if (userId === todasTurmas[i].teacherId) {
                minhasTurmas.push(todasTurmas[i]);
            }
        }
        return minhasTurmas.map((minhaTurma) => ({
            id: minhaTurma.id,
            className: minhaTurma.className,
            teacherId: minhaTurma.teacherId,
            createdDate: minhaTurma.createdDate,
            completionDate: minhaTurma.completionDate,
            listTrail: minhaTurma.listTrail,
            listStudent: minhaTurma.listStudent,
        }));
    }

    async getTodasTurmasVinculadas(userId) {
        const todasTurmas = await this.classModel.find().exec();
        const numeroTodasTurmas = todasTurmas.length;
        let minhasTurmas = [];
        for(let i=0; i < numeroTodasTurmas; i++) {
            let estudantes = todasTurmas[i].listStudent;
            let quantEstudantes = estudantes.length;
            for(let j=0; j < quantEstudantes; j++) {
                if (userId == estudantes[j]) {
                    minhasTurmas.push(todasTurmas[i]);
                    break;
                }
            }
        }
        return minhasTurmas.map((minhaTurma) => ({
            id: minhaTurma.id,
            className: minhaTurma.className,
            teacherId: minhaTurma.teacherId,
            createdDate: minhaTurma.createdDate,
            completionDate: minhaTurma.completionDate,
            listTrail: minhaTurma.listTrail,
            listStudent: minhaTurma.listStudent,
        }));
    }

    async getTurmaId(id: string): Promise<turmaType> {
        const turma = await this.encontrarTurma(id);
        return {
            id: turma.id,
            className: turma.className,
            teacherId: turma.teacherId,
            createdDate: turma.createdDate,
            completionDate: turma.completionDate,
            listTrail: turma.listTrail,
            listStudent: turma.listStudent
        };
    }

    async vincularAlunoTurma(id: string, userId) {
        const updatedTurma = await this.encontrarTurma(id);
        if(userId) {updatedTurma.listStudent.push(userId); }
        await updatedTurma.save();
    }

    async updateTurma(id: string, trailId) {
        const updatedTurma = await this.encontrarTurma(id);
        if(trailId) {updatedTurma.listTrail.push(trailId); }
        await updatedTurma.save();
    }

    private async encontrarTurma(id: string): Promise<Class> {
        let turma;
        try {
            turma = await this.classModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar essa turma!')
        }
        return turma;
    }

    private async findClass(id: string): Promise<Class> {
        let class1;
        try {
            class1 = await this.classModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar essa Classe!')
        }
        return class1;
    }

    async getAllStudentInClass(id: string) {
        const class1 = await this.findClass(id);
        return {
            id: class1.id,
            className: class1.className,
            teacher: class1.teacherId,
            listStudent: class1.listStudent,
        };
    }
    async getAllTrailInClass(id: string) {
        const class1 = await this.findClass(id);
        return {
            id: class1.id,
            className: class1.className,
            teacher: class1.teacherId,
            listTrail: class1.listTrail
        };
    }

    async deletarTurma(id: string) {
        await this.classModel.deleteOne({_id: id}).exec();
    }

    async desvincularAlunoTurma(turmaId: string, userId) {
        const turma = await this.encontrarTurma(turmaId);
        const listaAlunos = turma.listStudent;
        const quantAlunos = listaAlunos.length;
        for (let i=0; i < quantAlunos; i++) {
            if (userId === listaAlunos[i]) {
                const removendoAluno = listaAlunos.indexOf(userId);
                listaAlunos.splice(removendoAluno, 1);
            }
        }
        turma.save();
    }
}