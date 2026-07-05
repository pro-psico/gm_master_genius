import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { OpeningBoard } from "../components/OpeningBoard";
import { getOpeningLine } from "../services/openingsApi";

export function OpeningDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["opening-line", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Opening id is required.");
      }

      return getOpeningLine(id);
    },
    enabled: Boolean(id)
  });

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-slate-300">
        Cargando línea de apertura...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-red-200">
        Error cargando apertura:{" "}
        {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-slate-300">
        No se encontró información de la apertura.
      </div>
    );
  }

  const { opening, positions } = data.data;

  return (
    <section>
      <Link
        to="/openings"
        className="mb-5 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10"
      >
        ← Volver a aperturas
      </Link>

      <div className="mb-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-950">
              {opening.eco}
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              {opening.family}
            </span>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
              Juegan: {opening.sideToMove === "white" ? "blancas" : "negras"}
            </span>
          </div>

          <h1 className="text-3xl font-black text-white md:text-5xl">
            {opening.name}
          </h1>

          <p className="mt-4 leading-8 text-slate-300">{opening.description}</p>

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-black text-amber-200">Línea principal</h2>

            <p className="mt-3 rounded-2xl bg-slate-950/70 p-4 font-mono text-sm text-slate-300">
              {opening.moves.join(" ")}
            </p>
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-black text-amber-200">Ideas clave</h2>

            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
              {opening.ideas.map((idea) => (
                <li key={idea} className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300" />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <OpeningBoard positions={positions} />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
        <h2 className="text-xl font-black text-white">Variantes principales</h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {opening.variants.map((variant) => (
            <article
              key={variant.id}
              className="rounded-3xl border border-white/10 bg-slate-950/60 p-5"
            >
              <h3 className="font-black text-amber-200">{variant.name}</h3>

              <p className="mt-3 font-mono text-sm text-slate-300">
                {variant.moves.join(" ")}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {variant.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}