import { User } from "../model/User";

export class UserDTO {

    constructor(
        public id: number,
        public nome: string,
        public email: string,
        public senha: string,
        // public cpf: string,
    ) { }


    static fromModel(user: User): UserDTO {
        const userDTO = new UserDTO(
        user.id,
        user.nome,
        user.email,
        user.senha
        // user.cpf
        );
        
        return userDTO;
    }

    toModel(): User {
        let newUser = new User();
        newUser.nome = this.nome;
        newUser.email = this.email;
        newUser.senha = this.senha;
        // newUser.cpf = this.cpf;
        return newUser;

    }

}