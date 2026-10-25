"use client";

import { useState, useEffect, useCallback } from "react";
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
      "Lector de Barra Buffer Raw",
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
  id              String      @id @default(cuid())
  containerNumber String      @unique
  blNumber        String      @unique // Bill of Lading
  originPort      String
  destinationPort String
  carrierName     String
  freeDaysAllowed Int         @default(7)
  dischargedAt    DateTime?
  demurrageRatePerDay Decimal @db.Decimal(10, 2)
  status          ShipmentStatus @default(IN_TRANSIT)
  customsBrokerId String
}`,
    dataFlow: [
      "Ingesta del Bill of Lading (BL) con parsing de fecha estimada de arribo (ETA).",
      "Cómputo diario de días libres restantes en terminal portuaria fiscal.",
      "Disparo de notificación prioritaria al despachante de aduana ante riesgo de estadía.",
      "Generación de liquidación proforma con discriminación de flete, seguro y derechos.",
    ],
  },
  {
    id: "inbox",
    slug: "vout/inbox",
    name: "VOUT Inbox · Multi-Tenant Feedback & Inbound CRM",
    category: "CRM SAAS MULTI-INQUILINO · WEBHOOKS FIRMADOS · API REST",
    tagline:
      "Plataforma multi-inquilino de captura y triaje de consultas con webhooks firmados HMAC-SHA256.",
    description:
      "Arquitectura de ingesta de prospectos y retroalimentación para empresas SaaS. Permite incrustar formularios de contacto protegidos contra bots, distribuir mensajes por equipos y despachar eventos webhook en tiempo real a endpoints de clientes.",
    liveUrl: "https://saas-am.vercel.app",
    repoFolder: "e:\\Proyectos\\saas",
    specs: {
      engine: "Next.js 16 Server Actions + REST API v1",
      database: "PostgreSQL con Aislamiento Estricto por Organización",
      hardwareOrSecurity: "Firmas Criptográficas HMAC-SHA256 + Token Auth",
      resilienceMetric: "< 15ms Tiempo de Respuesta en Ingesta de Forms",
    },
    features: [
      "Formularios Embebibles",
      "Aislamiento Multi-Tenant",
      "Webhooks con Firma HMAC",
      "Triaje en Tiempo Real",
      "Gestión de Tokens de API",
      "Métricas de Conversión",
    ],
    problemStatement:
      "Las pymes suelen perder prospectos porque los formularios de sus sitios web fallan silenciosamente, caen en casillas de spam no revisadas o son bombardeados por bots maliciosos.",
    architecturalSolution:
      "VOUT Inbox provee una API de ingesta resiliente con validación por esquema Zod, almacenamiento inmutable en PostgreSQL y despacho redundante a webhooks suscritos con firma criptográfica verificable.",
    schemaSnippet: `model Organization {
  id        String       @id @default(cuid())
  name      String
  slug      String       @unique
  forms     InboundForm[]
  webhooks  WebhookEndpoint[]
  apiKeys   ApiKey[]
}

model InboundSubmission {
  id          String   @id @default(cuid())
  formId      String
  senderEmail String
  payload     Json
  ipHash      String
  verified    Boolean  @default(false)
  createdAt   DateTime @default(now())
}`,
    dataFlow: [
      "Formulario cliente despacha POST a /api/v1/inbound con payload validado.",
      "Motor valida cuota de API del inquilino y aplica filtro anti-spam por IP hash.",
      "Registro atómico en base de datos con marcado de estado 'Pendiente de Triaje'.",
      "Despacho asíncrono de webhook con cabecera X-Vout-Signature calculada con SHA256.",
    ],
  },
  {
    id: "connect",
    slug: "vout/connect",
    name: "VOUT Connect · Sovereign Cloud Gateway & Direct Portal",
    category: "GATEWAY CORPORATIVO · ENRUTAMIENTO DIRECTO · TELEMETRÍA",
    tagline:
      "Gateway corporativo de ingesta soberana, enrutamiento seguro de mensajes y protección anti-bot.",
    description:
      "Canal de entrada directo del ecosistema VOUT. Integra telemetría de estado de nodos, selectores de alcance de proyecto preconfigurados, verificación de latencia en vivo y enrutamiento seguro hacia terminales de Agustín Milesi.",
    liveUrl: "https://agustinmilesi-contact.vercel.app",
    repoFolder: "e:\\Proyectos\\contact-page",
    specs: {
      engine: "Next.js 16 + Tailwind CSS + Sonner Toasts",
      database: "Edge KV Store + In-Memory Token Bucket",
      hardwareOrSecurity: "Filtro Heurístico Anti-Bot + SLA 99.99%",
      resilienceMetric: "100% Mensajes Encriptados & Trazables",
    },
    features: [
      "Selector de Alcance Predefinido",
      "Filtro Anti-Bot sin Captchas",
      "Telemetría de Nodos en Vivo",
      "Copiado de Endpoints de 1 Clic",
      "Diseño Minimalista de Alto Contraste",
      "SLA 99.99% Garantizado",
    ],
    problemStatement:
      "Los formularios corporativos tradicionales sobrecargan a los usuarios con captchas ilegibles y no ofrecen trazabilidad de si la transmisión fue recibida por el equipo de ingeniería.",
    architecturalSolution:
      "VOUT Connect implementa un túnel de contacto ultraligero con protección contra bots basada en firmas de tiempo y campos trampa (honeypot), ofreciendo feedback instantáneo y telemetría de latencia en pantalla.",
    schemaSnippet: `type InboundPayload = {
  fullName: string;
  email: string;
  company?: string;
  scopePreset: "retail" | "cargo" | "inbox" | "custom";
  message: string;
  clientTimestamp: number;
};

