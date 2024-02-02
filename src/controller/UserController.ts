import { AppDataSource } from "../data-source";
import { User } from "../model/User";
import { UserDTO } from "../dto/UserDTO";
import bcrypt from "bcrypt"

export class UserController {

async createUser(nome: string, email: string, senha: string, cpf: string) {

    const userRepository = AppDataSource.getRepository(User);
    const user = new User();
    user.nome = nome;
    user.email = email;
    user.senha = await bcrypt.hash(senha, 10);
    user.cpf = cpf;

    return await userRepository.save(user);

}

async getUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const userList = await userRepository.find()
    return userList.map((user: User) => UserDTO.fromModel(user));

}

}

//parei no vídeo 9:20