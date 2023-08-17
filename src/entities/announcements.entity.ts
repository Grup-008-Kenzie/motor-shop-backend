import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {Car} from "./cars.entity"
import { CarImage } from "./carsImages.entity";
import { User } from "./users.entity";

@Entity("announcements")
export class Announcement {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({type:"varchar", length:4})
    year: string

    @Column({type:"varchar", length:10})
    fuel_type: string

    @Column({type:"varchar", length:6})
    kilometer: string

    @Column({type:"varchar", length:30})
    color: string

    @Column({type:"varchar", length:10})
    fipe_price: string

    @Column({type:"varchar", length:10})
    price: string

    @Column({type:"varchar", length: 100})
    description: string

    @ManyToOne(() => Car)
    car: Car;

    @OneToOne(() => CarImage, carImage => carImage.announcement)
    @JoinColumn()
    image: CarImage;

    @ManyToOne(() => User, seller => seller.announcement)
    seller: User;
}