import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
      <div>
        <div className="mb-5 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-200">
          Proyecto MVP · Mobile First · Ajedrez inteligente
        </div>

        <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
          Domina aperturas con visión de gran maestro.
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          GM Combat Master Genius te permite explorar aperturas de ajedrez,
          ver sus movimientos en tablero, estudiar ideas clave y comparar sus
          variantes principales.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/openings"
            className="rounded-2xl bg-amber-300 px-6 py-4 text-center font-black text-slate-950 shadow-xl shadow-amber-500/20 transition hover:bg-amber-200"
          >
            Explorar aperturas
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-white/10 px-6 py-4 text-center font-bold text-white transition hover:bg-white/10"
          >
            Ver repositorio
          </a>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40">
        <div className="aspect-square rounded-[1.5rem] bg-gradient-to-br from-white via-amber-200 to-slate-950 p-1">
          <div className="flex h-full items-center justify-center rounded-[1.3rem] bg-slate-950">
            <div className="text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-white to-slate-900 text-4xl font-black text-slate-950">
                GM
              </div>

              <p className="mt-6 text-2xl font-black text-white">
                Combat Master Genius
              </p>

              <p className="mt-2 text-sm text-amber-200">
                Aperturas · Variantes · Estrategia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}