"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import portraitImg from "../public/agustin_milesi_cutout.png";
import { usePreferences } from "@/components/PreferencesProvider";

interface StickerConfig {
  id: string;
  color: string;
  rotation: string;
  position: string;
}

const STICKER_CONFIGS: StickerConfig[] = [
  {
    id: "offline",
    color: "bg-[var(--primary-accent,#C6F827)] text-[#0A0E14] border-[#0A0E14]",
    rotation: "-rotate-6 hover:-rotate-2",
    position: "top-8 -left-4 sm:top-10 sm:left-2 md:left-6",
  },
  {
    id: "vibecoding",
    color: "bg-[#E9E7E0] text-[#0A0E14] border-[#1E293B]",
    rotation: "rotate-4 hover:rotate-1",
    position: "top-14 -right-2 sm:top-16 sm:right-4 md:right-8",
  },
  {
    id: "zero-reselling",
    color: "bg-[#121824] text-[var(--primary-accent,#C6F827)] border-[var(--primary-accent,#C6F827)]/40",
    rotation: "-rotate-3 hover:rotate-0",
    position: "bottom-32 -left-3 sm:bottom-36 sm:left-4 md:left-10",
  },
  {
    id: "barcode",
    color: "bg-[#E9E7E0] text-[#0A0E14] border-[#1E293B]",
    rotation: "rotate-5 hover:rotate-2",
    position: "bottom-20 -right-4 sm:bottom-24 sm:right-6 md:right-12",
  },
  {
    id: "blind-cash",
    color: "bg-[var(--primary-accent,#C6F827)] text-[#0A0E14] border-[#0A0E14]",
    rotation: "-rotate-4 hover:rotate-0",
    position: "top-44 sm:top-48 left-1 sm:left-12 md:left-18",
  },
  {
    id: "customs",
    color: "bg-[#161F30] text-[#E9E7E0] border-[#1E293B]",
    rotation: "rotate-3 hover:rotate-6",
    position: "top-40 sm:top-44 right-1 sm:right-12 md:right-22",
  },
];

