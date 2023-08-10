import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { User } from "./users.entity";


@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 2 })
    state: string

    @Column({ type: "varchar", length: 30 })
    city: string

    @Column({ type: "varchar", length: 50 })
    street: string

    @Column({ type: "varchar", length: 30, nullable: true })
    complement: string

    @Column({ type: "boolean" })
    accountType: boolean

    @Column({ type: "varchar", length: 50 })
    password: string

    @OneToOne(() => User, (user) => user.address)
    user: User

    @BeforeInsert()
    @BeforeUpdate()
    transformPasswordHash() {
        if (!this.password.startsWith("$2a$10$")) {
            this.password = hashSync(this.password, 10);
 
        }
        }
    }
