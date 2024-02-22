import { AppDataSource } from "../data-source";
import { User } from "../model/User";
import { UserDTO } from "../DTO/UserDTO";
import bcrypt from "bcrypt"

export class UserController {

    async createUser(nome: string,
        email: string,
        senha: string,
        cpf: string,
        genero: string,
        dataNascimento: string,
        numTelefone: string,
        numTelefoneEmergencia: string,
        tipoSanguineo: string,
        alergia: string) {

        const userRepository = AppDataSource.getRepository(User);
        const userExists = await userRepository.existsBy({
            email,
        });

        if (userExists) {
            throw new Error("Email já está cadastrado");
        }
        const user = new User();
        user.nome = nome;
        user.email = email;
        user.senha = await bcrypt.hash(senha, 10);
        user.cpf = cpf;
        user.genero = genero;
        user.dataNascimento = dataNascimento;
        user.numTelefone = numTelefone;
        user.numTelefoneEmergencia = numTelefoneEmergencia;
        user.tipoSanguineo = tipoSanguineo;
        user.alergia = alergia;

        return await userRepository.save(user);

    }

    async getUsers() {
        const userRepository = AppDataSource.getRepository(User);
        const userList = await userRepository.find()
        return userList.map((user: User) => UserDTO.fromModel(user));

    }

}

