import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Users } from "lucide-react";
import AdminPanel from "@/features/dashboard/components/AdminPanel";
import CompanyLogin from "@/features/dashboard/components/CompanyLogin";
import CompanyDashboard from "@/features/dashboard/components/CompanyDashboard";

function Dashboard({ entry = "company" }) {
  const isAdminEntry = entry === "admin";

  const [view, setView] = useState(() => {
    const companySession = localStorage.getItem("companySession");
    if (companySession) return "company-dashboard";

    const adminSession = localStorage.getItem("adminSession");
    if (isAdminEntry && adminSession) return "admin";

    return isAdminEntry ? "admin" : "company-login";
  });
  const [loggedInCompany, setLoggedInCompany] = useState(() => {
    const companySession = localStorage.getItem("companySession");
    return companySession ? JSON.parse(companySession) : null;
  });

  const handleAdminLogin = () => {
    localStorage.setItem("adminSession", "true");
    setView("admin");
  };

  const handleCompanyLogin = (company) => {
    localStorage.setItem("companySession", JSON.stringify(company));
    setLoggedInCompany(company);
    setView("company-dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    localStorage.removeItem("companySession");
    setLoggedInCompany(null);
    setView(isAdminEntry ? "admin" : "company-login");
  };

  if (view === "selection" && isAdminEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24 md:pt-28">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Panel Driver XP</h1>
            <p className="text-slate-400">Selecciona tu tipo de acceso</p>
          </div>

          <div className="grid gap-4">
            <m.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setView("admin")}
              className="bg-accent/20 hover:bg-accent/30 border border-accent/40 text-white rounded-lg p-6 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xl font-semibold">Acceso Admin</div>
                  <div className="text-sm text-purple-200">Gestiona empresas y documentos</div>
                </div>
              </div>
            </m.button>
          </div>
        </m.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {view === "selection" && !isAdminEntry && (
        <div className="min-h-screen flex items-center justify-center p-4 pt-24 md:pt-28">
          <m.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setView("company-login")}
            className="w-full max-w-md bg-white/10 hover:bg-accent/20 border border-white/20 hover:border-accent/40 text-white rounded-lg p-6 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-3">
              <Users className="w-8 h-8" />
              <div className="text-left">
                <div className="text-xl font-semibold">Acceso Empresa</div>
                <div className="text-sm text-blue-200">Consulta tus documentos</div>
              </div>
            </div>
          </m.button>
        </div>
      )}
      {view === "admin" && <AdminPanel onLogout={handleLogout} onLogin={handleAdminLogin} />}
      {view === "company-login" && (
        <CompanyLogin
          onLogin={handleCompanyLogin}
          onBack={() => setView(isAdminEntry ? "selection" : "company-login")}
          showBack={isAdminEntry}
        />
      )}
      {view === "company-dashboard" && loggedInCompany && (
        <CompanyDashboard company={loggedInCompany} onLogout={handleLogout} />
      )}
    </AnimatePresence>
  );
}

export default Dashboard;
