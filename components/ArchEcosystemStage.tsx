"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import portraitImg from "../public/agustin_milesi_cutout.png";
import { CaseStudyModal, ProjectData } from "./CaseStudyModal";
import { usePreferences } from "@/components/PreferencesProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const ECOSYSTEM_PROJECTS: ProjectData[] = [
  {
    id: "retail",
    slug: "vout/retail",
    name: "VOUT Retail · Cloud Point of Sale & Store Inventory Engine",
    category: "PUNTO DE VENTA (POS) · CONTROL DE STOCK · HARDWARE FISCAL",
    tagline: "Punto de venta de alta velocidad, lector de barra nativo, arqueos ciegos y facturación térmica.",
    description: "Diseñado para eliminar filas y descuadres en el mostrador minorista y mayorista. Arquitectura optimizada para lecturas HID de códigos de barra en < 50ms, transacciones atómicas con bloqueo de concurrencia y tickets térmicos ESC/POS.",
    liveUrl: "https://milesi-erp.vercel.app/demo",
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
      "Los sistemas POS tradicionales dependen de conectividad permanente. Cuando la red cae en hora pico de un sábado por la tarde, los cajeros quedan paralizados, las colas crecen y los faltantes de caja son imposibles de auditar.",
    architecturalSolution:
      "VOUT Retail almacena el catálogo de productos y precios en un caché local IndexedDB en memoria. Las ventas se registran de forma atómica y se reconcilian con PostgreSQL en segundo plano sin bloquear al operador.",
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
    tagline: "Gestión de consultas de clientes con webhooks firmados HMAC y portal soberano de contacto directo.",
    description: "Arquitectura unificada que integra el SaaS multi-inquilino de retroalimentación de clientes y el canal institucional de contacto directo. Ofrece ingesta de prospectos con validación estricta Zod, protección anti-bot y despacho en tiempo real.",
    liveUrl: "https://saas-am.vercel.app/demo",
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
      "Las empresas pierden prospectos y feedback valioso porque los formularios de sus sitios web fallan silenciosamente, caen en bandejas de spam olvidadas o carecen de integración con la infraestructura interna de ventas.",
    architecturalSolution:
      "VOUT Inbox unifica la captura institucional directa y la API de formularios embebibles en una sola plataforma resiliente. Cada envío se almacena atómicamente en PostgreSQL, crea el perfil de contacto y notifica asíncronamente vía webhook firmado HMAC.",
    schemaSnippet: `model Organization {
  id            String   @id @default(cuid())
  name          String
  slug          String   @unique
  notifyEmail   String?
  webhookUrl    String?
  webhookSecret String?  // Clave HMAC-SHA256
  createdAt     DateTime @default(now())
  messages      FeedbackMessage[]
}

model FeedbackMessage {
  id          String   @id @default(cuid())
  orgId       String
  senderEmail String
  content     String
  status      String   @default("UNREAD")
  createdAt   DateTime @default(now())
}`,
    dataFlow: [
      "Prospecto completa formulario en sitio cliente o portal de contacto soberano.",
      "Backend valida esquema Zod y ejecuta control anti-bot honeypot.",
      "Registro se almacena en PostgreSQL con aislamiento multi-tenant por ID de organización.",
      "Servicio emite payload firmado criptográficamente con HMAC-SHA256 hacia el webhook del cliente.",
    ],
  },
  {
    id: "cargo",
    slug: "vout/cargo",
    name: "VOUT Cargo · Freight Forwarding, Demurrage & Customs Auditing",
    category: "LOGÍSTICA INTERNACIONAL · DEMURRAGE MARÍTIMO · TRAZABILIDAD ADUANERA",
    tagline: "Gestión de contenedores marítimos, cronómetros de demurrage fiscal y auditoría de documentos aduaneros.",
    description: "Diseñado para importadores y operadores logísticos que enfrentan multas millonarias por retrasos en la devolución de contenedores a terminales portuarias. Centraliza guías de embarque (BL), estados de arribo y auditorías de costos de almacenamiento.",
    liveUrl: "https://cargo-am.vercel.app/demo",
    repoFolder: "e:\\Proyectos\\sap",
    specs: {
      engine: "Next.js 16 + React Server Components",
      database: "PostgreSQL Cloud + Motor de Cálculo Temporal",
      hardwareOrSecurity: "Validación ISO 6346 de Contenedores + Auditoría Inmutable",
      resilienceMetric: "Cálculo Predictivo de Multas en Segundos con Alertas Tempranas",
    },
    features: [
      "Detección de Días Libres de Demurrage",
      "Control de Contenedores ISO 6346",
      "Asociación de Guías de Embarque (BL)",
      "Historial de Movimientos de Depósito",
      "Proyección de Costos de Estadía",
      "Consola de Auditoría Operativa",
    ],
    problemStatement:
      "Las navieras cobran penalizaciones severas por cada día que un contenedor excede su plazo en el puerto. El seguimiento en planillas de cálculo manuales provoca demoras en aduana y sobrecostos inesperados que destruyen la rentabilidad.",
    architecturalSolution:
      "VOUT Cargo implementa un motor de cálculo temporal que computa la ventana de días libres según la naviera y la fecha de descarga en muelle, generando alertas proactivas antes de que comience el devengamiento de penalizaciones.",
    schemaSnippet: `model Shipment {
  id              String      @id @default(cuid())
  blNumber        String      @unique // Bill of Lading
  carrierName     String
  arrivalPort     String
  dischargeDate   DateTime?
  freeDaysAllowed Int         @default(7)
  containers      Container[]
}

model Container {
  id              String      @id @default(cuid())
  shipmentId      String
  containerNumber String      // Validado ISO 6346
  demurrageDaily  Decimal     @db.Decimal(10, 2)
  returnedAt      DateTime?
}`,
    dataFlow: [
      "Operador ingresa número de BL y contenedores con validación de dígito verificador ISO 6346.",
      "Sistema registra fecha de descarga efectiva emitida por la terminal portuaria.",
      "Algoritmo calcula fecha de expiración de días libres y alerta ante riesgo de mora.",
      "Al registrarse la devolución del contenedor vacío, se cierra la auditoría de costos.",
    ],
  },
  {
    id: "pocket",
    slug: "vout/pocket",
    name: "VOUT Pocket · Sovereign Personal Finance & Cross-Device Hub",
    category: "FINANZAS PERSONALES · OFFLINE-FIRST NATIVO · SINCRONIZACIÓN PRIVADA",
    tagline: "Control de gastos con registro offline inmediato, cálculo de margen disponible y sincronización privada.",
    description: "Diseñado para el control financiero individual estricto. Registra compras al instante en la calle sin esperar conectividad, categoriza microgastos, audita suscripciones y sincroniza de forma segura sin compartir datos financieros con terceros.",
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
      "Las aplicaciones financieras convencionales exigen conexión a internet en todo momento y tardan demasiado en abrir. Si perdés señal al pagar en la calle, no podés registrar el gasto en el momento.",
    architecturalSolution:
      "VOUT Pocket corre con SQLite local embebido en el teléfono. Cada compra se anota en menos de 2 segundos sin internet. Al reconectarse, un motor de sincronización diferencial actualiza el Hub Web en la nube sin duplicados.",
    schemaSnippet: `model ExpenseRecord {
  id           String   @id @default(cuid())
  userId       String
  amount       Decimal  @db.Decimal(12, 2)
  currency     String   @default("ARS")
  category     String
  merchant     String?
  timestamp    DateTime @default(now())
  synced       Boolean  @default(false)
}

model SubscriptionAudit {
  id           String   @id @default(cuid())
  serviceName  String
  costMonthly  Decimal  @db.Decimal(10, 2)
  renewalDay   Int
  isActive     Boolean  @default(true)
}`,
    dataFlow: [
      "Operador anota microgasto en su celular en segundos con almacenamiento en SQLite local.",
      "Motor local recalcula el saldo restante del mes de forma instantánea sin conexión.",
      "Cuando hay conectividad, el cliente envía diffs pendientes al Hub Web en PostgreSQL.",
      "Consola web sincronizada refleja métricas de liquidez consolidadas en tiempo real.",
    ],
  },
];

