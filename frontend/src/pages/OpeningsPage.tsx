import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { OpeningCard } from "../components/OpeningCard";
import { getOpenings } from "../services/openingsApi";

export function OpeningsPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["openings", search],
    queryFn: () => getOpenings(search)
  });

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-300">
          Biblioteca ECO
        </p>

        <h1 className="mt-2 text-3xl font-black text-white md:text-5xl">
          Aperturas de ajedrez
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-slate-300">
          Busca por nombre, familia o código ECO. Por ahora estamos usando una
          base inicial para validar el MVP; después conectaremos una base mucho
          más grande.
        </p>
      </div>

      <div className="mb-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <label htmlFor="search" className="mb-2 block text-sm font-bold text-slate-200">
          Buscar apertura
        </label>

        <input
          id="search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Ej: Siciliana, Ruy López, D06..."
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
        />
      </div>

      {isLoading && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-slate-300">
          Cargando aperturas...
        </div>
      )}

      {isError && (
        <div className="rounded-3xl border border-red-400/30 bg-red-500/10 p-5 text-red-200">
          Error consultando aperturas:{" "}
          {error instanceof Error ? error.message : "Error desconocido"}
        </div>
      )}

      {data && (
        <>
          <p className="mb-4 text-sm text-slate-400">
            Resultados encontrados:{" "}
            <span className="font-bold text-amber-200">{data.total}</span>
          </p>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.data.map((opening) => (
              <OpeningCard key={opening.id} opening={opening} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}