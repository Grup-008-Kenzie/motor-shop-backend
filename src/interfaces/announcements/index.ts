import { z } from "zod"
import { DeepPartial } from "typeorm"
import {
  announcementSchema, 
  announcementSchemaRequest, 
  updatedAnnouncementSchema} from "../../schemas/announcements/index"

  export type TAnnouncement = z.infer<typeof announcementSchema>
  export type TAnnouncementRequest = z.infer<typeof announcementSchemaRequest>
  export type TAnnouncementUpdateRequest = z.infer<typeof updatedAnnouncementSchema>