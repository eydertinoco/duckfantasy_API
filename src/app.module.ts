import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { UserModule } from "./user/user.module";

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.shl0ci5.mongodb.net/nestjs-demo?retryWrites=true&w=majority`
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}