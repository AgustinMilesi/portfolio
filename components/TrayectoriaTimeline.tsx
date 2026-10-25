"use client";

import { usePreferences } from "@/components/PreferencesProvider";

export function TrayectoriaTimeline() {
  const { t } = usePreferences();

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
      period: "2022 — 2023 · OPERACIÓN COMERCIAL",
      title: "Comercio Minorista & Mayorista de Alto Flujo",
      role: "Cajero de Salón & Auditor Administrativo",
      description:
        "Operación continua en líneas de caja registradora de alta exigencia diaria. Experiencia en el mostrador frente a los cuellos de botella reales: lectores láser con fallas de lectura, filas de clientes y caídas imprevistas de red. Esa práctica motivó la creación de VOUT con arqueos ciegos y tolerancia offline estricta.",
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
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--primary-accent,#C6F827)]">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)]" />
            <span>{t.timelineBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#E9E7E0]">
            {t.timelineTitle}
          </h2>
          <p className="text-sm text-[#9A9E86] max-w-2xl">
            {t.timelineDesc}
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
                <span>{t.timelineStage} 0{idx + 1}</span>
                <span className="text-[var(--primary-accent,#C6F827)]">{t.timelineDone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
