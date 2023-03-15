import { Module } from '@nestjs/common';
import {UserModule} from "../user/user.module";
import {AuthService} from "./auth.service";
import {LocalStrategy} from "./local.strategy";
import {AuthController} from "./auth.controller";
import {JwtStrategy} from "./jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {jwtConstants} from "./constants";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '3000s'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}