"use client";

import { useState, useRef } from "react";
import { usePreferences } from "@/components/PreferencesProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

export function FooterContact() {
  const { t } = usePreferences();
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-card", {
      y: 25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.65,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 88%",
        once: true,
      },
    });
  }, { scope: footerRef });

  const email = "agusmilesi2002@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <footer ref={footerRef} id="contacto" className="bg-[#000000] border-t border-[#252525] pt-12 sm:pt-16 pb-12 relative transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">
        {/* Contact Header */}
        <div className="footer-card space-y-3">
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
            [ DIRECT GATEWAY · BUENOS AIRES NODE ]
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] leading-tight text-[#ffffff]">
            Construyamos software{" "}
            <span className="italic font-serif text-[#c5ff4a] font-normal">
              soberano.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#7a7a7a] max-w-2xl font-normal">
            {t.footerClaim}
          </p>

          <p className="font-sans text-sm text-[#e5e5e5] max-w-2xl leading-[1.55]">
            {t.footerDesc}
          </p>
        </div>

        {/* Email Copy Card & Direct Gateway */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Main Email Box (8 cols) — Sharp Content Card, radius 0px */}
          <div className="footer-card md:col-span-8 p-6 sm:p-8 rounded-none bg-[#1f1f1f] border border-[#252525] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-none">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-medium text-[#7a7a7a] uppercase tracking-[0.22em] block">
                [ CANAL DIRECTO DE COMUNICACIÓN ]
              </span>
              <p className="text-lg sm:text-2xl font-mono font-bold text-[#ffffff] tracking-tight">
                {email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`px-5 py-3 rounded-[4px] font-sans font-medium text-xs uppercase tracking-[0.04em] transition-all transform active:scale-95 flex items-center gap-2 shrink-0 cursor-pointer min-h-[42px] ${
                copied
                  ? "bg-[#ffffff] text-[#000000] shadow-sm"
                  : "bg-[#c5ff4a] text-[#000000] hover:opacity-95 shadow-[0_0_8px_rgba(197,255,74,0.45)]"
              }`}
            >
              {copied ? (
                <span>{t.footerCopied}</span>
              ) : (
                <>
                  <span>{t.footerCopyBtn}</span>
                  <span>📋</span>
                </>
              )}
            </button>
          </div>

          {/* Direct Contact Gateway (4 cols) — Code/panel raised surface #252525 */}
          <a
            href="https://saas-am.vercel.app/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-card md:col-span-4 p-6 sm:p-8 rounded-[4px] bg-[#252525] border border-[#313131] hover:border-[#c5ff4a] flex flex-col justify-between group transition-all"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-medium text-[#c5ff4a] uppercase tracking-[0.22em] block">
                [ PORTAL SOBERANO ]
              </span>
              <h3 className="font-serif font-light text-xl text-[#ffffff] group-hover:text-[#c5ff4a] transition-colors">
                {t.footerGatewayH3} →
              </h3>
            </div>
            <p className="text-xs font-sans text-[#7a7a7a] mt-4 leading-relaxed">
              {t.footerGatewayDesc}
            </p>
          </a>
        </div>

        {/* Directory of Ecosystem Platforms */}
        <div className="pt-8 border-t border-[#252525] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs font-mono uppercase text-[#c5ff4a] tracking-[0.18em]">vout/retail</p>
            <a
              href="https://milesi-erp.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#7a7a7a] hover:text-[#ffffff] block transition-colors"
            >
              milesi-erp.vercel.app ↗
            </a>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono uppercase text-[#c5ff4a] tracking-[0.18em]">vout/cargo</p>
            <a
              href="https://cargo-am.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#7a7a7a] hover:text-[#ffffff] block transition-colors"
            >
              cargo-am.vercel.app ↗
            </a>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono uppercase text-[#c5ff4a] tracking-[0.18em]">vout/inbox</p>
            <a
              href="https://saas-am.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#7a7a7a] hover:text-[#ffffff] block transition-colors"
            >
              saas-am.vercel.app ↗
            </a>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono uppercase text-[#c5ff4a] tracking-[0.18em]">vout/pocket</p>
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

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[var(--border-card,#1E293B)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted,#9A9E86)]">
          <div>
            <span>© 2026 Agustín Milesi · VOUT Software</span>
          </div>

          <div>
            <span>BUENOS AIRES, ARGENTINA</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AgustinMilesi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary-accent,#C6F827)] transition-colors font-bold"
            >
              GITHUB ↗
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
