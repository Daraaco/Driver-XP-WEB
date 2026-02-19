import fondoBg from "../assets/fondo1.jpg";
import PhotoSlot from "../components/PhotoSlot";

export default function DriverXP() {
  const lessons = [
    "Manejo en condiciones climaticas adversas",
    "Distracciones al conducir",
    "Aplicacion del sistema Smith",
    "Control del exceso de velocidad",
    "Distancia de seguridad",
    "Impacto del estres en la conduccion",
    "Riesgos del consumo de sustancias psicoactivas",
    "Efectos del sueno y la fatiga",
  ];

  const metrics = [
    "Resultados individuales y grupales",
    "Historial de progreso por operador",
    "Comparativas entre conductores",
    "Metricas claras para decisiones estrategicas",
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
            <h1 className="text-4xl md:text-5xl font-extrabold">Driver XP</h1>
            <div className="w-20 h-1.5 bg-accent-blue rounded-full mt-4 mb-6" />
            <p className="text-lg text-slate-200 leading-relaxed">
              La solucion integra simulacion con realidad virtual y configuraciones con pantallas,
              adaptandose a diferentes necesidades operativas y niveles de infraestructura.
            </p>
            <p className="text-slate-300 mt-4 leading-relaxed">
              La modalidad VR ofrece experiencia inmersiva en 360 grados para escenarios reales.
              Las pantallas facilitan capacitacion grupal o presencial en entornos tradicionales.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 p-8 mb-6">
            <h2 className="text-3xl font-extrabold">Curso en seguridad vial</h2>
            <p className="text-slate-300 mt-3 mb-6">
              Programa estructurado de ocho lecciones con actividades practicas y evaluaciones.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {lessons.map((lesson) => (
                <div key={lesson} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-bold text-white">{lesson}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-white/10 bg-[#10263a]/85 p-6">
              <h3 className="text-2xl font-extrabold">Monitoreo y evaluacion en tiempo real</h3>
              <p className="text-slate-300 mt-3 leading-relaxed">
                El sistema registra el desempeno de cada conductor y permite visualizar avances con
                herramientas de administracion orientadas a resultados.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#10263a]/85 p-6">
              <h3 className="text-2xl font-extrabold">Analitica para decisiones</h3>
              <ul className="space-y-3 mt-4 text-slate-200">
                {metrics.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-blue mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 p-8 mt-6">
            <h2 className="text-3xl font-extrabold mb-5">Evidencia visual del entrenamiento</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <PhotoSlot title="Sesion VR" hint="Operador practicando en realidad virtual" />
              <PhotoSlot title="Sesion con pantallas" hint="Capacitacion grupal o presencial" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
