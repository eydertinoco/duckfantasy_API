import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Class } from "./class.model";


@Injectable()
export class ClassService {
    private classes: Class[] = [];

    constructor(
        @InjectModel('Class') private readonly classModel:
            Model<Class>
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

    async getAllMyClass() {
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
}