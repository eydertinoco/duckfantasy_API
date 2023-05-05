import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Class } from "./turma.model";
import {UserService} from "../user/user.service";

import {userType} from "../user/user.service";
import {NewTurmaDto} from "./dto/NewTurma.dto";


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

    async getTodasMinhasTurmas(userId) {
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
}