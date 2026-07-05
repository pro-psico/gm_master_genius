import { Router } from "express";
import {
  getOpeningById,
  getOpeningLine,
  getOpeningVariants,
  getOpenings,
  lookupOpeningByFen
} from "../controllers/openings.controller.js";

export const openingsRouter = Router();

openingsRouter.get("/", getOpenings);
openingsRouter.get("/lookup/by-fen", lookupOpeningByFen);
openingsRouter.get("/:id/line", getOpeningLine);
openingsRouter.get("/:id/variants", getOpeningVariants);
openingsRouter.get("/:id", getOpeningById);