interface AppSticker {
  id: string;
  name: string;
  role: string;
  solutionSummary: string;
  colorClass: string;
  rotationDesktop: string;
  positionDesktop: string;
}

const APP_STICKERS: AppSticker[] = [
  {
    id: "retail",
    name: "01 · VOUT Retail",
    role: "CLOUD POS & STOCK",
    solutionSummary: "Arqueos ciegos y lector < 50ms sin colas",
    colorClass: "bg-[var(--primary-accent,#C6F827)] text-[#0A0E14] border-[#0A0E14]",
    rotationDesktop: "-rotate-3 hover:-rotate-1",
    positionDesktop: "top-8 -left-4 md:-left-8 lg:-left-12",
  },
  {
    id: "inbox",
    name: "02 · VOUT Inbox",
    role: "CRM & CONTACTO",
    solutionSummary: "Ingesta segura y webhooks firmados HMAC",
    colorClass: "bg-[#121824] text-[var(--primary-accent,#C6F827)] border-[var(--primary-accent,#C6F827)]/50",
    rotationDesktop: "rotate-3 hover:rotate-1",
    positionDesktop: "top-12 -right-4 md:-right-8 lg:-right-12",
  },
  {
    id: "cargo",
    name: "03 · VOUT Cargo",
    role: "LOGÍSTICA & ADUANA",
    solutionSummary: "Control de contenedores y alerta de demurrage",
    colorClass: "bg-[#E9E7E0] text-[#0A0E14] border-[#1E293B]",
    rotationDesktop: "-rotate-2 hover:rotate-0",
    positionDesktop: "bottom-32 -left-4 md:-left-8 lg:-left-10",
  },
  {
    id: "pocket",
    name: "04 · VOUT Pocket",
    role: "FINANZAS OFFLINE",
    solutionSummary: "Registro de gastos en 2s con SQLite local",
    colorClass: "bg-[#161F30] text-[#E9E7E0] border-[#1E293B]",
    rotationDesktop: "rotate-3 hover:rotate-1",
    positionDesktop: "bottom-28 -right-4 md:-right-8 lg:-right-10",
  },
];

