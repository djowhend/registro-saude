import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm"
import { Vacina } from "./Vacina"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;
    
    @Column({nullable: true})
    cpf: string;

    @Column({nullable: true})
    genero: string;

    @Column({nullable: true})
    dataNascimento: string;

    @Column({nullable: true})
    numTelefone: string;

    @Column({nullable: true})
    numTelefoneEmergencia: string;

    @Column({nullable: true})
    tipoSanguineo: string;

    @Column({nullable: true})
    alergia: string;

    @OneToMany(() => Vacina, vacina => vacina.user)
    vacinas: Vacina[];
}
