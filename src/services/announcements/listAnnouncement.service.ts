import { Repository } from "typeorm";
import { Announcement } from "../../entities"
import { AppDataSource } from "../../data-source";

export const listAnnouncementsService = async (): Promise<Announcement[]> => {
  const announcementRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement)

  const announcements: Announcement[] = await announcementRepository
  .createQueryBuilder('anns')
  .orderBy('anns.car', 'ASC')
  .skip(0)
  .take(16)
  .getMany()

  return announcements
}