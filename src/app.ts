import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleErros } from "./errors/errorHandler";
import { announcementRoutes } from "./routes/announcements/index";
import cors from "cors";
import { userRoutes } from "./routes/users";
import { loginRoutes } from "./routes/login";

export const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
app.use("/announcements", announcementRoutes);
app.use("/user", userRoutes);
app.use(handleErros);
