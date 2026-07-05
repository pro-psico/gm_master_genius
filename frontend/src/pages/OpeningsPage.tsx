import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { OpeningCard } from "../components/OpeningCard";
import { getOpenings } from "../services/openingsApi";

const categories = [
  { label: "Todas", value: "" },
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" }
];

export function OpeningsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["openings", search, category, page],
    queryFn: () =>
      getOpenings({
        search,
        category,
        page,
        limit: 30
      })
  });

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

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
          Explora una base amplia de aperturas por nombre, código ECO o
          categoría. Ahora ya no estamos jugando con 6 registros de prueba:
          esto empieza a oler a producto real.
        </p>
      </div>

      <div className="mb-6 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-bold text-slate-200"
          >
            Buscar apertura
          </label>

          <input
            id="search"
            type="search"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Ej: Sicilian, Ruy Lopez, Queen's Gambit, B20..."
            className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-bold text-slate-200">Categoría ECO</p>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleCategoryChange(item.value)}
                className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                  category === item.value
                    ? "bg-amber-300 text-slate-950"
                    : "border border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-slate-300">
          Cargando aperturas ECO...
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
          <div className="mb-4 flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Resultados encontrados:{" "}
              <span className="font-bold text-amber-200">{data.total}</span>
              {isFetching && (
                <span className="ml-2 text-slate-500">Actualizando...</span>
              )}
            </p>

            <p>
              Página{" "}
              <span className="font-bold text-amber-200">{data.page}</span> de{" "}
              <span className="font-bold text-amber-200">{totalPages}</span>
            </p>
          </div>

          {data.data.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-slate-300">
              No encontré aperturas con esos filtros.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {data.data.map((opening) => (
                <OpeningCard key={opening.id} opening={opening} />
              ))}
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:justify-center">
            <button
              type="button"
              onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
              disabled={page === 1}
              className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>

            <button
              type="button"
              onClick={() =>
                setPage((currentPage) => Math.min(currentPage + 1, totalPages))
              }
              disabled={page >= totalPages}
              className="rounded-2xl bg-amber-300 px-5 py-3 font-black text-slate-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  );
}