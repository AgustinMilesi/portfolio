export type Locale = "en" | "es" | "pt" | "zh";

export const LOCALES: { id: Locale; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "es", label: "Español", flag: "🇪🇸" },
  { id: "pt", label: "Português", flag: "🇧🇷" },
  { id: "zh", label: "中文", flag: "🇨🇳" },
];

export const translations = {
  en: {
    // Preferences Modal
    mode: "Appearance",
    darkMode: "Dark",
    lightMode: "Light",
    accentColor: "Accent Color",
    language: "Language",

    // Top Bar
    topArchitecture: "VOUT ARCHITECTURE // BUENOS AIRES NODE",
    topTelemetry: "LATENCY: 18ms",
    topStatus: "STATUS: ALL SYSTEMS OPERATIONAL",

    // Navbar
    navSubRetail: "Retail POS",
    navSubInbox: "CRM & Ingestion",
    navSubCargo: "Freight Logistics",
    navSubPocket: "Web Cashflow",
    navManifesto: "// MANIFESTO",
    navPosSim: "// POS CASH REGISTER",
    navContactBtn: "Let's Talk.",

    // Hero Section
    heroBadge: "CRITICAL SOFTWARE ARCHITECTURE · VOUT FOUNDER",
    heroSpec: "SPECIALIZATION: POS RETAIL · FREIGHT LOGISTICS · INBOUND CLOUD",
    heroH1A: "Management software that understands ",
    heroH1B: "operations.",
    heroClaim: "«Chaos enters. Clean data leaves.»",
    heroPillar1Title: "COUNTER OPERATIONS EXPERIENCE",
    heroPillar1Desc1:
      "The vast majority of retail and logistics software is built by engineers who have never spent eight straight hours at a checkout counter with a line of fifteen hurried customers and an unexpected internet outage.",
    heroPillar1Desc2:
      "Traditional software assumes persistent connectivity and patient operators. In the real world, every second lost during checkout or container clearance is lost revenue at the counter.",
    heroPillar2Title: "THE VOUT ENGINEERING PRINCIPLE",
    heroPillar2Desc1:
      "VOUT was forged directly in wholesale trade and customs logistics. We build software with resilient offline-first architecture, blind shift cash closures that eliminate discrepancies, atomic transactions, and zero tolerance for vibecoding.",
    heroPillar2Desc2:
      "Proprietary end-to-end typed TypeScript, strict HTTP contracts, PostgreSQL with local IndexedDB/SQLite replicas, and 100% merchant data sovereignty.",
    heroMetric1Num: "04",
    heroMetric1Label: "Flagship Platforms in Production",
    heroMetric2Num: "<45ms",
    heroMetric2Label: "Edge-to-DB Latency",
    heroMetric3Num: "100%",
    heroMetric3Label: "Offline Cache in POS Register",
    heroMetric4Num: "0%",
    heroMetric4Label: "Data Reselling or Mining",

    // Arch Stage
    stageBadge: "OPERATIONAL STICKERS & ARCHITECTURAL FOUNDATIONS",
    stageSubtitle: "Click each sticker to audit the design problem, technical solution, and live telemetry simulation.",
    stageAuditProblem: "REAL PROBLEM IN OPERATIONS:",
    stageAuditSolution: "VOUT ARCHITECTURAL SOLUTION:",
    stageSimProcessing: "Processing real-time architecture telemetry...",

    // Stickers
    stickerOfflineLabel: "OFFLINE-FIRST · ATOMIC CACHE",
    stickerOfflineSub: "IndexedDB + SQLite Local Cache",
    stickerOfflineCat: "NETWORK RESILIENCE",
    stickerOfflineProb:
      "During peak Saturday hours at a retail store, the internet drops. Traditional cloud SPAs freeze, checkout lines pile up, and money is lost every minute.",
    stickerOfflineSol:
      "VOUT Retail and Pocket store catalog and transaction engines locally. Transactions are signed and inventory decrements in memory instantly, syncing with PostgreSQL when back online.",
    stickerOfflineAction: "Simulate Checkout Connection Outage",
    stickerOfflineResult:
      "STATUS: LINK DOWN | Offline Mode Active | Local Queue: 3 sales buffered | Checkout Latency: 0.00ms | 0 Freezes.",

    stickerNoVibeLabel: "PRODUCTION WITHOUT VIBECODING",
    stickerNoVibeSub: "Prisma Models · Strict TypeScript",
    stickerNoVibeCat: "ENGINEERING QUALITY",
    stickerNoVibeProb:
      "Vibecoding outputs pretty prototypes riddled with 'any' types, loose HTTP contracts, silent rounding bugs, and catastrophic failure under concurrency.",
    stickerNoVibeSol:
      "Zero tolerance for loose types. Exact monetary math in integer cents with Decimal(12,2) and BigInt. End-to-end Zod schemas validated by automated test suites.",
    stickerNoVibeAction: "Audit Typing & HTTP Contracts",
    stickerNoVibeResult:
      "PRISMA SCHEMA: 100% STRICT | TypeScript 'any' count: 0 | Zod Schemas: 18 | Money Tests: 13 PASSED (0 cents lost).",

    stickerZeroResellLabel: "ZERO DATA RESELLING",
    stickerZeroResellSub: "100% Merchant Sovereignty",
    stickerZeroResellCat: "ETHICS & SECURITY",
    stickerZeroResellProb:
      "Most commercial software packages sales, supplier pricing, and store margins to resell to analytics brokers or competitors.",
    stickerZeroResellSol:
      "Absolute sovereignty. VOUT carries zero third-party telemetry scripts. Relational isolation per tenant with SHA-256 cryptographic API hashing.",
    stickerZeroResellAction: "Verify Metadata Isolation",
    stickerZeroResellResult:
      "PRIVACY AUDIT: 0 external trackers | 0 third-party cookies | Multi-Tenant Data Isolation: ACTIVE | API Hash: SHA-256.",

    stickerBarcodeLabel: "HID HARDWARE BARCODE SCANNER",
    stickerBarcodeSub: "Raw Keyboard Buffer < 50ms",
    stickerBarcodeCat: "HARDWARE INTEGRATION",
    stickerBarcodeProb:
      "USB laser barcode scanners behave like ultra-fast keyboards. If an operator loses focus or opens a modal, the scan drops or breaks the UI.",
    stickerBarcodeSol:
      "Global window raw keyboard listener with <50ms buffer and CR delimiter. Scans are captured and pushed to the cart regardless of active element.",
    stickerBarcodeAction: "Trigger USB Laser Burst (EAN-13)",
    stickerBarcodeResult:
      "RAW BUFFER: '7791234567890' received in 41ms | SKU: VOUT-RETAIL-01 | Price: $2,450.00 | In-memory stock deducted.",

    stickerBlindCashLabel: "BLIND CASH REGISTER CLOSURE",
    stickerBlindCashSub: "Discrepancy-Free Shift Audits",
    stickerBlindCashCat: "FISCAL & HUMAN CONTROLS",
    stickerBlindCashProb:
      "When cashiers know what the system expects, informal adjustments and covert shortages emerge, undetected until end-of-month reconciliations.",
    stickerBlindCashSol:
      "The cashier enters counted cash blindly without seeing expected totals. The system compares in backend and locks discrepancies for unalterable audit.",
    stickerBlindCashAction: "Simulate Blind Shift Closure",
    stickerBlindCashResult:
      "SYSTEM: $128,450.00 | Declared by Cashier: $128,450.00 | Discrepancy: $0.00 (PERFECT BALANCE) | Fiscal ESC/POS Ticket Issued.",

    stickerCustomsLabel: "CUSTOMS DEMURRAGE AUDIT",
    stickerCustomsSub: "Automatic Port Storage Alerts",
    stickerCustomsCat: "FOREIGN TRADE OPERATIONS",
    stickerCustomsProb:
      "Shipping lines charge hundreds of dollars per day in demurrage fines when containers exceed allocated free days at port terminals.",
    stickerCustomsSol:
      "VOUT Cargo computes remaining free days taking into account fiscal holidays, alerting dispatchers 72 hours in advance to coordinate customs clearance.",
    stickerCustomsAction: "Check Free Days at Port Terminal",
    stickerCustomsResult:
      "BL: MSKU-902184 | Terminal: Exolgan | Free Days: 7 | Elapsed: 4 | Preventive Alert: 72h active | Demurrage avoided.",

    // Carousel
    carouselBadge: "VOUT PRODUCTION ECOSYSTEM",
    carouselTitle: "Flagship Platforms in Active Production",
    carouselPrev: "Previous",
    carouselNext: "Next",
    carouselLiveDemo: "Open Live Platform ↗",
    carouselDeepAudit: "Deep Architecture Audit",
    carouselKeySpecs: "Key Technical Specs",
    carouselEngine: "Engine",
    carouselDatabase: "Database",
    carouselSecurity: "Security / Hardware",
    carouselResilience: "Resilience Metric",

    // Hardware Simulator
    simBadge: "HARDWARE SIMULATION & OPERATOR TERMINAL",
    simTitle: "ESC/POS Thermal Barcode & Blind Cash Register Lab",
    simDesc: "Interact directly with our checkout emulator: scan barcodes, calculate totals with VAT, print tickets, and perform a blind cashier reconciliation.",
    simScanPlaceholder: "Enter or scan barcode (e.g. 779123456789)...",
    simScanBtn: "Scan SKU",
    simSubtotal: "Subtotal",
    simVat: "VAT (21%)",
    simTotal: "Total Due",
    simPrintTicket: "Print ESC/POS Ticket",
    simBlindTitle: "Blind Cash Audit Simulation",
    simBlindInput: "Counted Cash in Drawer ($)",
    simAuditBtn: "Submit Blind Audit",
    simAuditPerfect: "✓ PERFECT AUDIT: 0.00 Discrepancy. Shift closed.",
    simAuditDiff: "⚠️ DISCREPANCY AUDIT: System $",

    // Trayectoria
    timelineBadge: "// FROM THE REGISTER TO THE CODE",
    timelineTitle: "Founder's Trajectory",
    timelineDesc: "How frontline commercial operation and daily register auditing evolved into a high-availability software architecture.",
    timelineStage: "STAGE",
    timelineDone: "✓ COMPLETED",

    // Footer
    footerBadge: "DIRECT CHANNEL WITH AGUSTÍN MILESI",
    footerH2: "Let's talk.",
    footerClaim: "«Chaos enters. Clean data leaves.»",
    footerDesc: "Have a business with checkout and stock headaches, a freight operation bleeding cash in demurrage, or need critical software without vibecoding? Reach out directly.",
    footerEmailTitle: "OFFICIAL INBOUND EMAIL:",
    footerCopyBtn: "COPY ADDRESS",
    footerCopied: "✓ COPIED TO CLIPBOARD",
    footerGatewayTitle: "SOVEREIGN GATEWAY WITH TELEMETRY",
    footerGatewayH3: "Direct Transmission via VOUT Inbox",
    footerGatewayDesc: "Ingestion with strict Zod schemas, bot honeypot protection, and real-time webhook dispatch.",
    footerOpenInbox: "Open Portal (/contact) →",
    footerRights: "Agustín Milesi · VOUT Architecture. Sovereign enterprise systems. Zero data mining.",
  },

  es: {
    // Preferences Modal
    mode: "Aspecto",
    darkMode: "Oscuro",
    lightMode: "Claro",
    accentColor: "Color de Acento",
    language: "Idioma",

    // Top Bar
    topArchitecture: "VOUT ARCHITECTURE // NODO BUENOS AIRES",
    topTelemetry: "LATENCIA: 18ms",
    topStatus: "ESTADO: TODOS LOS SISTEMAS OPERATIVOS",

    // Navbar
    navSubRetail: "Retail POS",
    navSubInbox: "CRM & Ingesta",
    navSubCargo: "Logística Freight",
    navSubPocket: "Finanzas Web",
    navManifesto: "// MANIFIESTO",
    navPosSim: "// CAJA POS",
    navContactBtn: "Hablemos.",

    // Hero Section
    heroBadge: "ARQUITECTURA DE SOFTWARE CRÍTICO · FUNDADOR DE VOUT",
    heroSpec: "ESPECIALIZACIÓN: POS RETAIL · FREIGHT LOGISTICS · INBOUND CLOUD",
    heroH1A: "Software de gestión que entiende la ",
    heroH1B: "operación.",
    heroClaim: "«Entra el caos. Sale el dato.»",
    heroPillar1Title: "EXPERIENCIA OPERATIVA EN MOSTRADOR",
    heroPillar1Desc1:
      "La inmensa mayoría de las herramientas de retail y logística son diseñadas por ingenieros que jamás estuvieron parados ocho horas seguidas frente a una caja registradora comercial, con una fila de quince clientes apurados y un corte imprevisto de internet.",
    heroPillar1Desc2:
      "El software tradicional asume conectividad perfecta y operadores pacientes. En el mundo real, cada segundo de demora en cobrar o en despachar un contenedor es dinero que se pierde en el mostrador.",
    heroPillar2Title: "EL PRINCIPIO DE INGENIERÍA VOUT",
    heroPillar2Desc1:
      "VOUT nació en el comercio mayorista y la logística aduanera de Buenos Aires. Construimos software con arquitectura offline-first resiliente, arqueos ciegos de caja que eliminan descuadres, transacciones atómicas y cero tolerancia al vibecoding.",
    heroPillar2Desc2:
      "Código propio tipado en TypeScript de punta a punta, contratos HTTP estrictos, bases de datos PostgreSQL con réplicas locales en IndexedDB/SQLite y 100% de soberanía sobre los datos del comercio.",
    heroMetric1Num: "04",
    heroMetric1Label: "Plataformas Insignia en Producción",
    heroMetric2Num: "<45ms",
    heroMetric2Label: "Latencia Edge Edge-to-DB",
    heroMetric3Num: "100%",
    heroMetric3Label: "Offline Cache en Caja POS",
    heroMetric4Num: "0%",
    heroMetric4Label: "Reventa o Minado de Datos",

    // Arch Stage
    stageBadge: "STICKERS OPERATIVOS Y FUNDAMENTOS DE ARQUITECTURA",
    stageSubtitle: "Hacé clic en cada sticker para auditar el problema de diseño, la solución técnica y la telemetría en vivo.",
    stageAuditProblem: "PROBLEMA REAL EN OPERACIÓN:",
    stageAuditSolution: "SOLUCIÓN ARQUITECTÓNICA VOUT:",
    stageSimProcessing: "Procesando telemetría de arquitectura en tiempo real...",

    // Stickers
    stickerOfflineLabel: "OFFLINE-FIRST · CACHE ATÓMICA",
    stickerOfflineSub: "IndexedDB + SQLite Local Cache",
    stickerOfflineCat: "RESILIENCIA DE RED",
    stickerOfflineProb:
      "En hora pico de un sábado por la tarde en un mayorista, se corta el enlace a internet. Si el sistema es una SPA tradicional conectada a la nube, la caja queda bloqueada, la fila se acumula y el comercio pierde dinero cada minuto.",
    stickerOfflineSol:
      "VOUT Retail y VOUT Pocket almacenan el catálogo y el motor transaccional localmente en IndexedDB y SQLite. Los comprobantes se firman y descuentan stock en memoria de inmediato, reconciliando con PostgreSQL cuando regresa el enlace.",
    stickerOfflineAction: "Simular Corte de Conexión en Caja",
    stickerOfflineResult:
      "STATUS: ENLACE DOWN | Modo Offline Activado | Cola Local: 3 ventas encoladas | Latencia de Cobro: 0.00ms | 0 Bloqueos.",

    stickerNoVibeLabel: "PRODUCCIÓN SIN VIBECODING",
    stickerNoVibeSub: "Prisma Models · Strict TypeScript",
    stickerNoVibeCat: "CALIDAD DE INGENIERÍA",
    stickerNoVibeProb:
      "El 'vibecoding' genera prototipos visualmente atractivos pero con tipos 'any', contratos HTTP laxos, bugs silenciosos en redondeo monetario y caída catastrófica bajo concurrencia.",
    stickerNoVibeSol:
      "Cero tolerancia a tipos sueltos. Matemática monetaria exacta en centavos enteros con BigInt / Decimal(12,2) en base de datos. Contratos de esquema Zod en cliente y servidor validados por suite de tests automáticos en TypeScript.",
    stickerNoVibeAction: "Auditar Tipado & Contratos HTTP",
    stickerNoVibeResult:
      "PRISMA SCHEMA: 100% STRICT | Typescript 'any' count: 0 | Zod Schemas: 18 | Tests de Dinero: 13 PASADOS (0 centavos perdidos).",

    stickerZeroResellLabel: "CERO REVENTA DE DATOS",
    stickerZeroResellSub: "Soberanía 100% del Comercio",
    stickerZeroResellCat: "ÉTICA & SEGURIDAD",
    stickerZeroResellProb:
      "La mayoría de las plataformas comerciales gratuitas o SaaS corporativas empaquetan la facturación, los proveedores y los márgenes de los comercios para revenderlos a consultoras de mercado o competidores.",
    stickerZeroResellSol:
      "Soberanía absoluta. VOUT no incluye píxeles de telemetría de terceros ni comercializa metadatos. Cada organización cuenta con aislamiento relacional estricto y claves API con hash criptográfico unidireccional SHA-256.",
    stickerZeroResellAction: "Verificar Aislamiento de Metadatos",
    stickerZeroResellResult:
      "PRIVACY AUDIT: 0 trackers externos | 0 cookies de terceros | Multi-Tenant Data Isolation: ACTIVO | Hash de API: SHA-256.",

    stickerBarcodeLabel: "LECTOR HID DE CÓDIGOS DE BARRA",
    stickerBarcodeSub: "Buffer de Teclado Raw < 50ms",
    stickerBarcodeCat: "HARDWARE DE SALÓN",
    stickerBarcodeProb:
      "Los lectores láser de código de barras USB emiten como teclados rápidos. Si el operador está navegando un modal o el input pierde foco, el escaneo se pierde o rompe la interfaz.",
    stickerBarcodeSol:
      "Listener global de eventos raw keyboard en ventana con buffer temporal < 50ms y delimitador CR (Enter). El escaneo se captura y despacha al carrito POS sin importar en qué parte de la pantalla esté el cursor.",
    stickerBarcodeAction: "Disparar Ráfaga Láser USB (EAN-13)",
    stickerBarcodeResult:
      "BUFFER RAW: '7791234567890' recibido en 41ms | SKU: VOUT-RETAIL-01 | Precio: $2,450.00 | Stock descontado en memoria.",

    stickerBlindCashLabel: "ARQUEO CIEGO DE CAJA",
    stickerBlindCashSub: "Cierre de Turnos sin Descuadres",
    stickerBlindCashCat: "CONTROL FISCAL Y HUMANO",
    stickerBlindCashProb:
      "Cuando el cajero sabe cuánto dinero 'debería' haber en el cajón, surgen ajustes informales, préstamos de caja y faltantes encubiertos que la administración detecta semanas después.",
    stickerBlindCashSol:
      "El cajero cuenta su dinero e ingresa el monto total a ciegas sin ver el acumulado del sistema. El sistema compara en backend y emite el ticket de cierre con la diferencia exacta bloqueada para auditoría.",
    stickerBlindCashAction: "Simular Cierre Ciego de Turno",
    stickerBlindCashResult:
      "SISTEMA: $128,450.00 | Declarado por Cajero: $128,450.00 | Diferencia: $0.00 (CIERRE PERFECTO) | Ticket Fiscal ESC/POS emitido.",

    stickerCustomsLabel: "AUDITORÍA DE DEMURRAGE ADUANERO",
    stickerCustomsSub: "Alertas Automáticas de Depósito Fiscal",
    stickerCustomsCat: "OPERACIONES DE COMERCIO EXTERIOR",
    stickerCustomsProb:
      "Las navieras cobran multas diarias (demurrage) de cientos de dólares si un contenedor pasa más días de los acordados en la terminal portuaria antes de ser nacionalizado.",
    stickerCustomsSol:
      "VOUT Cargo rastrea los días libres restantes calculando feriados fiscales y alertas preventivas 72 horas antes del vencimiento, coordinando con el despachante de aduanas automáticamente.",
    stickerCustomsAction: "Verificar Días Libres en Puerto",
    stickerCustomsResult:
      "BL: MSKU-902184 | Terminal: Exolgan | Días Libres: 7 | Transcurridos: 4 | Alerta Preventiva: 72h activada | Demurrage evitado.",

    // Carousel
    carouselBadge: "ECOSISTEMA DE PRODUCCIÓN VOUT",
    carouselTitle: "Plataformas Insignia en Producción Activa",
    carouselPrev: "Anterior",
    carouselNext: "Siguiente",
    carouselLiveDemo: "Abrir Plataforma en Vivo ↗",
    carouselDeepAudit: "Auditoría Profunda de Arquitectura",
    carouselKeySpecs: "Especificaciones Técnicas Clave",
    carouselEngine: "Motor",
    carouselDatabase: "Base de Datos",
    carouselSecurity: "Seguridad / Hardware",
    carouselResilience: "Métrica de Resiliencia",

    // Hardware Simulator
    simBadge: "SIMULACIÓN DE HARDWARE Y SALÓN",
    simTitle: "Laboratorio de Código de Barras ESC/POS y Arqueo Ciego",
    simDesc: "Interactúa con el emulador de caja: escanea códigos, calcula totales con IVA, emite tickets y realiza el arqueo ciego sin descuadres.",
    simScanPlaceholder: "Ingresá o escaneá código de barras (ej. 779123456789)...",
    simScanBtn: "Escanear SKU",
    simSubtotal: "Subtotal",
    simVat: "IVA (21%)",
    simTotal: "Total a Cobrar",
    simPrintTicket: "Emitir Ticket Térmico",
    simBlindTitle: "Simulación de Arqueo Ciego",
    simBlindInput: "Efectivo Contado en Cajón ($)",
    simAuditBtn: "Auditar Cierre de Caja",
    simAuditPerfect: "✓ CIERRE PERFECTO: Diferencia 0.00. Turno auditado.",
    simAuditDiff: "⚠️ DESCUADRE DETECTADO: Sistema $",

    // Trayectoria
    timelineBadge: "// DE LA CAJA AL CÓDIGO",
    timelineTitle: "Trayectoria del Fundador",
    timelineDesc: "La historia de cómo la experiencia real atendiendo clientes y auditando cajas registradoras se transformó en una suite de software de alta exigencia.",
    timelineStage: "ETAPA",
    timelineDone: "✓ COMPLETADO",

    // Footer
    footerBadge: "CANAL DIRECTO CON AGUSTÍN MILESI",
    footerH2: "Hablemos.",
    footerClaim: "«Entra el caos. Sale el dato.»",
    footerDesc: "¿Tenés un comercio con problemas de caja y stock, una operación logística que pierde dinero en demurrage, o necesitas un sistema crítico diseñado sin vibecoding? Escribime directamente.",
    footerEmailTitle: "CORREO ELECTRÓNICO OFICIAL:",
    footerCopyBtn: "COPIAR DIRECCIÓN",
    footerCopied: "✓ COPIADO AL PORTAPAPELES",
    footerGatewayTitle: "GATEWAY SOBERANO CON TELEMETRÍA",
    footerGatewayH3: "Transmisión Directa vía VOUT Inbox",
    footerGatewayDesc: "Ingesta con esquemas estrictos Zod, trampa anti-bots silenciosa y despacho de webhooks en tiempo real.",
    footerOpenInbox: "Abrir Portal (/contact) →",
    footerRights: "Agustín Milesi · VOUT Architecture. Sistemas soberanos de alta disponibilidad. Cero minado de datos.",
  },

  pt: {
    // Preferences Modal
    mode: "Aparência",
    darkMode: "Escuro",
    lightMode: "Claro",
    accentColor: "Cor de Destaque",
    language: "Idioma",

    // Top Bar
    topArchitecture: "VOUT ARCHITECTURE // NÓ BUENOS AIRES",
    topTelemetry: "LATÊNCIA: 18ms",
    topStatus: "STATUS: TODOS OS SISTEMAS OPERACIONAIS",

    // Navbar
    navSubRetail: "Retail POS",
    navSubInbox: "CRM & Ingestão",
    navSubCargo: "Logística Freight",
    navSubPocket: "Finanças Web",
    navManifesto: "// MANIFESTO",
    navPosSim: "// CAIXA POS",
    navContactBtn: "Vamos Conversar.",

    // Hero Section
    heroBadge: "ARQUITETURA DE SOFTWARE CRÍTICO · FUNDADOR DA VOUT",
    heroSpec: "ESPECIALIZAÇÃO: POS RETAIL · FREIGHT LOGISTICS · INBOUND CLOUD",
    heroH1A: "Software de gestão que entende a ",
    heroH1B: "operação.",
    heroClaim: "«Entra o caos. Sai o dado.»",
    heroPillar1Title: "EXPERIÊNCIA OPERACIONAL NO BALCÃO",
    heroPillar1Desc1:
      "A grande maioria dos softwares de varejo e logística é projetada por engenheiros que nunca passaram oito horas seguidas atrás de um caixa, com fila de quinze clientes apressados e queda repentina de internet.",
    heroPillar1Desc2:
      "O software tradicional presume conectividade contínua e operadores pacientes. No mundo real, cada segundo de atraso no pagamento ou desembaraço é receita perdida no balcão.",
    heroPillar2Title: "O PRINCÍPIO DE ENGENHARIA VOUT",
    heroPillar2Desc1:
      "VOUT nasceu no comércio atacadista e na logística aduaneira. Construímos software com arquitetura offline-first resiliente, fechamentos cegos de caixa que eliminam discrepâncias e tolerância zero a vibecoding.",
    heroPillar2Desc2:
      "Código em TypeScript estrito de ponta a ponta, contratos HTTP rigorosos, bancos PostgreSQL com réplicas locais em IndexedDB/SQLite e 100% de soberania sobre os dados da empresa.",
    heroMetric1Num: "04",
    heroMetric1Label: "Plataformas Insígnia em Produção",
    heroMetric2Num: "<45ms",
    heroMetric2Label: "Latência Edge-to-DB",
    heroMetric3Num: "100%",
    heroMetric3Label: "Cache Offline no Caixa POS",
    heroMetric4Num: "0%",
    heroMetric4Label: "Revenda ou Mineração de Dados",

    // Arch Stage
    stageBadge: "STICKERS OPERACIONAIS E FUNDAMENTOS DA ARQUITETURA",
    stageSubtitle: "Clique em cada sticker para auditar o problema de design, a solução técnica e a telemetria em tempo real.",
    stageAuditProblem: "PROBLEMA REAL NA OPERAÇÃO:",
    stageAuditSolution: "SOLUÇÃO ARQUITETURAL VOUT:",
    stageSimProcessing: "Processando telemetria de arquitetura em tempo real...",

    // Stickers
    stickerOfflineLabel: "OFFLINE-FIRST · CACHE ATÔMICO",
    stickerOfflineSub: "Cache Local IndexedDB + SQLite",
    stickerOfflineCat: "RESILIÊNCIA DE REDE",
    stickerOfflineProb:
      "No pico de um sábado à tarde no atacado, a conexão cai. Em SPAs na nuvem tradicionais, o caixa trava, a fila se acumula e a loja perde dinheiro a cada minuto.",
    stickerOfflineSol:
      "VOUT Retail e Pocket armazenam o catálogo e motor transacional localmente em IndexedDB e SQLite. As vendas são validadas na memória imediatamente e reconciliadas com PostgreSQL quando a conexão retorna.",
    stickerOfflineAction: "Simular Queda de Conexão no Caixa",
    stickerOfflineResult:
      "STATUS: LINK DOWN | Modo Offline Ativo | Fila Local: 3 vendas na fila | Latência: 0.00ms | 0 Bloqueios.",

    stickerNoVibeLabel: "PRODUÇÃO SEM VIBECODING",
    stickerNoVibeSub: "Modelos Prisma · Strict TypeScript",
    stickerNoVibeCat: "QUALIDADE DE ENGENHARIA",
    stickerNoVibeProb:
      "Vibecoding produz protótipos bonitos com tipos 'any', contratos frouxos, falhas de arredondamento e colapso sob concorrência.",
    stickerNoVibeSol:
      "Tolerância zero a tipos soltos. Aritmética monetária exata em centavos inteiros com Decimal(12,2) e BigInt. Esquemas Zod validados por testes automáticos.",
    stickerNoVibeAction: "Auditar Tipagem e Contratos HTTP",
    stickerNoVibeResult:
      "PRISMA SCHEMA: 100% STRICT | Contagem 'any': 0 | Zod Schemas: 18 | Testes Financeiros: 13 APROVADOS (0 centavos perdidos).",

    stickerZeroResellLabel: "ZERO REVENDA DE DADOS",
    stickerZeroResellSub: "100% Soberania da Empresa",
    stickerZeroResellCat: "ÉTICA E SEGURANÇA",
    stickerZeroResellProb:
      "Muitas plataformas comerciais gratuitas empacotam o faturamento, fornecedores e margens das lojas para revendê-los a consultorias de mercado ou concorrentes.",
    stickerZeroResellSol:
      "Soberania absoluta. Sem rastreadores externos ou venda de metadados. Isolamento relacional estrito por organização e chaves de API com hash criptográfico SHA-256.",
    stickerZeroResellAction: "Verificar Isolamento de Metadados",
    stickerZeroResellResult:
      "AUDITORIA DE PRIVACIDADE: 0 rastreadores | 0 cookies de terceiros | Isolamento Multi-Tenant: ATIVO | Hash da API: SHA-256.",

    stickerBarcodeLabel: "LEITOR HID DE CÓDIGO DE BARRAS",
    stickerBarcodeSub: "Buffer de Teclado Raw < 50ms",
    stickerBarcodeCat: "HARDWARE DE FRENTE DE CAIXA",
    stickerBarcodeProb:
      "Leitores laser USB transmitem como teclados rápidos. Se o operador abrir um modal ou o input perder o foco, a leitura é perdida.",
    stickerBarcodeSol:
      "Listener global raw keyboard com buffer < 50ms e delimitador Enter. O código é capturado e enviado para o carrinho independentemente de onde o cursor esteja.",
    stickerBarcodeAction: "Disparar Leitura Laser USB (EAN-13)",
    stickerBarcodeResult:
      "BUFFER RAW: '7791234567890' recebido em 41ms | SKU: VOUT-RETAIL-01 | Preço: $2,450.00 | Estoque debitado em memória.",

    stickerBlindCashLabel: "FECHAMENTO CEGO DE CAIXA",
    stickerBlindCashSub: "Encerramento de Turno sem Discrepâncias",
    stickerBlindCashCat: "CONTROLE FISCAL E HUMANO",
    stickerBlindCashProb:
      "Quando o operador de caixa sabe quanto dinheiro 'deveria' estar na gaveta, surgem ajustes informais e faltas encobertas.",
    stickerBlindCashSol:
      "O operador conta e insere o valor às cegas. O sistema calcula a diferença no backend e trava o fechamento para auditoria fiscal.",
    stickerBlindCashAction: "Simular Fechamento Cego de Turno",
    stickerBlindCashResult:
      "SISTEMA: $128,450.00 | Declarado pelo Caixa: $128,450.00 | Diferença: $0.00 (FECHAMENTO PERFEITO) | Cupom ESC/POS emitido.",

    stickerCustomsLabel: "AUDITORIA DE DEMURRAGE ADUANEIRO",
    stickerCustomsSub: "Alertas Automáticos de Terminal Portuário",
    stickerCustomsCat: "OPERAÇÕES DE COMÉRCIO EXTERIOR",
    stickerCustomsProb:
      "Empresas de navegação cobram multas diárias (demurrage) pesadas quando contêineres excedem os dias livres de estadia no porto.",
    stickerCustomsSol:
      "VOUT Cargo monitora os dias livres restantes calculando feriados fiscais e disparando alertas preventivos 72 horas antes do vencimento.",
    stickerCustomsAction: "Verificar Dias Livres no Porto",
    stickerCustomsResult:
      "BL: MSKU-902184 | Terminal: Exolgan | Dias Livres: 7 | Decorridos: 4 | Alerta Preventivo: 72h ativo | Demurrage evitado.",

    // Carousel
    carouselBadge: "ECOSSISTEMA DE PRODUÇÃO VOUT",
    carouselTitle: "Plataformas Insígnia em Produção Ativa",
    carouselPrev: "Anterior",
    carouselNext: "Próximo",
    carouselLiveDemo: "Abrir Plataforma em Produção ↗",
    carouselDeepAudit: "Auditoria Completa de Arquitetura",
    carouselKeySpecs: "Especificações Técnicas Chave",
    carouselEngine: "Motor",
    carouselDatabase: "Banco de Dados",
    carouselSecurity: "Segurança / Hardware",
    carouselResilience: "Métrica de Resiliência",

    // Hardware Simulator
    simBadge: "SIMULAÇÃO DE HARDWARE E TERMINAL",
    simTitle: "Laboratório de Código de Barras ESC/POS e Fechamento Cego",
    simDesc: "Interaja com o emulador de caixa: leia códigos, calcule totais com impostos, emita cupons térmicos e realize fechamento cego de caixa.",
    simScanPlaceholder: "Digite ou leia o código de barras (ex: 779123456789)...",
    simScanBtn: "Ler SKU",
    simSubtotal: "Subtotal",
    simVat: "Impostos (21%)",
    simTotal: "Total a Cobrar",
    simPrintTicket: "Emitir Cupom Térmico",
    simBlindTitle: "Simulação de Fechamento Cego",
    simBlindInput: "Dinheiro Contado na Gaveta ($)",
    simAuditBtn: "Auditar Fechamento",
    simAuditPerfect: "✓ FECHAMENTO PERFEITO: Diferença 0.00. Turno auditado.",
    simAuditDiff: "⚠️ DISCREPÂNCIA DETECTADA: Sistema $",

    // Trayectoria
    timelineBadge: "// DO CAIXA AO CÓDIGO",
    timelineTitle: "Trajetória do Fundador",
    timelineDesc: "A jornada de como a vivência real em caixas e na auditoria operacional se transformou em uma suíte de software de alta resiliência.",
    timelineStage: "ETAPA",
    timelineDone: "✓ CONCLUÍDO",

    // Footer
    footerBadge: "CANAL DIRETO COM AGUSTÍN MILESI",
    footerH2: "Vamos conversar.",
    footerClaim: "«Entra o caos. Sai o dado.»",
    footerDesc: "Tem um comércio com gargalos de estoque e caixa, uma operação logística sofrendo com demurrage, ou precisa de um sistema crítico construído sem vibecoding? Fale diretamente comigo.",
    footerEmailTitle: "E-MAIL OFICIAL DE CONTATO:",
    footerCopyBtn: "COPIAR E-MAIL",
    footerCopied: "✓ COPIADO PARA A ÁREA DE TRANSFERÊNCIA",
    footerGatewayTitle: "GATEWAY SOBERANO COM TELEMETRIA",
    footerGatewayH3: "Transmissão Direta via VOUT Inbox",
    footerGatewayDesc: "Ingestão com esquemas Zod rígidos, proteção anti-bot e webhooks em tempo real.",
    footerOpenInbox: "Abrir Portal (/contact) →",
    footerRights: "Agustín Milesi · VOUT Architecture. Sistemas empresariais soberanos. Zero mineração de dados.",
  },

  zh: {
    // Preferences Modal
    mode: "外观",
    darkMode: "深色",
    lightMode: "浅色",
    accentColor: "主题强调色",
    language: "语言",

    // Top Bar
    topArchitecture: "VOUT 架构 // 布宜诺斯艾利斯节点",
    topTelemetry: "延迟: 18ms",
    topStatus: "状态: 所有系统正常运行",

    // Navbar
    navSubRetail: "零售 POS",
    navSubInbox: "CRM 与采集",
    navSubCargo: "货运物流",
    navSubPocket: "在线记账",
    navManifesto: "// 宣言",
    navPosSim: "// POS 收银台",
    navContactBtn: "与我联系",

    // Hero Section
    heroBadge: "关键软件架构 · VOUT 创始人",
    heroSpec: "专长领域: POS 零售系统 · 货运物流 · 入站云服务",
    heroH1A: "真正理解实体商业",
    heroH1B: "运营的软件。",
    heroClaim: "«混乱进入。精准数据产出。»",
    heroPillar1Title: "柜台一线运营实战经验",
    heroPillar1Desc1:
      "绝大多数零售和物流工具都是由从未在收银台前站过8小时的工程师开发的——面对排着十几个急躁客户的长队以及突如其来的网络中断。",
    heroPillar1Desc2:
      "传统软件默认网络恒定连接且操作员耐心。但在现实世界中，结账或清关每延迟一秒，柜台都在实实在在地损失金钱。",
    heroPillar2Title: "VOUT 工程核心原则",
    heroPillar2Desc1:
      "VOUT 诞生于批发贸易和海关物流一线。我们构建具有离线优先韧性的软件，采用杜绝账实不符的盲盘交接班、原子化事务以及对 vibecoding 的零容忍。",
    heroPillar2Desc2:
      "全链路严格 TypeScript 类型化、严苛的 HTTP 契约、PostgreSQL 搭配本地 IndexedDB/SQLite 副本，实现商业数据 100% 自主掌控。",
    heroMetric1Num: "04",
    heroMetric1Label: "在产旗舰平台",
    heroMetric2Num: "<45ms",
    heroMetric2Label: "边缘到数据库延迟",
    heroMetric3Num: "100%",
    heroMetric3Label: "POS 收银离线缓存",
    heroMetric4Num: "0%",
    heroMetric4Label: "转售或挖掘商家数据",

    // Arch Stage
    stageBadge: "运营标签与系统架构基石",
    stageSubtitle: "点击各贴纸以审查设计痛点、工程解决方案及实时遥测模拟。",
    stageAuditProblem: "实际运营痛点:",
    stageAuditSolution: "VOUT 架构解决方案:",
    stageSimProcessing: "正在处理实时架构遥测...",

    // Stickers
    stickerOfflineLabel: "离线优先 · 原子缓存",
    stickerOfflineSub: "IndexedDB + SQLite 本地缓存",
    stickerOfflineCat: "网络韧性",
    stickerOfflineProb:
      "在周六下午的客流高峰期，批发商网络突然断开。如果是传统云端 SPA，收银机将直接瘫痪，排队长龙越积越多，每分钟都在流失营业额。",
    stickerOfflineSol:
      "VOUT Retail 与 Pocket 在本地 IndexedDB 和 SQLite 中持久化商品目录与交易引擎。内存立即完成交易核减，待网络恢复后与 PostgreSQL 自动对账。",
    stickerOfflineAction: "模拟收银台断网状态",
    stickerOfflineResult:
      "状态: 网络断开 | 离线模式已激活 | 本地队列: 3 笔销售已排队 | 结账延迟: 0.00ms | 0 卡顿。",

    stickerNoVibeLabel: "杜绝随意编码的生产质量",
    stickerNoVibeSub: "Prisma 模型 · 严格 TypeScript",
    stickerNoVibeCat: "工程质量",
    stickerNoVibeProb:
      "随意编码（Vibecoding）会产生外表光鲜但充斥着 'any' 类型、松散 HTTP 契约、隐蔽舍入误差并在并发下彻底崩溃的脆弱原型。",
    stickerNoVibeSol:
      "对松散类型零容忍。采用 BigInt / Decimal(12,2) 进行整数美分精度的货币计算。前后端 Zod Schema 通过自动化测试套件严格验证。",
    stickerNoVibeAction: "审计类型与 HTTP 契约",
    stickerNoVibeResult:
      "PRISMA SCHEMA: 100% 严格 | TypeScript 'any' 数量: 0 | Zod 契约: 18 | 货币精度测试: 13 项全部通过 (0 分钱误差)。",

    stickerZeroResellLabel: "零数据转售与商业隐私",
    stickerZeroResellSub: "商家数据 100% 自主掌控",
    stickerZeroResellCat: "伦理与安全",
    stickerZeroResellProb:
      "市面上多数免费商业软件或企业级 SaaS 都会将商户的流水、供应商和利润率打包转售给市场咨询机构或竞争对手。",
    stickerZeroResellSol:
      "绝对数据主权。VOUT 不包含第三方遥测代码，不商业化元数据。各组织采用严格的关系型数据隔离及 SHA-256 单向加密 API 密钥。",
    stickerZeroResellAction: "验证元数据隔离状态",
    stickerZeroResellResult:
      "隐私审计: 0 外部追踪器 | 0 第三方 Cookie | 多租户数据隔离: 激活 | API 哈希: SHA-256。",

    stickerBarcodeLabel: "HID 硬件条码扫描器",
    stickerBarcodeSub: "原生键盘缓冲区 < 50ms",
    stickerBarcodeCat: "前台硬件集成",
    stickerBarcodeProb:
      "USB 激光条码枪如同极速键盘输入。若操作员正处于弹窗或输入框失焦，扫描信息就会丢失或导致界面崩溃。",
    stickerBarcodeSol:
      "全局窗口原生键盘事件侦听器，配置 < 50ms 缓冲与回车分隔符。无论光标处于何处，扫描均直接注入 POS 购物车。",
    stickerBarcodeAction: "触发激光扫码突发 (EAN-13)",
    stickerBarcodeResult:
      "原生缓冲区: '7791234567890' 在 41ms 内接收 | SKU: VOUT-RETAIL-01 | 单价: $2,450.00 | 内存库存已扣减。",

    stickerBlindCashLabel: "盲盘对账交接班",
    stickerBlindCashSub: "杜绝资金差异的班次审计",
    stickerBlindCashCat: "财务与风控管理",
    stickerBlindCashProb:
      "当收银员提前知道账面应有多少现金时，常出现非正规挪用、私自凑数和隐蔽短缺，管理层往往数周后才发现。",
    stickerBlindCashSol:
      "收银员盲盘清点钱箱现金并录入。系统在后端进行核算比对，并锁定差异生成不可篡改的交班审计单。",
    stickerBlindCashAction: "模拟盲盘交班审计",
    stickerBlindCashResult:
      "系统账面: $128,450.00 | 收银员申报: $128,450.00 | 差额: $0.00 (完美平账) | ESC/POS 财务票据已开具。",

    stickerCustomsLabel: "海关滞箱费智能审计",
    stickerCustomsSub: "保税堆场自动预警系统",
    stickerCustomsCat: "对外贸易与清关运营",
    stickerCustomsProb:
      "如果集装箱在港口堆场超过协议免箱期未完成清关，船运公司每天将收取高达数百美元的滞箱费（Demurrage）。",
    stickerCustomsSol:
      "VOUT Cargo 动态追踪剩余免箱期，自动核算海关节假日并在到期前 72 小时触发预防警报，联动清关行及时申报。",
    stickerCustomsAction: "检查码头堆场免箱期",
    stickerCustomsResult:
      "提单号: MSKU-902184 | 码头: Exolgan | 免箱天数: 7 | 已发生: 4 | 72小时预警: 已激活 | 成功规避滞箱费。",

    // Carousel
    carouselBadge: "VOUT 生产生态系统",
    carouselTitle: "在产旗舰平台概览",
    carouselPrev: "上一个",
    carouselNext: "下一个",
    carouselLiveDemo: "打开在线生产平台 ↗",
    carouselDeepAudit: "深度架构审计",
    carouselKeySpecs: "核心技术指标",
    carouselEngine: "引擎",
    carouselDatabase: "数据库",
    carouselSecurity: "安全性 / 硬件",
    carouselResilience: "韧性指标",

    // Hardware Simulator
    simBadge: "硬件仿真与终端实验室",
    simTitle: "ESC/POS 热敏条码与盲盘对账收银实验室",
    simDesc: "直接体验我们的收银台仿真器：扫码录入、计算含税总额、出具热敏收据并执行收银员盲盘交接班。",
    simScanPlaceholder: "输入或扫描条码 (例如 779123456789)...",
    simScanBtn: "扫码录入",
    simSubtotal: "小计",
    simVat: "增值税 (21%)",
    simTotal: "应收总额",
    simPrintTicket: "出具热敏收据",
    simBlindTitle: "盲盘交班核算模拟",
    simBlindInput: "钱箱清点现金数额 ($)",
    simAuditBtn: "提交盲盘审计",
    simAuditPerfect: "✓ 完美平账: 差额为 0.00。班次已结清。",
    simAuditDiff: "⚠️ 检测到账实差额: 系统账面 $",

    // Trayectoria
    timelineBadge: "// 从柜台到代码",
    timelineTitle: "创始人履历与历程",
    timelineDesc: "从收银台一线服务与每日对账的真实运营，蜕变为高可用软件架构体系的历程。",
    timelineStage: "阶段",
    timelineDone: "✓ 已完成",

    // Footer
    footerBadge: "与 AGUSTÍN MILESI 直接沟通",
    footerH2: "与我联系。",
    footerClaim: "«混乱进入。精准数据产出。»",
    footerDesc: "您的商业实体是否正遭受库存与账实不符困扰？货运业务是否因滞箱费蒙受损失？或者需要无 vibecoding 的关键业务系统？欢迎直接来信。",
    footerEmailTitle: "官方沟通邮箱:",
    footerCopyBtn: "复制地址",
    footerCopied: "✓ 已复制到剪贴板",
    footerGatewayTitle: "带遥测监控的独立网关",
    footerGatewayH3: "通过 VOUT Inbox 直连",
    footerGatewayDesc: "集成 Zod 严格校验、静默反爬蜜罐与实时 Webhook 派发。",
    footerOpenInbox: "打开传送门户 (/contact) →",
    footerRights: "Agustín Milesi · VOUT Architecture. 高可用自主企业系统。零数据挖掘。",
  },
};

export type TranslationDict = Record<keyof typeof translations.en, string>;
