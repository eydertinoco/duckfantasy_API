import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Trail } from "./trail.model";
import {UserService} from "../user/user.service";

@Injectable()
export class TrailService {
    private trails: Trail[] = [];

    constructor(
        @InjectModel('Trail')
        private readonly trailModel: Model<Trail>,
        private readonly userService: UserService
    ) {}

    async createTrail(trailName: string, trailDescription: string) {

        const teacher = await this.userService.getById('640719f790d02f665e6f6edf');

        const newTrail = new this.trailModel({
            trailName: trailName,
            trailDescription: trailDescription,
            teacherId: teacher.id,
        });
        const result = await newTrail.save();
        return result.id as string;
    }

    async getAllTrail() {
        const myTrails = await this.trailModel.find().exec();

        return myTrails.map((myTrail) => ({
            id: myTrail.id,
            trailName: myTrail.trailName,
            trailDescription: myTrail.trailDescription,
            teacherId: myTrail.teacherId,
            listChapter: myTrail.listChapter
        }));
    }

    async deleteTrial(id: string) {
        await this.trailModel.deleteOne({_id: id}).exec();
    }
}