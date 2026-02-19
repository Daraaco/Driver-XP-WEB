import { useRef, useState } from "react";
import { Building2, Image as ImageIcon, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

function AddCompanyDialog({ open, onOpenChange, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    logo: null,
  });
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: "", username: "", password: "", logo: null });
    onOpenChange(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Archivo demasiado grande",
        description: "La imagen del logo debe ser menor a 5MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setFormData((prev) => ({ ...prev, logo: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="w-5 h-5 text-purple-400" />
            Agregar nueva empresa
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileInputRef.current?.click()}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
                className={cn(
                  "w-24 h-24 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden transition-all",
                  formData.logo
                    ? "border-purple-500 bg-slate-900"
                    : "border-slate-600 bg-slate-700/50 hover:border-purple-500 hover:bg-slate-700"
                )}
              >
                {formData.logo ? (
                  <img src={formData.logo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2">
                    <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                    <span className="text-[10px] text-slate-400">Subir logo</span>
                  </div>
                )}
              </div>

              {formData.logo && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeLogo();
                  }}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white shadow-lg hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoSelect} className="hidden" />
            </div>
          </div>

          <div>
            <label htmlFor="add-company-name" className="block text-sm font-medium text-slate-300 mb-2">Nombre de la empresa</label>
            <input
              id="add-company-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Ej. Acme Corporation"
              required
            />
          </div>

          <div>
            <label htmlFor="add-company-username" className="block text-sm font-medium text-slate-300 mb-2">Usuario</label>
            <input
              id="add-company-username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Ej. acme"
              required
            />
          </div>

          <div>
            <label htmlFor="add-company-password" className="block text-sm font-medium text-slate-300 mb-2">Contrasena</label>
            <input
              id="add-company-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Ingresa una contrasena"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={() => onOpenChange(false)} variant="outline" className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-accent hover:bg-[#0199d4]">
              Agregar empresa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddCompanyDialog;
