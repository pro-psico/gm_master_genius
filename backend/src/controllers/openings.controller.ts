import type { Request, Response } from "express";
import {
  buildOpeningLine,
  findAllOpenings,
  findOpeningById
} from "../services/openings.service.js";

export const getOpenings = (req: Request, res: Response): void => {
  const search = typeof req.query.search === "string" ? req.query.search : undefined;
  const eco = typeof req.query.eco === "string" ? req.query.eco : undefined;

  const openings = findAllOpenings(search, eco);

  res.status(200).json({
    total: openings.length,
    data: openings
  });
};

export const getOpeningById = (req: Request, res: Response): void => {
  const { id } = req.params;

  const opening = findOpeningById(id);

  if (!opening) {
    res.status(404).json({
      message: "Opening not found."
    });
    return;
  }

  res.status(200).json({
    data: opening
  });
};

export const getOpeningLine = (req: Request, res: Response): void => {
  const { id } = req.params;

  try {
    const line = buildOpeningLine(id);

    if (!line) {
      res.status(404).json({
        message: "Opening not found."
      });
      return;
    }

    res.status(200).json({
      data: line
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not build opening line.",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};