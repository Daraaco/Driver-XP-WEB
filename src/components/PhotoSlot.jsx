import { ImagePlus } from "lucide-react";

export default function PhotoSlot({
  title,
  hint = "Espacio para imagen",
  src = "",
  alt = "",
  ratioClass = "aspect-[16/10]",
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#10263a]/85 overflow-hidden">
      {src ? (
        <img src={src} alt={alt || title} className={`w-full object-cover ${ratioClass}`} />
      ) : (
        <div className={`${ratioClass} grid place-items-center bg-white/5 border-b border-white/10`}>
          <div className="text-center px-4">
            <ImagePlus className="w-10 h-10 mx-auto text-accent-blue/80 mb-3" />
            <p className="font-bold text-white">{title}</p>
            <p className="text-sm text-slate-400 mt-1">{hint}</p>
          </div>
        </div>
      )}
      <div className="p-4">
        <p className="text-sm font-semibold text-slate-200">{title}</p>
      </div>
    </div>
  );
}
