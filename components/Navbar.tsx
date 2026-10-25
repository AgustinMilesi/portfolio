"use client";

import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const subBrands = [
    { name: "vout/retail", label: "Retail POS", href: "#proyectos" },
    { name: "vout/inbox", label: "CRM & Contacto", href: "#proyectos" },
    { name: "vout/cargo", label: "Logística Freight", href: "#proyectos" },
    { name: "vout/pocket", label: "Finanzas Web", href: "#proyectos" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0E14]/90 backdrop-blur-md border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Official 7-Square Isotipo */}
          <div className="size-10 rounded-2xl bg-[#121824] border border-[#1E293B] flex items-center justify-center p-2 shadow-sm transition-transform group-hover:scale-105 shrink-0">
            <svg viewBox="68 106 416 310" className="w-full h-full" fill="none">
              <rect x="68" y="228" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="132" y="292" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="196" y="356" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="260" y="292" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="324" y="228" width="60" height="60" rx="6" fill="#C6F827" />
              <rect x="390" y="166" width="46" height="46" rx="5" fill="#C6F827" />
              <rect x="452" y="106" width="32" height="32" rx="4" fill="#C6F827" />
            </svg>
          </div>

          {/* Wordmark lowercase vout */}
          <div className="flex flex-col">
            <div className="flex items-baseline font-black text-2xl tracking-[-0.05em] leading-none select-none">
              <span className="text-[#E9E7E0]">v</span>
              <span className="text-[#C6F827]">out</span>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-[#9A9E86] leading-none mt-1">
              PORTFOLIO / AGUSTÍN MILESI
            </span>
          </div>
        </Link>

        {/* Center Sub-brand navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121824] border border-[#1E293B] rounded-full p-1 text-xs font-mono">
          {subBrands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              className="px-3 py-1.5 rounded-full text-[#9A9E86] hover:text-[#C6F827] hover:bg-[#161F30] transition-colors"
            >
              {brand.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <a
            href="#manifiesto"
            className="hidden sm:inline-block text-xs font-mono text-[#9A9E86] hover:text-[#E9E7E0] transition-colors px-3 py-2"
          >
            // MANIFIESTO
          </a>
          <a
            href="#simulador"
            className="hidden md:inline-block text-xs font-mono text-[#9A9E86] hover:text-[#E9E7E0] transition-colors px-3 py-2"
          >
            // CAJA POS
          </a>
          <a
            href="#contacto"
            className="px-4 py-2 rounded-xl bg-[#C6F827] text-[#0A0E14] font-black text-xs uppercase tracking-wider hover:bg-white transition-all transform active:scale-95 shadow-sm"
          >
            Hablemos.
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#121824] border border-[#1E293B] text-[#E9E7E0] hover:text-[#C6F827]"
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
        <div className="lg:hidden border-t border-[#1E293B] bg-[#0A0E14] px-4 py-6 space-y-4 font-mono text-sm">
          <div className="space-y-1">
            <span className="text-[10px] uppercase text-[#9A9E86] tracking-widest block px-2">
              Plataformas Insignia
            </span>
            {subBrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#121824] text-[#E9E7E0] hover:text-[#C6F827]"
              >
                <span>{brand.name}</span>
                <span className="text-xs text-[#9A9E86]">{brand.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#1E293B] space-y-2">
            <a
              href="#manifiesto"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg hover:bg-[#121824] text-[#9A9E86]"
            >
              // MANIFIESTO
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg hover:bg-[#121824] text-[#9A9E86]"
            >
              // CAJA POS
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl bg-[#C6F827] text-[#0A0E14] font-black text-center uppercase"
            >
              Hablemos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
