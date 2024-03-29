import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {ChapterController} from "./chapter.controller";
import {ChapterService} from "./chapter.service";
import {ChapterSchema} from "./chapter.model";
import {TrailSchema} from "../trail/trail.model";
import {TrailService} from "../trail/trail.service";
import {UserSchema} from "../user/user.model";
import {UserService} from "../user/user.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'Chapter', schema: ChapterSchema},
            { name: 'Trail', schema: TrailSchema},
            { name: 'User', schema: UserSchema}
        ])
    ],
    controllers: [ChapterController],
    providers: [ChapterService, TrailService, UserService],
    exports: [ChapterService],
})

export class ChapterModule {}