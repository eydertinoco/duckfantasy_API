import * as mongoose from "mongoose";
export const UsuarioSchema = new mongoose.Schema({
    user: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});
export interface Usuario extends mongoose.Document{
   id: string;
   user: string;
   password: string;
   email: string;
   firstName: string;
   lastName: string;
}