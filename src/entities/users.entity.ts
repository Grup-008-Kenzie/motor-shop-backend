import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Address } from "./addresses.entity";
import { Announcement } from "./announcements.entity";
import { Comment } from "./comments.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 90 })
  name: string;

  @Column({ type: "varchar", length: 125, unique: true })
  email: string;

  @Column({ type: "varchar", length: 11, unique: true })
  cpf: string;

  @Column({ type: "varchar", length: 11, unique: true })
  phone_number: string;

  @CreateDateColumn({ type: "varchar", length: 8 })
  birthdate: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "boolean", default: false })
  is_seller: boolean;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar", length: 120})
  password: string;

  @OneToOne(() => Address, (address) => address.user, { cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Announcement, (ann) => ann.seller, {
    nullable: true,
    cascade: true,
  })
  announcement: Announcement[];

  @OneToMany(() => Comment, (cmt) => cmt.user, {
    nullable: true,
    cascade: true,
  })
  comment: Comment;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);

    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
