import {IsEmail, IsNotEmpty, MinLength} from "class-validator";

export class NewUserDto{

    @IsEmail(null, {message: 'O email informado é inválido'})
    email: string;

    @MinLength(6, {message: 'Senha precisa ter pelo menos 6 caracteres'})
    password: string;

    @IsNotEmpty({message: 'O nome não pode ser vazio'})
    name: string;
}