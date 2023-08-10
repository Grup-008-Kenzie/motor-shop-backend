import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcements.entity";

@Entity("cars_images")
 export class CarImage {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type:"varchar", length: 255})
    front_image: string

    @Column({type:"varchar", length:255})
    first_image: string

    @Column({type:"varchar", length:255})
    second_image: string

    @OneToOne(() => Announcement, ann => ann.image)
    announcement: Announcement;
}