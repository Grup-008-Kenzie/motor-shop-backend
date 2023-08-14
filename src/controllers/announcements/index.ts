import { Request, Response } from "express";
import { listAnnouncementsService } from "../../services/announcements/listAnnouncement.service";
import { createAnnouncement } from "../../services/announcements/createAnnouncement.service";

export const createAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newAnnouncement = createAnnouncement(req.body, res);
  return res.status(201).json(newAnnouncement);
};

export const listAnnouncementsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { page, pageSize } = req.query;
  const defaultPageSize: number = 16;
  const actualPageSize: number = Number(pageSize) || defaultPageSize;
  const announcements = await listAnnouncementsService(
    Number(page),
    actualPageSize
  );
  return res.status(200).json(announcements);
};
