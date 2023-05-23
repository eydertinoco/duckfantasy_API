import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards, Request} from "@nestjs/common";
import {TesteService} from "./teste.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/teste')
export class TesteController {
    constructor(
        private readonly testeService: TesteService,
        ) {}

}