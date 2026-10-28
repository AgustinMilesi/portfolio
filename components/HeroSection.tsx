"use client";

import { usePreferences } from "@/components/PreferencesProvider";

export function HeroSection() {
  const { t } = usePreferences();

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[var(--border-card,#1E293B)] overflow-hidden transition-colors">
      {/* Background glow matrix subtle */}
      <div className="absolute inset-0 dither-canvas opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 md:space-y-14">
        {/* Top Slug & Category */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-xs font-mono text-[var(--text-muted,#9A9E86)] shadow-xs">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)]" />
            <span className="font-semibold">{t.heroBadge}</span>
          </div>

          <div className="text-xs font-mono text-[var(--text-muted,#9A9E86)]">
            {t.heroSpec}
          </div>
        </div>

        {/* Monumental Display Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-[0.92] text-[var(--text-main,#E9E7E0)]">
            {t.heroH1A}
            <span className="text-[var(--primary-accent,#C6F827)] underline decoration-[var(--primary-accent,#C6F827)]/40 underline-offset-8">
              {t.heroH1B}
            </span>
          </h1>

          {/* Clean Architectural Claim */}
          <p className="font-mono text-xl sm:text-2xl md:text-3xl text-[var(--text-muted,#9A9E86)] tracking-tight font-medium pt-2">
            {t.heroClaim}
          </p>
        </div>

        {/* Two-Column Manifesto */}
        <div id="manifiesto" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-4 border-t border-[var(--border-card,#1E293B)]/80">
          <div className="space-y-4">
            <div className="text-xs font-mono text-[var(--primary-accent,#C6F827)] font-bold flex items-center gap-2">
              <span>// 01</span>
              <span className="uppercase tracking-wider">{t.heroPillar1Title}</span>
            </div>
            <p className="text-base sm:text-lg text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-normal">
              {t.heroPillar1Desc1}
            </p>
            <p className="text-sm text-[var(--text-muted,#9A9E86)] leading-relaxed">
              {t.heroPillar1Desc2}
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-mono text-[var(--primary-accent,#C6F827)] font-bold flex items-center gap-2">
              <span>// 02</span>
              <span className="uppercase tracking-wider">{t.heroPillar2Title}</span>
            </div>
            <p className="text-base sm:text-lg text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-normal">
              {t.heroPillar2Desc1}
            </p>
            <p className="text-sm text-[var(--text-muted,#9A9E86)] leading-relaxed">
              {t.heroPillar2Desc2}
            </p>
          </div>
        </div>

        {/* Metrics Badge Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] space-y-1 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[var(--primary-accent,#C6F827)] font-mono">{t.heroMetric1Num}</div>
            <div className="text-xs font-mono text-[var(--text-muted,#9A9E86)] uppercase font-semibold">{t.heroMetric1Label}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] space-y-1 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[var(--text-main,#E9E7E0)] font-mono">{t.heroMetric2Num}</div>
            <div className="text-xs font-mono text-[var(--text-muted,#9A9E86)] uppercase font-semibold">{t.heroMetric2Label}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] space-y-1 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[var(--primary-accent,#C6F827)] font-mono">{t.heroMetric3Num}</div>
            <div className="text-xs font-mono text-[var(--text-muted,#9A9E86)] uppercase font-semibold">{t.heroMetric3Label}</div>
          </div>
          <div className="p-4 rounded-2xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] space-y-1 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-[var(--text-main,#E9E7E0)] font-mono">{t.heroMetric4Num}</div>
            <div className="text-xs font-mono text-[var(--text-muted,#9A9E86)] uppercase font-semibold">{t.heroMetric4Label}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
