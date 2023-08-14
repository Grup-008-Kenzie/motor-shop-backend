import { Request, Response } from "express";
import { listAnnouncementsService } from "../../services/announcements/listAnnouncement.service";

export const listAnnouncementsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page, pageSize } = req.query
  const defaultPageSize: number = 16
  const actualPageSize: number = Number(pageSize) || defaultPageSize
  const announcements = await listAnnouncementsService(Number(page), actualPageSize)
  return res.json(announcements)
}