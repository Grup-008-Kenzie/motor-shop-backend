import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcements.entity";

@Entity("cars")
 export class Car {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type:"varchar", length: 20})
    brand: string

    @Column({type:"varchar", length:20})
    model: string

    @OneToMany(() => Announcement, (announcements) => announcements.car, { nullable: true })
    annoucements: Announcement[];
}