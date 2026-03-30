import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function PDFViewer({ pdf, onClose }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdf.url;
    link.download = pdf.name;
    link.click();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col border border-slate-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white truncate flex-1">{pdf.name}</h3>
            <div className="flex items-center gap-2 ml-4">
              <Button onClick={handleDownload} size="sm" className="bg-accent hover:bg-[#0199d4]">
                <Download className="w-4 h-4 mr-2" />
                Descargar
              </Button>
              <Button onClick={onClose} size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden bg-slate-900 rounded-b-xl">
            {pdf.url.startsWith("data:") || pdf.url.endsWith(".pdf") ? (
              <iframe src={pdf.url} className="w-full h-full" title={pdf.name} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <ExternalLink className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Vista previa no disponible</p>
                  <Button onClick={() => window.open(pdf.url, "_blank")} className="bg-accent hover:bg-[#0199d4]">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir en nueva pestana
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PDFViewer;
