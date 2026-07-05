import {
  findOpening,
  getFromTos,
  getPositionBook,
  openingBook
} from "@chess-openings/eco.json";
import { Chess } from "chess.js";
import type {
  ChessColor,
  Opening,
  OpeningLinePosition,
  OpeningLineResponse,
  OpeningListResponse,
  OpeningVariant
} from "../types/opening.types.js";

type EcoOpening = {
  name: string;
  moves: string;
  eco: string;
  score?: number | null;
  src?: string;
  isEcoRoot?: boolean;
  fen?: string;
  aliases?: Record<string, string>;
};

type OpeningCollection = Record<string, EcoOpening>;
type PositionBook = Record<string, string[]>;

type LoadedEcoData = {
  book: OpeningCollection;
  positionBook: PositionBook;
};

let cachedEcoData: LoadedEcoData | null = null;

const getEcoData = async (): Promise<LoadedEcoData> => {
  if (cachedEcoData) {
    return cachedEcoData;
  }

  const book = (await openingBook()) as OpeningCollection;
  const positionBook = getPositionBook(book) as PositionBook;

  cachedEcoData = {
    book,
    positionBook
  };

  return cachedEcoData;
};

const encodeFenId = (fen: string): string => {
  return Buffer.from(fen, "utf8").toString("base64url");
};

const decodeFenId = (id: string): string => {
  try {
    return Buffer.from(id, "base64url").toString("utf8");
  } catch {
    throw new Error("Invalid opening id.");
  }
};

const getTurnFromFen = (fen: string): ChessColor => {
  const turn = fen.split(" ")[1];
  return turn === "b" ? "black" : "white";
};

const getTurnFromChess = (chess: Chess): ChessColor => {
  return chess.turn() === "w" ? "white" : "black";
};

const parseMovesText = (movesText?: string): string[] => {
  if (!movesText) {
    return [];
  }

  return movesText
    .replace(/\{[^}]*}/g, " ")
    .replace(/\([^)]*\)/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => !/^\d+\.(\.\.)?$/.test(token))
    .filter((token) => !/^\d+\.\.\.$/.test(token))
    .filter((token) => !["1-0", "0-1", "1/2-1/2", "*"].includes(token))
    .map((token) => token.replace(/[!?]+$/g, ""));
};

const buildFenFromMovesText = (movesText?: string): string | null => {
  const moves = parseMovesText(movesText);

  const chess = new Chess();

  for (const san of moves) {
    try {
      const move = chess.move(san);

      if (!move) {
        return null;
      }
    } catch {
      return null;
    }
  }

  return chess.fen();
};

const isSameEcoOpening = (a: EcoOpening, b: EcoOpening): boolean => {
  return (
    a.name === b.name &&
    a.eco === b.eco &&
    a.moves === b.moves
  );
};

const resolveFenForEcoOpening = (
  book: OpeningCollection,
  opening: EcoOpening,
  fallbackFen?: string
): string | null => {
  if (opening.fen && book[opening.fen]) {
    return opening.fen;
  }

  const referenceMatch = Object.entries(book).find(([, candidate]) => {
    return candidate === opening;
  });

  if (referenceMatch) {
    return referenceMatch[0];
  }

  const dataMatch = Object.entries(book).find(([, candidate]) => {
    return isSameEcoOpening(candidate, opening);
  });

  if (dataMatch) {
    return dataMatch[0];
  }

  const generatedFen = buildFenFromMovesText(opening.moves);

  if (generatedFen) {
    return generatedFen;
  }

  return fallbackFen ?? null;
};

const getFamilyFromOpening = (name: string): string => {
  const [family] = name.split(":");

  return family?.trim() || name;
};

const buildOpeningDescription = (opening: EcoOpening): string => {
  return `La apertura ${opening.name} pertenece al código ECO ${opening.eco}. Su línea principal registrada es: ${opening.moves || "posición inicial"}.`;
};

