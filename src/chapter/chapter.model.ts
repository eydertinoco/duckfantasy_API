import * as mongoose from "mongoose";
export const ChapterSchema = new mongoose.Schema({
    chapterTitle: { type: String, required: true },
    chapterText: { type: String, required: true },
    teacherName: { type: String, required: true },
    chapterRef: { type: String, required: false },
});
export interface Chapter extends mongoose.Document{
    id: string;
    chapterTitle: string;
    chapterText: string;
    teacherName: string;
    chapterRef: string;
}