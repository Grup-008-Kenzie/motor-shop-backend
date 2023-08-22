import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 8 })
  cep: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @Column({ type: "varchar", length: 30 })
  city: string;

  @Column({ type: "varchar", length: 10 })
  street: string;

  @Column({ type: "varchar", length: 10 })
  number: string;

  @Column({ type: "varchar", length: 50 })
  complement: string;

  @OneToOne(() => User, (user) => user.address)
  user: User;
}
