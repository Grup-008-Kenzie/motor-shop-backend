import { Announcement } from "../../entities";
import { announcementRepository } from "../../repositories";

export const listAnnouncementsService = async (
  page: number,
  pageSize: number
): Promise<Announcement[]> => {
  const announcements: Announcement[] = await announcementRepository
    .createQueryBuilder("anns")
    .leftJoinAndSelect("anns.seller", "seller")
    .leftJoinAndSelect("anns.car", "car")
    .leftJoinAndSelect("anns.comments", "comments")
    .orderBy("anns.car", "ASC")
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getMany();

  return announcements;
};
