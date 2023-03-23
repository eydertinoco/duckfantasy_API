import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards} from "@nestjs/common";
import {ClassService} from "./class.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/class')
export class ClassController {
    constructor(private readonly classService: ClassService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createUser(
        @Body('className') className: string,
        @Body('completionDate') completionDate: string,
    ){
        const generatedId = await this.classService.createClass(
            className,
            completionDate
        );
        return { id: generatedId, status: 'Classe Cadastrada'};
    }

    @Get()
    async getAllMyClass() {
        const classes = await this.classService.getAllMyClass();
        return classes;
    }

}