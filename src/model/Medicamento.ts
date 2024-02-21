import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Medicamento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomeMedicamento: string;

    @Column()
    inicioTratamento: string;

    @Column()
    terminoTratamento: string;

    @Column({nullable: true})
    intervaloTempo: string;

    // @ManyToOne(() => User, user => user.medicamentos)
    // user: User;

}
