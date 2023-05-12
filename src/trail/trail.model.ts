import * as mongoose from "mongoose";
export const TrailSchema = new mongoose.Schema({
    trailName: { type: String, required: true },
    trailDescription: { type: String, required: true },
    teacherId: { type: String, required: true },
    listChapter: { type: Array, required: false },
});
export interface Trail extends mongoose.Document{
    id: string;
    trailName: string;
    trailDescription: string;
    teacherId: string;
    listChapter: [
        {
            chapterId: string
        }
    ];
}