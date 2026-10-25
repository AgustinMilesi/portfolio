"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CaseStudyModal, ProjectData } from "./CaseStudyModal";

export const ECOSYSTEM_PROJECTS: ProjectData[] = [
  {
    id: "retail",
    slug: "vout/retail",
    name: "VOUT Retail · Cloud Point of Sale & Store Inventory Engine",
    category: "PUNTO DE VENTA (POS) · CONTROL DE STOCK · HARDWARE FISCAL",
    tagline:
      "Punto de venta de alta velocidad, lector de código de barras nativo, arqueos ciegos de caja y facturación térmica.",
    description:
      "Diseñado para eliminar filas y descuadres en el mostrador minorista y mayorista. Arquitectura optimizada para lecturas HID de códigos de barra en menos de 50ms, transacciones de venta atómicas con bloqueo de concurrencia y tickets térmicos ESC/POS.",
    liveUrl: "https://milesi-erp.vercel.app",
    repoFolder: "e:\\Proyectos\\erp",
    specs: {
      engine: "Next.js 16 + React 19 Turbopack",
      database: "PostgreSQL + Prisma Client + IndexedDB Cache",
      hardwareOrSecurity: "ESC/POS 80mm/58mm + USB HID Scanner",
      resilienceMetric: "0ms Checkout Lock · 100% Offline Resilience",
    },
    features: [
      "Arqueo Ciego de Caja",
      "Lector de Barra Buffer Raw < 50ms",
      "Control Atómico de Stock",
      "Cierres de Turno Blindados",
      "Múltiples Listas de Precios",
      "Tickets Térmicos ESC/POS",
    ],
    problemStatement:
      "Los sistemas POS tradicionales dependen de conexiones a internet estables. Cuando la red cae en hora pico de un sábado por la tarde, los cajeros quedan paralizados, las colas crecen y los faltantes de caja son imposibles de auditar.",
    architecturalSolution:
      "VOUT Retail almacena el catálogo de productos y precios en un caché local IndexedDB optimizado en memoria. Las ventas se registran de forma atómica y se reconcilian con PostgreSQL en segundo plano sin bloquear al operador.",
    schemaSnippet: `model Product {
  id           String    @id @default(cuid())
  sku          String    @unique
  barcode      String    @unique
  name         String
  priceCost    Decimal   @db.Decimal(12, 2)
  priceRetail  Decimal   @db.Decimal(12, 2)
  stockUnits   Int       @default(0)
  minStock     Int       @default(5)
  sales        SaleItem[]
  createdAt    DateTime  @default(now())
}

model ShiftSession {
  id           String    @id @default(cuid())
  cashierId    String
  openingFloat Decimal   @db.Decimal(12, 2)
  declaredCash Decimal?  @db.Decimal(12, 2) // Arqueo ciego
  systemCash   Decimal   @db.Decimal(12, 2)
  difference   Decimal?  @db.Decimal(12, 2)
  closedAt     DateTime?
}`,
    dataFlow: [
      "Lector USB emite secuencia de pulsaciones en buffer < 50ms sin perder el foco del input.",
      "Motor POS valida SKU y descuenta stock en memoria de forma inmediata.",
      "Comprobante se envía a la ticketera térmica por protocolo serial ESC/POS.",
      "Transacción de cierre realiza arqueo ciego donde el cajero ingresa efectivo sin ver el balance del sistema.",
    ],
  },
  {
    id: "inbox",
    slug: "vout/inbox",
    name: "VOUT Inbox · Multi-Tenant CRM, Webhooks & Sovereign Gateway",
    category: "CRM SAAS MULTI-INQUILINO · PORTAL DE CONTACTO · WEBHOOKS HMAC",
    tagline:
      "Plataforma unificada dos-en-uno: gestión de consultas de clientes con webhooks firmados HMAC y portal soberano de contacto directo.",
    description:
      "Arquitectura unificada que integra el SaaS multi-inquilino de retroalimentación de clientes y el canal institucional de contacto directo. Ofrece ingesta de prospectos con validación estricta Zod, protección anti-bot por honeypot, aislamiento organizacional por esquema y despacho en tiempo real a endpoints de clientes.",
    liveUrl: "https://saas-am.vercel.app",
    repoFolder: "e:\\Proyectos\\saas",
    specs: {
      engine: "Next.js 16 + Server Actions + REST API v1",
      database: "PostgreSQL con Aislamiento Estricto por Organización",
      hardwareOrSecurity: "Firmas Criptográficas HMAC-SHA256 + Token Auth + TLS 1.3",
      resilienceMetric: "< 15ms Tiempo de Respuesta en Ingesta de Forms & Contact",
    },
    features: [
      "Portal Soberano de Contacto (/contact)",
      "Aislamiento Multi-Tenant de Datos",
      "Webhooks con Firma Criptográfica HMAC",
      "Protección Anti-Bot Silenciosa",
      "Triaje en Tiempo Real de Mensajes",
      "Doble Vista: Consola SaaS & Contacto",
    ],
    problemStatement:
      "Las empresas pierden prospectos y feedback valioso porque los formularios de sus sitios web fallan silenciosamente, caen en bandejas de spam olvidadas o carecen de integración con la infraestructura interna de ventas y soporte.",
    architecturalSolution:
      "VOUT Inbox unifica la captura institucional directa y la API de formularios embebibles en una sola plataforma resiliente. Cada envío se almacena atómicamente en PostgreSQL, crea el perfil de contacto del remitente y notifica asíncronamente vía webhook firmado y correo.",
    schemaSnippet: `model Organization {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  notifyEmail   String?
  webhookUrl    String?
  webhookSecret String?
  messages      Message[]
  contacts      Contact[]
}

model Message {
  id             String        @id @default(cuid())
  organizationId String
  contactId      String?
  name           String
  email          String
  subject        String
  body           String
  status         MessageStatus @default(NEW)
  createdAt      DateTime      @default(now())
}`,
    dataFlow: [
      "Visitante envía requerimiento vía /contact o formulario web incrustado.",
      "Validación bidireccional Zod y verificación de trampa honeypot en Edge Handler.",
      "Creación o actualización automática del contacto y registro del mensaje con estado NEW.",
      "Despacho asíncrono redundante: alerta por email y webhook HMAC-SHA256 a sistemas integrados.",
    ],
  },
  {
    id: "cargo",
    slug: "vout/cargo",
    name: "VOUT Cargo · Global Freight & Import Operations System",
    category: "LOGÍSTICA INTERNACIONAL · DESPACHO ADUANERO · DEMURRAGE",
    tagline:
      "Suite autónoma de logística internacional, rastreo marítimo/aéreo, despacho aduanero y control de demurrage.",
    description:
      "Monitoreo en tiempo real de embarques internacionales marítimos (FCL/LCL) y aéreos. Cálculo dinámico de aranceles de importación, alertas preventivas de demurrage en terminales portuarias y portal de autoservicio para importadores.",
    liveUrl: "https://cargo-am.vercel.app",
    repoFolder: "e:\\Proyectos\\sap",
    specs: {
      engine: "Next.js + TypeScript + Tailwind CSS",
      database: "PostgreSQL Enterprise + AIS Satellite Tracking",
      hardwareOrSecurity: "Cifrado de Documentación Aduanera AES-256",
      resilienceMetric: "Alertas de Demurrage en Tiempo Real (< 2h SLA)",
    },
    features: [
      "Rastreo Marítimo Satelital",
      "Cotizador Multidivisa USD/ARS",
      "Alertas de Demurrage Portuario",
      "Gestión de Depósito Fiscal",
      "Despacho Aduanero Digital",
      "Portal de Autoservicio Clientes",
    ],
    problemStatement:
      "Las demoras en despachar contenedores de puerto generan sobrecostos (demurrage) que escalan en cientos de dólares por día. Las planillas de cálculo dispersas causan olvidos y multas aduaneras astronómicas.",
    architecturalSolution:
      "VOUT Cargo centraliza los días libres de estadía por naviera y terminal, activando alertas automáticas 72 horas antes del vencimiento. Integra cálculo arancelario con cotización del Banco Central en tiempo real.",
    schemaSnippet: `model ContainerShipment {
  id                  String         @id @default(cuid())
  containerNumber     String         @unique
  blNumber            String         @unique // Bill of Lading
  originPort          String
  destinationPort     String
  freeDaysAllowed     Int            @default(7)
  demurrageRatePerDay Decimal        @db.Decimal(10, 2)
  status              ShipmentStatus @default(IN_TRANSIT)
  customsBrokerId     String
}`,
    dataFlow: [
      "Ingesta del Bill of Lading (BL) con parsing de fecha estimada de arribo (ETA).",
      "Cómputo diario de días libres restantes en terminal portuaria fiscal.",
      "Disparo de notificación prioritaria al despachante de aduana ante riesgo de estadía.",
      "Generación de liquidación proforma con discriminación de flete, seguro y derechos.",
    ],
  },
  {
    id: "pocket",
    slug: "vout/pocket",
    name: "VOUT Pocket & Web · Personal Cashflow & Bi-Directional Hub",
    category: "FINANZAS PERSONALES · CACHE SQLITE · SINCRONIZACIÓN NUBE",
    tagline:
      "Control de flujo de caja personal, auditoría de suscripciones y sincronización bidireccional nube-móvil.",
    description:
      "Suite financiera que cambia la perspectiva del dinero: en lugar de simples gráficos pasivos de gastos, calcula el Ingreso Disponible Real diario. Funciona offline en móvil con SQLite nativo y se sincroniza con el hub web en PostgreSQL.",
    liveUrl: "https://vout-web.vercel.app",
    repoFolder: "e:\\Proyectos\\expenses-web",
    specs: {
      engine: "Next.js Web Hub + React Native Android APK",
      database: "PostgreSQL Cloud + SQLite Local Offline en Móvil",
      hardwareOrSecurity: "Sincronización Bidireccional con Resolución de Conflictos",
      resilienceMetric: "Offline-First Estricto: Cero Pérdida de Transacciones",
    },
    features: [
      "Gauge de Ingreso Disponible",
      "Auditoría de Suscripciones Ocultas",
      "Sincronización Bidireccional en Vivo",
      "Registro Rápido de Microgastos",
      "Descarga de APK Nativa de Android",
      "Soporte Multidivisa USD/ARS",
    ],
    problemStatement:
      "Las apps de finanzas tradicionales te dicen en qué gastaste el mes pasado cuando ya no puedes hacer nada. Además, si pierdes la señal en la calle, no te permiten anotar un gasto en el momento.",
    architecturalSolution:
      "VOUT Pocket corre con SQLite local embebido en el teléfono. Cada compra se anota en menos de 2 segundos sin internet. Al reconectarse, un motor de sincronización diferencial actualiza el Hub Web en la nube sin duplicados.",
    schemaSnippet: `model ExpenseRecord {
  id           String    @id @default(cuid())
  userId       String
  amount       Decimal   @db.Decimal(12, 2)
  currency     Currency  @default(ARS)
  category     String
  clientTxId   String    @unique // Idempotencia offline
  syncedAt     DateTime?
  createdAt    DateTime  @default(now())
}`,
    dataFlow: [
      "Ingreso inmediato del microgasto en la app móvil con teclado numérico acelerado.",
      "Inserción local en SQLite y cómputo instantáneo del 'Safe-to-Spend' del día.",
      "Detección de conexión WiFi/4G y despacho de paquete de cambios pendientes.",
      "Hub Web valida idempotencia por clientTxId y consolida el balance en PostgreSQL.",
    ],
  },
];

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "terminal">("desktop");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const currentProject = ECOSYSTEM_PROJECTS[currentIndex];

  const playBlip = useCallback((freq = 540) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext unavailable
    }
  }, [audioEnabled]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ECOSYSTEM_PROJECTS.length);
    playBlip(640);
  }, [playBlip]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ECOSYSTEM_PROJECTS.length) % ECOSYSTEM_PROJECTS.length);
    playBlip(480);
  }, [playBlip]);

  const handleJump = (index: number) => {
    setCurrentIndex(index);
    playBlip(560 + index * 40);
  };

  const handleCopyCommand = async (cmd: string) => {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedSlug(true);
      playBlip(800);
      setTimeout(() => setCopiedSlug(false), 2000);
    } catch {
      // ignore
    }
  };

  // Keyboard navigation: Left/Right arrows, 1-4 for direct jumps, Space for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "1") handleJump(0);
      if (e.key === "2") handleJump(1);
      if (e.key === "3") handleJump(2);
      if (e.key === "4") handleJump(3);
      if (e.key === " ") {
        e.preventDefault();
        setSelectedProject(currentProject);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, handleNext, handlePrev, currentProject]);

  return (
    <section id="proyectos" className="py-20 md:py-28 bg-[#0A0E14] border-b border-[#1E293B] relative overflow-hidden">
      {/* Background Matrix */}
      <div className="absolute inset-0 dither-canvas opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1E293B]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#121824] text-[#C6F827] border border-[#1E293B]">
              <span className="size-2 rounded-full bg-[#C6F827] animate-pulse" />
              <span>CARRUSEL DE ARQUITECTURA EN PRODUCCIÓN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#E9E7E0]">
              Cuatro Pilares. Cero Vibecoding.
            </h2>
            <p className="text-sm text-[#9A9E86] max-w-2xl leading-relaxed">
              Explore cada plataforma interactuando con su simulación de hardware, esquemas de datos relacionales
              y contratos de comunicación en tiempo real.
            </p>
          </div>

          {/* Interactive Mode & Audio Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition flex items-center gap-2 cursor-pointer ${
                audioEnabled
                  ? "bg-[#C6F827] text-[#0A0E14] border-[#C6F827] font-bold"
                  : "bg-[#121824] text-slate-400 border-[#1E293B] hover:text-white"
              }`}
            >
              <span>{audioEnabled ? "🔊 AUDIO TÁCTIL ACTIVO" : "🔇 AUDIO TÁCTIL (DESACTIVADO)"}</span>
            </button>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="size-11 rounded-2xl bg-[#121824] border border-[#1E293B] text-[#E9E7E0] hover:text-[#C6F827] hover:border-[#C6F827] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                aria-label="Proyecto anterior"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="size-11 rounded-2xl bg-[#121824] border border-[#1E293B] text-[#E9E7E0] hover:text-[#C6F827] hover:border-[#C6F827] flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                aria-label="Siguiente proyecto"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Platform Direct Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ECOSYSTEM_PROJECTS.map((project, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleJump(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "bg-[#121824] border-[#C6F827] shadow-lg -translate-y-0.5"
                    : "bg-[#0D121B] border-[#1E293B] hover:border-[#334155] opacity-75 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-[#C6F827] text-[#0A0E14] font-black" : "bg-[#121824] text-slate-400"
                  }`}>
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    ONLINE
                  </span>
                </div>
                <p className="font-mono text-xs font-bold text-white group-hover:text-[#C6F827] transition-colors truncate">
                  {project.slug}
                </p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {project.category.split("·")[0].trim()}
                </p>
              </button>
            );
          })}
        </div>

        {/* Monumental Active Project Showcase Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#121824] border-2 border-[#1E293B] shadow-2xl relative overflow-hidden space-y-8 animate-smooth-in">
          {/* Top Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1E293B]">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center p-2 shadow-xs">
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
                <span className="font-mono text-xs font-bold text-[#C6F827] uppercase tracking-wider block">
                  {currentProject.slug}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentProject.name}
                </h3>
              </div>
            </div>

            {/* Viewport Simulation Mode Selector */}
            <div className="flex items-center p-1 rounded-xl bg-[#0A0E14] border border-[#1E293B] gap-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setPreviewMode("desktop")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  previewMode === "desktop" ? "bg-[#1E293B] text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                💻 Escritorio
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("tablet")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  previewMode === "tablet" ? "bg-[#1E293B] text-white font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                📱 Tablet
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("terminal")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  previewMode === "terminal" ? "bg-[#C6F827] text-[#0A0E14] font-black" : "text-slate-400 hover:text-white"
                }`}
              >
                ⚡ Terminal API
              </button>
            </div>
          </div>

          {/* Card Middle: Two Columns (Specs & Visual Mockup) */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 Columns: Architectural Overview & Tech Specs */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-base text-slate-300 leading-relaxed font-normal">
                {currentProject.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Motor &amp; Framework</span>
                  <span className="text-white font-bold">{currentProject.specs.engine}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Base de Datos</span>
                  <span className="text-white font-bold">{currentProject.specs.database}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Hardware / Cripto</span>
                  <span className="text-white font-bold">{currentProject.specs.hardwareOrSecurity}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase block">Métrica Crítica</span>
                  <span className="text-[#C6F827] font-bold">{currentProject.specs.resilienceMetric}</span>
                </div>
              </div>

              {/* Core Features Badges */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase text-slate-400 block tracking-wider">
                  Capacidades del Sistema Operativo
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentProject.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-3 py-1.5 rounded-xl bg-[#0D121B] border border-[#1E293B] text-xs text-slate-300 flex items-center gap-1.5"
                    >
                      <span className="size-1.5 rounded-full bg-[#C6F827]" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-[#C6F827] text-[#0A0E14] font-black text-xs uppercase tracking-wider hover:bg-[#bcf020] active:scale-95 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>🚀 Probar en Producción</span>
                  <span className="text-sm">↗</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedProject(currentProject)}
                  className="px-5 py-3.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] text-white hover:border-[#C6F827] font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  📖 Reporte de Arquitectura
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyCommand(`curl -I ${currentProject.liveUrl}`)}
                  className="px-4 py-3.5 rounded-2xl bg-[#0D121B] border border-[#1E293B] text-slate-400 hover:text-white font-mono text-xs transition cursor-pointer"
                >
                  {copiedSlug ? "✓ CURL Copiado" : "curl -I"}
                </button>
              </div>
            </div>

            {/* Right 6 Columns: Interactive Stage Frame */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl p-4 bg-[#0D121B] border border-[#1E293B] shadow-inner space-y-4">
                {/* Frame Title Bar */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-red-500/70" />
                    <span className="size-2.5 rounded-full bg-yellow-500/70" />
                    <span className="size-2.5 rounded-full bg-green-500/70" />
                    <span className="text-slate-300 ml-2">{currentProject.liveUrl}</span>
                  </div>
                  <span className="text-emerald-400">HTTP 200 OK</span>
                </div>

                {/* Display based on previewMode */}
                {previewMode === "terminal" ? (
                  <div className="p-4 rounded-xl bg-[#0A0E14] font-mono text-xs text-slate-300 space-y-2 overflow-x-auto min-h-[260px]">
                    <div className="text-slate-500">// Terminal Telemetry &amp; REST Schema Query</div>
                    <div className="text-[#C6F827]">$ curl -X GET &quot;{currentProject.liveUrl}/api/health&quot;</div>
                    <div className="text-slate-400">
                      {`{
  "status": "operational",
  "node": "LATAM-01",
  "platform": "${currentProject.slug}",
  "engine": "${currentProject.specs.engine}",
  "uptime": "99.99%",
  "latency": "38ms"
}`}
                    </div>
                    <div className="text-[#C6F827] pt-2">$ git remote get-url origin</div>
                    <div className="text-slate-400">https://github.com/AgustinMilesi/{currentProject.id}</div>
                  </div>
                ) : (
                  <div className={`mx-auto rounded-xl bg-[#0A0E14] border border-[#1E293B] p-5 space-y-4 transition-all ${
                    previewMode === "tablet" ? "max-w-sm" : "w-full"
                  }`}>
                    {/* Simulated App Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-lg bg-[#C6F827] text-[#0A0E14] flex items-center justify-center font-black text-[10px]">
                          V
                        </div>
                        <span className="font-bold text-xs text-white">{currentProject.slug}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                        Live Session
                      </span>
                    </div>

                    {/* Simulated Content Dashboard */}
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-[#121824] border border-[#1E293B] space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Declaración de Trinchera</span>
                        <p className="text-xs text-slate-200">{currentProject.tagline}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-2.5 rounded-lg bg-[#121824] border border-[#1E293B]">
                          <span className="text-slate-500 block">DB LATENCY</span>
                          <span className="text-white font-bold">&lt; 15ms</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#121824] border border-[#1E293B]">
                          <span className="text-slate-500 block">RESILIENCE</span>
                          <span className="text-[#C6F827] font-bold">100% Offline</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Bottom Keyboard Navigation Hint */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-500 pt-2 border-t border-[#1E293B]">
          <div className="flex items-center gap-4">
            <span>Navegación: <kbd className="px-1.5 py-0.5 rounded bg-[#121824] border border-[#1E293B] text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-[#121824] border border-[#1E293B] text-slate-300">→</kbd></span>
            <span>Salto directo: <kbd className="px-1.5 py-0.5 rounded bg-[#121824] border border-[#1E293B] text-slate-300">1-4</kbd></span>
            <span>Inspección: <kbd className="px-1.5 py-0.5 rounded bg-[#121824] border border-[#1E293B] text-slate-300">Espacio</kbd></span>
          </div>
          <div>
            <span>Plataforma {currentIndex + 1} de {ECOSYSTEM_PROJECTS.length}</span>
          </div>
        </div>
      </div>

      {/* Case Study Architecture Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
