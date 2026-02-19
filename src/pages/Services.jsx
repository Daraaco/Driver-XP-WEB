import fondoBg from "../assets/fondo1.jpg";
import PhotoSlot from "../components/PhotoSlot";

export default function Services() {
  const useCases = [
    {
      title: "Empresas de transporte de carga",
      bullets: [
        "Reducir siniestros",
        "Mejorar indicadores de seguridad",
        "Capacitar nuevos operadores",
        "Evaluar desempeno de flotillas",
      ],
    },
    {
      title: "Centros de capacitacion",
      bullets: [
        "Modernizar programas de formacion",
        "Ofrecer entrenamiento inmersivo",
        "Diferenciarse en el mercado",
        "Aumentar valor percibido",
      ],
    },
    {
      title: "Flotillas corporativas",
      bullets: [
        "Estandarizar conduccion segura",
        "Fortalecer cultura preventiva",
        "Operadores dedicados y logistica propia",
      ],
    },
    {
      title: "Empresas con alta siniestralidad",
      bullets: [
        "Detectar areas especificas de mejora",
        "Capacitacion correctiva personalizada",
        "Disminuir incidentes recurrentes",
      ],
    },
  ];

  const impactCosts = [
    "Accidentes",
    "Reparaciones",
    "Perdida de mercancia",
    "Dias de inactividad",
    "Demandas legales",
  ];

  const impactImprovements = [
    "Cultura organizacional",
    "Profesionalizacion del operador",
    "Imagen corporativa",
    "Cumplimiento normativo",
  ];

  return (
    <section
      className="pt-28 pb-16 text-white min-h-[calc(100vh-80px)] bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${fondoBg})`,
      }}
    >
      <div className="min-h-[calc(100vh-80px)] bg-[#0f1923]/75">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 backdrop-blur-sm p-8 md:p-10 mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">Servicios</h1>
            <div className="w-20 h-1.5 bg-accent-blue rounded-full mt-4 mb-6" />
            <p className="text-lg text-slate-200 leading-relaxed">
              Driver XP combina entrenamiento, evaluacion y reporteria en una sola plataforma para
              reducir riesgos operativos y fortalecer el desempeno de conductores.
            </p>
            <p className="text-slate-300 mt-4 leading-relaxed">
              La simulacion aumenta la retencion del aprendizaje, reduce la subjetividad y entrega
              metricas claras para decisiones empresariales.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 p-8 mb-6">
            <h2 className="text-3xl font-extrabold mb-5">Donde se puede implementar</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-2xl font-extrabold">{useCase.title}</h3>
                  <ul className="space-y-2 mt-4">
                    {useCase.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-slate-200">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-blue mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-white/10 bg-[#10263a]/85 p-6">
              <h2 className="text-3xl font-extrabold">Reduccion de costos por</h2>
              <ul className="space-y-3 mt-4 text-slate-200">
                {impactCosts.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#10263a]/85 p-6">
              <h2 className="text-3xl font-extrabold">Mejora en</h2>
              <ul className="space-y-3 mt-4 text-slate-200">
                {impactImprovements.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 p-8 mt-6">
            <h2 className="text-3xl font-extrabold mb-3">Reportes y cumplimiento</h2>
            <p className="text-slate-300 leading-relaxed">
              La plataforma genera reportes digitales con resultados por modulo, porcentajes de
              aprobacion, analisis de desempeno y recomendaciones de mejora. Estos reportes sirven
              como evidencia para auditorias internas y procesos de cumplimiento.
            </p>
            <p className="text-slate-300 leading-relaxed mt-3">
              Tambien facilitan la comunicacion entre empresa y operadores para una cultura de
              mejora continua basada en datos.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 p-8 mt-6">
            <h2 className="text-3xl font-extrabold mb-5">Galeria de servicios</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <PhotoSlot title="Reporte PDF profesional" hint="Ejemplo de reporte de desempeno" />
              <PhotoSlot title="Tablero de metricas" hint="Grafica o panel de resultados" />
              <PhotoSlot title="Capacitacion en campo" hint="Foto operativa con instructores" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
