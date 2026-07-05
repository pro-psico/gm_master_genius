import { Link } from "react-router-dom";
import type { Opening } from "../types/opening";

type OpeningCardProps = {
  opening: Opening;
};

export function OpeningCard({ opening }: OpeningCardProps) {
  return (
    <Link
      to={`/openings/${opening.id}`}
      className="group block rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-amber-300/50 hover:bg-white/[0.07]"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-950">
          {opening.eco}
        </span>

        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          {opening.family}
        </span>
      </div>

      <h2 className="text-xl font-black text-white group-hover:text-amber-200">
        {opening.name}
      </h2>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
        {opening.description}
      </p>

      <div className="mt-4 rounded-2xl bg-slate-950/70 p-3 font-mono text-xs text-slate-300">
        {opening.moves.join(" ")}
      </div>
    </Link>
  );
}