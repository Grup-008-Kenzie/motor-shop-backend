import { Repository } from "typeorm";
import { Announcement } from "../../entities"
import { AppDataSource } from "../../data-source";

export const deleteAnnouncementService = async (id: string): Promise<string> => {
    const announcementRepository: Repository<Announcement> = AppDataSource.getRepository(Announcement)
    const announcement: Announcement = await announcementRepository.findOneByOrFail({ id: id })
    await announcementRepository.softRemove(announcement)
    return "Announcement deleted successfully."
}