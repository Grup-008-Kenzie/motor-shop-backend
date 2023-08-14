import { Router } from "express";
import { announcement } from "../../middlewares/announcements";
import { CreateAnnouncementController, GetAnnouncementsController, RetrieveAnnouncementController, UpdateAnnouncementController, DeleteAnnouncementController } from "../../controllers/announcements";

const announcementRoutes = Router()

announcementRoutes.post("", CreateAnnouncementController)
announcementRoutes.get("", GetAnnouncementsController)
announcementRoutes.get("/:id", announcement, RetrieveAnnouncementController)
announcementRoutes.patch("/:id", announcement, UpdateAnnouncementController)
announcementRoutes.delete("/:id", announcement, DeleteAnnouncementController)

