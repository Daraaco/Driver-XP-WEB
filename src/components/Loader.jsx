import { m } from "framer-motion";
import headerLogo from "../assets/driverxp-header.png";

export default function Loader() {
  return (
    <m.div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[9999] grid place-items-center bg-[#061f33]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Brillos de fondo para dar profundidad mientras carga. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#01b0f1]/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] rounded-full bg-white/5 blur-[110px]" />
      </div>

      <div className="relative w-[min(520px,calc(100%-32px))] rounded-3xl border border-white/10 bg-white/5 p-7 shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl border border-[#01b0f1]/35 bg-[#01b0f1]/10 grid place-items-center">
            <img src={headerLogo} alt="Driver XP Logo" className="h-6 w-6 object-contain" />
          </div>

          <div>
            <div className="text-white text-xl font-extrabold leading-none">
              Driver <span className="text-[#01b0f1]">XP</span>
            </div>
            <div className="text-[12px] text-white/60 font-extrabold uppercase tracking-wider mt-1">
              Cargando experiencia...
            </div>
          </div>
        </div>

        {/* Barra animada de progreso visual. */}
        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-white/10 border border-white/10">
          <m.div
            className="h-full w-full origin-left"
            style={{
              background:
                "linear-gradient(90deg, rgba(1,176,241,0.15), rgba(1,176,241,0.65), rgba(1,176,241,0.15))",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </div>

        <div className="mt-4 text-sm text-white/60">
          Preparando simulacion | Seguridad vial | Metricas
        </div>
      </div>
    </m.div>
  );
}
