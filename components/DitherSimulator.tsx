"use client";

import { useState, useEffect } from "react";

interface Item {
  sku: string;
  name: string;
  qty: number;
  price: number;
}

export function DitherSimulator() {
  const [dateString, setDateString] = useState("25/10/2026");
  const [items, setItems] = useState<Item[]>([
    { sku: "779123456789", name: "CAFÉ TOSTADO NATURAL 500G", qty: 2, price: 4200 },
    { sku: "779987654321", name: "LECHE ENTERA LARGA VIDA 1L", qty: 3, price: 1350 },
    { sku: "779456123789", name: "YERBA MATE DESPALADA 1KG", qty: 1, price: 3890 },
  ]);

  const [scannedCode, setScannedCode] = useState("");
  const [ticketPrinted, setTicketPrinted] = useState(false);
  const [cashDeclared, setCashDeclared] = useState("");
  const [blindShiftAudit, setBlindShiftAudit] = useState<{
    declared: number;
    actual: number;
    diff: number;
  } | null>(null);

  const subtotal = items.reduce((acc, it) => acc + it.qty * it.price, 0);
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  useEffect(() => {
    setDateString(new Date().toLocaleDateString("es-AR"));
  }, []);

  const handleScanBarcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedCode.trim()) return;

    // Simulate adding scanned item
    const newItem: Item = {
      sku: scannedCode.trim(),
      name: `ARTÍCULO SKU-${scannedCode.slice(-4).toUpperCase() || "7790"}`,
      qty: 1,
      price: Math.floor(1200 + Math.random() * 4500),
    };

    setItems((prev) => [...prev, newItem]);
    setScannedCode("");
    setTicketPrinted(false);
  };

  const handlePrintReceipt = () => {
    setTicketPrinted(true);
    setTimeout(() => {
      // scroll effect
    }, 300);
  };

  const handleBlindAudit = (e: React.FormEvent) => {
    e.preventDefault();
    const declaredNum = parseFloat(cashDeclared);
    if (isNaN(declaredNum)) return;

    const actualExpected = total + 50000; // Float base $50,000 + sales
    const difference = declaredNum - actualExpected;
    setBlindShiftAudit({
      declared: declaredNum,
      actual: actualExpected,
      diff: difference,
    });
  };

  const handleReset = () => {
    setItems([
      { sku: "779123456789", name: "CAFÉ TOSTADO NATURAL 500G", qty: 2, price: 4200 },
      { sku: "779987654321", name: "LECHE ENTERA LARGA VIDA 1L", qty: 3, price: 1350 },
    ]);
    setTicketPrinted(false);
    setBlindShiftAudit(null);
    setCashDeclared("");
  };

  return (
    <section id="simulador" className="py-16 sm:py-24 border-b border-[#1E293B] bg-[#0A0E14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C6F827]">
            <span className="size-2 rounded-full bg-[#C6F827]" />
            <span>// HARDWARE LAB &amp; SIMULADOR DE CAJA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#E9E7E0]">
            Prueba la ingeniería de caja en vivo
          </h2>
          <p className="text-sm text-[#9A9E86] max-w-2xl">
            Simula un escaneo de código de barras a 50ms, la generación de un ticket térmico con textura
            dither oficial de VOUT y un arqueo ciego de fin de turno.
          </p>
        </div>

        {/* Interactive Workspace (Split 2 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: POS Terminal Controls (7 cols) */}
          <div className="lg:col-span-7 bg-[#121824] border-2 border-[#1E293B] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#C6F827]" />
                <span className="font-mono text-xs text-[#E9E7E0] font-bold">
                  TERMINAL CAJA-04 · SESIÓN ACTIVA
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-mono text-[#9A9E86] hover:text-[#C6F827] transition-colors"
              >
                // REINICIAR SIMULACIÓN
              </button>
            </div>

            {/* 1. Barcode Scanner Input */}
            <form onSubmit={handleScanBarcode} className="space-y-2">
              <label className="text-[11px] font-mono text-[#9A9E86] uppercase block">
                Escanear Código de Barras (Presiona Enter para simular escáner láser USB):
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={scannedCode}
                    onChange={(e) => setScannedCode(e.target.value)}
                    placeholder="Ej. 779123456789 o escribe un SKU..."
                    className="w-full bg-[#0A0E14] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs font-mono text-[#E9E7E0] placeholder:text-[#9A9E86]/50 focus:border-[#C6F827] focus:outline-none"
                  />
                  <span className="absolute right-3 top-2.5 text-[10px] font-mono text-[#9A9E86]">
                    BUFFER HID &lt;50MS
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#C6F827] text-[#0A0E14] font-mono font-black text-xs uppercase hover:bg-white transition-colors shrink-0"
                >
                  Escanear
                </button>
              </div>
            </form>

            {/* 2. Items Scanned Table */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-[#9A9E86] uppercase block">
                Artículos en Buffer de Venta:
              </span>
              <div className="bg-[#0A0E14] border border-[#1E293B] rounded-2xl overflow-hidden divide-y divide-[#1E293B]/60 text-xs font-mono">
                {items.map((it, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div>
                      <p className="text-[#E9E7E0] font-medium">{it.name}</p>
                      <p className="text-[10px] text-[#9A9E86]">SKU: {it.sku} · QTY: {it.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#C6F827] font-bold">
                        ${(it.qty * it.price).toLocaleString("es-AR")}
                      </p>
                      <p className="text-[10px] text-[#9A9E86]">
                        (${it.price.toLocaleString("es-AR")} c/u)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 rounded-2xl bg-[#0A0E14] border border-[#1E293B] space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[#9A9E86]">
                <span>SUBTOTAL NETO:</span>
                <span>${subtotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-[#9A9E86]">
                <span>IVA DISCRIMINADO (21%):</span>
                <span>${iva.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#E9E7E0] pt-2 border-t border-[#1E293B]">
                <span className="text-[#C6F827]">TOTAL A COBRAR:</span>
                <span>${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Actions: Emit Receipt */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePrintReceipt}
                className="flex-1 py-3 rounded-2xl bg-[#C6F827] text-[#0A0E14] font-black text-xs uppercase tracking-wider hover:bg-white transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                <span>Emitir Ticket Térmico ESC/POS</span>
                <span>⚡</span>
              </button>
            </div>

            {/* 3. Blind Shift Audit Experiment */}
            <div className="pt-4 border-t border-[#1E293B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#E9E7E0] font-bold flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-[#C6F827]" />
                  Simular Arqueo Ciego de Fin de Turno
                </span>
                <span className="text-[10px] font-mono text-[#9A9E86]">
                  (Fondo inicial: $50.000)
                </span>
              </div>
              <form onSubmit={handleBlindAudit} className="flex gap-2">
                <input
                  type="number"
                  value={cashDeclared}
                  onChange={(e) => setCashDeclared(e.target.value)}
                  placeholder="Efectivo contado en gaveta..."
                  className="flex-1 bg-[#0A0E14] border border-[#1E293B] rounded-xl px-4 py-2 text-xs font-mono text-[#E9E7E0] placeholder:text-[#9A9E86]/50 focus:border-[#C6F827] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#161F30] border border-[#1E293B] text-xs font-mono text-[#C6F827] hover:bg-[#1E293B] transition-colors"
                >
                  Auditar Cierre
                </button>
              </form>

              {blindShiftAudit && (
                <div
                  className={`p-3.5 rounded-xl border text-xs font-mono space-y-1 ${
                    Math.abs(blindShiftAudit.diff) < 1
                      ? "bg-[#C6F827]/10 border-[#C6F827] text-[#C6F827]"
                      : "bg-[#FF5555]/10 border-[#FF5555] text-[#FF5555]"
                  }`}
                >
                  <p className="font-bold">
                    {Math.abs(blindShiftAudit.diff) < 1
                      ? "✓ ARQUEO EXACTO: CERO DESCUADRE EN CAJA."
                      : `⚠ DESCUADRE DETECTADO: ${blindShiftAudit.diff > 0 ? "+$" : "-$"}${Math.abs(
                          blindShiftAudit.diff
                        ).toLocaleString("es-AR")} respecto al cómputo del sistema.`}
                  </p>
                  <p className="text-[10px] text-[#9A9E86]">
                    Declarado: ${blindShiftAudit.declared.toLocaleString("es-AR")} | Esperado: $
                    {blindShiftAudit.actual.toLocaleString("es-AR")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Thermal Paper Ticket (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm bg-[#E9E7E0] text-[#0A0E14] font-mono p-6 sm:p-8 rounded-b-md shadow-2xl relative select-none border-t-8 border-[#C6F827] transition-all">
              {/* Paper Top Jagged Edge Mock */}
              <div className="text-center pb-4 border-b border-dashed border-[#0A0E14]/30 space-y-1">
                <div className="font-black text-xl tracking-tight leading-none uppercase">
                  VOUT RETAIL
                </div>
                <div className="text-[10px] text-[#0A0E14]/70">
                  SISTEMA DE GESTIÓN OPERATIVA
                </div>
                <div className="text-[9px] text-[#0A0E14]/60">
                  CUIT 30-71894210-9 · IVA RESP. INSCRIPTO
                </div>
                <div className="text-[9px] text-[#0A0E14]/60">
                  PV: 0004 · TKT: 00084920 · BUE-AR
                </div>
              </div>

              {/* Ticket Date & Cashier */}
              <div className="py-2.5 border-b border-dashed border-[#0A0E14]/30 text-[10px] flex justify-between text-[#0A0E14]/80">
                <span>CAJERO: MILESI_A</span>
                <span>{dateString}</span>
              </div>

              {/* Items List */}
              <div className="py-3 border-b border-dashed border-[#0A0E14]/30 space-y-2 text-[10px]">
                {items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-start leading-tight">
                    <span className="max-w-[180px] uppercase truncate">
                      {it.qty}x {it.name}
                    </span>
                    <span className="font-bold shrink-0">
                      ${(it.qty * it.price).toLocaleString("es-AR")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="py-3 border-b-2 border-[#0A0E14] space-y-1 text-xs">
                <div className="flex justify-between text-[10px] text-[#0A0E14]/70">
                  <span>SUBTOTAL:</span>
                  <span>${subtotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-[10px] text-[#0A0E14]/70">
                  <span>IVA 21%:</span>
                  <span>${iva.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-base font-black pt-1">
                  <span>TOTAL:</span>
                  <span>${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* 4px Dither Barcode Section (Page 6 tribute) */}
              <div className="pt-4 text-center space-y-2">
                <div className="w-full h-12 bg-repeating-linear-gradient flex items-center justify-center border border-[#0A0E14]/40 bg-[#0A0E14]">
                  {/* Simulated High-Res Barcode */}
                  <div className="w-full h-8 px-2 flex justify-between items-stretch">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <span
                        key={i}
                        className={`inline-block h-full ${
                          i % 3 === 0 ? "w-1 bg-[#E9E7E0]" : i % 5 === 0 ? "w-0.5 bg-[#E9E7E0]" : "w-1.5 bg-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-[8px] tracking-widest text-[#0A0E14]/70">
                  *779084920192384*
                </p>

                <p className="text-[9px] font-serif italic text-[#0A0E14]/70 pt-1">
                  «Entra el caos. Sale el dato.»
                </p>
              </div>

              {/* Status pill if printed */}
              {ticketPrinted && (
                <div className="mt-4 p-2 rounded bg-[#C6F827] text-[#0A0E14] text-[10px] font-bold text-center uppercase tracking-wider animate-bounce">
                  ✓ TICKET DESPACHADO A IMPRESORA TÉRMICA
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
