import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleErros } from "./errors/errorHandler";
import { announcementRoutes } from "./routes/announcements/index";
import { carsRoutes } from "./routes/cars";
import cors from "cors";

export const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/announcements", announcementRoutes);
app.use("/cars", carsRoutes);
app.use(handleErros);
