"use client";

import { useState } from "react";
import Link from "next/link";
import { usePreferences } from "@/components/PreferencesProvider";
import { PreferencesControls } from "@/components/PreferencesControls";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = usePreferences();

  const subBrands = [
    { name: "vout/retail", label: t.navSubRetail, href: "#proyectos" },
    { name: "vout/inbox", label: t.navSubInbox, href: "#proyectos" },
    { name: "vout/cargo", label: t.navSubCargo, href: "#proyectos" },
    { name: "vout/pocket", label: t.navSubPocket, href: "#proyectos" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-page,#0A0E14)]/90 backdrop-blur-md border-b border-[var(--border-card,#1E293B)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Official 7-Square Isotipo */}
          <div className="size-10 rounded-2xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] flex items-center justify-center p-2 shadow-sm transition-transform group-hover:scale-105 shrink-0">
            <svg viewBox="68 106 416 310" className="w-full h-full" fill="none">
              <rect x="68" y="228" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="132" y="292" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="196" y="356" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="260" y="292" width="60" height="60" rx="6" fill="#E9E7E0" />
              <rect x="324" y="228" width="60" height="60" rx="6" fill="var(--primary-accent, #C6F827)" />
              <rect x="390" y="166" width="46" height="46" rx="5" fill="var(--primary-accent, #C6F827)" />
              <rect x="452" y="106" width="32" height="32" rx="4" fill="var(--primary-accent, #C6F827)" />
            </svg>
          </div>

          {/* Wordmark lowercase vout */}
          <div className="flex flex-col">
            <div className="flex items-baseline font-black text-2xl tracking-[-0.05em] leading-none select-none">
              <span className="text-[var(--text-main,#E9E7E0)]">v</span>
              <span className="text-[var(--primary-accent,#C6F827)]">out</span>
            </div>
            <span className="text-xs font-mono tracking-wider text-[var(--text-muted,#9A9E86)] leading-none mt-1">
              PORTFOLIO / AGUSTÍN MILESI
            </span>
          </div>
        </Link>

        {/* Center Sub-brand navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] rounded-full p-1 text-xs font-mono">
          {subBrands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              className="px-3.5 py-2 rounded-full text-[var(--text-muted,#9A9E86)] hover:text-[var(--primary-accent,#C6F827)] hover:bg-[var(--bg-hover,#161F30)] transition-colors min-h-[38px] flex items-center"
            >
              {brand.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <a
            href="#manifiesto"
            className="hidden sm:inline-block text-xs font-mono text-[var(--text-muted,#9A9E86)] hover:text-[var(--text-main,#E9E7E0)] transition-colors px-3 py-2"
          >
            {t.navManifesto}
          </a>
          <a
            href="#simulador"
            className="hidden md:inline-block text-xs font-mono text-[var(--text-muted,#9A9E86)] hover:text-[var(--text-main,#E9E7E0)] transition-colors px-3 py-2"
          >
            {t.navPosSim}
          </a>
          <PreferencesControls />
          <a
            href="#contacto"
            className="px-4 py-2.5 rounded-xl bg-[var(--primary-accent,#C6F827)] text-[var(--primary-accent-text,#0A0E14)] font-black text-xs uppercase tracking-wider hover:opacity-90 transition-all transform active:scale-95 shadow-sm min-h-[42px] flex items-center justify-center cursor-pointer"
          >
            {t.navContactBtn}
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-[var(--text-main,#E9E7E0)] hover:text-[var(--primary-accent,#C6F827)] min-h-[42px] min-w-[42px] flex items-center justify-center cursor-pointer"
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
        <div className="lg:hidden border-t border-[var(--border-card,#1E293B)] bg-[var(--bg-page,#0A0E14)] px-4 py-6 space-y-4 font-mono text-sm">
          <div className="space-y-1">
            <span className="text-xs uppercase text-[var(--text-muted,#9A9E86)] tracking-widest block px-2">
              Plataformas Insignia
            </span>
            {subBrands.map((brand) => (
              <a
                key={brand.name}
                href={brand.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--bg-card,#121824)] text-[var(--text-main,#E9E7E0)] hover:text-[var(--primary-accent,#C6F827)] min-h-[44px]"
              >
                <span>{brand.name}</span>
                <span className="text-xs text-[var(--text-muted,#9A9E86)]">{brand.label}</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[var(--border-card,#1E293B)] space-y-2">
            <a
              href="#manifiesto"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-lg hover:bg-[var(--bg-card,#121824)] text-[var(--text-muted,#9A9E86)] min-h-[44px] flex items-center"
            >
              // MANIFIESTO
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-lg hover:bg-[var(--bg-card,#121824)] text-[var(--text-muted,#9A9E86)] min-h-[44px] flex items-center"
            >
              // CAJA POS
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3.5 rounded-xl bg-[var(--primary-accent,#C6F827)] text-[var(--primary-accent-text,#0A0E14)] font-black text-center uppercase min-h-[44px] flex items-center justify-center"
            >
              Hablemos
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
