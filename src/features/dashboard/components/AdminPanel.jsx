import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, LogOut, Building2, Users, FileText, Edit, Trash2, Upload, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AddCompanyDialog from "@/features/dashboard/components/AddCompanyDialog";
import EditCompanyDialog from "@/features/dashboard/components/EditCompanyDialog";
import UploadPDFDialog from "@/features/dashboard/components/UploadPDFDialog";
import {
  adminPassword,
  createCompany,
  createDocument,
  deleteCompany,
  deleteDocument,
  fetchCompanies,
  updateCompany,
} from "@/lib/dashboardStore";

function AdminPanel({ onLogout, onLogin }) {
  const [companies, setCompanies] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [uploadingCompany, setUploadingCompany] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refreshCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await fetchCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Failed to load companies:", error);
      toast({
        title: "Error al cargar datos",
        description: error.message || "No se pudieron obtener los datos de empresas.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const adminSession = localStorage.getItem("adminSession");
    if (adminSession) {
      setIsAuthenticated(true);
      refreshCompanies();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password !== adminPassword) {
      toast({
        title: "Acceso denegado",
        description: "Contrasena incorrecta",
        variant: "destructive",
      });
      return;
    }

    setIsAuthenticated(true);
    refreshCompanies();
    onLogin();
    toast({
      title: "Bienvenido, admin",
      description: "Inicio de sesion exitoso en el panel de administracion",
    });
  };

  const handleAddCompany = async (companyData) => {
    try {
      await createCompany(companyData);
      await refreshCompanies();
      toast({
        title: "Empresa agregada",
        description: `${companyData.name} se agrego correctamente`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo agregar la empresa.",
        variant: "destructive",
      });
    }
  };

  const handleEditCompany = async (companyData) => {
    try {
      await updateCompany(editingCompany.id, companyData);
      await refreshCompanies();
      toast({
        title: "Empresa actualizada",
        description: `${companyData.name} se actualizo correctamente`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar la empresa.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCompany = async (companyId) => {
    if (!window.confirm("Estas seguro de eliminar esta empresa? Esta accion no se puede deshacer.")) return;
    try {
      await deleteCompany(companyId);
      await refreshCompanies();
      toast({
        title: "Empresa eliminada",
        description: "La empresa fue eliminada del sistema",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la empresa.",
        variant: "destructive",
      });
    }
  };

  const handlePDFUpload = async (companyId, pdfData) => {
    try {
      await createDocument(companyId, pdfData);
      await refreshCompanies();
      toast({
        title: "PDF cargado",
        description: `${pdfData.name} se agrego correctamente`,
      });
    } catch (error) {
      toast({
        title: "Carga fallida",
        description: error.message || "No se pudo subir el documento.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePDF = async (companyId, pdfId) => {
    if (!window.confirm("Estas seguro de eliminar este PDF?")) return;
    try {
      await deleteDocument(companyId, pdfId);
      await refreshCompanies();
      toast({
        title: "PDF eliminado",
        description: "El documento fue eliminado",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el documento.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 pt-24 md:pt-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-md border border-slate-700"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Inicio de sesion Admin</h2>
            <p className="text-slate-400">Ingresa tu contrasena para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-slate-300 mb-2">Contrasena</label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ingresa la contrasena de admin"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-[#0199d4]"
            >
              Iniciar sesion
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 pt-24 md:p-8 md:pt-28"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-xl p-6 mb-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Panel de Administracion</h1>
              <p className="text-slate-400">Gestiona empresas y documentos</p>
            </div>
            <Button onClick={onLogout} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesion
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Total de Empresas</p>
                <p className="text-3xl font-bold text-white mt-1">{companies.length}</p>
              </div>
              <Building2 className="w-12 h-12 text-purple-200 opacity-80" />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Usuarios Activos</p>
                <p className="text-3xl font-bold text-white mt-1">{companies.length}</p>
              </div>
              <Users className="w-12 h-12 text-blue-200 opacity-80" />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-200 text-sm font-medium">Total de Documentos</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {companies.reduce((sum, c) => sum + (c.pdfs?.length || 0), 0)}
                </p>
              </div>
              <FileText className="w-12 h-12 text-emerald-200 opacity-80" />
            </div>
          </motion.div>
        </div>

        <div className="mb-6">
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-accent hover:bg-[#0199d4]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar nueva empresa
          </Button>
        </div>

        <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Empresas</h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-400">Cargando empresas...</div>
          ) : companies.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">Aun no hay empresas registradas</p>
              <p className="text-slate-500 text-sm mt-2">Haz clic en "Agregar nueva empresa" para comenzar</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {companies.map((company, index) => (
                <motion.div
                  key={company.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center overflow-hidden shrink-0 border border-slate-600">
                        {company.logo ? (
                          <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-6 h-6 text-slate-400" />
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{company.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                          <span>Usuario: <span className="text-slate-300">{company.username}</span></span>
                          <span>Documentos: <span className="text-slate-300">{company.pdfs?.length || 0}</span></span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => setUploadingCompany(company)} size="sm" className="bg-accent hover:bg-[#0199d4]">
                        <Upload className="w-4 h-4 mr-1" />
                        Subir PDF
                      </Button>
                      <Button onClick={() => setEditingCompany(company)} size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => handleDeleteCompany(company.id)} size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {company.pdfs && company.pdfs.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 border-slate-600 ml-16">
                      <p className="text-sm font-medium text-slate-400 mb-2">Documentos:</p>
                      <div className="space-y-2">
                        {company.pdfs.map((pdf) => (
                          <div key={pdf.id} className="flex items-center justify-between bg-slate-700/50 rounded p-2">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-400" />
                              <span className="text-sm text-slate-300">{pdf.name}</span>
                              {pdf.participants && pdf.participants.length > 0 && (
                                <span className="text-xs bg-slate-600 text-slate-300 px-1.5 py-0.5 rounded flex items-center gap-1">
                                  <Users className="w-3 h-3" /> {pdf.participants.length}
                                </span>
                              )}
                            </div>
                            <Button
                              onClick={() => handleDeletePDF(company.id, pdf.id)}
                              size="sm"
                              variant="ghost"
                              className="text-red-400 hover:text-red-300 hover:bg-red-600/10"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddCompanyDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddCompany} />

      {editingCompany && (
        <EditCompanyDialog
          key={editingCompany.id}
          open={!!editingCompany}
          onOpenChange={(open) => !open && setEditingCompany(null)}
          company={editingCompany}
          onEdit={handleEditCompany}
        />
      )}

      {uploadingCompany && (
        <UploadPDFDialog
          open={!!uploadingCompany}
          onOpenChange={(open) => !open && setUploadingCompany(null)}
          company={uploadingCompany}
          onUpload={(pdfData) => handlePDFUpload(uploadingCompany.id, pdfData)}
        />
      )}
    </motion.div>
  );
}

export default AdminPanel;
