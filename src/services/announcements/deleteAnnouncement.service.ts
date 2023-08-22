import { Announcement } from "../../entities"
import { announcementRepository } from "../../repositories";

export const deleteAnnouncementService = async (id: string): Promise<string> => {
    const announcement: Announcement = await announcementRepository.findOneByOrFail({ id: id })
    await announcementRepository.remove(announcement)
    return "Announcement deleted successfully."
}