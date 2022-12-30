import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {UsuarioModule} from "./usuario/usuario.module";

@Module({
  imports: [
    UsuarioModule,
    MongooseModule.forRoot(
        'mongodb+srv://eyder:QPGbt4JrO396a8MN@cluster0.shl0ci5.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
0