import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class user {
    @PrimaryGeneratedColumn()
    id!: number

    @Column('text')
    email!: string

    @Column('text')
    password!: string
}