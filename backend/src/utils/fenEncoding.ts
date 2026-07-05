export function decodeFenFromBase64Url(encodedFen: string): string {
  if (!encodedFen || typeof encodedFen !== "string") {
    throw new Error("El FEN codificado es obligatorio.");
  }

  const normalized = encodedFen.replace(/-/g, "+").replace(/_/g, "/");

  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );

  const fen = Buffer.from(padded, "base64").toString("utf8").trim();

  if (!fen || fen.split(/\s+/).length < 4) {
    throw new Error("El FEN decodificado no tiene un formato válido.");
  }

  return fen;
}