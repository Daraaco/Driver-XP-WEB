import { useEffect, useMemo, useState } from "react";
import { m } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  ListFilter,
  LogOut,
  Search,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import PDFViewer from "@/features/dashboard/components/PDFViewer";
import { fetchCompanies } from "@/lib/dashboardStore";

function normalizeText(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function inferDocumentType(pdf, companyName) {
  const participantCount = pdf.participants?.length || 0;
  if (participantCount > 0) return "conductor";

  const normalizedName = normalizeText(pdf.name.replace(/\.pdf$/i, ""));
  const normalizedCompany = normalizeText(companyName);

  const companyKeywords = [
    "empresa",
    "transportes",
    "logistica",
    "logistics",
    "sa de cv",
    "s.a. de c.v",
    "s de rl",
    "corporativo",
    "flotilla",
  ];

  if (normalizedCompany && normalizedName.includes(normalizedCompany)) {
    return "empresa";
  }

  if (companyKeywords.some((keyword) => normalizedName.includes(keyword))) {
    return "empresa";
  }

  const tokens = normalizedName
    .split(/[\s._-]+/)
    .filter(Boolean)
    .filter((token) => !["pdf", "reporte", "resultado", "evaluacion"].includes(token));

  const looksLikePersonName =
    tokens.length >= 2 &&
    tokens.length <= 5 &&
    tokens.every((token) => /^[a-z]+$/.test(token)) &&
    !tokens.some((token) => companyKeywords.includes(token));

  return looksLikePersonName ? "conductor" : "empresa";
}

function CompanyDashboard({ company, onLogout }) {
  const ITEMS_PER_PAGE = 9;
  const [freshCompany, setFreshCompany] = useState(null);
  const currentCompany = freshCompany ?? company;
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [participantFilter, setParticipantFilter] = useState("conductor");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const sync = async () => {
      try {
        const companies = await fetchCompanies();
        const updated = companies.find((c) => c.id === company.id);
        if (updated) setFreshCompany(updated);
      } catch {
        // Silent: keep last session snapshot.
      }
    };
    sync();
  }, [company.id]);

  const handleDownload = (pdf) => {
    const link = document.createElement("a");
    link.href = pdf.url;
    link.download = pdf.name;
    link.click();

    toast({
      title: "Descarga iniciada",
      description: `Descargando ${pdf.name}`,
    });
  };

  const processedPDFs = useMemo(() => {
    const base = [...(currentCompany.pdfs || [])];
    const term = searchTerm.trim().toLowerCase();

    const filtered = base.filter((pdf) => {
      const matchesName = pdf.name.toLowerCase().includes(term);
      const docType = inferDocumentType(pdf, currentCompany.name);
      if (participantFilter === "conductor") {
        return matchesName && docType === "conductor";
      }
      if (participantFilter === "empresa") {
        return matchesName && docType === "empresa";
      }
      return false;
    });

    filtered.sort((a, b) => {
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      if (sortBy === "participants-desc") {
        return (b.participants?.length || 0) - (a.participants?.length || 0);
      }
      if (sortBy === "participants-asc") {
        return (a.participants?.length || 0) - (b.participants?.length || 0);
      }
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    });

    return filtered;
  }, [currentCompany.pdfs, participantFilter, searchTerm, sortBy]);

  const totalPages = Math.max(1, Math.ceil(processedPDFs.length / ITEMS_PER_PAGE));
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPDFs = processedPDFs.slice(pageStart, pageStart + ITEMS_PER_PAGE);
  const showingFrom = processedPDFs.length ? pageStart + 1 : 0;
  const showingTo = Math.min(pageStart + ITEMS_PER_PAGE, processedPDFs.length);

  const handleSearchChange = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const handleSortChange = (e) => { setSortBy(e.target.value); setCurrentPage(1); };
  const handleFilterChange = (e) => { setParticipantFilter(e.target.value); setCurrentPage(1); };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-4 pt-24 md:p-8 md:pt-28"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-800 rounded-xl shadow-xl p-6 mb-6 border border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              {currentCompany.logo && (
                <div className="w-20 h-20 rounded-xl bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-600 shadow-lg">
                  <img src={currentCompany.logo} alt="Logo de empresa" className="w-full h-full object-cover" />
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{currentCompany.name}</h1>
                <p className="text-slate-400">Bienvenido de nuevo, consulta tus documentos aqui</p>
              </div>
            </div>
            <Button onClick={onLogout} variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesion
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <m.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total de Documentos</p>
                <p className="text-3xl font-bold text-white mt-1">{currentCompany.pdfs?.length || 0}</p>
              </div>
              <FileText className="w-12 h-12 text-blue-200 opacity-80" />
            </div>
          </m.div>

          <m.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-200 text-sm font-medium">Estado de la cuenta</p>
                <p className="text-xl font-bold text-white mt-1">Activa</p>
              </div>
              <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
          </m.div>
        </div>

        {(currentCompany.pdfs?.length || 0) > 0 && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar documentos..."
                className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        <div className="bg-slate-800 rounded-xl shadow-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">Tus documentos</h2>
              <div className="text-sm text-slate-400">
                Mostrando {showingFrom}-{showingTo} de {processedPDFs.length}
              </div>
            </div>

            {(currentCompany.pdfs?.length || 0) > 0 && (
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_220px_230px] gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar documentos..."
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="relative">
                  <ListFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={participantFilter}
                    onChange={handleFilterChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="conductor">Conductor</option>
                    <option value="empresa">Empresa</option>
                  </select>
                </div>

                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recent">Mas recientes</option>
                  <option value="name-asc">Nombre A-Z</option>
                  <option value="name-desc">Nombre Z-A</option>
                  <option value="participants-desc">Mas participantes</option>
                  <option value="participants-asc">Menos participantes</option>
                </select>
              </div>
            )}
          </div>

          {!currentCompany.pdfs || currentCompany.pdfs.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No hay documentos disponibles</p>
              <p className="text-slate-500 text-sm mt-2">Los documentos apareceran aqui cuando el admin los suba</p>
            </div>
          ) : processedPDFs.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No se encontraron documentos</p>
              <p className="text-slate-500 text-sm mt-2">Intenta ajustar tu busqueda</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {paginatedPDFs.map((pdf, index) => (
                  <m.div
                    key={pdf.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-slate-700 rounded-xl p-5 border border-slate-600 shadow-lg flex flex-col h-full"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium truncate text-lg">{pdf.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Subido: {new Date(pdf.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {pdf.participants && pdf.participants.length > 0 && (
                      <div className="mb-4 bg-slate-800/50 rounded-lg p-3 border border-slate-600/50 flex-1 overflow-hidden flex flex-col min-h-[120px]">
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-700/50">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <Users className="w-3 h-3" /> Participantes
                          </h4>
                          <span className="text-xs bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded">
                            {pdf.participants.length}
                          </span>
                        </div>
                        <div className="overflow-y-auto space-y-1.5 pr-1 custom-scrollbar flex-1">
                          {pdf.participants.map((p) => (
                            <div key={p.id || `${p.name}-${p.rating}`} className="flex justify-between items-center text-sm bg-slate-700/30 p-1.5 rounded hover:bg-slate-700/50 transition-colors">
                              <span className="text-slate-300 truncate mr-2">{p.name}</span>
                              <div className="flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                                <Star className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                                <span className="font-mono font-bold text-emerald-400">{p.rating}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 mt-auto pt-2">
                      <Button onClick={() => setSelectedPDF(pdf)} size="sm" className="flex-1 bg-accent hover:bg-[#0199d4] shadow-md">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver PDF
                      </Button>
                      <Button onClick={() => handleDownload(pdf)} size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-600">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </m.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="px-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-sm text-slate-400">
                    Pagina {currentPage} de {totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Anterior
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-40"
                    >
                      Siguiente
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {selectedPDF && <PDFViewer pdf={selectedPDF} onClose={() => setSelectedPDF(null)} />}
    </m.div>
  );
}

export default CompanyDashboard;
