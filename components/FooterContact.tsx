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
  const phone = "+54 9 11 4167-3396";
  const phoneDisplay = "11 4167-3396";

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
            [ CONTACTO DIRECTO · FLORIDA, VICENTE LÓPEZ, BUENOS AIRES ]
          </div>

          <h2 className="font-serif font-light text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] leading-tight text-[#ffffff]">
            Hablemos de trabajo y{" "}
            <span className="italic font-serif text-[#c5ff4a] font-normal">
              desarrollo.
            </span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#e5e5e5] max-w-2xl leading-[1.55]">
            Disponible para roles de desarrollo de software (Next.js, React, TypeScript, PostgreSQL) y áreas administrativas con foco operativo, conciliación de caja y gestión de datos.
          </p>
        </div>

        {/* Contact Cards Grid: Email, Phone/WhatsApp & Sovereign Gateway */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Main Email Box (6 cols) */}
          <div className="footer-card md:col-span-6 p-6 sm:p-7 rounded-none bg-[#1f1f1f] border border-[#252525] flex flex-col justify-between gap-4 shadow-none">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-medium text-[#7a7a7a] uppercase tracking-[0.22em] block">
                [ CORREO ELECTRÓNICO ]
              </span>
              <p className="text-base sm:text-xl font-mono font-bold text-[#ffffff] tracking-tight break-all">
                {email}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`px-5 py-2.5 rounded-[4px] font-sans font-medium text-xs uppercase tracking-[0.04em] transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer min-h-[40px] w-full sm:w-auto self-start ${
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

          {/* WhatsApp & Teléfono Box (3 cols) */}
          <div className="footer-card md:col-span-3 p-6 sm:p-7 rounded-[4px] bg-[#1f1f1f] border border-[#252525] flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-medium text-[#c5ff4a] uppercase tracking-[0.22em] block">
                [ TELÉFONO / WHATSAPP ]
              </span>
              <p className="text-base sm:text-lg font-mono font-bold text-[#ffffff] tracking-tight">
                {phoneDisplay}
              </p>
            </div>

            <a
              href="https://wa.me/5491141673396"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-[4px] bg-[#252525] border border-[#313131] hover:border-[#c5ff4a] text-[#c5ff4a] font-sans font-medium text-xs uppercase tracking-[0.06em] transition flex items-center justify-center gap-2 min-h-[40px]"
            >
              <span>Enviar WhatsApp ↗</span>
            </a>
          </div>

          {/* LinkedIn & GitHub Direct (3 cols) */}
          <div className="footer-card md:col-span-3 p-6 sm:p-7 rounded-[4px] bg-[#1f1f1f] border border-[#252525] flex flex-col justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-medium text-[#7a7a7a] uppercase tracking-[0.22em] block">
                [ PERFILES PROFESIONALES ]
              </span>
              <p className="text-xs font-sans text-[#7a7a7a]">
                Florida, Vicente López
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href="https://linkedin.com/in/agustinmilesi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-[4px] bg-[#252525] border border-[#313131] hover:border-[#c5ff4a] text-[#ffffff] hover:text-[#c5ff4a] font-mono text-xs transition flex items-center justify-between"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
              <a
                href="https://github.com/AgustinMilesi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-[4px] bg-[#252525] border border-[#313131] hover:border-[#c5ff4a] text-[#ffffff] hover:text-[#c5ff4a] font-mono text-xs transition flex items-center justify-between"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Directory of Ecosystem Platforms */}
        <div className="pt-6 border-t border-[#252525] grid grid-cols-2 sm:grid-cols-4 gap-4">
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
              className="text-xs font-mono text-[#7a7a7a] hover:text-[#ffffff] block transition-colors"
            >
              vout-web.vercel.app ↗
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#252525] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#7a7a7a]">
          <div>
            <span>© 2026 Agustín Milesi · Técnico Superior en Desarrollo de Software</span>
          </div>

          <div>
            <span>FLORIDA, VICENTE LÓPEZ · BS AS</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AgustinMilesi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c5ff4a] transition-colors font-bold"
            >
              GITHUB ↗
            </a>
            <span>·</span>
            <a
              href="https://linkedin.com/in/agustinmilesi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c5ff4a] transition-colors"
            >
              LINKEDIN ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
