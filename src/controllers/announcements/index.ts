import { Response, Request } from "express";

const CreateAnnouncementController = async (req: Request, res: Response) => {
    const newAnnouncement = await CreateannouncementService(req.body);
    return res.status(201).json(newAnnouncement);
};

const GetAnnouncementsController = async (req: Request, res: Response) => {
    const announcements = await GetAnnouncementsService();
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
    CreateAnnouncementController,DeleteAnnouncementController,GetAnnouncementsController,UpdateAnnouncementController, RetrieveAnnouncementController, 
 }