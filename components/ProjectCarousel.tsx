"use client";

import { useState, useCallback } from "react";
import { CaseStudyModal, ProjectData } from "./CaseStudyModal";
import { usePreferences } from "@/components/PreferencesProvider";

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
      "Las empresas pierden prospectos y feedback valioso porque los formularios de sus sitios web fallan silenciosamente, caen en bandejas de spam olvidadas o carecen de integración con la infraestructura interna de ventas y soporte.",
    architecturalSolution:
      "VOUT Inbox unifica la captura institucional directa y la API de formularios embebibles en una sola plataforma resiliente. Cada envío se almacena atómicamente en PostgreSQL, crea el perfil de contacto del remitente y notifica asíncronamente vía webhook firmado y correo.",
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
    tagline:
      "Gestión de contenedores marítimos, cronómetros de demurrage fiscal y auditoría de documentos aduaneros.",
    description:
      "Diseñado para importadores y operadores de transporte de carga que enfrentan multas millonarias por retrasos en la devolución de contenedores a terminales portuarias. Centraliza guías de embarque (BL), estados de arribo y auditorías de costos de almacenamiento.",
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
      "Las navieras cobran penalizaciones por cada día que un contenedor permanece fuera de plazo en el puerto. El seguimiento manual en hojas de cálculo desactualizadas provoca demoras en aduana y gastos no previstos que destruyen el margen de importación.",
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
    tagline:
      "Control de gastos con registro offline inmediato, cálculo de margen disponible y sincronización privada.",
    description:
      "Diseñado para el control financiero individual estricto. Registra compras al instante en la calle sin esperar conectividad, categoriza microgastos, audita suscripciones y sincroniza de forma segura sin compartir datos financieros con terceros.",
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

export function ProjectCarousel() {
  const { t } = usePreferences();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const currentProject = ECOSYSTEM_PROJECTS[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % ECOSYSTEM_PROJECTS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + ECOSYSTEM_PROJECTS.length) % ECOSYSTEM_PROJECTS.length);
  }, []);

  const handleJump = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="proyectos" className="py-12 sm:py-20 bg-[var(--bg-page,#0A0E14)] border-b border-[var(--border-card,#1E293B)] relative transition-colors w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 w-full max-w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[var(--border-card,#1E293B)]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[var(--bg-card,#121824)] text-[var(--primary-accent,#C6F827)] border border-[var(--border-card,#1E293B)]">
              <span>{t.carouselBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-main,#E9E7E0)]">
              {t.carouselTitle}
            </h2>
            <p className="text-sm text-[var(--text-muted,#9A9E86)] max-w-2xl">
              Cuatro sistemas en producción. Hacé clic en cada plataforma para ver especificaciones, modelo de datos y probar la demo en vivo.
            </p>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="size-10 rounded-xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-[var(--text-main,#E9E7E0)] hover:text-[var(--primary-accent,#C6F827)] hover:border-[var(--primary-accent,#C6F827)] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label={t.carouselPrev}
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="size-10 rounded-xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] text-[var(--text-main,#E9E7E0)] hover:text-[var(--primary-accent,#C6F827)] hover:border-[var(--primary-accent,#C6F827)] flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label={t.carouselNext}
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Platform Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          {ECOSYSTEM_PROJECTS.map((project, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleJump(idx)}
                className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? "bg-[var(--bg-card,#121824)] border-[var(--primary-accent,#C6F827)] shadow-md -translate-y-0.5"
                    : "bg-[var(--bg-card-subtle,#0D121B)] border-[var(--border-card,#1E293B)] hover:border-[var(--primary-accent,#C6F827)]/50 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? "bg-[var(--primary-accent,#C6F827)] text-[var(--primary-accent-text,#0A0E14)]" : "bg-[var(--bg-card,#121824)] text-[var(--text-muted,#9A9E86)]"
                  }`}>
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                    PRODUCCIÓN
                  </span>
                </div>
                <p className="font-mono text-xs font-bold text-[var(--text-main,#E9E7E0)] truncate">
                  {project.slug}
                </p>
                <p className="text-[11px] text-[var(--text-muted,#9A9E86)] truncate mt-0.5">
                  {project.category.split("·")[0].trim()}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Project Showcase Card */}
        <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--bg-card,#121824)] border border-[var(--border-card,#1E293B)] shadow-xl space-y-6 sm:space-y-8 w-full max-w-full">
          {/* Project Title Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-card,#1E293B)]">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-[var(--primary-accent,#C6F827)] uppercase tracking-wider block">
                {currentProject.slug} · {currentProject.category}
              </span>
              <h3 className="text-xl sm:text-3xl font-black text-[var(--text-main,#E9E7E0)] leading-tight">
                {currentProject.name}
              </h3>
            </div>

            {/* Direct Action Link */}
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[var(--primary-accent,#C6F827)] text-[var(--primary-accent-text,#0A0E14)] font-black text-xs uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm min-h-[42px] shrink-0"
            >
              <span>🚀 {t.carouselLiveDemo}</span>
            </a>
          </div>

          {/* Card Body: Specs (Left) & Real Database Schema (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
            {/* Left 6 Columns: Description, Tech Specs, Features */}
            <div className="lg:col-span-6 space-y-5 w-full min-w-0">
              <p className="text-sm sm:text-base text-[var(--text-main,#E9E7E0)]/90 leading-relaxed">
                {currentProject.description}
              </p>

              {/* Technical Specifications Grid */}
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

              {/* Core Features Badges */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[var(--text-muted,#9A9E86)] block tracking-wider font-semibold">
                  {t.carouselKeySpecs}
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentProject.features.map((feat) => (
                    <span
                      key={feat}
                      className="px-2.5 py-1 rounded-lg bg-[var(--bg-card-subtle,#0D121B)] border border-[var(--border-card,#1E293B)] text-xs text-[var(--text-main,#E9E7E0)]/90 flex items-center gap-1.5"
                    >
                      <span className="size-1.5 rounded-full bg-[var(--primary-accent,#C6F827)]" />
                      <span>{feat}</span>
                    </span>
                  ))}
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
              <div className="rounded-2xl p-4 sm:p-5 bg-[var(--bg-page,#0A0E14)] border border-[var(--border-card,#1E293B)] space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-card,#1E293B)] text-xs">
                  <span className="text-[var(--primary-accent,#C6F827)] font-bold">// MODELO DE DATOS PRISMA</span>
                  <span className="text-[11px] text-[var(--text-muted,#9A9E86)]">{currentProject.slug}</span>
                </div>
                <pre className="overflow-x-auto text-[11px] text-slate-300 leading-relaxed font-mono p-3 bg-[#06090E] rounded-xl max-h-[260px] border border-[#161F30]">
                  <code>{currentProject.schemaSnippet}</code>
                </pre>
                <div className="pt-1 flex items-center justify-between text-[11px] text-[var(--text-muted,#9A9E86)]">
                  <span>Arquitectura: {currentProject.specs.database}</span>
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

      {/* Case Study Architecture Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
