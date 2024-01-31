import { AppDataSource } from "../data-source";
import { User } from "../model/User";
import bcrypt from "bcrypt"

export class UserController {

async createUser(nome: string, email: string, senha: string, cpf: number) {

    const userRepository = AppDataSource.getRepository(User);
    const user = new User();
    user.nome = nome;
    user.email = email;
    user.cpf = cpf;
    user.senha = await bcrypt.hash(senha, 10);

    return await userRepository.save(user);

}
}

//parei no vídeo 9:20