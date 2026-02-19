import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from "framer-motion";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import About from "./pages/About";
import DriverXP from "./pages/DriverXP";
import DriverXPDashboard from "./features/dashboard/pages/DriverXPDashboard";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

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

  useEffect(() => {
    if (activePage !== "driverxp-dashboard") {
      setDashboardEntry("company");
    }
  }, [activePage]);

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
      page = <Home setActivePage={setActivePage} />;
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
          <m.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Navbar
              activePage={activePage}
              setActivePage={setActivePage}
              setDashboardEntry={setDashboardEntry}
            />

            <main>
              <AnimatePresence mode="wait">
                <m.div
                  key={activePage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.22 }}
                >
                  {page}
                </m.div>
              </AnimatePresence>
            </main>

            <footer className="py-10 border-t border-white/5 glass-panel">
              <div className="max-w-7xl mx-auto px-6 text-center text-xs text-slate-500">
                {new Date().getFullYear()} Driver XP | Simulacion | Seguridad Vial | Capacitacion
              </div>
            </footer>
          </m.div>
        )}
      </AnimatePresence>
    </div>
    </LazyMotion>
    </MotionConfig>
  );
}
