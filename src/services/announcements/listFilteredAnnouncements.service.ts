import { announcementRepository } from "../../repositories";

export const listFilteredAnnouncementsService = async (
  filters: any,
  page: number,
  pageSize: number
) => {
  const queryBuilder =
    announcementRepository.createQueryBuilder("announcement");

  if (filters.brand) {
    queryBuilder.andWhere("car.brand = :brand", { brand: filters.brand });
  }
  if (filters.model) {
    queryBuilder.andWhere("car.model = :model", { model: filters.model });
  }
  if (filters.color) {
    queryBuilder.andWhere("car.color = :color", { color: filters.color });
  }
  if (filters.year) {
    queryBuilder.andWhere("car.year = :year", { year: filters.year });
  }
  if (filters.type_fuel) {
    queryBuilder.andWhere("car.type_fuel = :type_fuel", {
      type_fuel: filters.type_fuel,
    });
  }
  if (filters.km) {
    queryBuilder.andWhere("car.km <= :km", { km: filters.km });
  }
  if (filters.price) {
    queryBuilder.andWhere("announcement.price <= :price", {
      price: filters.price,
    });
  }

  const filteredAnnouncements = await queryBuilder
    .leftJoinAndSelect("announcement.car", "car")
    .leftJoinAndSelect("announcement.comments", "comments")
    .leftJoinAndSelect("announcement.seller", "seller")
    .orderBy("announcement.car", "ASC")
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .getMany();

  return filteredAnnouncements;
};
