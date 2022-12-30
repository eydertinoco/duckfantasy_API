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
        return result.id;
    }

    async getUser() {
        return this.usuarios;
    }
}