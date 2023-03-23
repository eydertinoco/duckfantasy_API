import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {ClassController} from "./class.controller";
import {ClassService} from "./class.service";
import {ClassSchema} from "./class.model";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Class', schema: ClassSchema}])
    ],
    controllers: [ClassController],
    providers: [ClassService],
    exports: [ClassService],
})

export class ClassModule {}