import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {TesteController} from "./teste.controller";
import {TesteService} from "./teste.service";
import {TesteSchema} from "./teste.model";
import {TrailSchema} from "../trail/trail.model";
import {TrailService} from "../trail/trail.service";
import {UserSchema} from "../user/user.model";
import {UserService} from "../user/user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Teste', schema: TesteSchema},
            { name: 'Trail', schema: TrailSchema},
            { name: 'User', schema: UserSchema}
        ])
    ],
    controllers: [TesteController],
    providers: [TesteService, TrailService, UserService],
    exports: [TesteService],
})

export class ChapterModule {}