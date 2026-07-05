import { Chessboard } from "react-chessboard";
import { useEffect, useMemo, useRef, useState } from "react";
import type { OpeningLinePosition } from "../types/opening";

type OpeningBoardProps = {
  positions: OpeningLinePosition[];
};

export function OpeningBoard({ positions }: OpeningBoardProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boardWidth, setBoardWidth] = useState(320);

  const currentPosition = positions[currentIndex];

  const currentMoveLabel = useMemo(() => {
    if (!currentPosition || currentPosition.moveNumber === 0) {
      return "Posición inicial";
    }

    return `Movimiento ${currentPosition.moveNumber}: ${currentPosition.san}`;
  }, [currentPosition]);

  useEffect(() => {
    const updateBoardWidth = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      setBoardWidth(Math.min(width, 520));
    };

    updateBoardWidth();

    window.addEventListener("resize", updateBoardWidth);

    return () => {
      window.removeEventListener("resize", updateBoardWidth);
    };
  }, []);

  const goPrevious = () => {
    setCurrentIndex((previous) => Math.max(previous - 1, 0));
  };

  const goNext = () => {
    setCurrentIndex((previous) => Math.min(previous + 1, positions.length - 1));
  };

  const reset = () => {
    setCurrentIndex(0);
  };

  if (!currentPosition) {
    return (
      <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-sm text-red-200">
        No se pudo cargar la posición del tablero.
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/30">
      <div ref={containerRef} className="mx-auto flex max-w-[520px] justify-center">
        <Chessboard
          id="gm-master-genius-board"
          position={currentPosition.fen}
          boardWidth={boardWidth}
          arePiecesDraggable={false}
          customBoardStyle={{
            borderRadius: "18px",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)"
          }}
        />
      </div>

      <div className="mt-5 rounded-2xl bg-slate-950/70 p-4">
        <p className="text-sm font-bold text-amber-200">{currentMoveLabel}</p>

        <p className="mt-2 break-all font-mono text-xs text-slate-400">
          {currentPosition.fen}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={goPrevious}
            disabled={currentIndex === 0}
            className="rounded-2xl border border-white/10 px-3 py-3 text-sm font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Atrás
          </button>

          <button
            type="button"
            onClick={reset}
            className="rounded-2xl border border-white/10 px-3 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Inicio
          </button>

          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === positions.length - 1}
            className="rounded-2xl bg-amber-300 px-3 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}