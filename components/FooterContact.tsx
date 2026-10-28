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
    <footer id="contacto" className="bg-[var(--bg-page,#0A0E14)] border-t border-[var(--border-card,#1E293B)] pt-20 pb-12 relative overflow-hidden transition-colors">
      {/* Background Dither */}
      <div className="absolute inset-0 dither-canvas opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Massive Call to Action Header */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-xs font-mono text-[var(--text-muted,#9A9E86)] shadow-xs">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)] pulse-dot" />
            <span className="font-semibold">{t.footerBadge}</span>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[-0.05em] leading-[0.88] text-[var(--text-main,#E9E7E0)]">
            {t.footerH2.replace(/\.$/, "")}<span className="text-[var(--primary-accent,#C6F827)]">.</span>
          </h2>

          <p className="font-mono text-xl sm:text-2xl md:text-3xl text-[var(--text-muted,#9A9E86)] max-w-2xl font-medium">
            {t.footerClaim}
          </p>

          <p className="text-sm sm:text-base text-[var(--text-main,#E9E7E0)]/90 max-w-2xl leading-relaxed">
            {t.footerDesc}
          </p>
        </div>

        {/* Email Copy Card & Gateway Actions */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Email Box (8 cols) */}
          <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-[var(--bg-card,#121824)] border-2 border-[var(--border-card,#1E293B)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-mono text-[var(--text-muted,#9A9E86)] uppercase block font-medium">
                {t.footerEmailTitle}
              </span>
              <p className="text-xl sm:text-2xl font-mono font-bold text-[var(--text-main,#E9E7E0)] tracking-tight">
                {email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all transform active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer min-h-[44px] ${
                copied
                  ? "bg-[var(--text-main,#E9E7E0)] text-[var(--bg-page,#0A0E14)] shadow-sm"
                  : "bg-[var(--primary-accent,#C6F827)] text-[var(--primary-accent-text,#0A0E14)] hover:opacity-90 shadow-sm"
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
            className="md:col-span-4 p-6 sm:p-8 rounded-3xl bg-[var(--bg-card-subtle,#161F30)] border-2 border-[var(--border-card,#1E293B)] hover:border-[var(--primary-accent,#C6F827)] flex flex-col justify-between group transition-all shadow-sm"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-[var(--primary-accent,#C6F827)] uppercase block font-semibold">
                {t.footerGatewayTitle}
              </span>
              <h3 className="text-lg font-bold text-[var(--text-main,#E9E7E0)] group-hover:text-[var(--primary-accent,#C6F827)] transition-colors">
                {t.footerGatewayH3} →
              </h3>
            </div>
            <p className="text-xs text-[var(--text-muted,#9A9E86)] mt-4">
              {t.footerGatewayDesc}
            </p>
          </a>
        </div>

        {/* Directory of Ecosystem Platforms */}
        <div className="pt-8 border-t border-[var(--border-card,#1E293B)] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-mono uppercase text-[var(--primary-accent,#C6F827)] font-bold">vout/retail</p>
            <a
              href="https://milesi-erp.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--text-muted,#9A9E86)] hover:text-[var(--text-main,#E9E7E0)] block transition-colors"
            >
              milesi-erp.vercel.app ↗
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono uppercase text-[var(--primary-accent,#C6F827)] font-bold">vout/cargo</p>
            <a
              href="https://cargo-am.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--text-muted,#9A9E86)] hover:text-[var(--text-main,#E9E7E0)] block transition-colors"
            >
              cargo-am.vercel.app ↗
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono uppercase text-[var(--primary-accent,#C6F827)] font-bold">vout/inbox (CRM &amp; Contact)</p>
            <a
              href="https://saas-am.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--text-muted,#9A9E86)] hover:text-[var(--text-main,#E9E7E0)] block transition-colors"
            >
              saas-am.vercel.app ↗
            </a>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono uppercase text-[var(--primary-accent,#C6F827)] font-bold">vout/pocket</p>
            <a
              href="https://vout-web.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[var(--text-muted,#9A9E86)] hover:text-[var(--text-main,#E9E7E0)] block transition-colors"
            >
              vout-web.vercel.app ↗
            </a>
          </div>
        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-8 border-t border-[var(--border-card,#1E293B)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted,#9A9E86)]">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)]" />
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
              className="hover:text-[var(--primary-accent,#C6F827)] transition-colors"
            >
              GITHUB
            </a>
            <span>·</span>
            <a
              href="https://agustinmilesi-contact.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary-accent,#C6F827)] transition-colors"
            >
              SLA 99.9%
            </a>
            <span>·</span>
            <a
              href="https://agustinmilesi-contact.vercel.app/legal"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary-accent,#C6F827)] transition-colors"
            >
              TÉRMINOS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
