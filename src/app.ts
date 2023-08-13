import "reflect-metadata"
import "express-async-errors"
import express, {Application} from "express"
import { handleErros } from "./errors/errorHandler"
import { announcementRoutes } from "./routes/announcements/index"

export const app: Application = express()

app.use(express.json())
app.use("/announcements", announcementRoutes)
app.use(handleErros)