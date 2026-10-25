"use client";

import { useState } from "react";

export function ArchStickerStage() {
  const [activeSticker, setActiveSticker] = useState<string | null>(null);

  const stickers = [
    {
      id: "offline",
      label: "OFFLINE-FIRST · CACHE ATÓMICA",
      sub: "IndexedDB + SQLite Local Cache",
      color: "bg-[#C6F827] text-[#0A0E14] border-[#0A0E14]",
      rotation: "-rotate-6 hover:-rotate-2",
      position: "top-8 -left-4 sm:top-12 sm:left-4 md:left-8",
    },
    {
      id: "no-vibecoding",
      label: "PRODUCCIÓN SIN VIBECODING",
      sub: "Prisma Models · Strict TypeScript",
      color: "bg-[#E9E7E0] text-[#0A0E14] border-[#1E293B]",
      rotation: "rotate-4 hover:rotate-1",
      position: "top-20 -right-2 sm:top-24 sm:right-6 md:right-12",
    },
    {
      id: "zero-reselling",
      label: "CERO REVENTA DE DATOS",
      sub: "Soberanía 100% del Comercio",
      color: "bg-[#121824] text-[#C6F827] border-[#C6F827]/40",
      rotation: "-rotate-3 hover:rotate-0",
      position: "bottom-32 -left-3 sm:bottom-36 sm:left-6 md:left-14",
    },
    {
      id: "barcode",
      label: "LECTOR HID DE CÓDIGOS DE BARRA",
      sub: "Buffer de Teclado Raw 0.05s",
      color: "bg-[#E9E7E0] text-[#0A0E14] border-[#1E293B]",
      rotation: "rotate-5 hover:rotate-2",
      position: "bottom-20 -right-4 sm:bottom-24 sm:right-8 md:right-16",
    },
    {
      id: "blind-cash",
      label: "ARQUEO CIEGO DE CAJA",
      sub: "Cierre de Turnos sin Descuadres",
      color: "bg-[#C6F827] text-[#0A0E14] border-[#0A0E14]",
      rotation: "-rotate-4 hover:rotate-0",
      position: "top-48 sm:top-52 left-2 sm:left-16 md:left-24",
    },
    {
      id: "customs",
      label: "AUDITORÍA DE DEMURRAGE ADUANERO",
      sub: "Alertas Automáticas de Depósito Fiscal",
      color: "bg-[#161F30] text-[#E9E7E0] border-[#1E293B]",
      rotation: "rotate-3 hover:rotate-6",
      position: "top-44 sm:top-48 right-2 sm:right-14 md:right-28",
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden border-b border-[#1E293B] bg-[#0A0E14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading Tag */}
        <div className="text-center mb-10 space-y-2">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#C6F827]">
            // EL ESCENARIO CENTRAL
          </p>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#E9E7E0]">
            Arquitectura nacida para el alto rendimiento
          </h2>
          <p className="text-sm text-[#9A9E86] max-w-xl mx-auto">
            Interactúa con los principios de ingeniería que rigen cada una de las cuatro plataformas insignia de VOUT.
          </p>
        </div>

        {/* Central Arch Stage Container */}
        <div className="relative mx-auto max-w-3xl min-h-[500px] sm:min-h-[580px] flex items-center justify-center">
          {/* The Arch Background Frame */}
          <div className="w-[320px] sm:w-[420px] md:w-[480px] h-[440px] sm:h-[520px] rounded-t-full bg-gradient-to-b from-[#161F30] via-[#121824] to-[#0A0E14] border-t-2 border-x-2 border-[#1E293B] relative overflow-hidden shadow-2xl flex flex-col items-center justify-end p-6">
            {/* Dither pattern fill inside the arch */}
            <div className="absolute inset-0 dither-canvas opacity-60 pointer-events-none" />

            {/* Technical grid overlay */}
            <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none" />

            {/* Arched ruler ticks */}
            <div className="absolute top-4 inset-x-8 flex justify-between text-[9px] font-mono text-[#9A9E86]/50 select-none">
              <span>LATAM-01</span>
              <span>// 34.5°S 58.5°W //</span>
              <span>VOUT-STG</span>
            </div>

            {/* Central Architect Silhouette & Geometric Code Core */}
            <div className="relative z-10 flex flex-col items-center space-y-4 mb-4 select-none">
              {/* Geometric Symbol Core with glowing pulse */}
              <div className="size-24 sm:size-28 rounded-3xl bg-[#0A0E14] border-2 border-[#C6F827]/40 p-4 shadow-xl flex items-center justify-center relative group">
                <svg viewBox="68 106 416 310" className="w-full h-full" fill="none">
                  <rect x="68" y="228" width="60" height="60" rx="6" fill="#E9E7E0" />
                  <rect x="132" y="292" width="60" height="60" rx="6" fill="#E9E7E0" />
                  <rect x="196" y="356" width="60" height="60" rx="6" fill="#E9E7E0" />
                  <rect x="260" y="292" width="60" height="60" rx="6" fill="#E9E7E0" />
                  <rect x="324" y="228" width="60" height="60" rx="6" fill="#C6F827" />
                  <rect x="390" y="166" width="46" height="46" rx="5" fill="#C6F827" />
                  <rect x="452" y="106" width="32" height="32" rx="4" fill="#C6F827" />
                </svg>

                {/* Sub-label under symbol */}
                <span className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-[#121824] border border-[#1E293B] text-[8px] font-mono text-[#C6F827]">
                  VOUT / CORE
                </span>
              </div>

              {/* Architect Nameplate */}
              <div className="text-center space-y-1">
                <p className="text-xs font-mono uppercase tracking-widest text-[#9A9E86]">
                  ARQUITECTO &amp; FUNDADOR
                </p>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#E9E7E0]">
                  Agustín Milesi
                </h3>
                <p className="text-[11px] font-mono text-[#C6F827]">
                  FULL STACK &amp; POS ARCHITECT · UNER DEGREE
                </p>
              </div>

              {/* Terminal live status ticker */}
              <div className="w-full max-w-[280px] bg-[#0A0E14] border border-[#1E293B] rounded-xl px-3 py-2 text-[10px] font-mono text-[#9A9E86] space-y-0.5 text-left">
                <div className="text-[#C6F827] flex items-center justify-between">
                  <span>&gt; pipeline.status</span>
                  <span className="text-[#E9E7E0]">PASSING</span>
                </div>
                <div className="truncate text-[#9A9E86]">
                  commit 8f8af80: sync pos receipts
                </div>
              </div>
            </div>

            {/* Arch Bottom Platform Base */}
            <div className="w-full h-3 bg-[#1E293B] rounded-t-sm" />
          </div>

          {/* Interactive Floating Tilted Sticker Badges (matching reference style) */}
          {stickers.map((stk) => (
            <div
              key={stk.id}
              onMouseEnter={() => setActiveSticker(stk.id)}
              onMouseLeave={() => setActiveSticker(null)}
              className={`absolute ${stk.position} ${stk.rotation} transition-all duration-300 transform hover:scale-110 hover:z-30 cursor-pointer shadow-2xl`}
            >
              <div
                className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border-2 ${stk.color} font-mono select-none flex flex-col justify-center`}
              >
                <span className="text-[10px] sm:text-xs font-black tracking-tight leading-none uppercase">
                  {stk.label}
                </span>
                <span className="text-[9px] opacity-80 leading-none mt-1 font-sans font-medium">
                  {stk.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Active Sticker Explanation Pill */}
        <div className="mt-8 max-w-xl mx-auto text-center">
          {activeSticker ? (
            <p className="text-xs font-mono text-[#C6F827] animate-pulse">
              [PIEZA DE ARQUITECTURA SELECCIONADA]: {activeSticker.toUpperCase()}
            </p>
          ) : (
            <p className="text-xs font-mono text-[#9A9E86]">
              [Haz clic o pasa el cursor sobre cada sticker para explorar la filosofía técnica]
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