export function ArchStickerStage() {
  const { t } = usePreferences();
  const [activeStickerId, setActiveStickerId] = useState<string>("offline");
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simFeedback, setSimFeedback] = useState<string | null>(null);

  const getStickerContent = (id: string) => {
    switch (id) {
      case "offline":
        return {
          label: t.stickerOfflineLabel,
          sub: t.stickerOfflineSub,
          category: t.stickerOfflineCat,
          problem: t.stickerOfflineProb,
          solution: t.stickerOfflineSol,
          simAction: t.stickerOfflineAction,
          simResult: t.stickerOfflineResult,
        };
      case "vibecoding":
      case "no-vibecoding":
        return {
          label: t.stickerNoVibeLabel,
          sub: t.stickerNoVibeSub,
          category: t.stickerNoVibeCat,
          problem: t.stickerNoVibeProb,
          solution: t.stickerNoVibeSol,
          simAction: t.stickerNoVibeAction,
          simResult: t.stickerNoVibeResult,
        };
      case "zero-reselling":
        return {
          label: t.stickerZeroResellLabel,
          sub: t.stickerZeroResellSub,
          category: t.stickerZeroResellCat,
          problem: t.stickerZeroResellProb,
          solution: t.stickerZeroResellSol,
          simAction: t.stickerZeroResellAction,
          simResult: t.stickerZeroResellResult,
        };
      case "barcode":
        return {
          label: t.stickerBarcodeLabel,
          sub: t.stickerBarcodeSub,
          category: t.stickerBarcodeCat,
          problem: t.stickerBarcodeProb,
          solution: t.stickerBarcodeSol,
          simAction: t.stickerBarcodeAction,
          simResult: t.stickerBarcodeResult,
        };
      case "blind-cash":
        return {
          label: t.stickerBlindCashLabel,
          sub: t.stickerBlindCashSub,
          category: t.stickerBlindCashCat,
          problem: t.stickerBlindCashProb,
          solution: t.stickerBlindCashSol,
          simAction: t.stickerBlindCashAction,
          simResult: t.stickerBlindCashResult,
        };
      case "customs":
      default:
        return {
          label: t.stickerCustomsLabel,
          sub: t.stickerCustomsSub,
          category: t.stickerCustomsCat,
          problem: t.stickerCustomsProb,
          solution: t.stickerCustomsSol,
          simAction: t.stickerCustomsAction,
          simResult: t.stickerCustomsResult,
        };
    }
  };

  const activeContent = getStickerContent(activeStickerId);

  const handleSelectSticker = useCallback((id: string) => {
    setActiveStickerId(id);
    setSimFeedback(null);
  }, []);

  const handleRunSimulation = () => {
    setSimRunning(true);
    setSimFeedback(t.stageSimProcessing);
    setTimeout(() => {
      setSimRunning(false);
      setSimFeedback(activeContent.simResult);
    }, 450);
  };

  return (
    <section id="escenario" className="py-16 sm:py-24 overflow-hidden border-b border-[var(--border-card,#1E293B)] bg-[var(--bg-page,#0A0E14)] relative transition-colors">
      {/* Background Ambience */}
      <div className="absolute inset-0 dither-canvas opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Heading Tag */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-xs font-mono text-[var(--text-muted,#9A9E86)] shadow-xs">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)] pulse-dot" />
            <span className="font-semibold">{t.stageBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--text-main,#E9E7E0)]">
            Arquitectura Nacida para el Alto Rendimiento
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted,#9A9E86)] max-w-2xl mx-auto leading-relaxed">
            {t.stageSubtitle}
          </p>
        </div>

        {/* Mobile Horizontal Principle Selector (for touch devices) */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-2 scrollbar-none">
          {STICKER_CONFIGS.map((cfg) => {
            const isSelected = cfg.id === activeStickerId;
            const content = getStickerContent(cfg.id);
            return (
              <button
                key={cfg.id}
                type="button"
                onClick={() => handleSelectSticker(cfg.id)}
                className={`px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap border transition cursor-pointer shrink-0 min-h-[42px] ${
                  isSelected
                    ? "bg-[var(--primary-accent,#C6F827)] text-[var(--primary-accent-text,#0A0E14)] border-[var(--primary-accent,#C6F827)] font-bold shadow-sm"
                    : "bg-[var(--bg-card,#121824)] text-[var(--text-main,#E9E7E0)] border-[var(--border-card,#1E293B)]"
                }`}
              >
                {content.label.split("·")[0].trim()}
              </button>
            );
          })}
        </div>

        {/* Central Arch Stage Container */}
        <div className="relative mx-auto max-w-4xl min-h-[520px] sm:min-h-[600px] flex items-center justify-center">
          {/* The Arch Background Frame */}
          <div className="w-[320px] sm:w-[440px] md:w-[500px] h-[460px] sm:h-[540px] rounded-t-full bg-gradient-to-b from-[#161F30] via-[#121824] to-[#0A0E14] border-t-2 border-x-2 border-[#1E293B] relative overflow-hidden shadow-2xl flex flex-col items-center justify-end p-0">
            {/* Dither pattern fill inside the arch */}
            <div className="absolute inset-0 dither-canvas opacity-70 pointer-events-none" />

            {/* Technical grid overlay */}
            <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

            {/* Arched ruler ticks */}
            <div className="absolute top-4 inset-x-8 flex justify-between text-[9px] font-mono text-[#9A9E86]/60 select-none z-10">
              <span>LATAM-01</span>
              <span>// 34.5°S 58.5°W //</span>
              <span>VOUT-STG</span>
            </div>

            {/* Neon Perimeter Rim Glow behind Agustín */}
            <div className="absolute bottom-16 inset-x-12 h-64 bg-[var(--primary-accent,#C6F827)]/10 blur-3xl rounded-full pointer-events-none" />

            {/* The Cutout Portrait of Agustín Milesi */}
            <div className="relative z-10 w-full flex flex-col items-center justify-end select-none">
              <div className="relative w-[300px] sm:w-[380px] h-[340px] sm:h-[420px] flex items-end justify-center">
                <Image
                  src={portraitImg}
                  alt="Agustín Milesi · VOUT Software Architecture"
                  priority
                  className="w-auto h-full max-h-[420px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter contrast-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Architect Nameplate Badge */}
              <div className="w-full bg-[#0D121B]/95 backdrop-blur-md border-t border-[#1E293B] py-3 px-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-[#121824] border border-[#1E293B] flex items-center justify-center p-1 shrink-0">
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
                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-white leading-none">
                      Agustín Milesi
                    </h3>
                    <p className="text-[10px] font-mono text-[#9A9E86] leading-none mt-1">
                      Founder &amp; Architect · VOUT
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE · PRODUCTION</span>
                </div>
              </div>
            </div>

            {/* Arch Bottom Platform Base */}
            <div className="w-full h-2 bg-[#1E293B]" />
          </div>

          {/* Interactive Floating Tilted Sticker Badges (Desktop & Tablet) */}
          {STICKER_CONFIGS.map((cfg) => {
            const isActive = cfg.id === activeStickerId;
            const content = getStickerContent(cfg.id);
            return (
              <button
                key={cfg.id}
                type="button"
                onClick={() => handleSelectSticker(cfg.id)}
                className={`hidden md:flex absolute ${cfg.position} ${cfg.rotation} transition-all duration-300 transform cursor-pointer select-none text-left ${
                  isActive
                    ? "scale-115 z-30 ring-2 ring-[var(--primary-accent,#C6F827)] shadow-[0_0_25px_rgba(198,248,39,0.4)]"
                    : "hover:scale-105 hover:z-20 opacity-85 hover:opacity-100 shadow-xl"
                }`}
                aria-label={`Select: ${content.label}`}
              >
                <div
                  className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border-2 ${cfg.color} font-mono flex flex-col justify-center`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-black tracking-tight leading-none uppercase">
                      {content.label}
                    </span>
                    {isActive && (
                      <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)] inline-block animate-ping" />
                    )}
                  </div>
                  <span className="text-[9px] opacity-80 leading-none mt-1 font-sans font-medium">
                    {content.sub}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Technical Principle Inspector Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[var(--bg-card,#121824)] border-2 border-[var(--border-card,#1E293B)] p-6 sm:p-8 space-y-6 shadow-2xl animate-smooth-in">
          {/* Header of Inspector */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-card,#1E293B)] pb-4">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[var(--primary-accent,#C6F827)]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--primary-accent,#C6F827)]">
                {activeContent.category}
              </span>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted,#9A9E86)] bg-[var(--bg-page,#0A0E14)] px-2.5 py-1 rounded-full border border-[var(--border-card,#1E293B)]">
              {activeContent.sub}
            </span>
          </div>

          {/* Principle Title */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[var(--text-main,#E9E7E0)] uppercase tracking-tight">
              {activeContent.label}
            </h3>
          </div>

          {/* Two-column Comparison: Real Problem vs Engineering Solution */}
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle,#0D121B)] border border-red-500/20 space-y-2">
              <span className="font-mono text-xs text-red-500 dark:text-red-400 uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-red-400" />
                {t.stageAuditProblem}
              </span>
              <p className="text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-normal">
                {activeContent.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-card-subtle,#0D121B)] border border-emerald-500/20 space-y-2">
              <span className="font-mono text-xs text-[var(--primary-accent,#C6F827)] uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[var(--primary-accent,#C6F827)]" />
                {t.stageAuditSolution}
              </span>
              <p className="text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-normal">
                {activeContent.solution}
              </p>
            </div>
          </div>

          {/* Live Interactive Telemetry Trigger & Terminal Output */}
          <div className="p-4 rounded-2xl bg-[var(--bg-page,#0A0E14)] border border-[var(--border-card,#1E293B)] space-y-3 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[var(--text-muted,#9A9E86)] text-xs font-semibold">
                // TELEMETRY SIMULATION
              </span>
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={simRunning}
                className="px-4 py-2.5 rounded-xl bg-[var(--primary-accent,#C6F827)] text-[var(--primary-accent-text,#0A0E14)] font-black text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 min-h-[42px]"
              >
                {simRunning ? (
                  <>
                    <svg className="animate-spin size-3.5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <span>⚡ {activeContent.simAction}</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Response Screen */}
            <div className="p-3.5 rounded-xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)] text-xs text-[var(--text-main,#E9E7E0)] min-h-[48px] flex items-center">
              {simFeedback ? (
                <span className="text-[var(--primary-accent,#C6F827)] leading-relaxed font-semibold">
                  &gt; {simFeedback}
                </span>
              ) : (
                <span className="text-[var(--text-muted,#9A9E86)]">
                  &gt; Press the button above to execute live architecture telemetry.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
