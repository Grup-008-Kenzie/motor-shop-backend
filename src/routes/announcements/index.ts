import { Router } from "express";
import { listAnnouncementsController } from "../../controllers/announcements/listAnnouncement.controllers";

export const announcementRoutes: Router = Router()

announcementRoutes.get("", listAnnouncementsController)