"use client";

import { useState, useCallback, useId } from "react";
import Image from "next/image";

interface StickerData {
  id: string;
  label: string;
  sub: string;
  color: string;
  rotation: string;
  position: string;
  category: string;
  problem: string;
  solution: string;
  simAction: string;
  simResult: string;
}

const STICKERS: StickerData[] = [
  {
    id: "offline",
    label: "OFFLINE-FIRST · CACHE ATÓMICA",
    sub: "IndexedDB + SQLite Local Cache",
    color: "bg-[#C6F827] text-[#0A0E14] border-[#0A0E14]",
    rotation: "-rotate-6 hover:-rotate-2",
    position: "top-8 -left-4 sm:top-10 sm:left-2 md:left-6",
    category: "RESILIENCIA DE RED",
    problem:
      "En hora pico de un sábado por la tarde en un mayorista, se corta el enlace a internet. Si el sistema es una SPA tradicional conectada a la nube, la caja queda bloqueada, la fila se acumula y el comercio pierde dinero cada minuto.",
    solution:
      "VOUT Retail y VOUT Pocket almacenan el catálogo y el motor transaccional localmente en IndexedDB y SQLite. Los comprobantes se firman y descuentan stock en memoria de inmediato, reconciliando con PostgreSQL cuando regresa el enlace.",
    simAction: "Simular Corte de Conexión en Caja",
    simResult:
      "STATUS: ENLACE DOWN | Modo Offline Activado | Cola Local: 3 ventas encoladas | Latencia de Cobro: 0.00ms | 0 Bloqueos.",
  },
  {
    id: "no-vibecoding",
    label: "PRODUCCIÓN SIN VIBECODING",
    sub: "Prisma Models · Strict TypeScript",
    color: "bg-[#E9E7E0] text-[#0A0E14] border-[#1E293B]",
    rotation: "rotate-4 hover:rotate-1",
    position: "top-14 -right-2 sm:top-16 sm:right-4 md:right-8",
    category: "CALIDAD DE INGENIERÍA",
    problem:
      "El 'vibecoding' genera prototipos visualmente atractivos pero con tipos 'any', contratos HTTP laxos, bugs silenciosos en redondeo monetario y caída catastrófica bajo concurrencia.",
    solution:
      "Cero tolerancia a tipos sueltos. Matemática monetaria exacta en centavos enteros con BigInt / Decimal(12,2) en base de datos. Contratos de esquema Zod en cliente y servidor validados por suite de tests automáticos en TypeScript.",
    simAction: "Auditar Tipado & Contratos HTTP",
    simResult:
      "PRISMA SCHEMA: 100% STRICT | Typescript 'any' count: 0 | Zod Schemas: 18 | Tests de Dinero: 13 PASADOS (0 centavos perdidos).",
  },
  {
    id: "zero-reselling",
    label: "CERO REVENTA DE DATOS",
    sub: "Soberanía 100% del Comercio",
    color: "bg-[#121824] text-[#C6F827] border-[#C6F827]/40",
    rotation: "-rotate-3 hover:rotate-0",
    position: "bottom-32 -left-3 sm:bottom-36 sm:left-4 md:left-10",
    category: "ÉTICA & SEGURIDAD",
    problem:
      "La mayoría de las plataformas comerciales gratuitas o SaaS corporativas empaquetan la facturación, los proveedores y los márgenes de los comercios para revenderlos a consultoras de mercado o competidores.",
    solution:
      "Soberanía absoluta. VOUT no incluye píxeles de telemetría de terceros ni comercializa metadatos. Cada organización cuenta con aislamiento relacional estricto y claves API con hash criptográfico unidireccional SHA-256.",
    simAction: "Verificar Aislamiento de Metadatos",
    simResult:
      "PRIVACY AUDIT: 0 trackers externos | 0 cookies de terceros | Multi-Tenant Data Isolation: ACTIVO | Hash de API: SHA-256.",
  },
  {
    id: "barcode",
    label: "LECTOR HID DE CÓDIGOS DE BARRA",
    sub: "Buffer de Teclado Raw < 50ms",
    color: "bg-[#E9E7E0] text-[#0A0E14] border-[#1E293B]",
    rotation: "rotate-5 hover:rotate-2",
    position: "bottom-20 -right-4 sm:bottom-24 sm:right-6 md:right-12",
    category: "HARDWARE DE SALÓN",
    problem:
      "Los lectores láser de código de barras USB emiten como teclados rápidos. Si el operador está navegando un modal o el input pierde foco, el escaneo se pierde o rompe la interfaz.",
    solution:
      "Listener global de eventos raw keyboard en ventana con buffer temporal < 50ms y delimitador CR (Enter). El escaneo se captura y despacha al carrito POS sin importar en qué parte de la pantalla esté el cursor.",
    simAction: "Disparar Ráfaga Láser USB (EAN-13)",
    simResult:
      "BUFFER RAW: '7791234567890' recibido en 41ms | SKU: VOUT-RETAIL-01 | Precio: $2,450.00 | Stock descontado en memoria.",
  },
  {
    id: "blind-cash",
    label: "ARQUEO CIEGO DE CAJA",
    sub: "Cierre de Turnos sin Descuadres",
    color: "bg-[#C6F827] text-[#0A0E14] border-[#0A0E14]",
    rotation: "-rotate-4 hover:rotate-0",
    position: "top-44 sm:top-48 left-1 sm:left-12 md:left-18",
    category: "CONTROL FISCAL Y HUMANO",
    problem:
      "Cuando el cajero sabe cuánto dinero 'debería' haber en el cajón, surgen ajustes informales, préstamos de caja y faltantes encubiertos que la administración detecta semanas después.",
    solution:
      "El cajero cuenta su dinero e ingresa el monto total a ciegas sin ver el acumulado del sistema. El sistema compara en backend y emite el ticket de cierre con la diferencia exacta bloqueada para auditoría.",
    simAction: "Simular Cierre Ciego de Turno",
    simResult:
      "SISTEMA: $128,450.00 | Declarado por Cajero: $128,450.00 | Diferencia: $0.00 (CIERRE PERFECTO) | Ticket Fiscal ESC/POS emitido.",
  },
  {
    id: "customs",
    label: "AUDITORÍA DE DEMURRAGE ADUANERO",
    sub: "Alertas Automáticas de Depósito Fiscal",
    color: "bg-[#161F30] text-[#E9E7E0] border-[#1E293B]",
    rotation: "rotate-3 hover:rotate-6",
    position: "top-40 sm:top-44 right-1 sm:right-12 md:right-22",
    category: "OPERACIONES DE COMERCIO EXTERIOR",
    problem:
      "Las navieras cobran multas diarias (demurrage) de cientos de dólares si un contenedor pasa más días de los acordados en la terminal portuaria antes de ser nacionalizado.",
    solution:
      "VOUT Cargo rastrea los días libres restantes calculando feriados fiscales y alertas preventivas 72 horas antes del vencimiento, coordinando con el despachante de aduanas automáticamente.",
    simAction: "Verificar Días Libres en Puerto",
    simResult:
      "BL: MSKU-902184 | Terminal: Exolgan | Días Libres: 7 | Transcurridos: 4 | Alerta Preventiva: 72h activada | Demurrage evitado.",
  },
];

