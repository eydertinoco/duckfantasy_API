import {Injectable, NotFoundException} from "@nestjs/common";
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
        return usuarios.map((user) => ({
            id: user.id,
            user: user.user,
            password: user.password,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }));
    }

    async getSingleUser(userId: string) {
        const user = await this.findUser(userId);
        return user;
    }

    async deleteUser(userId: string) {
        const user = await this.findUser(userId)[1];
        this.usuarios.splice(user, 1);
    }

    private async findUser(id: string): Promise<Usuario> {
        let user;
        try {
            user = await this.usuarioModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Não é possivel encontrar esse usuário!')
      }
      return {
          id: user.id,
          user: user.user,
          password: user.password,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
      };
    }
}