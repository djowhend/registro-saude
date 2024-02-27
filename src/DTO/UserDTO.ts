import { User } from "../model/User";

export class UserDTO {

    constructor(
        public id: number,
        public nome: string,
        public sobrenome: string,
        public email: string,
        public senha: string,
        public cpf: string,
        public genero: string,
        public dataNascimento: string,
        public numTelefone: string,
        public numTelefoneEmergencia: string,
        public tipoSanguineo: string,
        public fotoPerfil: string,
    ) { }


    static fromModel(user: User): UserDTO {
        const userDTO = new UserDTO(
        user.id,
        user.nome,
        user.sobrenome,
        user.email,
        user.senha,
        user.cpf,
        user.genero,
        user.dataNascimento,
        user.numTelefone,
        user.numTelefoneEmergencia,
        user.tipoSanguineo,
        user.fotoPerfil
        );
        
        return userDTO;
    }

    toModel(): User {
        let newUser = new User();
        newUser.nome = this.nome;
        newUser.email = this.email;
        newUser.senha = this.senha;
        newUser.cpf = this.cpf;
        newUser.genero = this.genero;
        newUser.dataNascimento = this.dataNascimento;
        newUser.numTelefone = this.numTelefone;
        newUser.numTelefoneEmergencia = this.numTelefoneEmergencia,
        newUser.tipoSanguineo = this.tipoSanguineo
        newUser.fotoPerfil = this.fotoPerfil

        return newUser;

    }

}