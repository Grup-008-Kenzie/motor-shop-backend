import { Response, Request } from "express"; import { RetrieveAnnouncementService, UpdateAnnouncementService, DeleteAnnouncementService } from "../../services/announcements";
import { createAnnouncement } from "../../services/announcements/createAnnouncement.service";
import { listAnnouncementsService } from "../../services/announcements/listAnnouncement.service";


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


const RetrieveAnnouncementController = async (req: Request, res: Response) => {
  const announcementId: string = (req.params.id);
  const announcement = await RetrieveAnnouncementService(announcementId);
  return res.status(200).json(announcement);
};

const UpdateAnnouncementController = async (req: Request, res: Response) => {
  const announcementId: string = (req.params.id);
  const updatedannouncement = await UpdateAnnouncementService(req.body, announcementId);
  return res.status(200).json(updatedannouncement);
};

const DeleteAnnouncementController = async (req: Request, res: Response) => {
  const announcementId: string = (req.params.id);
  const result = await DeleteAnnouncementService(announcementId);
  return res.status(200).json(result);
};

export {
    DeleteAnnouncementController, UpdateAnnouncementController, RetrieveAnnouncementController, 
}


