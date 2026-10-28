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
    })
      .from(".hero-title-line-1", {
        yPercent: 115,
        duration: 0.85,
        ease: "power4.out",
      }, "-=0.25")
      .from(".hero-title-line-2", {
        yPercent: 115,
        duration: 0.85,
        ease: "power4.out",
      }, "-=0.65")
      .from(".hero-claim", {
        yPercent: 100,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      }, "-=0.5")
      .from(".manifesto-card", {
        y: 25,
        opacity: 0,
        stagger: 0.15,
        duration: 0.75,
        ease: "power2.out",
      }, "-=0.4");
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative pt-6 pb-10 sm:pt-12 sm:pb-16 md:pt-16 md:pb-20 border-b border-[var(--border-card,#1E293B)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 md:space-y-12">
        {/* Top Badge */}
        <div className="flex items-center">
          <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-[10px] sm:text-xs font-mono text-[var(--text-muted,#9A9E86)] max-w-full shadow-xs">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)] shrink-0 animate-pulse" />
            <span className="font-semibold truncate sm:whitespace-normal">{t.heroBadge}</span>
          </div>
        </div>

        {/* Display Title with Editorial Mask Reveal */}
        <div className="space-y-1 sm:space-y-2">
          <div className="overflow-hidden">
            <h1 className="hero-title-line-1 text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.05] sm:leading-[0.95] text-[var(--text-main,#E9E7E0)]">
              {t.heroH1A}
            </h1>
          </div>
          <div className="overflow-hidden">
            <div className="hero-title-line-2 text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[1.05] sm:leading-[0.95]">
              <span className="text-[var(--primary-accent,#C6F827)] underline decoration-[var(--primary-accent,#C6F827)]/40 underline-offset-4 sm:underline-offset-8">
                {t.heroH1B}
              </span>
            </div>
          </div>

          <div className="overflow-hidden pt-1 sm:pt-2">
            <p className="hero-claim font-mono text-base sm:text-xl md:text-2xl text-[var(--text-muted,#9A9E86)] tracking-tight font-medium">
              {t.heroClaim}
            </p>
          </div>
        </div>

        {/* Two-Column Manifesto */}
        <div id="manifiesto" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-2 border-t border-[var(--border-card,#1E293B)]/80">
          <div className="manifesto-card space-y-2 p-4 sm:p-5 rounded-2xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)]/60 hover:border-[var(--primary-accent,#C6F827)]/40 transition-colors">
            <div className="text-xs font-mono text-[var(--primary-accent,#C6F827)] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--primary-accent,#C6F827)]" />
              {t.heroPillar1Title}
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-normal">
              {t.heroPillar1Desc1}
            </p>
          </div>

          <div className="manifesto-card space-y-2 p-4 sm:p-5 rounded-2xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)]/60 hover:border-[var(--primary-accent,#C6F827)]/40 transition-colors">
            <div className="text-xs font-mono text-[var(--primary-accent,#C6F827)] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--primary-accent,#C6F827)]" />
              {t.heroPillar2Title}
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-normal">
              {t.heroPillar2Desc1}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
