import { AppDataSource } from "../data-source";
import { User } from "../model/User";
import { UserDTO } from "../DTO/UserDTO";
import bcrypt from "bcrypt"

export class UserController {

    async createUser(nome: string,
        sobrenome: string,
        email: string,
        senha: string,
        cpf: string,
        genero: string,
        dataNascimento: string,
        numTelefone: string,
        numTelefoneEmergencia: string,
        tipoSanguineo: string
        ) {

        const userRepository = AppDataSource.getRepository(User);
        const userExists = await userRepository.existsBy({
            email,
        });

        if (userExists) {
            throw new Error("Email já está cadastrado");
        }
        const user = new User();
        user.nome = nome;
        user.sobrenome = sobrenome;
        user.email = email;
        user.senha = await bcrypt.hash(senha, 10);
        user.cpf = cpf;
        user.genero = genero;
        user.dataNascimento = dataNascimento;
        user.numTelefone = numTelefone;
        user.numTelefoneEmergencia = numTelefoneEmergencia;
        user.tipoSanguineo = tipoSanguineo;
        

        return await userRepository.save(user);

        
    }

    async getUsers() {
        const userRepository = AppDataSource.getRepository(User);
        const userList = await userRepository.find()
        return userList.map((user: User) => UserDTO.fromModel(user));
    }

    async getUserId(id: number) {
        const userRepository = AppDataSource.getRepository(User);
        const userList = await userRepository.findOneBy({id})
        return userList;
    }

    async updateUser(
        id: number, 
        nome: string,
        sobrenome: string,
        email: string,
        senha: string,
        cpf: string,
        genero: string,
        dataNascimento: string,
        numTelefone: string,
        numTelefoneEmergencia: string,
        tipoSanguineo: string
        ){
        const userRepository = AppDataSource.getRepository(User);
        const userExists = await userRepository.findOneBy({
            id,
        });

        if (!userExists) {
            throw new Error("Erro ao buscar user para update");
        }

        return await userRepository.update(
            id,
            {
                nome,
                sobrenome,
                email,
                senha,
                cpf,
                genero,
                dataNascimento,
                numTelefone,
                numTelefoneEmergencia,
                tipoSanguineo
            }
        );
    }

}