export function ArchStickerStage() {
  const [activeStickerId, setActiveStickerId] = useState<string>("offline");
  const [simRunning, setSimRunning] = useState<boolean>(false);
  const [simFeedback, setSimFeedback] = useState<string | null>(null);

  const activeSticker = STICKERS.find((s) => s.id === activeStickerId) || STICKERS[0];

  const handleSelectSticker = useCallback((id: string) => {
    setActiveStickerId(id);
    setSimFeedback(null);
  }, []);

  const handleRunSimulation = () => {
    setSimRunning(true);
    setSimFeedback("Procesando telemetría de arquitectura en tiempo real...");
    setTimeout(() => {
      setSimRunning(false);
      setSimFeedback(activeSticker.simResult);
    }, 450);
  };

  // Determine base path for images (handles both local dev and GitHub Pages /portfolio)
  const isGithubPages = typeof window !== "undefined" && window.location.pathname.startsWith("/portfolio");
  const basePath = isGithubPages ? "/portfolio" : "";
  const portraitSrc = `${basePath}/agustin_milesi_cutout.png`;

  return (
    <section id="escenario" className="py-16 sm:py-24 overflow-hidden border-b border-[#1E293B] bg-[#0A0E14] relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 dither-canvas opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Heading Tag */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121824] border border-[#1E293B] text-xs font-mono text-[#9A9E86]">
            <span className="size-2 rounded-full bg-[#C6F827] pulse-dot" />
            <span>EL ESCENARIO CENTRAL INTERACTIVO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#E9E7E0]">
            Arquitectura Nacida para el Alto Rendimiento
          </h2>
          <p className="text-sm sm:text-base text-[#9A9E86] max-w-2xl mx-auto leading-relaxed">
            Haga clic en cualquiera de los stickers técnicos alrededor del arquitecto para auditar cómo
            resolvemos en el código los problemas más difíciles de la operación comercial y logística.
          </p>
        </div>

        {/* Mobile Horizontal Principle Selector (for touch devices) */}
        <div className="flex md:hidden overflow-x-auto gap-2 pb-2 scrollbar-none">
          {STICKERS.map((stk) => {
            const isSelected = stk.id === activeStickerId;
            return (
              <button
                key={stk.id}
                type="button"
                onClick={() => handleSelectSticker(stk.id)}
                className={`px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap border transition cursor-pointer shrink-0 ${
                  isSelected
                    ? "bg-[#C6F827] text-[#0A0E14] border-[#C6F827] font-bold shadow-sm"
                    : "bg-[#121824] text-slate-300 border-[#1E293B]"
                }`}
              >
                {stk.label.split("·")[0].trim()}
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
            <div className="absolute bottom-16 inset-x-12 h-64 bg-[#C6F827]/10 blur-3xl rounded-full pointer-events-none" />

            {/* The Cutout Portrait of Agustín Milesi (Creative Focal Point) */}
            <div className="relative z-10 w-full flex flex-col items-center justify-end select-none">
              <div className="relative w-[300px] sm:w-[380px] h-[340px] sm:h-[420px] flex items-end justify-center">
                {/* Image Cutout */}
                <img
                  src={portraitSrc}
                  alt="Agustín Milesi · Creador de VOUT"
                  className="w-auto h-full max-h-[420px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter contrast-105"
                  loading="eager"
                />

                {/* Ambient Subtle Accent Light Overlay on bust */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Obsidian Architect Nameplate Badge */}
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
                      Creador &amp; Arquitecto de VOUT
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE · ART</span>
                </div>
              </div>
            </div>

            {/* Arch Bottom Platform Base */}
            <div className="w-full h-2 bg-[#1E293B]" />
          </div>

          {/* Interactive Floating Tilted Sticker Badges (Desktop & Tablet) */}
          {STICKERS.map((stk) => {
            const isActive = stk.id === activeStickerId;
            return (
              <button
                key={stk.id}
                type="button"
                onClick={() => handleSelectSticker(stk.id)}
                className={`hidden md:flex absolute ${stk.position} ${stk.rotation} transition-all duration-300 transform cursor-pointer select-none text-left ${
                  isActive
                    ? "scale-115 z-30 ring-2 ring-[#C6F827] shadow-[0_0_25px_rgba(198,248,39,0.4)]"
                    : "hover:scale-105 hover:z-20 opacity-85 hover:opacity-100 shadow-xl"
                }`}
                aria-label={`Seleccionar principio: ${stk.label}`}
              >
                <div
                  className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border-2 ${stk.color} font-mono flex flex-col justify-center`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] sm:text-xs font-black tracking-tight leading-none uppercase">
                      {stk.label}
                    </span>
                    {isActive && (
                      <span className="size-2 rounded-full bg-[#C6F827] inline-block animate-ping" />
                    )}
                  </div>
                  <span className="text-[9px] opacity-80 leading-none mt-1 font-sans font-medium">
                    {stk.sub}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Architectural Inspection Console: "Ahora el escenario anda de verdad" */}
        <div className="max-w-3xl mx-auto rounded-3xl bg-[#121824] border-2 border-[#1E293B] p-6 sm:p-8 shadow-2xl space-y-6 animate-smooth-in">
          {/* Header of the Active Principle Console */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-[#C6F827] animate-pulse" />
              <span className="font-mono text-xs text-[#C6F827] uppercase tracking-wider font-bold">
                PRINCIPIO ACTIVO: {activeSticker.category}
              </span>
            </div>
            <span className="text-xs font-mono text-[#9A9E86] bg-[#0A0E14] px-2.5 py-1 rounded-full border border-[#1E293B]">
              {activeSticker.sub}
            </span>
          </div>

          {/* Principle Title */}
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              {activeSticker.label}
            </h3>
          </div>

          {/* Two-column Comparison: Real Problem vs Engineering Solution */}
          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#0D121B] border border-red-500/20 space-y-2">
              <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-red-400" />
                La Realidad de la Trinchera
              </span>
              <p className="text-slate-300 leading-relaxed font-normal">
                {activeSticker.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D121B] border border-emerald-500/20 space-y-2">
              <span className="font-mono text-[10px] text-[#C6F827] uppercase tracking-wider font-bold block flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#C6F827]" />
                Solución de Ingeniería VOUT
              </span>
              <p className="text-slate-300 leading-relaxed font-normal">
                {activeSticker.solution}
              </p>
            </div>
          </div>

          {/* Live Interactive Telemetry Trigger & Terminal Output */}
          <div className="p-4 rounded-2xl bg-[#0A0E14] border border-[#1E293B] space-y-3 font-mono text-xs">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-slate-400 text-[11px]">
                // SIMULADOR DE TELEMETRÍA DE PRODUCCIÓN
              </span>
              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={simRunning}
                className="px-4 py-2 rounded-xl bg-[#C6F827] text-[#0A0E14] font-black text-[11px] uppercase tracking-wider hover:bg-[#bcf020] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {simRunning ? (
                  <>
                    <svg className="animate-spin size-3" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span>Ejecutando...</span>
                  </>
                ) : (
                  <>
                    <span>⚡ {activeSticker.simAction}</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Response Screen */}
            <div className="p-3 rounded-xl bg-[#0D121B] border border-[#1E293B] text-[11px] text-slate-300 min-h-[46px] flex items-center">
              {simFeedback ? (
                <span className="text-[#C6F827] leading-relaxed">
                  &gt; {simFeedback}
                </span>
              ) : (
                <span className="text-slate-500">
                  &gt; Presione el botón de arriba para probar la telemetría en tiempo real de este principio.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
