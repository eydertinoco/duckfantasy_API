import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Class } from "./turma.model";
import {UserService} from "../user/user.service";

import {userType} from "../user/user.service";


@Injectable()
export class TurmaService {
    private classes: Class[] = [];

    constructor(
        @InjectModel('Class')
        private readonly classModel: Model<Class>,
        private readonly userService: UserService
    ) {}

    async createClass(className: string, completionDate: string) {

        const teacher = await this.userService.getById('640719f790d02f665e6f6edf');

        const newClass = new this.classModel({
            className: className,
            teacherId: teacher.id,
            createdDate: new Date().toString().replace(/T/, ':').replace(/\.\w*/, ''),
            completionDate: completionDate,
            listTrail: [],
            listStudent: [],
        });
        const result = await newClass.save();
        return result.id as string;
    }

    async myTeacherInfo(teacherId) {
        const getTeacher = await this.userService.getById('teacherId');
        return getTeacher.name;
    }

    async getAllClass() {
        const myClasses = await this.classModel.find().exec();

        return myClasses.map((myClass) => ({
            id: myClass.id,
            className: myClass.className,
            teacherId: myClass.teacherId,
            createdDate: myClass.createdDate,
            completionDate: myClass.completionDate,
            listTrail: myClass.listTrail,
            listStudent: myClass.listStudent,
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

    async deleteTurma(id: string) {
        await this.classModel.deleteOne({_id: id}).exec();
    }
}