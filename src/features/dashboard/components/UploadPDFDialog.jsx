import { useRef, useState } from "react";
import { FileText, Plus, Trash2, Users, X, Upload, UploadCloud as CloudUpload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

function UploadPDFDialog({ open, onOpenChange, company, onUpload }) {
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [participants, setParticipants] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentRating, setCurrentRating] = useState("");

  const resetForm = () => {
    setFileName("");
    setFileUrl("");
    setSelectedFile(null);
    setParticipants([]);
    setCurrentName("");
    setCurrentRating("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileName) {
      toast({
        title: "Falta informacion",
        description: "Ingresa un nombre para el documento",
        variant: "destructive",
      });
      return;
    }
    if (!selectedFile && !fileUrl) {
      toast({
        title: "Falta el PDF",
        description: "Sube un archivo PDF o proporciona una URL directa",
        variant: "destructive",
      });
      return;
    }

    onUpload({
      name: fileName,
      url: fileUrl,
      file: selectedFile,
      participants,
    });
    resetForm();
    onOpenChange(false);
  };

  const processFile = (file) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({
        title: "Tipo de archivo invalido",
        description: "Selecciona un archivo PDF",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setFileUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const clearFile = () => {
    setFileName("");
    setFileUrl("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addParticipant = () => {
    if (!currentName || !currentRating) {
      toast({
        title: "Faltan datos",
        description: "Ingresa nombre y puntuacion",
        variant: "destructive",
      });
      return;
    }
    setParticipants((prev) => [...prev, { id: Date.now(), name: currentName, rating: currentRating }]);
    setCurrentName("");
    setCurrentRating("");
  };

  const removeParticipant = (id) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Upload className="w-5 h-5 text-emerald-400" />
            Subir PDF para {company?.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <label htmlFor="upload-pdf-file" className="block text-sm font-medium text-slate-300">Documento PDF</label>

            {!selectedFile ? (
              <div
                role="button"
                tabIndex={0}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
                className={cn(
                  "relative group flex flex-col items-center justify-center w-full px-4 py-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
                  isDragging
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-slate-600 bg-slate-900/50 hover:bg-slate-800 hover:border-emerald-500/50"
                )}
              >
                <input id="upload-pdf-file" ref={fileInputRef} type="file" accept=".pdf" onChange={(e) => processFile(e.target.files[0])} className="hidden" />

                <div className="p-4 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors mb-4 ring-1 ring-white/10">
                  <CloudUpload
                    className={cn(
                      "w-8 h-8 transition-colors",
                      isDragging ? "text-emerald-400" : "text-slate-400 group-hover:text-emerald-400"
                    )}
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm font-medium text-slate-200">Haz clic para subir o arrastra y suelta</p>
                  <p className="text-xs text-slate-500 mt-1">Solo archivos PDF</p>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl group">
                <div className="p-2.5 bg-emerald-500/20 rounded-lg mr-3">
                  <FileText className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-emerald-100 truncate">{fileName}</p>
                  <p className="text-xs text-emerald-400/70 mt-0.5">Listo para subir</p>
                </div>
                <button
                  type="button"
                  onClick={clearFile}
                  className="p-1.5 rounded-lg text-emerald-400/60 hover:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all mb-2"
                placeholder="Nombre del documento (Ej. Reporte Q1)"
                required
              />
              <input
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-xs"
                placeholder="O ingresa URL directa del PDF..."
              />
            </div>
          </div>

          <div className="space-y-4 p-5 bg-slate-900/50 rounded-xl border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" /> Participantes y puntuaciones
            </h3>

            <div className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={currentName}
                  onChange={(e) => setCurrentName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nombre del participante"
                />
              </div>
              <div className="w-24">
                <input
                  type="text"
                  value={currentRating}
                  onChange={(e) => setCurrentRating(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Puntaje"
                />
              </div>
              <Button type="button" onClick={addParticipant} size="icon" className="bg-accent hover:bg-[#0199d4] shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {participants.length > 0 ? (
              <div className="mt-2 space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                {participants.map((p) => (
                  <div key={p.id} className="flex items-center justify-between bg-slate-800 p-2.5 rounded-lg border border-slate-700 group">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs font-bold text-slate-300">
                        {p.name.charAt(0)}
                      </div>
                      <span className="text-sm text-slate-200 font-medium">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-sm font-mono font-bold text-emerald-400">{p.rating}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeParticipant(p.id)}
                        className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500 text-xs italic border-2 border-dashed border-slate-800 rounded-lg">
                Aun no hay participantes agregados
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" onClick={() => onOpenChange(false)} variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700">
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!fileName}
              className="flex-1 bg-accent hover:bg-[#0199d4] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-4 h-4 mr-2" />
              Subir documento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPDFDialog;
