"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { usePreferences } from "@/components/PreferencesProvider";

export function FooterContact() {
  const { t } = usePreferences();
  const [copied, setCopied] = useState(false);

  const email = "agusmilesi2002@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.85 },
        colors: ["#C6F827", "#E9E7E0", "#121824"],
      });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <footer id="contacto" className="bg-[#0A0E14] border-t border-[#1E293B] pt-20 pb-12 relative overflow-hidden">
      {/* Background Dither */}
      <div className="absolute inset-0 dither-canvas opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Massive Call to Action Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121824] border border-[#1E293B] text-xs font-mono text-[#9A9E86]">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)] pulse-dot" />
            <span>{t.footerBadge}</span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.05em] leading-[0.88] text-[#E9E7E0]">
            {t.footerH2.replace(/\.$/, "")}<span className="text-[var(--primary-accent,#C6F827)]">.</span>
          </h2>

          <p className="font-serif italic text-2xl sm:text-3xl text-[#9A9E86] max-w-2xl">
            {t.footerClaim}
          </p>

          <p className="text-sm sm:text-base text-[#E9E7E0]/90 max-w-2xl leading-relaxed">
            {t.footerDesc}
          </p>
        </div>

        {/* Email Copy Card & Gateway Actions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Email Box (8 cols) */}
          <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#121824] border-2 border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-[#9A9E86] uppercase block">
                {t.footerEmailTitle}
              </span>
              <p className="text-xl sm:text-2xl font-mono font-bold text-[#E9E7E0] tracking-tight">
                {email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all transform active:scale-95 flex items-center gap-2 shrink-0 ${
                copied
                  ? "bg-[#E9E7E0] text-[#0A0E14]"
                  : "bg-[var(--primary-accent,#C6F827)] text-[#0A0E14] hover:bg-white"
              }`}
            >
              {copied ? (
                <>
                  <span>{t.footerCopied}</span>
                </>
              ) : (
                <>
                  <span>{t.footerCopyBtn}</span>
                  <span>📋</span>
                </>
              )}
            </button>
          </div>

          {/* VOUT Inbox Unified Gateway Box (4 cols) */}
          <a
            href="https://saas-am.vercel.app/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#161F30] border-2 border-[#1E293B] hover:border-[var(--primary-accent,#C6F827)] flex flex-col justify-between group transition-all"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[var(--primary-accent,#C6F827)] uppercase block">
                {t.footerGatewayTitle}
              </span>
              <h3 className="text-lg font-bold text-white group-hover:text-[var(--primary-accent,#C6F827)] transition-colors">
                {t.footerGatewayH3} →
              </h3>
            </div>
            <p className="text-xs text-[#9A9E86] mt-4">
              {t.footerGatewayDesc}
            </p>
          </a>
        </div>

        {/* Directory of Ecosystem Platforms */}
        <div className="pt-8 border-t border-[#1E293B] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase text-[#C6F827]">vout/retail</p>
            <a
              href="https://milesi-erp.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#9A9E86] hover:text-[#E9E7E0] block"
            >
              milesi-erp.vercel.app ↗
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase text-[#C6F827]">vout/cargo</p>
            <a
              href="https://cargo-am.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#9A9E86] hover:text-[#E9E7E0] block"
            >
              cargo-am.vercel.app ↗
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase text-[#C6F827]">vout/inbox (CRM &amp; Contact)</p>
            <a
              href="https://saas-am.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#9A9E86] hover:text-[#E9E7E0] block"
            >
              saas-am.vercel.app ↗
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-mono uppercase text-[#C6F827]">vout/pocket</p>
            <a
              href="https://vout-web.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#9A9E86] hover:text-[#E9E7E0] block"
            >
              vout-web.vercel.app ↗
            </a>
          </div>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-8 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9A9E86]">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[#C6F827]" />
            <span>© 2026 VOUT Software Ecosystem · Agustín Milesi</span>
          </div>

          <div>
            <span>34.5453° S, 58.5284° W · BUENOS AIRES, ARGENTINA</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AgustinMilesi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C6F827] transition-colors"
            >
              GITHUB
            </a>
            <span>·</span>
            <a
              href="https://agustinmilesi-contact.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C6F827] transition-colors"
            >
              SLA 99.9%
            </a>
            <span>·</span>
            <a
              href="https://agustinmilesi-contact.vercel.app/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C6F827] transition-colors"
            >
              TÉRMINOS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
