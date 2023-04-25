import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { User } from "./user.model";
export interface userType {
    id: string;
    email: string;
    name: string;
    password: string;
    office: string;
}

@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(
        @InjectModel('User') private readonly userModel:
            Model<User>
    ) {}

    async createUser(email: string, password: string, name: string, office: string) {
        const newUser = new this.userModel({
            email: email,
            password: password,
            name: name,
            office: office
        });
        const result = await newUser.save();
        return result.id as string;
    }

    async getAll() {
        const users = await this.userModel.find().exec();
        return users.map((user) => ({
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            office: user.office
        }));
    }

    async getById(id: string): Promise<userType> {
        const user = await this.findUser(id);
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            office: user.office
        };
    }

    async getByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email }).exec();
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            office: user.office
        };
    }

    async getAllStudent() {
        const user = await this.userModel.findOne({ office: 'Estudante' }).exec();
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            office: user.office
        };
    }

    async updateUser(id: string, email: string, password: string, name: string, office: string) {
        const updatedUser = await this.findUser(id);
        if(email) {updatedUser.email = email;}
        if(password) {updatedUser.password = password;}
        if(name) {updatedUser.name = name;}
        if(office) {updatedUser.office = office;}
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