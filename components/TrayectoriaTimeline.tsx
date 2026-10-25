"use client";

export function TrayectoriaTimeline() {
  const steps = [
    {
      period: "2021 — ESTUDIOS",
      title: "Universidad Nacional de Entre Ríos (UNER)",
      role: "Ciencias de la Administración & Fundamentos de Sistemas",
      description:
        "Formación en modelos contables, auditoría de balances, optimización operativa y modelado de datos relacionales. La convicción temprana de que un software de gestión debe entender primero el libro contable antes de tirar una sola línea de código.",
      tag: "ACADEMIA & RIGOR",
    },
    {
      period: "2022 — 2023 · LA TRINCHERA",
      title: "Comercio Mayorista de Alimentos & Bebidas",
      role: "Cajero Principal & Auditor Administrativo de Salón",
      description:
        "Ocho horas diarias operando cajas registradoras reales, con filas continuas de clientes mayoristas, lectores de códigos de barra desgastados y cortes de enlace. Aquí se forjó el rechazo total al software frágil y nació el concepto de arqueo ciego y tolerancia offline.",
      tag: "OPERACIÓN REAL",
    },
    {
      period: "2024 · CONSULTORÍA & DATOS",
      title: "Automatización & Arquitectura Freelance",
      role: "Ingeniero de Software para Pymes y Logística",
      description:
        "Diseño e implementación de sistemas de despacho aduanero, pipelines de sincronización para depósitos fiscales y conciliación automática de flujos de caja. Validación de que las pymes argentinas demandan soberanía sobre sus datos.",
      tag: "INGENIERÍA A MEDIDA",
    },
    {
      period: "2025 — PRESENTE · VOUT",
      title: "Fundador & Arquitecto del Ecosistema VOUT",
      role: "VOUT Retail · Inbox (CRM & Contacto) · Cargo · Pocket",
      description:
        "Consolidación de cuatro plataformas insignia en producción bajo una única filosofía técnica: TypeScript estricto, bases de datos PostgreSQL con réplica offline en IndexedDB/SQLite, diseño brutalista de alto contraste y cero venta de datos.",
      tag: "SISTEMAS SOBERANOS",
    },
  ];

  return (
    <section id="trayectoria" className="py-16 sm:py-24 border-b border-[#1E293B] bg-[#0A0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C6F827]">
            <span className="size-2 rounded-full bg-[#C6F827]" />
            <span>// DE LA CAJA AL CÓDIGO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#E9E7E0]">
            Trayectoria del Fundador
          </h2>
          <p className="text-sm text-[#9A9E86] max-w-2xl">
            La historia de cómo la experiencia real atendiendo clientes y auditando cajas registradoras se
            transformó en una suite de software de alta exigencia.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#121824] border-2 border-[#1E293B] flex flex-col justify-between space-y-4 hover:border-[#C6F827]/60 transition-colors group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#C6F827] font-semibold">
                    {st.period}
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#0A0E14] border border-[#1E293B] text-[#9A9E86]">
                    {st.tag}
                  </span>
                </div>

                <h3 className="text-lg font-black uppercase tracking-tight text-[#E9E7E0] group-hover:text-[#C6F827] transition-colors leading-tight">
                  {st.title}
                </h3>

                <p className="text-xs font-mono text-[#9A9E86]">
                  {st.role}
                </p>

                <p className="text-xs text-[#E9E7E0]/80 leading-relaxed font-normal pt-1">
                  {st.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1E293B] flex items-center justify-between text-[10px] font-mono text-[#9A9E86]">
                <span>ETAPA 0{idx + 1}</span>
                <span className="text-[#C6F827]">✓ COMPLETADO</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
