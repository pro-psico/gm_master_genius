import { Chess } from "chess.js";
import { openings } from "../data/openings.data.js";
import type {
  ChessColor,
  Opening,
  OpeningLinePosition,
  OpeningLineResponse
} from "../types/opening.types.js";

const getTurnFromChess = (chess: Chess): ChessColor => {
  return chess.turn() === "w" ? "white" : "black";
};

export const findAllOpenings = (search?: string, eco?: string): Opening[] => {
  let result = openings;

  if (search) {
    const normalizedSearch = search.trim().toLowerCase();

    result = result.filter((opening) => {
      return (
        opening.name.toLowerCase().includes(normalizedSearch) ||
        opening.family.toLowerCase().includes(normalizedSearch) ||
        opening.eco.toLowerCase().includes(normalizedSearch)
      );
    });
  }

  if (eco) {
    const normalizedEco = eco.trim().toLowerCase();

    result = result.filter((opening) =>
      opening.eco.toLowerCase().startsWith(normalizedEco)
    );
  }

  return result;
};

export const findOpeningById = (id: string): Opening | null => {
  return openings.find((opening) => opening.id === id) ?? null;
};

export const buildOpeningLine = (id: string): OpeningLineResponse | null => {
  const opening = findOpeningById(id);

  if (!opening) {
    return null;
  }

  const chess = new Chess();

  const positions: OpeningLinePosition[] = [
    {
      moveNumber: 0,
      fen: chess.fen(),
      turn: getTurnFromChess(chess)
    }
  ];

  opening.moves.forEach((san, index) => {
    const move = chess.move(san);

    if (!move) {
      throw new Error(`Invalid move "${san}" in opening "${opening.name}".`);
    }

    positions.push({
      moveNumber: index + 1,
      san: move.san,
      fen: chess.fen(),
      turn: getTurnFromChess(chess)
    });
  });

  return {
    opening,
    positions
  };
};