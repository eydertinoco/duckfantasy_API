import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { UserController } from "../user/user.controller";
import { Class } from "./class.model";
import {User} from "../user/user.model";


@Injectable()
export class ClassService {
    private classes: Class[] = [];

    constructor(
        @InjectModel('Class') private readonly classModel: Model<Class>
    ) {}

    async createClass(className: string, completionDate: string) {

        const newClass = new this.classModel({
            className: className,
            teacher: [['213', 'Roberta']],
            completionDate: completionDate,
            listTrail: [['Aula 1'], ['Aula 2']],
            listStudent: [['1','Eyder'], ['2','Eyder 2']],
        });
        const result = await newClass.save();
        return result.id as string;
    }

    async getAllClass() {
        const myClasses = await this.classModel.find().exec();
        return myClasses.map((myClass) => ({
            id: myClass.id,
            className: myClass.className,
            teacher: myClass.teacher,
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
            teacher: class1.teacher,
            listStudent: class1.listStudent,
        };
    }
    async getAllTrailInClass(id: string) {
        const class1 = await this.findClass(id);
        return {
            id: class1.id,
            className: class1.className,
            teacher: class1.teacher,
            listTrail: class1.listTrail
        };
    }
}