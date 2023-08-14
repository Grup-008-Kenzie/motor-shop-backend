import { Router } from "express";
import {
  createAnnouncementController,
  listAnnouncementsController,
} from "../../controllers/announcements";

export const announcementRoutes: Router = Router();

announcementRoutes.post("", createAnnouncementController);
announcementRoutes.get("", listAnnouncementsController);
