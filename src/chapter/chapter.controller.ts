import {Body, Controller, Get, Post, Param, Patch, Delete, UseGuards} from "@nestjs/common";
import {ChapterService} from "./chapter.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('/trail/:id/chapter')
export class ChapterController {
    constructor(private readonly chapterService: ChapterService) {}




}