export type ChessColor = "white" | "black";

export type OpeningVariant = {
  id: string;
  name: string;
  moves: string[];
  description: string;
};

export type Opening = {
  id: string;
  eco: string;
  name: string;
  family: string;
  moves: string[];
  sideToMove: ChessColor;
  description: string;
  ideas: string[];
  variants: OpeningVariant[];
};

export type OpeningLinePosition = {
  moveNumber: number;
  san?: string;
  fen: string;
  turn: ChessColor;
};

export type OpeningLineResponse = {
  opening: Opening;
  positions: OpeningLinePosition[];
};