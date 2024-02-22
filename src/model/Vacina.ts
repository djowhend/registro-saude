import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Vacina {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeVacina: string;

    @Column()
    loteVacina: string;

    @Column()
    dataVacinacao: string;

    @Column()
    validadeVacina: string;

    @Column()
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "userId"})
    user: User;

}
