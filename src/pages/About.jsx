import fondoBg from "../assets/fondo1.jpg";
import PhotoSlot from "../components/PhotoSlot";

export default function About() {
  const pillars = [
    {
      title: "Entrenamiento seguro",
      text: "Desarrolla competencias sin exponer unidades reales, mercancia u operadores.",
    },
    {
      title: "Aprendizaje inmersivo",
      text: "Simulacion VR 360 y modalidad con pantallas para escenarios individuales o grupales.",
    },
    {
      title: "Evaluacion en tiempo real",
      text: "Metricas, historiales y comparativas para decisiones objetivas de capacitacion.",
    },
    {
      title: "Mejora continua",
      text: "Reportes claros y planes correctivos basados en datos reales.",
    },
  ];

  return (
    <section
      className="pt-28 pb-16 text-white min-h-[calc(100vh-80px)] bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${fondoBg})` }}
    >
      <div className="min-h-[calc(100vh-80px)] bg-[#0f1923]/75">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 backdrop-blur-sm p-8 md:p-10 mb-6">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Que es Driver XP?</h1>
            <div className="w-20 h-1.5 bg-accent-blue rounded-full mb-6" />
            <p className="text-lg text-slate-200 leading-relaxed">
              Driver XP es una plataforma tecnologica de entrenamiento para conductores de camiones
              de carga. Su objetivo es mejorar habilidades de conduccion, fortalecer conocimientos
              de seguridad vial y aumentar la capacidad de respuesta ante situaciones criticas en
              carretera.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              A traves de simulacion digital, ofrece experiencias practicas en un entorno seguro
              para que los operadores desarrollen competencias sin poner en riesgo unidades,
              mercancia o personas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {pillars.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[#10263a]/85 p-6">
                <h2 className="text-2xl font-extrabold text-white">{item.title}</h2>
                <p className="text-slate-300 mt-3 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#10263a]/85 p-8 mt-6">
            <h2 className="text-3xl font-extrabold mb-5">Galeria de contexto</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <PhotoSlot title="Centro de entrenamiento" hint="Foto del entorno de capacitacion" />
              <PhotoSlot title="Operador en simulacion" hint="Foto de uso real de Driver XP" />
              <PhotoSlot title="Equipo de monitoreo" hint="Pantallas o panel operativo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
