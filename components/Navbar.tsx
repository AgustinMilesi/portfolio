"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePreferences } from "@/components/PreferencesProvider";
import { PreferencesControls } from "@/components/PreferencesControls";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = usePreferences();
  const headerRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!progressBarRef.current) return;
    gsap.to(progressBarRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });
  }, { scope: headerRef });

  const subBrands = [
    { name: "vout/retail", label: t.navSubRetail, href: "#proyectos" },
    { name: "vout/inbox", label: t.navSubInbox, href: "#proyectos" },
    { name: "vout/cargo", label: t.navSubCargo, href: "#proyectos" },
    { name: "vout/pocket", label: t.navSubPocket, href: "#proyectos" },
  ];

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full bg-[#000000]/95 backdrop-blur-md border-b border-[#252525] transition-colors relative">
      {/* GSAP Scroll Progress Line (zkPass Signal Lime) */}
      <div
        ref={progressBarRef}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5ff4a] origin-left scale-x-0 pointer-events-none z-50 shadow-[0_0_8px_rgba(197,255,74,0.7)]"
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          {/* Logo Tile: 4px radius with hairline border */}
          <div className="size-9 rounded-[4px] bg-[#1f1f1f] border border-[#252525] flex items-center justify-center p-1.5 transition-transform group-hover:scale-105 shrink-0 shadow-[0_0_8px_rgba(197,255,74,0.15)]">
            <svg viewBox="68 106 416 310" className="w-full h-full" fill="none">
              <rect x="68" y="228" width="60" height="60" rx="2" fill="#e5e5e5" />
              <rect x="132" y="292" width="60" height="60" rx="2" fill="#e5e5e5" />
              <rect x="196" y="356" width="60" height="60" rx="2" fill="#e5e5e5" />
              <rect x="260" y="292" width="60" height="60" rx="2" fill="#e5e5e5" />
              <rect x="324" y="228" width="60" height="60" rx="2" fill="#c5ff4a" />
              <rect x="390" y="166" width="46" height="46" rx="2" fill="#c5ff4a" />
              <rect x="452" y="106" width="32" height="32" rx="2" fill="#c5ff4a" />
            </svg>
          </div>

          {/* Wordmark lowercase vout in editorial authority */}
          <div className="flex flex-col">
            <div className="flex items-baseline font-serif font-light text-2xl tracking-[-0.03em] leading-none select-none">
              <span className="text-[#ffffff]">v</span>
              <span className="text-[#c5ff4a] italic font-serif">out</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.22em] text-[#7a7a7a] uppercase leading-none mt-1 whitespace-nowrap">
              <span className="hidden sm:inline">PORTFOLIO · </span>AGUSTÍN MILESI
            </span>
          </div>
        </Link>

        {/* Center Sub-brand navigation (Ghost Nav Buttons: Inter Tight 13px, 500, uppercase, 0.18em tracking) */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] font-sans font-medium uppercase tracking-[0.18em]">
          {subBrands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              className="text-[#ffffff] hover:text-[#c5ff4a] transition-colors py-2"
            >
              {brand.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#proyectos"
            className="hidden md:inline-block text-[13px] font-sans font-medium uppercase tracking-[0.18em] text-[#7a7a7a] hover:text-[#ffffff] transition-colors px-2 py-2"
          >
            PROYECTOS
          </a>
          <a
            href="#trayectoria"
            className="hidden lg:inline-block text-[13px] font-sans font-medium uppercase tracking-[0.18em] text-[#7a7a7a] hover:text-[#ffffff] transition-colors px-2 py-2"
          >
            TRAYECTORIA
          </a>
          <PreferencesControls />

          {/* Signal Lime CTA Button */}
          <a
            href="#contacto"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-[4px] bg-[#c5ff4a] text-[#000000] font-sans font-medium text-[13px] uppercase tracking-[0.04em] hover:opacity-95 transition-all transform active:scale-95 shadow-[0_0_8px_rgba(197,255,74,0.45)] min-h-[40px] items-center justify-center cursor-pointer shrink-0"
          >
            {t.navContactBtn}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-[4px] bg-[#1f1f1f] border border-[#252525] text-[#ffffff] hover:text-[#c5ff4a] min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#252525] bg-[#000000] px-4 py-6 space-y-4 font-sans text-sm">
          <div className="space-y-1">
            <span className="text-[11px] font-medium uppercase text-[#7a7a7a] tracking-[0.22em] block px-2">
              [ PLATAFORMAS EN PRODUCCIÓN ]
            </span>
            {subBrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-[4px] hover:bg-[#1f1f1f] text-[#ffffff] hover:text-[#c5ff4a] min-h-[44px]"
              >
                <span className="font-mono text-xs">{brand.name}</span>
                <span className="text-xs text-[#7a7a7a]">{brand.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#252525] space-y-2">
            <a
              href="#proyectos"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-[4px] hover:bg-[#1f1f1f] text-[#7a7a7a] hover:text-[#ffffff] min-h-[44px] flex items-center text-xs uppercase tracking-[0.18em]"
            >
              Proyectos
            </a>
            <a
              href="#trayectoria"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-[4px] hover:bg-[#1f1f1f] text-[#7a7a7a] hover:text-[#ffffff] min-h-[44px] flex items-center text-xs uppercase tracking-[0.18em]"
            >
              Trayectoria
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3.5 rounded-[4px] bg-[#c5ff4a] text-[#000000] font-sans font-medium text-center uppercase tracking-[0.04em] shadow-[0_0_8px_rgba(197,255,74,0.45)] min-h-[44px] flex items-center justify-center text-xs"
            >
              Hablemos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
