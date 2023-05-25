import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {TesteController} from "./teste.controller";
import {TesteService} from "./teste.service";
import {TesteSchema} from "./teste.model";
import {ChapterSchema} from "../chapter/chapter.model";
import {UserSchema} from "../user/user.model";
import {UserService} from "../user/user.service";
import {TrailSchema} from "../trail/trail.model";
import {TrailService} from "../trail/trail.service";
import {ChapterService} from "../chapter/chapter.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Teste', schema: TesteSchema},
            {name: 'Chapter', schema: ChapterSchema},
            {name: 'User', schema: UserSchema},
            {name: 'Trail', schema: TrailSchema}
        ])
    ],
    controllers: [TesteController],
    providers: [TesteService, ChapterService, UserService, TrailService],
    exports: [TesteService],
})

export class TesteModule {}