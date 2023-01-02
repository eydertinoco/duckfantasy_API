import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

import { Usuario } from "./usuario.model";


@Injectable()
export class UsuarioRepository {
    private usuarios: Usuario[] = [];

    constructor(
        @InjectModel('Usuario') private readonly usuarioModel:
            Model<Usuario>
    ) {}

    async createUser(user: string, password: string, email: string, firstName: string, lastName: string) {
        const newUser = new this.usuarioModel({
            user: user,
            password: password,
            email: email,
            firstName: firstName,
            lastName: lastName
        });
        const result = await newUser.save();
        console.log(result);
        return result.id as string;
    }

    async getUser() {
        const usuarios = await this.usuarioModel.find().exec();
        return usuarios as Usuario[];
    }

    getSingleUser(userId: string) {
        // const user = this.findUser(userId) [0];
        // return {...user};
    }
}