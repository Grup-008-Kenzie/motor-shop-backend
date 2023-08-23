import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcements.entity";
import { User } from "./users.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  releaseDate: Date;

  @ManyToOne(() => Announcement)
  announcement: Announcement;

  @ManyToOne(() => User)
  user: User;
}
