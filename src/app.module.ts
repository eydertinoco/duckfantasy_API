import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
        'mongodb+srv://eyder:QPGbt4JrO396a8MN@cluster0.shl0ci5.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
0