import * as mongoose from "mongoose";
export const TesteSchema = new mongoose.Schema({
    testeQuestion: { type: String, required: true },
    testeValue: { type: Boolean, required: true },
    chapterId: { type: String, required: true },
    notaQuestion: { type: Array, required: false},
});
export interface Teste extends mongoose.Document{
    id: string;
    testeQuestion: string;
    testeValue: boolean;
    chapterId: string;
    notaQuestion: [
        {
            alunoId: string;
            nota: boolean;
        }
    ]
}