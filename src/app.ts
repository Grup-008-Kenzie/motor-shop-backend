import "express-async-errors"
import express, {Application} from "express"
import { handleErros } from "./errors/errorHandler"

export const app: Application = express()

app.use(express.json())
app.use(handleErros)