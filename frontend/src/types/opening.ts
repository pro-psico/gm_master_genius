export type ChessColor = "white" | "black";

export type OpeningVariant = {
  id: string;
  eco: string;
  name: string;
  fen: string;
  moves: string[];
  description: string;
};

export type Opening = {
  id: string;
  eco: string;
  name: string;
  family: string;
  fen: string;
  moves: string[];
  movesText: string;
  sideToMove: ChessColor;
  description: string;
  ideas: string[];
  variants: OpeningVariant[];
  source?: string;
  isEcoRoot?: boolean;
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

export type ApiListResponse<T> = {
  total: number;
  page: number;
  limit: number;
  data: T[];
};

export type ApiSingleResponse<T> = {
  data: T;
};