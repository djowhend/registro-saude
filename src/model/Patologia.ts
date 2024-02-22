import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Patologia {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nomePatologia: string;

    @Column()
    userId: number;


}
