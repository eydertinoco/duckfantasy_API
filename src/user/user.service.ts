import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { User } from "./user.model";


@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(
        @InjectModel('User') private readonly userModel:
            Model<User>
    ) {}

    async createUser(email: string, password: string, name: string) {
        const newUser = new this.userModel({
            email: email,
            password: password,
            name: name
        });
        const result = await newUser.save();
        console.log(result);
        return result.id as string;
    }

    async getUser() {
        const users = await this.userModel.find().exec();
        return users.map((user) => ({
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name
        }));
    }

    async getSingleUser(id: string) {
        const user = await this.findUser(id);
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name
        };
    }

    async updateUser(id: string, email: string, password: string, name: string) {
        const updatedUser = await this.findUser(id);
        if(email) {updatedUser.email = email;}
        if(password) {updatedUser.password = password;}
        if(name) {updatedUser.name = name;}
        updatedUser.save();
    }

    async deleteUser(id: string) {
        await this.userModel.deleteOne({_id: id}).exec();
    }

    private async findUser(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar esse usuário!')
      }
      return user;
    }
}