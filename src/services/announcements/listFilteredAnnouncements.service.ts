import { AppError } from "../../errors/AppError";
import { announcementRepository } from "../../repositories";

export const listFilteredAnnouncementsService = async (
  filters: any,
  page: number,
  pageSize: number
) => {
  const queryBuilder =
    announcementRepository.createQueryBuilder("announcement");

  if (filters.brand) {
    queryBuilder.andWhere("announcement.brand = :brand", {
      brand: filters.brand,
    });
  }
  if (filters.model) {
    queryBuilder.andWhere("announcement.model = :model", {
      model: filters.model,
    });
  }
  if (filters.color) {
    queryBuilder.andWhere("announcement.color = :color", {
      color: filters.color,
    });
  }
  if (filters.year) {
    queryBuilder.andWhere("announcement.year = :year", { year: filters.year });
  }
  if (filters.type_fuel) {
    queryBuilder.andWhere("announcement.type_fuel = :type_fuel", {
      type_fuel: filters.type_fuel,
    });
  }
  if (filters.km) {
    queryBuilder.andWhere("announcement.km <= :km", { km: filters.km });
  }
  if (filters.price) {
    queryBuilder.andWhere("announcement.price <= :price", {
      price: filters.price,
    });
  }

  const filteredAnnouncements = await queryBuilder
    .leftJoinAndSelect("announcement.comments", "comments")
    .leftJoinAndSelect("announcement.seller", "seller")
    .orderBy("announcement.releaseDate", "DESC")
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getMany();

  if (!filteredAnnouncements.length) {
    throw new AppError("Announcements not found.", 404);
  }

  return filteredAnnouncements;
};