export function ArchEcosystemStage() {
  const { t } = usePreferences();
  const [activeAppId, setActiveAppId] = useState<string>("retail");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const currentProject = ECOSYSTEM_PROJECTS.find((p) => p.id === activeAppId) || ECOSYSTEM_PROJECTS[0];

  const handleSelectApp = useCallback((id: string) => {
    setActiveAppId(id);
  }, []);

  // GSAP 1. Initial Reveal & Organic Floating Physics
  useGSAP(() => {
    // Reveal of Arch & Portrait
    if (archRef.current) {
      gsap.from(archRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }

    // Pop-in of desktop stickers
    gsap.from(".desktop-sticker", {
      scale: 0.7,
      opacity: 0,
      y: 15,
      stagger: 0.1,
      duration: 0.65,
      ease: "back.out(1.5)",
      delay: 0.2,
    });

    // Organic floating badges physics
    gsap.to(".sticker-retail", {
      y: -7,
      rotation: "-=1.5",
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(".sticker-inbox", {
      y: 6,
      rotation: "+=1.2",
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.4,
    });

    gsap.to(".sticker-cargo", {
      y: -6,
      rotation: "+=1.3",
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.8,
    });

    gsap.to(".sticker-pocket", {
      y: 7,
      rotation: "-=1.4",
      duration: 3.0,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.3,
    });
  }, { scope: containerRef });

  // GSAP 2. Smooth Transition when switching between Apps
  useGSAP(() => {
    if (!showcaseRef.current) return;
    gsap.fromTo(
      showcaseRef.current,
      { opacity: 0.6, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, { dependencies: [activeAppId], scope: containerRef });

  return (
    <section ref={containerRef} id="proyectos" className="py-12 sm:py-20 border-b border-[var(--border-card,#1E293B)] bg-[var(--bg-page,#0A0E14)] relative transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 w-full max-w-full">
        {/* Section Heading */}
        <div className="text-center space-y-2.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-xs font-mono text-[var(--primary-accent,#C6F827)] shadow-xs">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">ECOSISTEMA EN PRODUCCIÓN · VOUT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--text-main,#E9E7E0)]">
            Sistemas que Resuelven la Operación Real
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted,#9A9E86)] leading-relaxed">
            Hacé clic en cada aplicación para explorar qué desafío operativo resuelve, su esquema de base de datos y probar la demo en vivo.
          </p>
        </div>

        {/* Mobile App Selector Grid (Visible on small screens) */}
        <div className="grid grid-cols-2 gap-2 md:hidden">
          {APP_STICKERS.map((stk) => {
            const isSelected = stk.id === activeAppId;
            return (
              <button
                key={stk.id}
                type="button"
                onClick={() => handleSelectApp(stk.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer min-h-[44px] ${
                  isSelected
                    ? "bg-[var(--bg-card,#121824)] border-[var(--primary-accent,#C6F827)] shadow-md"
                    : "bg-[var(--bg-card-subtle,#0D121B)] border-[var(--border-card,#1E293B)] opacity-75"
                }`}
              >
                <span className={`text-[10px] font-mono font-bold block ${
                  isSelected ? "text-[var(--primary-accent,#C6F827)]" : "text-[var(--text-muted,#9A9E86)]"
                }`}>
                  {stk.name}
                </span>
                <span className="text-xs font-bold text-[var(--text-main,#E9E7E0)] block truncate mt-0.5">
                  {stk.role}
                </span>
              </button>
            );
          })}
        </div>

        {/* Monumental Central Arch Stage Container */}
        <div className="relative mx-auto max-w-4xl min-h-[440px] sm:min-h-[520px] flex items-center justify-center w-full">
          {/* The Arch Frame */}
          <div ref={archRef} className="w-full max-w-[290px] sm:max-w-[400px] md:max-w-[460px] h-[420px] sm:h-[500px] rounded-t-full bg-gradient-to-b from-[#161F30] via-[#121824] to-[#0A0E14] border-t-2 border-x-2 border-[#1E293B] relative overflow-hidden shadow-2xl flex flex-col items-center justify-end p-0">
            {/* Subtle glow behind Agustín */}
            <div className="absolute bottom-12 inset-x-8 h-48 bg-[var(--primary-accent,#C6F827)]/15 blur-3xl rounded-full pointer-events-none" />

            {/* Agustín Milesi Cutout Portrait */}
            <div className="relative z-10 w-full flex flex-col items-center justify-end select-none">
              <div className="relative w-full max-w-[270px] sm:max-w-[360px] h-[310px] sm:h-[390px] flex items-end justify-center">
                <Image
                  src={portraitImg}
                  alt="Agustín Milesi · VOUT Software Architecture"
                  priority
                  className="w-auto h-full max-h-[390px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent opacity-50 pointer-events-none" />
              </div>

              {/* Architect Nameplate */}
              <div className="w-full bg-[#0D121B]/95 backdrop-blur-md border-t border-[#1E293B] py-2.5 px-3.5 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-lg bg-[#121824] border border-[#1E293B] flex items-center justify-center p-1 shrink-0">
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
                    <h3 className="text-xs font-black text-white leading-none">Agustín Milesi</h3>
                    <p className="text-[10px] font-mono text-[#9A9E86] leading-none mt-0.5">Founder &amp; Architect · VOUT</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>
            </div>

            <div className="w-full h-1.5 bg-[#1E293B]" />
          </div>

          {/* Desktop Floating App Stickers around Agustín */}
          {APP_STICKERS.map((stk) => {
            const isSelected = stk.id === activeAppId;
            return (
              <button
                key={stk.id}
                type="button"
                onClick={() => handleSelectApp(stk.id)}
                className={`desktop-sticker sticker-${stk.id} hidden md:flex flex-col absolute ${stk.positionDesktop} ${stk.rotationDesktop} transition-shadow duration-300 transform cursor-pointer select-none text-left z-20 ${
                  isSelected
                    ? "scale-110 z-30 ring-2 ring-[var(--primary-accent,#C6F827)] shadow-[0_0_25px_rgba(198,248,39,0.4)]"
                    : "hover:scale-105 opacity-85 hover:opacity-100 shadow-xl"
                }`}
                aria-label={`Seleccionar aplicación: ${stk.name}`}
              >
                <div className={`px-4 py-2.5 rounded-2xl border-2 ${stk.colorClass} font-mono max-w-[210px] shadow-lg`}>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs font-black uppercase tracking-tight leading-none">
                      {stk.name}
                    </span>
                    {isSelected && (
                      <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)] animate-ping shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold block mt-1 uppercase tracking-wide opacity-90 leading-tight">
                    {stk.role}
                  </span>
                  <span className="text-[10px] block mt-1 opacity-80 leading-snug font-sans">
                    {stk.solutionSummary}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected App Detail & Architectural Solution Showcase */}
        <div ref={showcaseRef} className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--bg-card,#121824)] border-2 border-[var(--border-card,#1E293B)] shadow-2xl space-y-6 sm:space-y-8 w-full max-w-full">
          {/* Header of Active App */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-card,#1E293B)]">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[var(--primary-accent,#C6F827)] uppercase tracking-wider block">
                {currentProject.slug} · {currentProject.category}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--text-main,#E9E7E0)] leading-tight">
                {currentProject.name}
              </h3>
            </div>

            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[var(--primary-accent,#C6F827)] text-[var(--primary-accent-text,#0A0E14)] font-black text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm min-h-[42px] shrink-0"
            >
              <span>🚀 {t.carouselLiveDemo}</span>
            </a>
          </div>

          {/* Problem Reality vs Engineering Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card-subtle,#0D121B)] border border-red-500/25 space-y-2">
              <span className="font-mono text-xs text-red-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-red-400" />
                Desafío Operativo que Resuelve
              </span>
              <p className="text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-normal text-xs sm:text-sm">
                {currentProject.problemStatement}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--primary-accent,#C6F827)]/25 space-y-2">
              <span className="font-mono text-xs text-[var(--primary-accent,#C6F827)] uppercase tracking-wider font-bold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[var(--primary-accent,#C6F827)]" />
                Solución de Arquitectura VOUT
              </span>
              <p className="text-[var(--text-main,#E9E7E0)]/90 leading-relaxed font-normal text-xs sm:text-sm">
                {currentProject.architecturalSolution}
              </p>
            </div>
          </div>

          {/* Specs (Left) & Real Prisma Schema (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
            {/* Left 6 Columns: Specs & Features */}
            <div className="lg:col-span-6 space-y-4 w-full min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)] space-y-1">
                  <span className="text-[11px] text-[var(--text-muted,#9A9E86)] uppercase block">{t.carouselEngine}</span>
                  <span className="text-[var(--text-main,#E9E7E0)] font-bold break-words block">{currentProject.specs.engine}</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)] space-y-1">
                  <span className="text-[11px] text-[var(--text-muted,#9A9E86)] uppercase block">{t.carouselDatabase}</span>
                  <span className="text-[var(--text-main,#E9E7E0)] font-bold break-words block">{currentProject.specs.database}</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)] space-y-1">
                  <span className="text-[11px] text-[var(--text-muted,#9A9E86)] uppercase block">{t.carouselSecurity}</span>
                  <span className="text-[var(--text-main,#E9E7E0)] font-bold break-words block">{currentProject.specs.hardwareOrSecurity}</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)] space-y-1">
                  <span className="text-[11px] text-[var(--text-muted,#9A9E86)] uppercase block">{t.carouselResilience}</span>
                  <span className="text-[var(--primary-accent,#C6F827)] font-bold break-words block">{currentProject.specs.resilienceMetric}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setSelectedProject(currentProject)}
                  className="px-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)] text-[var(--text-main,#E9E7E0)] hover:border-[var(--primary-accent,#C6F827)] font-bold text-xs uppercase tracking-wider transition cursor-pointer min-h-[42px] flex items-center justify-center text-center"
                >
                  📖 {t.carouselDeepAudit}
                </button>

                <a
                  href={`https://github.com/AgustinMilesi/${currentProject.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)] text-[var(--text-muted,#9A9E86)] hover:text-[var(--text-main,#E9E7E0)] font-mono text-xs transition min-h-[42px] flex items-center justify-center text-center gap-1"
                >
                  <span>💻 Código en GitHub ↗</span>
                </a>
              </div>
            </div>

            {/* Right 6 Columns: Real Database Schema Code Block */}
            <div className="lg:col-span-6 w-full min-w-0">
              <div className="rounded-2xl p-4 sm:p-5 bg-[var(--bg-page,#0A0E14)] border border-[var(--border-card,#1E293B)] space-y-2.5 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-card,#1E293B)] text-xs">
                  <span className="text-[var(--primary-accent,#C6F827)] font-bold">// MODELO DE DATOS PRISMA</span>
                  <span className="text-[11px] text-[var(--text-muted,#9A9E86)]">{currentProject.slug}</span>
                </div>
                <pre className="overflow-x-auto text-[11px] text-slate-300 leading-relaxed font-mono p-3 bg-[#06090E] rounded-xl max-h-[220px] border border-[#161F30]">
                  <code>{currentProject.schemaSnippet}</code>
                </pre>
                <div className="pt-1 flex items-center justify-between text-[11px] text-[var(--text-muted,#9A9E86)]">
                  <span>Stack: {currentProject.specs.engine}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(currentProject)}
                    className="text-[var(--primary-accent,#C6F827)] hover:underline cursor-pointer"
                  >
                    Ver análisis completo →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Deep Audit Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
