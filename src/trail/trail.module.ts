import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import {TrailController} from "./trail.controller";
import {TrailService} from "./trail.service";
import {TrailSchema} from "./trail.model";
import {UserSchema} from "../user/user.model";
import {UserService} from "../user/user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Trail', schema: TrailSchema},
            { name: 'User', schema: UserSchema}
        ])
    ],
    controllers: [TrailController],
    providers: [TrailService, UserService],
    exports: [TrailService],
})

export class TrailModule {}