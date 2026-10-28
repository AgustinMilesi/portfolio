"use client";

import { useRef } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function HeroSection() {
  const { t } = usePreferences();
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(".hero-badge", {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
      clearProps: "all",
    })
      .from(".hero-title-line-1", {
        yPercent: 115,
        duration: 0.85,
        ease: "power4.out",
        clearProps: "all",
      }, "-=0.25")
      .from(".hero-title-line-2", {
        yPercent: 115,
        duration: 0.85,
        ease: "power4.out",
        clearProps: "all",
      }, "-=0.65")
      .from(".hero-claim", {
        yPercent: 100,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "all",
      }, "-=0.5")
      .from(".manifesto-card", {
        y: 25,
        opacity: 0,
        stagger: 0.15,
        duration: 0.75,
        ease: "power2.out",
        clearProps: "all",
      }, "-=0.4");
  }, { scope: heroRef });

  return (
    <>
      <section ref={heroRef} className="relative pt-6 pb-10 sm:pt-12 sm:pb-12 bg-[#060606] transition-colors overflow-hidden">
        {/* Pointillist Dotted Backdrop Visual (zkPass pointillism: 1.5px white dots floating on #060606 canvas) */}
        <div className="absolute inset-0 pointer-events-none opacity-30 select-none overflow-hidden">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="zkpass-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#ffffff" opacity="0.6" />
                <circle cx="16" cy="16" r="0.75" fill="#ffffff" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zkpass-dots)" />
          </svg>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
          {/* Eyebrow Bracket Label: Inter Tight 11px weight 500, 0.22em tracking, color #7a7a7a */}
          <div className="flex items-center">
            <div className="hero-badge font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
              [ TÉCNICO EN DESARROLLO DE SOFTWARE (UNER) · AUXILIAR ADMINISTRATIVO · VICENTE LÓPEZ ]
            </div>
          </div>

          {/* Display Headline: PT Serif weight 300, -0.03em tracking, tight line-height, with single italic lime accent */}
          <div className="space-y-3 sm:space-y-4 max-w-5xl">
            <div className="overflow-hidden">
              <h1 className="hero-title-line-1 font-serif font-light text-3xl sm:text-5xl md:text-6xl lg:text-[76px] tracking-[-0.03em] leading-[0.92] text-[#ffffff]">
                Software de gestión que entiende la
              </h1>
            </div>
            <div className="overflow-hidden">
              <div className="hero-title-line-2 font-serif font-light text-3xl sm:text-5xl md:text-6xl lg:text-[76px] tracking-[-0.03em] leading-[0.92]">
                <span className="italic font-serif text-[#c5ff4a] font-normal">
                  operación.
                </span>
              </div>
            </div>

            <div className="overflow-hidden pt-2 sm:pt-3">
              <p className="hero-claim font-sans text-sm sm:text-base text-[#e5e5e5] max-w-xl leading-[1.55] font-normal">
                «Entra el caos. Sale el dato.» Herramientas de retail y logística diseñadas desde el mostrador para operaciones sin tolerancia a fallas.
              </p>
            </div>
          </div>

          {/* Sharp Content Cards: Background #1f1f1f, 1px border #252525, padding 32-40px, radius 0px */}
          <div id="manifiesto" className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 border-t border-[#252525]">
            <div className="manifesto-card p-6 sm:p-8 bg-[#1f1f1f] border border-[#252525] rounded-none space-y-3 hover:border-[#313131] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
                  [ EXPERIENCIA OPERATIVA EN MOSTRADOR ]
                </span>
                <span className="font-mono text-[10px] text-[#7a7a7a]">B 01</span>
              </div>
              <p className="font-sans text-sm text-[#e5e5e5] leading-[1.55] font-normal">
                {t.heroPillar1Desc1}
              </p>
            </div>

            <div className="manifesto-card p-6 sm:p-8 bg-[#1f1f1f] border border-[#252525] rounded-none space-y-3 hover:border-[#313131] transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
                  [ EL PRINCIPIO DE INGENIERÍA VOUT ]
                </span>
                <span className="font-mono text-[10px] text-[#7a7a7a]">B 02</span>
              </div>
              <p className="font-sans text-sm text-[#e5e5e5] leading-[1.55] font-normal">
                {t.heroPillar2Desc1}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Neon Section Divider: Full-width 6px solid #c5ff4a bar separating major page sections */}
      <div className="w-full h-1.5 bg-[#c5ff4a] shadow-[0_0_12px_rgba(197,255,74,0.6)]" />
    </>
  );
}