const buildOpeningIdeas = (opening: EcoOpening): string[] => {
  const name = opening.name.toLowerCase();
  const ecoCategory = opening.eco.charAt(0).toUpperCase();

  if (name.includes("sicilian")) {
    return [
      "Crear una posición asimétrica desde la primera jugada.",
      "Atacar el centro blanco desde el flanco de dama.",
      "Buscar contrajuego dinámico en lugar de igualdad pasiva.",
      "Preparar rupturas centrales como d5 en el momento correcto."
    ];
  }

  if (name.includes("ruy lopez") || name.includes("spanish")) {
    return [
      "Presionar el caballo de c6, defensor natural del peón de e5.",
      "Desarrollar piezas con rapidez y preparar el enroque corto.",
      "Mantener tensión central antes de definir la estructura.",
      "Construir presión posicional a largo plazo."
    ];
  }

  if (name.includes("queen's gambit") || name.includes("queens gambit")) {
    return [
      "Disputar el control del centro desde el flanco de dama.",
      "Desviar el peón negro de d5 cuando sea posible.",
      "Desarrollar piezas hacia casillas activas.",
      "Recuperar el peón sacrificado bajo mejores condiciones."
    ];
  }

  if (name.includes("french")) {
    return [
      "Atacar el centro blanco con d5.",
      "Aceptar una estructura sólida, aunque con menor espacio inicial.",
      "Buscar rupturas con c5 o f6.",
      "Resolver el desarrollo del alfil de c8."
    ];
  }

  if (name.includes("king's indian") || name.includes("kings indian")) {
    return [
      "Permitir el centro blanco para atacarlo después.",
      "Fianchettar el alfil de rey.",
      "Preparar rupturas con e5 o c5.",
      "Buscar ataque en el flanco de rey."
    ];
  }

  if (ecoCategory === "A") {
    return [
      "Controlar el centro con flexibilidad.",
      "Evitar comprometer demasiado pronto la estructura de peones.",
      "Desarrollar piezas según la respuesta rival."
    ];
  }

  if (ecoCategory === "B" || ecoCategory === "C") {
    return [
      "Luchar por el centro desde las primeras jugadas.",
      "Priorizar desarrollo rápido de piezas menores.",
      "Preparar el enroque antes de abrir demasiado la posición."
    ];
  }

  return [
    "Controlar casillas centrales importantes.",
    "Desarrollar piezas hacia posiciones activas.",
    "Coordinar la estructura de peones con el plan de medio juego.",
    "Evitar mover muchas veces la misma pieza sin necesidad."
  ];
};

const mapEcoOpeningToOpening = (
  fen: string,
  opening: EcoOpening,
  variants: OpeningVariant[] = []
): Opening => {
  const moves = parseMovesText(opening.moves);

  return {
    id: encodeFenId(fen),
    eco: opening.eco,
    name: opening.name,
    family: getFamilyFromOpening(opening.name),
    fen,
    moves,
    movesText: opening.moves || "",
    sideToMove: getTurnFromFen(fen),
    description: buildOpeningDescription(opening),
    ideas: buildOpeningIdeas(opening),
    variants,
    source: opening.src,
    isEcoRoot: opening.isEcoRoot
  };
};

const paginate = <T>(items: T[], page: number, limit: number): T[] => {
  const start = (page - 1) * limit;
  return items.slice(start, start + limit);
};

