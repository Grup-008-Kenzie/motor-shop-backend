import { Repository } from "typeorm";
import { Announcement } from "../../entities"
import { AppDataSource } from "../../data-source";

export const listAnnouncementsService = async (page: number, pageSize: number): Promise<Announcement[]> => {
  const announcementRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement)

  const announcements: Announcement[] = await announcementRepository
  .createQueryBuilder('anns')
  .leftJoinAndSelect('anns.seller', 'seller')
  .orderBy('anns.car', 'ASC')
  .skip((page - 1) * pageSize)
  .take(pageSize)
  .getMany()


  return announcements
}