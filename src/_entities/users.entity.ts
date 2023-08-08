import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Address } from "./adresses.entity";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 50 })
    email: string

    @Column({ type: "varchar", length: 50 })
    password: string

    @Column({ type: "varchar", length: 30 })
    name: string

    @Column({ type: "varchar", length: 30 })
    cpf: string

    @Column({ type: "varchar", length: 11 })
    telephone: number

    @Column({ type: 'varchar', length: 8, nullable: true })
    birthDate: number

    @Column({ type: 'varchar', length: 200, nullable: true })
    description: string

    @OneToOne(() => Address, (address) => address.user)
    address: Address


    @BeforeInsert()
    @BeforeUpdate()
    transformPasswordHash() {
        if (!this.password.startsWith("$2a$10$")) {
            this.password = hashSync(this.password, 10);

        }
    }
}