"use client";

import { usePreferences } from "@/components/PreferencesProvider";

export function HeroSection() {
  const { t } = usePreferences();

  return (
    <section className="relative pt-10 pb-14 md:pt-16 md:pb-20 border-b border-[var(--border-card,#1E293B)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12">
        {/* Top Badge */}
        <div className="flex items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-xs font-mono text-[var(--text-muted,#9A9E86)]">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)]" />
            <span className="font-semibold">{t.heroBadge}</span>
          </div>
        </div>

        {/* Display Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] text-[var(--text-main,#E9E7E0)]">
            {t.heroH1A}
            <span className="text-[var(--primary-accent,#C6F827)] underline decoration-[var(--primary-accent,#C6F827)]/40 underline-offset-8">
              {t.heroH1B}
            </span>
          </h1>

          <p className="font-mono text-lg sm:text-xl md:text-2xl text-[var(--text-muted,#9A9E86)] tracking-tight font-medium pt-1">
            {t.heroClaim}
          </p>
        </div>

        {/* Two-Column Manifesto */}
        <div id="manifiesto" className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 pt-2 border-t border-[var(--border-card,#1E293B)]/80">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[var(--primary-accent,#C6F827)] font-bold uppercase tracking-wider">
              {t.heroPillar1Title}
            </div>
            <p className="text-sm sm:text-base text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-medium">
              {t.heroPillar1Desc1}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-mono text-[var(--primary-accent,#C6F827)] font-bold uppercase tracking-wider">
              {t.heroPillar2Title}
            </div>
            <p className="text-sm sm:text-base text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-medium">
              {t.heroPillar2Desc1}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
