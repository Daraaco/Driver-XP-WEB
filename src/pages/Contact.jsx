import { site } from "../content/siteContent";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import fondoBg from "../assets/fondo1.jpg";
import PhotoSlot from "../components/PhotoSlot";

export default function Contact() {
  const { contact, closing } = site;

  return (
    <section
      className="pt-28 pb-16 text-white min-h-[calc(100vh-80px)] bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${fondoBg})` }}
    >
      <div className="min-h-[calc(100vh-80px)] bg-[#0f1923]/75">
        <div className="max-w-5xl mx-auto px-6 py-10 grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 backdrop-blur-sm p-8">
            <h2 className="text-3xl font-extrabold">Contacto</h2>
            <div className="w-20 h-1 bg-accent-blue rounded-full mt-4 mb-5" />

            <p className="text-slate-200 leading-relaxed">
              Si deseas implementar Driver XP en tu operacion, podemos ayudarte a definir una ruta
              de capacitacion para tu tipo de flota, nivel de riesgo y metas de seguridad vial.
            </p>

            <p className="text-slate-300 mt-4">
              Telefono: <span className="font-extrabold text-white">{contact.phone}</span>
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-blue/40 hover:bg-accent-blue/5 transition-all"
                href={contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
              >
                <FaFacebook />
                <span className="font-bold">{contact.facebookName}</span>
              </a>

              <a
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-blue/40 hover:bg-accent-blue/5 transition-all"
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
              >
                <FaInstagram />
                <span className="font-bold">@{contact.instagramHandle}</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 p-8">
            <h2 className="text-3xl font-extrabold">{closing.title}</h2>
            <div className="w-20 h-1 bg-accent-blue rounded-full mt-4 mb-5" />
            <p className="text-slate-300 leading-relaxed">{closing.text}</p>
            <p className="text-slate-300 leading-relaxed mt-4">
              Entrena sin riesgo. Evalua con datos. Reduce accidentes. Fortalece tu operacion.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 p-8">
            <h2 className="text-3xl font-extrabold mb-5">Fotos para tu presentacion comercial</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <PhotoSlot title="Instalacion o equipo" hint="Foto de infraestructura disponible" />
              <PhotoSlot title="Cliente o caso real" hint="Imagen de referencia para contacto comercial" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
