import { lazy, Suspense, useEffect, useState, startTransition } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, motion, useReducedMotion } from "framer-motion";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

import Home from "./pages/Home";

const About = lazy(() => import("./pages/About"));
const DriverXP = lazy(() => import("./pages/DriverXP"));
const DriverXPDashboard = lazy(() => import("./features/dashboard/pages/DriverXPDashboard"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));

const ADMIN_ACCESS_KEY = (import.meta.env.VITE_ADMIN_ACCESS_KEY || "driverxp-admin-2026").trim();

function getInitialNavigation() {
  if (typeof window === "undefined") {
    return { activePage: "home", dashboardEntry: "company" };
  }

  const hashRoute = window.location.hash.replace(/^#\/?/, "").trim();
  if (hashRoute === ADMIN_ACCESS_KEY) {
    return { activePage: "driverxp-dashboard", dashboardEntry: "admin" };
  }

  if (hashRoute === "dashboard") {
    return { activePage: "driverxp-dashboard", dashboardEntry: "company" };
  }

  return { activePage: "home", dashboardEntry: "company" };
}

export default function App() {
  const initialNavigation = getInitialNavigation();
  // Controla el splash inicial.
  const [isLoading, setIsLoading] = useState(true);
  // Navegacion principal de la app sin router.
  const [activePage, setActivePage] = useState(initialNavigation.activePage);
  const [dashboardEntry, setDashboardEntry] = useState(initialNavigation.dashboardEntry);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const navigateTo = (page) => {
    startTransition(() => {
      if (page !== "driverxp-dashboard") {
        setDashboardEntry("company");
      }
      setActivePage(page);
    });
  };

  const suspenseFallback = (
    <div className="min-h-[calc(100vh-80px)] px-6 py-28">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70 backdrop-blur-sm">
        Cargando seccion...
      </div>
    </div>
  );

  let page;
  switch (activePage) {
    case "about":
      page = <About />;
      break;
    case "driverxp":
      page = <DriverXP />;
      break;
    case "driverxp-dashboard":
      page = <DriverXPDashboard entry={dashboardEntry} />;
      break;
    case "services":
      page = <Services />;
      break;
    case "contact":
      page = <Contact />;
      break;
    case "home":
    default:
      page = <Home setActivePage={navigateTo} />;
      break;
  }

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
    <LazyMotion features={domAnimation}>
    <div className="min-h-screen bg-background-dark">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" />
        ) : (
          <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Navbar
              activePage={activePage}
              setActivePage={navigateTo}
              setDashboardEntry={setDashboardEntry}
            />

            <main>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  <Suspense fallback={suspenseFallback}>{page}</Suspense>
                </motion.div>
              </AnimatePresence>
            </main>

            <footer className="py-10 border-t border-white/5 glass-panel">
              <div className="max-w-7xl mx-auto px-6 text-center text-xs text-slate-500">
                {new Date().getFullYear()} Driver XP | Simulacion | Seguridad Vial | Capacitacion
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </LazyMotion>
    </MotionConfig>
  );
}
