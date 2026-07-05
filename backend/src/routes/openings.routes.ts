import { Router } from "express";
import {
  getOpeningById,
  getOpeningLine,
  getOpenings
} from "../controllers/openings.controller.js";

export const openingsRouter = Router();

openingsRouter.get("/", getOpenings);
openingsRouter.get("/:id", getOpeningById);
openingsRouter.get("/:id/line", getOpeningLine);