import { Repository } from "typeorm";
import { Announcement } from "../../entities"
import { AppDataSource } from "../../data-source";

export const listAnnouncementsService = async (): Promise<Announcement[] > => {
  const announcementRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement)

  const announcements: Announcement[] = await announcementRepository
    .createQueryBuilder('anns')
    .getMany()

  return announcements
}