import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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

}
