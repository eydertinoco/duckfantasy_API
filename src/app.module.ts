import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { UserModule } from "./user/user.module";
import { TurmaModule } from "./turma/turma.module";
import { AuthModule } from './auth/auth.module';
import { TrailModule } from "./trail/trail.module";
import { ChapterModule } from "./chapter/chapter.module";
import { TesteModule } from "./teste/teste.module";

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

@Module({
  imports: [
    MongooseModule.forRoot(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.shl0ci5.mongodb.net/nestjs-demo?retryWrites=true&w=majority`
    ),
    UserModule,
    TurmaModule,
    TrailModule,
    ChapterModule,
    TesteModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}