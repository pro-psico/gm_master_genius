import type { Request, Response } from "express";
import {
  buildOpeningLine,
  findAllOpenings,
  findOpeningByFen,
  findOpeningById,
  findOpeningVariantsById
} from "../services/openings.service.js";
import { decodeFenFromBase64Url } from "../utils/fenEncoding.js";


const parsePositiveInteger = (
  value: unknown,
  fallback: number
): number => {
  if (typeof value !== "string") {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

const isFenLike = (fen: string): boolean => {
  const parts = fen.trim().split(/\s+/);

  if (parts.length < 4) {
    return false;
  }

  const board = parts[0];

  return (
    board.includes("/") &&
    /^[prnbqkPRNBQK1-8/]+$/.test(board)
  );
};

const extractOpeningId = (opening: unknown): string | undefined => {
  if (typeof opening !== "object" || opening === null) {
    return undefined;
  }

  const id = (opening as { id?: unknown }).id;

  if (typeof id === "string" && id.trim().length > 0) {
    return id;
  }

  if (typeof id === "number" && Number.isFinite(id)) {
    return String(id);
  }

  return undefined;
};

const resolveOpeningIdFromParam = async (
  rawId: string
): Promise<{
  openingId: string | null;
  fen?: string;
  message?: string;
}> => {
  const id = rawId.trim();

  if (!id) {
    return {
      openingId: null,
      message: "Opening id is required."
    };
  }

  const directOpening = await findOpeningById(id).catch(() => null);

  if (directOpening) {
    return {
      openingId: id
    };
  }

  try {
    const fen = decodeFenFromBase64Url(id);

    if (!isFenLike(fen)) {
      return {
        openingId: null,
        message: "Opening not found."
      };
    }

    const opening = await findOpeningByFen(fen);

    if (!opening) {
      return {
        openingId: null,
        fen,
        message: "Opening not found for this FEN."
      };
    }

    const openingId = extractOpeningId(opening);

    if (!openingId) {
      return {
        openingId: null,
        fen,
        message: "Opening resolved from FEN does not include a valid id."
      };
    }

    return {
      openingId,
      fen
    };
  } catch {
    return {
      openingId: null,
      message: "Opening not found."
    };
  }
};

export const getOpenings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const eco = typeof req.query.eco === "string" ? req.query.eco : undefined;

    const category =
      typeof req.query.category === "string" ? req.query.category : undefined;

    const page = parsePositiveInteger(req.query.page, 1);
    const limit = parsePositiveInteger(req.query.limit, 30);

    const openings = await findAllOpenings(search, eco, category, page, limit);

    res.status(200).json(openings);
  } catch (error) {
    res.status(500).json({
      message: "Could not load openings.",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const getOpeningById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const opening = await findOpeningById(id);

    if (!opening) {
      res.status(404).json({
        message: "Opening not found."
      });
      return;
    }

    res.status(200).json({
      data: opening
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid opening request.",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const getOpeningLine = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const resolved = await resolveOpeningIdFromParam(id);

    if (!resolved.openingId) {
      res.status(404).json({
        message: resolved.message ?? "Opening not found.",
        fen: resolved.fen
      });
      return;
    }

    const line = await buildOpeningLine(resolved.openingId);

    if (!line) {
      res.status(404).json({
        message: "Opening line not found.",
        fen: resolved.fen
      });
      return;
    }

    res.status(200).json({
      data: line,
      meta: {
        openingId: resolved.openingId,
        fen: resolved.fen
      }
    });
  } catch (error) {
    console.error("Could not build opening line:", error);

    res.status(500).json({
      message: "Could not build opening line.",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const getOpeningVariants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const limit = parsePositiveInteger(req.query.limit, 8);

    const resolved = await resolveOpeningIdFromParam(id);

    if (!resolved.openingId) {
      res.status(404).json({
        message: resolved.message ?? "Opening not found.",
        fen: resolved.fen
      });
      return;
    }

    const variants = await findOpeningVariantsById(resolved.openingId, limit);

    res.status(200).json({
      total: variants.length,
      data: variants,
      meta: {
        openingId: resolved.openingId,
        fen: resolved.fen
      }
    });
  } catch (error) {
    console.error("Could not load opening variants:", error);

    res.status(500).json({
      message: "Could not load opening variants.",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const lookupOpeningByFen = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const fen = typeof req.query.fen === "string" ? req.query.fen : undefined;

    if (!fen) {
      res.status(400).json({
        message: "FEN query parameter is required."
      });
      return;
    }

    const opening = await findOpeningByFen(fen);

    if (!opening) {
      res.status(404).json({
        message: "Opening not found for this FEN."
      });
      return;
    }

    res.status(200).json({
      data: opening
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not lookup opening by FEN.",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};