import { Announcement } from "../../entities";
import { announcementRepository } from "../../repositories";

export const listSellerAnnouncements = async (
  sellerId: string
): Promise<Announcement[] | null> => {
  const sellerAnnouncements = await announcementRepository
    .createQueryBuilder("announcement")
    .leftJoinAndSelect("announcement.image", "image")
    .where("announcement.seller = :sellerId", { sellerId })
    .getMany();

  return sellerAnnouncements;
};
