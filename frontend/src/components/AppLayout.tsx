import { Link, NavLink } from "react-router-dom";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/40 bg-gradient-to-br from-white to-slate-900 text-sm font-black text-slate-950 shadow-lg shadow-amber-500/10">
              GM
            </div>

            <div>
              <p className="text-sm font-black tracking-wide text-white">
                GM Combat
              </p>
              <p className="text-xs text-amber-300">Master Genius</p>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${
                  isActive
                    ? "bg-amber-300 text-slate-950"
                    : "text-slate-300 hover:bg-white/10"
                }`
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/openings"
              className={({ isActive }) =>
                `rounded-full px-3 py-2 transition ${
                  isActive
                    ? "bg-amber-300 text-slate-950"
                    : "text-slate-300 hover:bg-white/10"
                }`
              }
            >
              Aperturas
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">{children}</main>
    </div>
  );
}