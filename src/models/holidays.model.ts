import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Holidays')
export class Holidays {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', type: 'varchar'})
    name: string;

    @Column({name: 'score', type: 'double precision'})
    score: number;
}