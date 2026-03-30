import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { authenticateCompany } from "@/lib/dashboardStore";

function CompanyLogin({ onLogin, onBack, showBack = true }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const company = await authenticateCompany(username, password);
      if (!company) {
        toast({
          title: "Inicio de sesion fallido",
          description: "Usuario o contrasena invalidos",
          variant: "destructive",
        });
        return;
      }

      onLogin(company);
      toast({
        title: "Bienvenido de nuevo",
        description: `Sesion iniciada correctamente como ${company.name}`,
      });
    } catch (error) {
      toast({
        title: "Error de inicio de sesion",
        description: error.message || "No se pudieron validar las credenciales.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen flex items-center justify-center p-4 pt-24 md:pt-28"
    >
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
          {showBack && (
            <Button onClick={onBack} variant="ghost" className="mb-6 text-slate-400 hover:text-slate-300 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          )}

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Inicio de sesion empresa</h2>
            <p className="text-slate-400">Accede a tus documentos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-username" className="block text-sm font-medium text-slate-300 mb-2">Usuario</label>
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-slate-300 mb-2">Contrasena</label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Ingresa tu contrasena"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent hover:bg-[#0199d4] disabled:opacity-60"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {isLoading ? "Iniciando sesion..." : "Iniciar sesion"}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default CompanyLogin;
