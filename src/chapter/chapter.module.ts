import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {ChapterController} from "./chapter.controller";
import {ChapterService} from "./chapter.service";
import {ChapterSchema} from "./chapter.model";
import {TrailSchema} from "../trail/trail.model";
import {TrailService} from "../trail/trail.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Chapter', schema: ChapterSchema},
            { name: 'Trail', schema: TrailSchema}
        ])
    ],
    controllers: [ChapterController],
    providers: [ChapterService, TrailService],
    exports: [ChapterService],
})

export class ChapterModule {}