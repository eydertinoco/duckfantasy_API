import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {TurmaController} from "./turma.controller";
import {TurmaService} from "./turma.service";
import {ClassSchema} from "./turma.model";
import {UserSchema} from "../user/user.model";
import {UserService} from "../user/user.service";
import {UserController} from "../user/user.controller";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Class', schema: ClassSchema},
            { name: 'User', schema: UserSchema}
        ])
    ],
    controllers: [TurmaController],
    providers: [TurmaService, UserService],
    exports: [TurmaService],
})

export class TurmaModule {}