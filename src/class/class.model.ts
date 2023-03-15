import * as mongoose from "mongoose";
export const ClassSchema = new mongoose.Schema({
    className: { type: String, required: true },
    teacherName: { type: String, required: true },
    completionDate: { type: String, required: true },
    listTrail: { type: String, required: false },
    listStudent: { type: String, required: false }
});
export interface Class extends mongoose.Document{
    id: string;
    className: string;
    teacherName: string;
    completionDate: string;
    listTrail: [];
    listStudent: [];
}