export const findAllOpenings = async (
  search?: string,
  eco?: string,
  category?: string,
  page = 1,
  limit = 30
): Promise<OpeningListResponse> => {
  const { book } = await getEcoData();

  let entries = Object.entries(book);

  if (search) {
    const normalizedSearch = search.trim().toLowerCase();

    entries = entries.filter(([, opening]) => {
      return (
        opening.name.toLowerCase().includes(normalizedSearch) ||
        opening.eco.toLowerCase().includes(normalizedSearch) ||
        opening.moves.toLowerCase().includes(normalizedSearch)
      );
    });
  }

  if (eco) {
    const normalizedEco = eco.trim().toLowerCase();

    entries = entries.filter(([, opening]) =>
      opening.eco.toLowerCase().startsWith(normalizedEco)
    );
  }

  if (category) {
    const normalizedCategory = category.trim().toUpperCase();

    entries = entries.filter(([, opening]) =>
      opening.eco.toUpperCase().startsWith(normalizedCategory)
    );
  }

  entries.sort(([, a], [, b]) => {
    const ecoComparison = a.eco.localeCompare(b.eco);

    if (ecoComparison !== 0) {
      return ecoComparison;
    }

    return a.name.localeCompare(b.name);
  });

  const safePage = Math.max(page, 1);
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const paginatedEntries = paginate(entries, safePage, safeLimit);

  return {
    total: entries.length,
    page: safePage,
    limit: safeLimit,
    data: paginatedEntries.map(([fen, opening]) =>
      mapEcoOpeningToOpening(fen, opening)
    )
  };
};

export const findOpeningById = async (id: string): Promise<Opening | null> => {
  const { book, positionBook } = await getEcoData();

  const fen = decodeFenId(id);

  const directOpening = book[fen];

  const matchedOpening =
    directOpening ?? (findOpening(book, fen, positionBook) as EcoOpening | undefined);

  if (!matchedOpening) {
    return null;
  }

  const matchedFen = resolveFenForEcoOpening(book, matchedOpening, fen);

  if (!matchedFen) {
    return null;
  }

  const bookOpening = book[matchedFen] ?? matchedOpening;

  const variants = await findOpeningVariantsByFen(matchedFen, 8).catch(
    (error) => {
      console.warn(
        `Could not load variants for "${bookOpening.name}":`,
        error instanceof Error ? error.message : error
      );

      return [];
    }
  );

  return mapEcoOpeningToOpening(matchedFen, bookOpening, variants);
};

export const findOpeningByFen = async (fen: string): Promise<Opening | null> => {
  const { book, positionBook } = await getEcoData();

  const opening = findOpening(book, fen, positionBook) as EcoOpening | undefined;

  if (!opening) {
    return null;
  }

  const matchedFen = resolveFenForEcoOpening(book, opening, fen);

  if (!matchedFen) {
    return null;
  }

  const bookOpening = book[matchedFen] ?? opening;

  return mapEcoOpeningToOpening(matchedFen, bookOpening);
};

export const findOpeningVariantsByFen = async (
  fen: string,
  limit = 8
): Promise<OpeningVariant[]> => {
  const { book } = await getEcoData();

  const transitions = await getFromTos(fen, book);
  const nextOpenings = transitions.next as EcoOpening[];

  const safeLimit = Math.min(Math.max(limit, 1), 30);
  const variants: OpeningVariant[] = [];

  for (const variant of nextOpenings) {
    const variantFen = resolveFenForEcoOpening(book, variant);

    if (!variantFen) {
      console.warn(`Variant "${variant.name}" does not include a valid FEN.`);
      continue;
    }

    variants.push({
      id: encodeFenId(variantFen),
      eco: variant.eco,
      name: variant.name,
      fen: variantFen,
      moves: parseMovesText(variant.moves),
      description: buildOpeningDescription(variant)
    });

    if (variants.length >= safeLimit) {
      break;
    }
  }

  return variants;
};

export const findOpeningVariantsById = async (
  id: string,
  limit = 8
): Promise<OpeningVariant[]> => {
  const fen = decodeFenId(id);
  return findOpeningVariantsByFen(fen, limit);
};

export const buildOpeningLine = async (
  id: string
): Promise<OpeningLineResponse | null> => {
  const opening = await findOpeningById(id);

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

  for (const [index, san] of opening.moves.entries()) {
    try {
      const move = chess.move(san);

      if (!move) {
        throw new Error("Move returned null.");
      }

      positions.push({
        moveNumber: index + 1,
        san: move.san,
        fen: chess.fen(),
        turn: getTurnFromChess(chess)
      });
    } catch {
      throw new Error(
        `Invalid move "${san}" while building line for "${opening.name}".`
      );
    }
  }

  return {
    opening,
    positions
  };
};