// Rate limiter token-bucket: máx 5 envíos por IP / 15 min`,
    dataFlow: [
      "Usuario selecciona el alcance técnico deseado (Retail, Cargo, Inbox o Custom).",
      "Validación de campos en cliente con Zod e inyección de token temporal de sesión.",
      "Recepción en Edge Handler con verificación anti-bot en < 20ms.",
      "Confirmación visual con Sonner Toasts y copiado instantáneo de endpoints de soporte.",
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
      "VOUT Pocket prioriza el saldo disponible antes del próximo cobro. En la calle guarda al instante en SQLite local de Android; al volver al Wi-Fi, sincroniza bidireccionalmente con el hub web de PostgreSQL sin colisiones.",
    schemaSnippet: `model ExpenseRecord {
  id           String      @id @default(cuid())
  userId       String
  amount       Decimal     @db.Decimal(10, 2)
  category     Category    // FIXED, SUBSCRIPTION, LEISURE, MICRO
  description  String
  currency     String      @default("ARS")
  isRecurring  Boolean     @default(false)
  syncedAt     DateTime?
  createdAt    DateTime    @default(now())
}`,
    dataFlow: [
      "Registro de microgasto en menos de 3 toques en la app móvil Android offline.",
      "Almacenamiento inmediato en SQLite nativo con marca de tiempo UTC.",
      "Al detectar conectividad, el worker de background envía el lote al endpoint Next.js.",
      "El hub web actualiza en tiempo real el velocímetro de ingreso disponible.",
    ],
  },
];

