import * as mongoose from "mongoose";
export const TrailSchema = new mongoose.Schema({
    trailName: { type: String, required: true },
    trailDescription: { type: String, required: true },
    teacherName: { type: String, required: true },
    listChapter: { type: String, required: false },
});
export interface Trail extends mongoose.Document{
    id: string;
    trailName: string;
    trailDescription: string;
    teacherName: string;
    listChapter: [];
}