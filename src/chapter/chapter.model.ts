import * as mongoose from "mongoose";
export const ChapterSchema = new mongoose.Schema({
    chapterTitle: { type: String, required: true },
    chapterText: { type: String, required: true },
    trialId: { type: String, required: true },
    chapterRef: { type: String, required: false },
    notaAlunos: { type: Array, required: false},
});
export interface Chapter extends mongoose.Document{
    id: string;
    chapterTitle: string;
    chapterText: string;
    trialId: string;
    chapterRef: string;
    notaAlunos: [
        {
            alunoId: string;
            nota: boolean;
            texto: string;
        }
    ]
}