export function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectData | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const activeProject = ECOSYSTEM_PROJECTS[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ECOSYSTEM_PROJECTS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ECOSYSTEM_PROJECTS.length) % ECOSYSTEM_PROJECTS.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedCaseStudy) return; // Don't slide if modal is open
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide, selectedCaseStudy]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused || selectedCaseStudy) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide, selectedCaseStudy]);

  return (
    <section id="proyectos" className="py-16 sm:py-24 border-b border-[#1E293B] bg-[#0A0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1E293B]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C6F827]">
              <span className="size-2 rounded-full bg-[#C6F827]" />
              <span>// ECOSISTEMA EN PRODUCCIÓN</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#E9E7E0]">
              El carrusel de plataformas VOUT
            </h2>
            <p className="text-sm sm:text-base text-[#9A9E86] max-w-2xl">
              Explora las 5 aplicaciones completas que componen la infraestructura de VOUT. Cada una responde
              a un desafío operativo real con código de producción probado.
            </p>
          </div>

          {/* Slide Indicator & Arrows */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="font-mono text-xs text-[#9A9E86]">
              <span className="text-[#C6F827] font-bold text-base">0{currentIndex + 1}</span>
              <span className="text-[#1E293B] mx-1">/</span>
              <span>0{ECOSYSTEM_PROJECTS.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                className="size-11 rounded-2xl bg-[#121824] border border-[#1E293B] text-[#E9E7E0] hover:text-[#C6F827] hover:border-[#C6F827] flex items-center justify-center transition-all active:scale-95 shadow-sm"
                aria-label="Plataforma anterior"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="size-11 rounded-2xl bg-[#121824] border border-[#1E293B] text-[#E9E7E0] hover:text-[#C6F827] hover:border-[#C6F827] flex items-center justify-center transition-all active:scale-95 shadow-sm"
                aria-label="Siguiente plataforma"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* The Main Carousel Card Stage */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-[#121824] border-2 border-[#1E293B] rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 overflow-hidden"
        >
          {/* Subtle background dither accent */}
          <div className="absolute top-0 right-0 w-96 h-96 dither-canvas opacity-30 pointer-events-none rounded-bl-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Project Identity & Specs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges & Slug */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-sm px-3.5 py-1.5 rounded-full bg-[#0A0E14] border border-[#1E293B] text-[#C6F827] font-semibold">
                  {activeProject.slug}
                </span>

                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0E14] border border-[#1E293B] text-[11px] font-mono text-[#E9E7E0]">
                  <span className="size-2 rounded-full bg-[#C6F827] pulse-dot" />
                  SLA 99.9% · EN VIVO
                </span>

                <span className="text-xs font-mono text-[#9A9E86] hidden sm:inline">
                  {activeProject.category}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#E9E7E0] leading-tight">
                  {activeProject.name}
                </h3>
                <p className="text-sm sm:text-base text-[#9A9E86] leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* 4 Technical Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#0A0E14] border border-[#1E293B]">
                  <span className="text-[10px] font-mono uppercase text-[#9A9E86] block">ENGINE &amp; RUNTIME</span>
                  <span className="text-xs font-bold text-[#E9E7E0] mt-1 block truncate">
                    {activeProject.specs.engine}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0A0E14] border border-[#1E293B]">
                  <span className="text-[10px] font-mono uppercase text-[#9A9E86] block">DATABASE &amp; CACHE</span>
                  <span className="text-xs font-bold text-[#E9E7E0] mt-1 block truncate">
                    {activeProject.specs.database}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0A0E14] border border-[#1E293B]">
                  <span className="text-[10px] font-mono uppercase text-[#9A9E86] block">HARDWARE / SEGURIDAD</span>
                  <span className="text-xs font-bold text-[#E9E7E0] mt-1 block truncate">
                    {activeProject.specs.hardwareOrSecurity}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0A0E14] border border-[#1E293B]">
                  <span className="text-[10px] font-mono uppercase text-[#9A9E86] block">MÉTRICA CRÍTICA</span>
                  <span className="text-xs font-bold text-[#C6F827] mt-1 block truncate">
                    {activeProject.specs.resilienceMetric}
                  </span>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeProject.features.map((feat) => (
                  <span
                    key={feat}
                    className="px-2.5 py-1 rounded-lg bg-[#161F30] border border-[#1E293B] text-[11px] font-mono text-[#E9E7E0]/90"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(activeProject)}
                  className="px-5 py-3 rounded-2xl bg-[#0A0E14] border-2 border-[#1E293B] text-xs font-mono text-[#E9E7E0] hover:text-[#C6F827] hover:border-[#C6F827] transition-all transform active:scale-95 flex items-center gap-2 shadow-sm"
                >
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Inspeccionar Arquitectura (Case Study)</span>
                </button>

                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-[#C6F827] text-[#0A0E14] font-black text-xs uppercase tracking-wider hover:bg-white transition-all transform active:scale-95 flex items-center gap-2 shadow-md"
                >
                  <span>Lanzar en Producción</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Right Column: Visual Blueprint Preview (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-md bg-[#0A0E14] border-2 border-[#1E293B] rounded-2xl p-5 space-y-4 shadow-xl select-none">
                {/* Mock Window Top Bar */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-[#FF5555]" />
                    <span className="size-2.5 rounded-full bg-[#FFB86C]" />
                    <span className="size-2.5 rounded-full bg-[#50FA7B]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#9A9E86]">
                    https://{new URL(activeProject.liveUrl).hostname}
                  </span>
                </div>

                {/* Technical Abstract Blueprint */}
                <div className="p-4 rounded-xl bg-[#121824] border border-[#1E293B] space-y-3 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-[#C6F827]">
                    <span>&gt; vout.runtime.inspect()</span>
                    <span>ONLINE</span>
                  </div>
                  <div className="text-[#9A9E86] space-y-1">
                    <p>├─ Target: {activeProject.slug}</p>
                    <p>├─ Memory: SQLite + IndexedDB Synced</p>
                    <p>├─ Security: Strict AES + Signed Tokens</p>
                    <p className="text-[#E9E7E0]">└─ Status: 0 unhandled rejections</p>
                  </div>
                </div>

                {/* Schema Snippet Micro-preview */}
                <div className="bg-[#05070A] rounded-xl p-3 border border-[#1E293B] text-[10px] font-mono text-[#9A9E86] overflow-hidden max-h-36">
                  <span className="text-[#C6F827] block mb-1">// Prisma schema definition</span>
                  <pre className="text-[9px] leading-relaxed truncate opacity-80">
                    {activeProject.schemaSnippet.slice(0, 180)}...
                  </pre>
                </div>

                {/* Quick Interactive Button to Test */}
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(activeProject)}
                  className="w-full py-2.5 rounded-xl bg-[#161F30] border border-[#1E293B] text-xs font-mono text-[#C6F827] hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Ver esquema completo y flujo de datos</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Direct Selector Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {ECOSYSTEM_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                currentIndex === idx
                  ? "bg-[#121824] border-[#C6F827] shadow-md"
                  : "bg-[#0A0E14] border-[#1E293B] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="text-[10px] font-mono text-[#9A9E86]">0{idx + 1}</div>
              <div
                className={`text-xs font-mono font-bold truncate mt-0.5 ${
                  currentIndex === idx ? "text-[#C6F827]" : "text-[#E9E7E0]"
                }`}
              >
                {proj.slug}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
}
