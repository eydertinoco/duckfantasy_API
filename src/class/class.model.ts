import * as mongoose from "mongoose";
export const ClassSchema = new mongoose.Schema({
    className: { type: String, required: true },
    teacherName: { type: Array, required: true },
    completionDate: { type: String, required: true },
    listTrail: { type: Array, required: false },
    listStudent: { type: Array, required: false }
});
export interface Class extends mongoose.Document{
    id: string;
    className: string;
    teacher: [
        {
            teacherId: string;
            teacherName: string,
        }
    ];
    completionDate: string;
    listTrail: [
        {
            trailId: string;
            trailName: string,
        }
    ];
    listStudent: [
        {
            studentId: string,
            studentName: string,
        }
    ];
}