"use client";

import { useRef } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function TrayectoriaTimeline() {
  const { t } = usePreferences();
  const timelineRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. Heading scroll reveal
    gsap.from(".timeline-heading", {
      y: 25,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    // 2. Responsive scroll choreography (PC grid stagger vs Cellular item-by-item)
    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 768px): cascade cards together when section is in view
    mm.add("(min-width: 768px)", () => {
      gsap.from(".timeline-card", {
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    });

    // Mobile (< 768px): each card reveals as the user slides down to it
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
        gsap.from(card, {
          y: 25,
          opacity: 0,
          scale: 0.96,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: timelineRef });

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
    <section ref={timelineRef} id="trayectoria" className="py-12 sm:py-16 border-b border-[var(--border-card,#1E293B)] bg-[var(--bg-page,#0A0E14)] relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="timeline-heading space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--bg-card,#121824)] text-[var(--primary-accent,#C6F827)] border border-[var(--border-card,#1E293B)]">
            <span>{t.timelineBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-main,#E9E7E0)]">
            {t.timelineTitle}
          </h2>
          <p className="text-sm text-[var(--text-muted,#9A9E86)] max-w-2xl">
            {t.timelineDesc}
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="timeline-card p-5 sm:p-6 rounded-2xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] flex flex-col justify-between space-y-4 hover:border-[var(--primary-accent,#C6F827)]/60 transition-colors group shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--primary-accent,#C6F827)] font-bold">
                    {st.period}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--bg-page,#0A0E14)] border border-[var(--border-card,#1E293B)] text-[var(--text-muted,#9A9E86)]">
                    {st.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold uppercase tracking-tight text-[var(--text-main,#E9E7E0)] group-hover:text-[var(--primary-accent,#C6F827)] transition-colors leading-snug">
                  {st.title}
                </h3>

                <p className="text-xs font-mono text-[var(--text-muted,#9A9E86)]">
                  {st.role}
                </p>

                <p className="text-xs text-[var(--text-main,#E9E7E0)]/85 leading-relaxed pt-1">
                  {st.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
