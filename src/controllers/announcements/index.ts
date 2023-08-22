import { Response, Request } from "express";
import { createAnnouncement } from "../../services/announcements/createAnnouncement.service";
import { listAnnouncementsService } from "../../services/announcements/listAnnouncement.service";
import { deleteAnnouncementService } from "../../services/announcements/deleteAnnouncement.service";
import { updateAnnouncementService } from "../../services/announcements/updateAnnouncement.service";
import { listSellerAnnouncements } from "../../services/announcements/listSellerAnnouncements.service";

export const createAnnouncementController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newAnnouncement = await createAnnouncement(req.body, res);
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

export const listSellerAnnouncementsController = async (req: Request, res: Response) => {
  const sellerId: string = (req.params.id);
  const announcement = await listSellerAnnouncements(sellerId);
  return res.status(200).json(announcement);
};

export const updateAnnouncementController = async (req: Request, res: Response) => {
  const announcementId: string = (req.params.id);
  const updatedannouncement = await updateAnnouncementService(req.body, announcementId, res);
  return res.status(200).json(updatedannouncement);
};

export const DeleteAnnouncementController = async (req: Request, res: Response) => {
  const announcementId: string = (req.params.id);
  const result = await deleteAnnouncementService(announcementId);
  return res.status(200).json(result);
};

