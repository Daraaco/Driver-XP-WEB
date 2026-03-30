import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../content/siteContent";

import { FaFacebook, FaInstagram } from "react-icons/fa";

import fondoBg from "../assets/fondo1.jpg";
import vrPoster from "../assets/poster3.jpg";

// 


const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Home({ setActivePage }) {
  const { brand, contact, about, driverxp, course } = site;

  // URLs fallback (por si en siteContent aún no las tienes)
  const facebookUrl = contact?.facebookUrl || "https://www.facebook.com/";
  const instagramUrl = contact?.instagramUrl || "https://www.instagram.com/";

  // Modal video
  const [open, setOpen] = useState(false);
  const videoRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState("");
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!open || videoSrc) return undefined;

    setIsVideoLoading(true);

    import("../assets/video-driver.mp4")
      .then((module) => {
        if (!cancelled) {
          setVideoSrc(module.default);
        }
      })
      .catch((error) => {
        console.error("No se pudo cargar el video de demo:", error);
      })
      .finally(() => {
        if (!cancelled) {
          setIsVideoLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, videoSrc]);

  useEffect(() => {
    if (!open || !videoSrc) return;

    // Bloquea scroll del fondo mientras el modal de video esta abierto.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const currentVideo = videoRef.current;

    const t = setTimeout(async () => {
      try {
        if (currentVideo) {
          currentVideo.currentTime = 0;
          await currentVideo.play();
        }
      } catch (error) {
        // En navegadores con autoplay restringido, no rompemos la UI.
        console.debug("No se pudo reproducir automaticamente el video:", error);
      }
    }, 120);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev || "";
      if (currentVideo) {
        currentVideo.pause();
        currentVideo.currentTime = 0;
      }
    };
  }, [open, videoSrc]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // ==== Imágenes stock (puedes reemplazar por assets cuando quieras) ====
  const stock = {
    heroTruck:
      "https://images.unsplash.com/photo-1501706362039-c6e15d2b8b9c?auto=format&fit=crop&w=1600&q=80",
    vrPoster:
      vrPoster, // Puedes usar este asset o reemplazar por una imagen de stock
    about1:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
    about2:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    flexVR:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1400&q=80",
    flexScreens:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80",
    pdf:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    finance:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1400&q=80",
    ops:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=80",
  };

  return (
    <div
      className="min-h-screen text-slate-100 font-manrope"
      style={{
        backgroundImage: `url(${fondoBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay general estilo tech */}
      <div className="min-h-screen bg-[#0f1923]/75">
        {/* espacio para navbar fixed */}
        <div className="h-20" />

        {/* ================= HERO ================= */}
        <section className="relative pt-12 pb-20 min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
          {/* overlay gradiente */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1923] via-[#0f1923]/80 to-transparent z-10" />
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${stock.heroTruck})` }}
              aria-hidden="true"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-20 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a3ff]/10 border border-[#00a3ff]/20 text-[#00a3ff] text-xs font-extrabold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00a3ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00a3ff]"></span>
                </span>
                Tecnología de Vanguardia
              </div>

              <h2 className="text-5xl lg:text-7xl font-extrabold leading-tight text-white">
                {brand?.name || "Driver XP"}: Plataforma de entrenamiento para conductores
              </h2>

              <p className="text-xl text-slate-300 max-w-xl">
                {brand?.tagline ||
                  "Innovación en capacitación y evaluación en condiciones reales. Driver XP es una plataforma tecnológica diseñada para transformar la manera en que se capacitan los operadores de transporte de carga."}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="bg-[#00a3ff] hover:bg-[#00a3ff]/80 text-[#001a33] font-extrabold px-8 py-4 rounded-xl transition-all inline-flex items-center gap-2"
                  onClick={() => setActivePage?.("contact")}
                  type="button"
                >
                  Solicitar demostración
                  <span aria-hidden="true">→</span>
                </button>

                <button
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-extrabold px-8 py-4 rounded-xl transition-all"
                  onClick={() => setActivePage?.("services")}
                  type="button"
                >
                  Comenzar capacitación
                </button>
              </div>

              <div className="pt-2 space-y-3">
                <div className="text-slate-200">
                  Teléfono:{" "}
                  <span className="font-extrabold text-white">{contact?.phone || "844 501 4634"}</span>
                </div>

                <div className="flex gap-4 items-center">
                  <a
                    className="inline-flex items-center gap-2 text-slate-200 hover:text-white transition"
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaFacebook className="text-xl" />
                    <span className="font-bold">{contact?.facebookName || "Driver XP"}</span>
                  </a>

                  <a
                    className="inline-flex items-center gap-2 text-slate-200 hover:text-white transition"
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FaInstagram className="text-xl" />
                    <span className="font-bold">@{contact?.instagramHandle || "driver.xp"}</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: VIDEO BONITO (solo 1 video) */}
            <div className="hidden lg:block relative">
              <div className="relative z-10 rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-white/5">
                {/* Poster visual (imagen) */}
                <div
                  className="aspect-video bg-cover bg-center"
                  style={{ backgroundImage: `url(${vrPoster})` }}
                  aria-hidden="true"
                />
                {/* Overlay play */}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="absolute inset-0 grid place-items-center group"
                  aria-label="Reproducir video"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#00a3ff]/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
                    <div className="w-20 h-20 rounded-full bg-white/10 border border-white/15 grid place-items-center backdrop-blur-md group-hover:scale-105 transition">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M8.5 5.8V18.2C8.5 19 9.4 19.5 10.1 19.1L20 13C20.7 12.6 20.7 11.4 20 11L10.1 4.9C9.4 4.5 8.5 5 8.5 5.8Z"
                          fill="white"
                          opacity="0.92"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center text-sm font-extrabold text-white/90">
                      Ver demo
                    </div>
                  </div>
                </button>
              </div>

              {/* Stat card */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-[#001a33]/90 p-6 rounded-xl border border-[#00a3ff]/30 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-extrabold text-[#00a3ff]">+95%</div>
                  <div className="text-xs uppercase text-slate-400 font-extrabold tracking-tight">
                    Precisión en <br />
                    Evaluación
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ¿QUÉ ES? ================= */}
        <section id="about" className="py-24 bg-[#001a33]/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Grid imágenes */}
              <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div
                    className="aspect-square rounded-2xl bg-cover bg-center border border-white/5"
                    style={{ backgroundImage: `url(${stock.about1})` }}
                  />
                  <div className="aspect-square rounded-2xl bg-[#00a3ff]/5 border border-[#00a3ff]/20 flex flex-col items-center justify-center text-center p-6">
                    <span className="text-sm font-extrabold">100% Seguro</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center p-6">
                    <span className="text-sm font-extrabold">Data Real-Time</span>
                  </div>
                  <div
                    className="aspect-square rounded-2xl bg-cover bg-center border border-white/5"
                    style={{ backgroundImage: `url(${stock.about2})` }}
                  />
                </div>
              </div>

              {/* Texto */}
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-4xl font-extrabold text-white">
                  {about?.title || "¿Qué es Driver XP?"}
                </h2>
                <div className="w-20 h-1.5 bg-[#00a3ff] rounded-full" />

                <p className="text-lg text-slate-300 leading-relaxed">
                  {about?.text ||
                    "Un sistema integral de capacitación digital que utiliza tecnología de vanguardia para simular entornos de transporte logístico, permitiendo una formación segura, repetible y altamente efectiva para conductores profesionales."}
                </p>

                <p className="text-slate-400">
                  La plataforma educa en la toma de decisiones críticas bajo presión, reduciendo la curva de aprendizaje y elevando el estándar de seguridad en carretera.
                </p>

                <div className="pt-4 flex flex-col gap-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00a3ff] mt-2" />
                    <div>
                      <h4 className="font-extrabold text-white">Entrenamiento inmersivo</h4>
                      <p className="text-sm text-slate-400">Simulación aplicada a operación de carga.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00a3ff] mt-2" />
                    <div>
                      <h4 className="font-extrabold text-white">Escenarios de riesgo</h4>
                      <p className="text-sm text-slate-400">Práctica segura ante clima adverso y fallas.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    className="bg-white/5 hover:bg-white/10 text-white border border-white/10 font-extrabold px-6 py-3 rounded-xl transition-all"
                    type="button"
                    onClick={() => setActivePage?.("driverxp")}
                  >
                    Conocer DriverXP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MODALIDADES ================= */}
        <section id="flexibility" className="py-24 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              {driverxp?.title || "Flexibilidad en la capacitación"}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Modalidades diseñadas para integrarse a tu infraestructura: VR o pantallas múltiples.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            {/* VR */}
            <div
              className={[
                "rounded-3xl p-8 transition-all",
                "bg-[#001a33]/60 backdrop-blur-xl border border-white/10",
                "hover:-translate-y-1 hover:border-[#00a3ff]/60 hover:shadow-[0_25px_80px_rgba(0,163,255,0.18)]",
              ].join(" ")}
            >
              <h3 className="text-2xl font-extrabold text-white mb-4">
                {driverxp?.vrTitle || "Realidad Virtual (VR)"}
              </h3>

              <p className="text-slate-400 mb-6">
                {driverxp?.vrText ||
                  "Entrenamiento inmersivo en 360° con escenarios realistas para desarrollar reflejos y toma de decisiones."}
              </p>

              <div
                className="aspect-video rounded-xl overflow-hidden bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: `url(${stock.flexVR})` }}
              />
            </div>

            {/* Pantallas */}
            <div
              className={[
                "rounded-3xl p-8 transition-all",
                "bg-[#001a33]/60 backdrop-blur-xl border border-white/10",
                "hover:-translate-y-1 hover:border-[#00a3ff]/60 hover:shadow-[0_25px_80px_rgba(0,163,255,0.18)]",
              ].join(" ")}
            >
              <h3 className="text-2xl font-extrabold text-white mb-4">
                {driverxp?.screenTitle || "Simulador de Pantallas"}
              </h3>

              <p className="text-slate-400 mb-6">
                {driverxp?.screenText ||
                  "Simulación visual en pantallas grandes para capacitación presencial o grupal con métricas por sesión."}
              </p>

              <div
                className="aspect-video rounded-xl overflow-hidden bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"
                style={{ backgroundImage: `url(${stock.flexScreens})` }}
              />
            </div>
          </div>
        </section>

        {/* ================= CURSO ================= */}
        <section id="course" className="py-24 bg-[#0f1923]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-extrabold text-white mb-4">
                  {course?.title || "Curso en Seguridad Vial"}
                </h2>
                <p className="text-slate-400 max-w-xl">
                  {course?.subtitle ||
                    "Nuestro plan de estudios cubre los 8 pilares fundamentales para la prevención de siniestros en carretera."}
                </p>
              </div>

              <div className="px-6 py-2 rounded-full border border-[#00a3ff] text-[#00a3ff] text-sm font-extrabold">
                8 módulos
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(course?.lessons || []).map((lesson) => (
                <div
                  key={lesson}
                  className="group p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-[#00a3ff]/5 transition-all"
                >
                  <div className="text-[#00a3ff] mb-4 text-xl">●</div>
                  <h4 className="font-extrabold text-white mb-2">{lesson}</h4>
                  <p className="text-xs text-slate-400">
                    Contenido práctico y evaluable con enfoque en prevención.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MONITOREO ================= */}
        <section id="monitoring" className="py-24 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-[#00a3ff]/5 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            {/* left */}
            <div className="space-y-8">
              <h2 className="text-4xl font-extrabold text-white">
                Monitoreo y evaluación en tiempo real
              </h2>
              <p className="text-lg text-slate-300">
                El desempeño del conductor se registra en tiempo real, permitiendo
                seguimiento individual y grupal mediante reportes y métricas.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Analítica predictiva",
                    desc: "Detecta patrones de riesgo.",
                  },
                  {
                    title: "Feedback inmediato",
                    desc: "Reportes automáticos por sesión.",
                  },
                  {
                    title: "Gestión centralizada",
                    desc: "Panel para flota y desempeño.",
                  },
                ].map((x) => (
                  <div key={x.title} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-9 h-9 rounded-lg bg-[#00a3ff]/10 border border-[#00a3ff]/20 shrink-0" />
                    <div>
                      <h4 className="text-white font-extrabold">{x.title}</h4>
                      <p className="text-sm text-slate-400">{x.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* right dashboard */}
            <div className="relative">
              <div className="bg-[#121c26] border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-sm font-extrabold text-white">Dashboard</div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="h-32 w-full bg-gradient-to-t from-[#00a3ff]/20 to-transparent border-b border-[#00a3ff]/30 relative overflow-hidden rounded-xl">
                    <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 400 100">
                      <path
                        d="M0 80 Q 50 20, 100 70 T 200 30 T 300 60 T 400 10"
                        fill="none"
                        stroke="#00a3ff"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-400 uppercase font-extrabold">
                        Tiempo de reacción
                      </div>
                      <div className="text-2xl font-extrabold text-white">0.42s</div>
                      <div className="text-[10px] text-green-400">Mejor que el promedio</div>
                    </div>

                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-xs text-slate-400 uppercase font-extrabold">
                        Frenado brusco
                      </div>
                      <div className="text-2xl font-extrabold text-white">2.4 / h</div>
                      <div className="text-[10px] text-red-400">Requiere atención</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== NUEVO: Identificación de áreas de oportunidad ===== */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-extrabold text-white mb-2">
                  Identificación de áreas de oportunidad
                </h3>
                <p className="text-slate-400 text-sm">
                  Driver XP detecta errores y patrones específicos por operador y por grupo, permitiendo capacitación correctiva personalizada.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {["Distracciones", "Distancia de seguridad", "Exceso de velocidad", "Reacción ante riesgo"].map((t) => (
                    <div key={t} className="rounded-xl bg-black/20 border border-white/5 px-3 py-2">
                      <span className="text-white/90 font-bold">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENEFICIOS ================= */}
        <section id="benefits" className="py-24 bg-[#001a33] text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4">Beneficios clave</h2>
              <p className="text-slate-400">Impacto directo en seguridad y operación.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Reducción de riesgos", desc: "Minimiza siniestros y protege la vida y activos." },
                { title: "Capacitación continua", desc: "Formación constante sin detener operación." },
                { title: "Flexibilidad VR y pantallas", desc: "Se adapta a tu infraestructura." },
                { title: "Monitoreo efectivo", desc: "Decisiones basadas en datos reales." },
              ].map((b) => (
                <div key={b.title} className="text-center space-y-4 rounded-2xl bg-white/5 border border-white/10 p-6">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#00a3ff]/20 border border-[#00a3ff]/20" />
                  <h4 className="text-lg font-extrabold">{b.title}</h4>
                  <p className="text-sm text-slate-400">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= NUEVO: SIMULACIÓN VS TRADICIONAL ================= */}
        <section id="simulacion" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                La evolución del entrenamiento en seguridad vial
              </h2>
              <p className="text-slate-400 max-w-3xl mx-auto">
                La capacitación tradicional basada únicamente en teoría ya no es suficiente para enfrentar los riesgos reales en carretera.
                Driver XP transforma el aprendizaje en una experiencia práctica, medible y altamente efectiva.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Menor riesgo",
                  bullets: [
                    "No se pone en peligro al operador",
                    "No se arriesgan unidades reales",
                    "No se compromete mercancía",
                    "Se recrean situaciones extremas sin consecuencias reales",
                  ],
                },
                {
                  title: "Mayor retención del aprendizaje",
                  bullets: [
                    "Escenarios críticos y decisiones en tiempo real",
                    "Consecuencias simuladas y aprendizaje profundo",
                    "Interiorización de mejores prácticas",
                  ],
                },
                {
                  title: "Aprendizaje práctico y toma de decisiones",
                  bullets: ["Simulaciones reales", "Evaluaciones interactivas", "Escenarios de riesgo", "Análisis de decisiones"],
                },
                {
                  title: "Evaluación objetiva basada en datos",
                  bullets: ["Métricas claras", "Calificaciones automáticas", "Historial de desempeño", "Comparativas entre operadores"],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl p-8 bg-white/5 border border-white/10 hover:border-[#00a3ff]/40 hover:shadow-[0_25px_80px_rgba(0,163,255,0.12)] transition-all"
                >
                  <h3 className="text-2xl font-extrabold text-white mb-4">{card.title}</h3>
                  <ul className="space-y-2 text-slate-300">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 w-2 h-2 rounded-full bg-[#00a3ff] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= NUEVO: CASOS DE USO ================= */}
        <section id="casos" className="py-24 bg-[#001a33]/20 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Diseñado para diferentes necesidades del sector transporte
              </h2>
              <p className="text-slate-400 max-w-3xl mx-auto">
                Driver XP se adapta a distintos perfiles y objetivos: desde capacitación inicial hasta corrección y reducción de siniestralidad.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Empresas de transporte de carga",
                  bullets: ["Reducir siniestros", "Mejorar indicadores de seguridad", "Capacitar nuevos operadores", "Evaluar desempeño de flotillas"],
                },
                {
                  title: "Centros de capacitación",
                  bullets: ["Modernizar programas de formación", "Ofrecer entrenamiento inmersivo", "Diferenciarse", "Aumentar valor percibido"],
                },
                {
                  title: "Flotillas corporativas",
                  bullets: ["Estandarizar procesos de conducción segura", "Fortalecer cultura preventiva", "Operadores dedicados y logística propia"],
                },
                {
                  title: "Empresas con alta siniestralidad",
                  bullets: ["Detectar áreas específicas de mejora", "Capacitación correctiva personalizada", "Operadores con historial de incidentes"],
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl p-8 bg-white/5 border border-white/10 hover:border-[#00a3ff]/40 transition-all"
                >
                  <h3 className="text-2xl font-extrabold text-white mb-4">{card.title}</h3>
                  <ul className="space-y-2 text-slate-300">
                    {card.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span className="mt-2 w-2 h-2 rounded-full bg-[#00a3ff] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= NUEVO: REPORTES PDF ================= */}
        <section id="reportes" className="py-24">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-white">
                Reportes inteligentes y personalizados para cada empresa
              </h2>
              <p className="text-slate-400">
                Uno de los grandes diferenciadores de Driver XP es la generación de reportes claros, visuales y profesionales para cada sesión y cada operador.
              </p>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h3 className="text-xl font-extrabold text-white mb-3">Incluyen</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-slate-300">
                  {[
                    "Calificación por módulo",
                    "Resultados por simulación",
                    "Porcentaje de aprobación",
                    "Áreas de oportunidad detectadas",
                    "Comparativa individual y grupal",
                    "Historial de desempeño",
                  ].map((t) => (
                    <div key={t} className="rounded-xl bg-black/20 border border-white/5 px-3 py-2">
                      <span className="font-bold text-white/90">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
                <h3 className="text-xl font-extrabold text-white mb-3">Ventaja competitiva</h3>
                <ul className="space-y-2 text-slate-300">
                  {[
                    "Reporte en formato PDF profesional",
                    "Explicación clara de la calificación obtenida",
                    "Justificación del resultado",
                    "Identificación de errores cometidos",
                    "Recomendaciones de mejora",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-[#00a3ff] shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-400 mt-4">
                  Evidencia documentada para auditorías internas o externas.
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
              <div
                className="aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url(${stock.pdf})` }}
                aria-hidden="true"
              />
              <div className="p-6">
                <div className="text-white font-extrabold">Vista previa del reporte</div>
                <div className="text-slate-400 text-sm mt-2">
                  Reemplaza esta imagen por una captura real cuando la tengas.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= NUEVO: IMPACTO FINANCIERO ================= */}
        <section id="impacto" className="py-24 bg-[#001a33] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-extrabold text-white mb-4">Impacto financiero y operativo real</h2>
              <p className="text-slate-400 max-w-3xl mx-auto">
                Driver XP no solo capacita. Protege la operación y reduce pérdidas derivadas de incidentes.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-3xl p-8 bg-white/5 border border-white/10">
                <h3 className="text-2xl font-extrabold text-white mb-4">Reducción de costos por</h3>
                <ul className="space-y-2 text-slate-300">
                  {["Accidentes", "Reparaciones", "Pérdida de mercancía", "Días de inactividad", "Demandas legales"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-[#00a3ff] shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl p-8 bg-white/5 border border-white/10">
                <h3 className="text-2xl font-extrabold text-white mb-4">Mejora en</h3>
                <ul className="space-y-2 text-slate-300">
                  {["Cultura organizacional", "Profesionalización del operador", "Imagen corporativa", "Cumplimiento normativo"].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-[#00a3ff] shrink-0" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10 grid lg:grid-cols-3 gap-6">
              <div
                className="rounded-3xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${stock.finance})` }} />
                <div className="p-6">
                  <div className="text-white font-extrabold">Menos pérdidas</div>
                  <div className="text-slate-400 text-sm mt-2">Reduce impactos por incidentes y paros.</div>
                </div>
              </div>

              <div
                className="rounded-3xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${stock.ops})` }} />
                <div className="p-6">
                  <div className="text-white font-extrabold">Mejor operación</div>
                  <div className="text-slate-400 text-sm mt-2">Estandariza procesos y eleva el desempeño.</div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-white font-extrabold">Decisiones con datos</div>
                <div className="text-slate-400 text-sm mt-2">
                  Evalúa con evidencia, no con percepción.
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {["Comparativas", "Historial", "Métricas", "Recomendaciones"].map((t) => (
                    <div key={t} className="rounded-xl bg-black/20 border border-white/5 px-3 py-2 text-sm text-white/90 font-bold">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="relative bg-[#00a3ff] rounded-[3rem] p-12 lg:p-20 overflow-hidden">
              <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12 translate-x-20 pointer-events-none" />

              <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-[#001a33] mb-6">
                  Driver XP no es solo una herramienta de capacitación.
                  <br />
                  Es una solución estratégica para transformar la seguridad vial de tu empresa.
                </h2>

                <div className="text-[#001a33]/85 text-lg mb-10 leading-relaxed font-bold space-y-1">
                  <div>Entrena sin riesgo.</div>
                  <div>Evalúa con datos.</div>
                  <div>Reduce accidentes.</div>
                  <div>Fortalece tu operación.</div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    className="bg-[#001a33] text-white px-8 py-4 rounded-xl font-extrabold hover:scale-[1.03] transition-all"
                    onClick={() => setActivePage?.("contact")}
                    type="button"
                  >
                    Solicitar demo
                  </button>

                  <button
                    className="bg-transparent border-2 border-[#001a33]/20 text-[#001a33] px-8 py-4 rounded-xl font-extrabold hover:bg-[#001a33]/5 transition-all"
                    onClick={() => setActivePage?.("contact")}
                    type="button"
                  >
                    Contactar ventas
                  </button>
                </div>
              </div>

              <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 text-[#001a33]/10 text-[180px] select-none">
                DX
              </div>
            </div>
          </div>
        </section>

        {/* ================= MODAL VIDEO ================= */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm grid place-items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
            >
              <motion.div
                className="w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 bg-[#001a33]/95 shadow-[0_35px_120px_rgba(0,0,0,0.55)] relative"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition grid place-items-center font-extrabold text-white"
                  aria-label="Cerrar"
                >
                  ✕
                </button>

                <div className="aspect-video bg-black">
                  {videoSrc ? (
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      poster={vrPoster}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="grid h-full place-items-center px-6 text-center text-white/75">
                      {isVideoLoading ? "Cargando demo en video..." : "Preparando demo..."}
                    </div>
                  )}
                </div>

                <div className="p-4 text-center text-white/70 text-sm font-bold">
                  Presiona <span className="text-white">ESC</span> para cerrar
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
