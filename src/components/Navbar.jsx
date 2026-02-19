import headerLogo from "../assets/driverxp-header.png";

export default function Navbar({ activePage, setActivePage, setDashboardEntry }) {
  const navItems = [
    { key: "home", label: "Inicio" },
    { key: "about", label: "Que es?" },
    { key: "driverxp", label: "DriverXP" },
    { key: "services", label: "Servicios" },
    { key: "contact", label: "Contacto" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="backdrop-blur-xl bg-navy/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setActivePage("home")}
            className="flex items-center gap-3 text-left"
            aria-label="Ir a Inicio"
          >
            <img src={headerLogo} alt="Driver XP" className="h-12 w-auto object-contain" />
            <div className="leading-tight">
              <div className="text-white font-extrabold">
                Driver <span className="text-accent">XP</span>
              </div>
              <div className="text-[11px] text-white/60 font-extrabold uppercase tracking-wider">
                Simulacion y Capacitacion
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-2" aria-label="Navegacion principal">
            {navItems.map((item) => {
              const isActive = activePage === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActivePage(item.key)}
                  className={[
                    "px-4 py-2 rounded-full text-sm font-extrabold transition-all border",
                    isActive
                      ? "bg-accent/15 border-accent/40 text-white"
                      : "bg-white/0 border-transparent text-white/80 hover:bg-white/5 hover:border-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setDashboardEntry?.("company");
                setActivePage("driverxp-dashboard");
              }}
              className="px-5 py-2 rounded-2xl text-sm font-extrabold text-white border border-cyan-400/40 bg-cyan-500/15 hover:bg-cyan-500/25 transition-all"
            >
              Acceso empresa
            </button>
            <button
              type="button"
              onClick={() => setActivePage("contact")}
              className="px-5 py-2 rounded-2xl text-sm font-extrabold text-white border border-accent/40 bg-accent/15 hover:bg-accent/25 transition-all"
            >
              Agenda demo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
