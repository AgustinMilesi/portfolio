"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import portraitImg from "../public/agustin_milesi_cutout.png";
import { CaseStudyModal, ProjectData } from "./CaseStudyModal";
import { usePreferences } from "@/components/PreferencesProvider";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

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
  positionResponsive: string;
}

const APP_STICKERS: AppSticker[] = [
  {
    id: "retail",
    name: "01 · Retail",
    role: "CLOUD POS",
    solutionSummary: "Arqueos ciegos y lector < 50ms sin colas",
    colorClass: "bg-[#1f1f1f] text-[#ffffff] border-[#252525]",
    rotationDesktop: "-rotate-2 hover:rotate-0",
    positionResponsive: "top-2 -left-2 sm:top-6 sm:-left-12 md:-left-20 lg:-left-26",
  },
  {
    id: "inbox",
    name: "02 · Inbox",
    role: "CRM & CONTACTO",
    solutionSummary: "Ingesta segura y webhooks firmados HMAC",
    colorClass: "bg-[#1f1f1f] text-[#ffffff] border-[#252525]",
    rotationDesktop: "rotate-2 hover:rotate-0",
    positionResponsive: "top-4 -right-2 sm:top-8 sm:-right-12 md:-right-20 lg:-right-26",
  },
  {
    id: "cargo",
    name: "03 · Cargo",
    role: "LOGÍSTICA",
    solutionSummary: "Control contenedores y alerta demurrage",
    colorClass: "bg-[#1f1f1f] text-[#ffffff] border-[#252525]",
    rotationDesktop: "-rotate-1 hover:rotate-0",
    positionResponsive: "bottom-16 -left-2 sm:bottom-22 sm:-left-10 md:-left-18 lg:-left-22",
  },
  {
    id: "pocket",
    name: "04 · Pocket",
    role: "FINANZAS",
    solutionSummary: "Registro gastos en 2s con SQLite local",
    colorClass: "bg-[#1f1f1f] text-[#ffffff] border-[#252525]",
    rotationDesktop: "rotate-1 hover:rotate-0",
    positionResponsive: "bottom-14 -right-2 sm:bottom-18 sm:-right-10 md:-right-18 lg:-right-22",
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

  // GSAP: Scroll-Triggered Reveal with clearProps to avoid inline style lock
  useGSAP(() => {
    // 1. Heading scroll-in
    gsap.from(".ecosystem-heading", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 88%",
        once: true,
      },
    });

    // 2. Arch + Stickers Choreographed Entrance
    if (archRef.current) {
      const archTl = gsap.timeline({
        scrollTrigger: {
          trigger: archRef.current,
          start: "top 88%",
          once: true,
        },
      });

      archTl
        .from(archRef.current, {
          y: 35,
          scale: 0.95,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "all",
        })
        .fromTo(
          ".app-sticker",
          {
            scale: 0.7,
            opacity: 0,
            y: 15,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "back.out(1.8)",
            clearProps: "all",
          },
          "-=0.25"
        );
    }

    // 3. Subtle glow parallax on scroll
    gsap.to(".arch-glow", {
      y: -15,
      ease: "none",
      scrollTrigger: {
        trigger: archRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // 4. Showcase card scroll reveal
    if (showcaseRef.current) {
      gsap.from(showcaseRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 90%",
          once: true,
        },
      });
    }
  }, { scope: containerRef });

  // Tactile Transition when switching between Apps
  useGSAP(() => {
    if (!showcaseRef.current) return;
    gsap.fromTo(
      showcaseRef.current,
      { opacity: 0.75, y: 12, scale: 0.99 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", clearProps: "transform,opacity" }
    );
  }, { dependencies: [activeAppId], scope: containerRef });

  return (
    <section ref={containerRef} id="proyectos" className="pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#252525] bg-[#060606] relative transition-colors w-full max-w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 w-full max-w-full">
        {/* Section Heading */}
        <div className="ecosystem-heading text-center space-y-2.5 max-w-3xl mx-auto">
          <div className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
            [ ECOSISTEMA EN PRODUCCIÓN · VOUT ]
          </div>
          <h2 className="font-serif font-light text-3xl sm:text-5xl md:text-6xl tracking-[-0.03em] leading-[0.95] text-[#ffffff]">
            Sistemas que resuelven la operación{" "}
            <span className="italic font-serif text-[#c5ff4a] font-normal">
              real.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#7a7a7a] leading-relaxed">
            Hacé clic en cada aplicación para explorar qué desafío operativo resuelve, su esquema de base de datos y probar la demo en vivo.
          </p>
        </div>

        {/* Monumental Central Arch Stage Container with Floating Stickers */}
        <div className="relative mx-auto w-full max-w-[270px] sm:max-w-[340px] md:max-w-[420px] flex items-center justify-center my-1 sm:my-3">
          {/* The Arch Frame */}
          <div ref={archRef} className="w-full h-[350px] sm:h-[430px] md:h-[470px] rounded-t-full bg-gradient-to-b from-[#1f1f1f] via-[#161616] to-[#060606] border-t-2 border-x-2 border-[#252525] relative overflow-hidden shadow-2xl flex flex-col items-center justify-end p-0">
            {/* Subtle glow behind Agustín */}
            <div className="arch-glow absolute bottom-12 inset-x-8 h-44 bg-[#c5ff4a]/15 blur-3xl rounded-full pointer-events-none" />

            {/* Agustín Milesi Cutout Portrait */}
            <div className="relative z-10 w-full flex flex-col items-center justify-end select-none">
              <div className="relative w-full max-w-[250px] sm:max-w-[320px] md:max-w-[370px] h-[270px] sm:h-[340px] md:h-[370px] flex items-end justify-center">
                <Image
                  src={portraitImg}
                  alt="Agustín Milesi · VOUT Software Architecture"
                  priority
                  className="w-auto h-full max-h-[370px] object-contain object-bottom drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Architect Nameplate */}
              <div className="w-full bg-[#000000]/95 backdrop-blur-md border-t border-[#252525] py-2 px-3 sm:py-2.5 sm:px-3.5 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                  <div className="size-5 sm:size-6 rounded-[2px] bg-[#1f1f1f] border border-[#252525] flex items-center justify-center p-1 shrink-0">
                    <svg viewBox="68 106 416 310" className="w-full h-full" fill="none">
                      <rect x="68" y="228" width="60" height="60" rx="2" fill="#e5e5e5" />
                      <rect x="132" y="292" width="60" height="60" rx="2" fill="#e5e5e5" />
                      <rect x="196" y="356" width="60" height="60" rx="2" fill="#e5e5e5" />
                      <rect x="260" y="292" width="60" height="60" rx="2" fill="#e5e5e5" />
                      <rect x="324" y="228" width="60" height="60" rx="2" fill="#c5ff4a" />
                      <rect x="390" y="166" width="46" height="46" rx="2" fill="#c5ff4a" />
                      <rect x="452" y="106" width="32" height="32" rx="2" fill="#c5ff4a" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[11px] sm:text-xs font-serif font-light text-white leading-none">Agustín Milesi</h3>
                    <p className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a] leading-none mt-0.5">Software Developer &amp; Admin · VOUT</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.06em] text-[#c5ff4a] px-2.5 py-0.5 rounded-full border border-[#c5ff4a]">
                  <span className="size-1.5 rounded-full bg-[#c5ff4a] animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>
            </div>

            <div className="w-full h-1 bg-[#252525]" />
          </div>

          {/* Floating App Stickers directly hugging Agustín's Arch (Always visible with CSS keyframe floating) */}
          {APP_STICKERS.map((stk) => {
            const isSelected = stk.id === activeAppId;
            return (
              <button
                key={stk.id}
                type="button"
                onClick={() => handleSelectApp(stk.id)}
                className={`app-sticker sticker-${stk.id} flex flex-col absolute ${stk.positionResponsive} ${stk.rotationDesktop} transition-all duration-300 transform cursor-pointer select-none text-left z-20 ${
                  isSelected
                    ? "scale-105 sm:scale-110 z-30"
                    : "hover:scale-105 opacity-95 hover:opacity-100"
                }`}
                aria-label={`Seleccionar aplicación: ${stk.name}`}
              >
                <div className={`float-${stk.id} p-1.5 sm:p-2.5 md:p-3 rounded-[4px] border transition-all ${
                  isSelected
                    ? "bg-[#1f1f1f] text-[#c5ff4a] border-[#c5ff4a] shadow-[0_0_8px_rgba(197,255,74,0.45)] ring-1 ring-[#c5ff4a]"
                    : "bg-[#1f1f1f] text-[#ffffff] border-[#252525] hover:border-[#313131]"
                } font-mono w-[105px] sm:w-[155px] md:w-[195px]`}>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9.5px] sm:text-xs font-bold uppercase tracking-tight leading-none">
                      {stk.name}
                    </span>
                    {isSelected && (
                      <span className="size-1.5 sm:size-2 rounded-full bg-[#c5ff4a] animate-ping shrink-0" />
                    )}
                  </div>
                  <span className={`text-[8px] sm:text-[9.5px] font-sans font-medium block mt-1 uppercase tracking-[0.16em] leading-tight ${
                    isSelected ? "text-[#c5ff4a]" : "text-[#7a7a7a]"
                  }`}>
                    {stk.role}
                  </span>
                  <span className="hidden sm:block text-[8px] sm:text-[9px] mt-1 text-[#e5e5e5]/80 leading-snug font-sans line-clamp-2">
                    {stk.solutionSummary}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick App Selector Bar — bridges the Arch to Showcase Card, removing dead space */}
        <div className="flex items-center justify-center gap-2 flex-wrap pt-2 pb-1">
          {APP_STICKERS.map((stk) => {
            const isSelected = stk.id === activeAppId;
            return (
              <button
                key={stk.id}
                type="button"
                onClick={() => handleSelectApp(stk.id)}
                className={`px-3 py-1.5 rounded-[4px] border font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-[#1f1f1f] text-[#c5ff4a] border-[#c5ff4a] shadow-[0_0_8px_rgba(197,255,74,0.45)] ring-1 ring-[#c5ff4a]"
                    : "bg-[#161616] text-[#7a7a7a] border-[#252525] hover:text-[#ffffff] hover:border-[#313131]"
                }`}
              >
                <span className="font-bold">{stk.name}</span>
                <span className="hidden sm:inline text-[10px] text-[#7a7a7a]">[{stk.role}]</span>
              </button>
            );
          })}
        </div>

        {/* Selected App Detail & Architectural Solution Showcase */}
        <div ref={showcaseRef} className="p-5 sm:p-8 md:p-10 rounded-none bg-[#1f1f1f] border border-[#252525] space-y-6 sm:space-y-8 w-full max-w-full">
          {/* Header of Active App */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#252525]">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#7a7a7a] uppercase tracking-[0.18em] block">
                {currentProject.slug} · {currentProject.category}
              </span>
              <h3 className="font-serif font-light text-xl sm:text-3xl md:text-4xl text-[#ffffff] leading-tight">
                {currentProject.name}
              </h3>
            </div>

            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-[4px] bg-[#c5ff4a] text-[#000000] font-sans font-medium text-xs uppercase tracking-[0.04em] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-[0_0_8px_rgba(197,255,74,0.45)] min-h-[42px] shrink-0 cursor-pointer"
            >
              <span>🚀 {t.carouselLiveDemo}</span>
            </a>
          </div>

          {/* Problem Reality vs Engineering Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 sm:p-6 rounded-none bg-[#161616] border border-[#252525] space-y-2">
              <span className="font-sans text-[11px] font-medium text-red-400 uppercase tracking-[0.22em] flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-red-400" />
                [ DESAFÍO OPERATIVO QUE RESUELVE ]
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#e5e5e5] leading-[1.55] font-normal">
                {currentProject.problemStatement}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-none bg-[#161616] border border-[#252525] space-y-2">
              <span className="font-sans text-[11px] font-medium text-[#c5ff4a] uppercase tracking-[0.22em] flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#c5ff4a]" />
                [ SOLUCIÓN DE ARQUITECTURA VOUT ]
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#e5e5e5] leading-[1.55] font-normal">
                {currentProject.architecturalSolution}
              </p>
            </div>
          </div>

          {/* Specs (Left) & Real Prisma Schema (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
            {/* Left 6 Columns: Specs & Features */}
            <div className="lg:col-span-6 space-y-4 w-full min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-[4px] bg-[#252525] border border-[#313131] space-y-1">
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a] block">{t.carouselEngine}</span>
                  <span className="text-[#ffffff] font-medium break-words block">{currentProject.specs.engine}</span>
                </div>
                <div className="p-3.5 rounded-[4px] bg-[#252525] border border-[#313131] space-y-1">
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a] block">{t.carouselDatabase}</span>
                  <span className="text-[#ffffff] font-medium break-words block">{currentProject.specs.database}</span>
                </div>
                <div className="p-3.5 rounded-[4px] bg-[#252525] border border-[#313131] space-y-1">
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a] block">{t.carouselSecurity}</span>
                  <span className="text-[#ffffff] font-medium break-words block">{currentProject.specs.hardwareOrSecurity}</span>
                </div>
                <div className="p-3.5 rounded-[4px] bg-[#252525] border border-[#313131] space-y-1">
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a] block">{t.carouselResilience}</span>
                  <span className="text-[#c5ff4a] font-medium break-words block">{currentProject.specs.resilienceMetric}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setSelectedProject(currentProject)}
                  className="px-4 py-2.5 rounded-[4px] bg-[#1f1f1f] border border-[#252525] hover:border-[#c5ff4a] text-[#ffffff] font-sans font-medium text-xs uppercase tracking-[0.08em] transition cursor-pointer min-h-[42px] flex items-center justify-center text-center"
                >
                  📖 {t.carouselDeepAudit}
                </button>

                <a
                  href={`https://github.com/AgustinMilesi/${currentProject.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-[4px] bg-[#1f1f1f] border border-[#252525] hover:border-[#313131] text-[#7a7a7a] hover:text-[#ffffff] font-sans font-medium text-xs uppercase tracking-[0.08em] transition min-h-[42px] flex items-center justify-center text-center gap-1"
                >
                  <span>💻 CÓDIGO EN GITHUB ↗</span>
                </a>
              </div>
            </div>

            {/* Right 6 Columns: Code Block Panel (zkPass style: Background #252525, padding 24px, radius 4px, border #313131, JetBrains Mono) */}
            <div className="lg:col-span-6 w-full min-w-0">
              <div className="rounded-[4px] p-4 sm:p-5 bg-[#252525] border border-[#313131] space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-[#313131] text-xs">
                  <span className="text-[#c5ff4a] font-mono text-xs uppercase tracking-[0.06em] flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-[#c5ff4a]" />
                    // MODELO DE DATOS PRISMA
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a] px-2 py-0.5 rounded-[2px] bg-[#1f1f1f] border border-[#313131]">
                    {currentProject.slug}
                  </span>
                </div>
                <pre className="overflow-x-auto text-[11px] text-[#e5e5e5] leading-relaxed font-mono p-3.5 bg-[#000000] rounded-[4px] max-h-[220px] border border-[#313131]">
                  <code>{currentProject.schemaSnippet}</code>
                </pre>
                <div className="pt-1 flex items-center justify-between text-[11px] text-[#7a7a7a] font-mono">
                  <span>Stack: {currentProject.specs.engine}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(currentProject)}
                    className="text-[#c5ff4a] hover:underline cursor-pointer font-sans uppercase text-[11px] tracking-[0.06em]"
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
