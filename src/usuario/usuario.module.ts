import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {UsuarioController} from "./usuario.controller";
import {UsuarioRepository} from "./usuario.repository";
import {UsuarioSchema} from "./usuario.model";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioSchema}])
    ],
    controllers: [UsuarioController],
    providers: [UsuarioRepository],
})

export class UsuarioModule {}