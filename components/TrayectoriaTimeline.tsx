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

    // Desktop & Tablet (>= 768px): cascade cards with physical spring snap
    mm.add("(min-width: 768px)", () => {
      gsap.from(".timeline-card", {
        y: 40,
        scale: 0.92,
        opacity: 0,
        stagger: 0.14,
        duration: 0.85,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });
    });

    // Mobile (< 768px): slide in with lateral direction and tactile spring
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
        gsap.from(card, {
          x: -25,
          opacity: 0,
          scale: 0.95,
          duration: 0.65,
          ease: "power3.out",
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
    <section ref={timelineRef} id="trayectoria" className="py-14 sm:py-24 border-b border-[#252525] bg-[#060606] relative transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="timeline-heading space-y-3">
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
            [ OPERATOR TO ARCHITECT · 2021 — 2026 ]
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] leading-[0.95] text-[#ffffff]">
            De cajero de mostrador a arquitecto de{" "}
            <span className="italic font-serif text-[#c5ff4a] font-normal">
              sistemas.
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#7a7a7a] max-w-2xl leading-relaxed">
            {t.timelineDesc}
          </p>
        </div>

        {/* Timeline Grid: Sharp Content Cards, radius 0px, border #252525 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="timeline-card p-6 sm:p-7 rounded-none bg-[#1f1f1f] border border-[#252525] flex flex-col justify-between space-y-5 hover:border-[#313131] transition-colors group shadow-none"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#c5ff4a] font-bold">
                    {st.period}
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] px-2 py-0.5 rounded-[2px] bg-[#161616] border border-[#252525] text-[#7a7a7a]">
                    {st.tag}
                  </span>
                </div>

                <h3 className="font-serif font-light text-lg sm:text-xl tracking-tight text-[#ffffff] group-hover:text-[#c5ff4a] transition-colors leading-snug">
                  {st.title}
                </h3>

                <p className="text-xs font-sans text-[#7a7a7a] uppercase tracking-wider">
                  {st.role}
                </p>

                <p className="text-xs sm:text-sm text-[#e5e5e5] leading-[1.55] pt-1 font-sans">
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
