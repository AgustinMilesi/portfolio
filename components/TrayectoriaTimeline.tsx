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
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // 2. Responsive scroll choreography
    const mm = gsap.matchMedia();

    // Desktop & Tablet (>= 768px): cascade cards with physical spring snap
    mm.add("(min-width: 768px)", () => {
      gsap.from(".timeline-card", {
        y: 35,
        scale: 0.94,
        opacity: 0,
        stagger: 0.12,
        duration: 0.75,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });

    // Mobile (< 768px): slide in with lateral direction and tactile spring
    mm.add("(max-width: 767px)", () => {
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
        gsap.from(card, {
          y: 20,
          opacity: 0,
          scale: 0.96,
          duration: 0.6,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: timelineRef });

  const steps = [
    {
      period: "2023 — 2025 · FINALIZADO",
      title: "Técnico Superior en Desarrollo de Software",
      role: "Universidad Nacional de Entre Ríos (UNER)",
      description:
        "Carrera técnica finalizada. Programación estructurada y orientada a objetos, modelado de bases de datos relacionales con SQL, diseño de software y desarrollo web full-stack.",
      tag: "CARRERA TÉCNICA",
    },
    {
      period: "2024 — PRESENTE",
      title: "Desarrollo Web Full-Stack & APIs",
      role: "TypeScript · Next.js · React · Node.js",
      description:
        "Desarrollo de aplicaciones web modernas con TypeScript, React y Next.js. Creación de APIs REST, tipado estricto, autenticación y modelado de datos con PostgreSQL y Prisma ORM.",
      tag: "WEB & APIS",
    },
    {
      period: "2024 — PRESENTE",
      title: "Desarrollo Móvil Multiplataforma",
      role: "React Native · Expo · SQLite",
      description:
        "Desarrollo de aplicaciones móviles para Android con React Native y Expo. Implementación de bases de datos SQLite locales para persistencia offline y sincronización con APIs en la nube.",
      tag: "MOBILE",
    },
    {
      period: "2024 — PRESENTE",
      title: "Proyectos en Producción",
      role: "Ecosistema VOUT · Electroborr · Sombrero 3D",
      description:
        "Desarrollo y puesta en producción de sistemas reales: suites de gestión comercial y logística (VOUT), portal web para taller automotriz (Electroborr) y experiencia 3D interactiva con Three.js.",
      tag: "PROYECTOS",
    },
  ];

  return (
    <section ref={timelineRef} id="trayectoria" className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#252525] bg-[#060606] relative transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Header */}
        <div className="timeline-heading space-y-3">
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
            [ FORMACIÓN ACADÉMICA & TRAYECTORIA ]
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] leading-[0.95] text-[#ffffff]">
            Formación técnica y proyectos de{" "}
            <span className="italic font-serif text-[#c5ff4a] font-normal">
              software.
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#7a7a7a] max-w-2xl leading-relaxed">
            Técnico Superior en Desarrollo de Software (UNER). Especializado en desarrollo de software para PYMEs e independientes, con tecnologías modernas de frontend, backend y mobile.
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
