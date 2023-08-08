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

    @Column({type:"varchar", length:255})
    front_image: string

    @Column({type:"varchar", length:255})
    first_image: string

    @OneToMany(() => Announcement, (announcements) => announcements.carId, { nullable: true })
    annoucements: Announcement[];
}