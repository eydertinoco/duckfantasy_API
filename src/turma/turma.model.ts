import * as mongoose from "mongoose";
export const ClassSchema = new mongoose.Schema({
    className: { type: String, required: true },
    teacherId: { type: String, required: true },
    createdDate: { type: String, required: true},
    completionDate: { type: String, required: true },
    listTrail: { type: Array, required: false },
    listStudent: { type: Array, required: false }
});
export interface Class extends mongoose.Document{
    id: string;
    className: string;
    teacherId:  string;
    createdDate: string;
    completionDate: string;
    listTrail: [
        {
            trailId: string
        }
    ];
    listStudent: [
        {
            studentId: string
        }
    ];
}