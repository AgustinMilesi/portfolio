"use client";

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#1E293B] overflow-hidden">
      {/* Background glow matrix subtle */}
      <div className="absolute inset-0 dither-canvas opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 md:space-y-14">
        {/* Top Slug & Category */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121824] border border-[#1E293B] text-xs font-mono text-[#9A9E86]">
            <span className="size-2 rounded-full bg-[#C6F827]" />
            <span>ARQUITECTURA DE SOFTWARE CRÍTICO · FUNDADOR DE VOUT</span>
          </div>

          <div className="text-xs font-mono text-[#9A9E86]">
            ESPECIALIZACIÓN: <span className="text-[#E9E7E0] font-semibold">POS RETAIL · FREIGHT LOGISTICS · INBOUND CLOUD</span>
          </div>
        </div>

        {/* Monumental Display Title (Matching reference image) */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-[0.92] text-[#E9E7E0]">
            Software de gestión que entiende la{" "}
            <span className="text-[#C6F827] underline decoration-[#C6F827]/40 underline-offset-8">
              operación.
            </span>
          </h1>

          {/* Editorial Italic Claim from Brand Manual */}
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#9A9E86] tracking-wide pt-2">
            «Entra el caos. Sale el dato.»
          </p>
        </div>

        {/* Two-Column Manifesto (Page 4 philosophy) */}
        <div id="manifiesto" className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 pt-4 border-t border-[#1E293B]/80">
          <div className="space-y-4">
            <div className="text-xs font-mono text-[#C6F827] flex items-center gap-2">
              <span>// 01</span>
              <span className="uppercase tracking-wider">EXPERIENCIA OPERATIVA EN MOSTRADOR</span>
            </div>
            <p className="text-base sm:text-lg text-[#E9E7E0]/90 leading-relaxed font-normal">
              La inmensa mayoría de las herramientas de retail y logística son diseñadas por ingenieros que jamás
              estuvieron parados ocho horas seguidas frente a una caja registradora comercial, con una fila de quince
              clientes apurados y un corte imprevisto de internet.
            </p>
            <p className="text-sm text-[#9A9E86] leading-relaxed">
              El software tradicional asume conectividad perfecta y operadores pacientes. En el mundo real, cada
              segundo de demora en cobrar o en despachar un contenedor es dinero que se pierde en el mostrador.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-mono text-[#C6F827] flex items-center gap-2">
              <span>// 02</span>
              <span className="uppercase tracking-wider">EL PRINCIPIO DE INGENIERÍA VOUT</span>
            </div>
            <p className="text-base sm:text-lg text-[#E9E7E0]/90 leading-relaxed font-normal">
              VOUT nació en el comercio mayorista y la logística aduanera de Buenos Aires. Construimos software
              con arquitectura <strong className="text-[#E9E7E0] font-bold">offline-first resiliente</strong>,
              arqueos ciegos de caja que eliminan descuadres, transacciones atómicas y cero tolerancia al vibecoding.
            </p>
            <p className="text-sm text-[#9A9E86] leading-relaxed">
              Código propio tipado en TypeScript de punta a punta, contratos HTTP estrictos, bases de datos PostgreSQL
              con réplicas locales en IndexedDB/SQLite y 100% de soberanía sobre los datos del comercio.
            </p>
          </div>
        </div>

        {/* Metrics Badge Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#C6F827] font-mono">04</div>
            <div className="text-xs font-mono text-[#9A9E86] uppercase">Plataformas Insignia en Producción</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#E9E7E0] font-mono">&lt;45ms</div>
            <div className="text-xs font-mono text-[#9A9E86] uppercase">Latencia Edge Edge-to-DB</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#C6F827] font-mono">100%</div>
            <div className="text-xs font-mono text-[#9A9E86] uppercase">Offline Cache en Caja POS</div>
          </div>
          <div className="p-4 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-1">
            <div className="text-2xl sm:text-3xl font-black text-[#E9E7E0] font-mono">0%</div>
            <div className="text-xs font-mono text-[#9A9E86] uppercase">Reventa o Minado de Datos</div>
          </div>
        </div>
      </div>
    </section>
  );
}
