import { Request, Response } from "express";
import { listAnnouncementsService } from "../../services/announcements/listAnnouncement.service";

export const listAnnouncementsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const announcements = await listAnnouncementsService()
  return res.json(announcements)
}