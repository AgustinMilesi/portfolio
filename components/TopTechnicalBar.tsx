"use client";

import { useEffect, useState } from "react";

export function TopTechnicalBar() {
  const [timeStr, setTimeStr] = useState<string>("12:00:00 ART");
  const [latency, setLatency] = useState<number>(38);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("es-AR", {
          timeZone: "America/Argentina/Buenos_Aires",
          hour12: false,
        }) + " ART"
      );
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // Subtle realistic latency fluctuation
    const latencyInterval = setInterval(() => {
      setLatency(35 + Math.floor(Math.random() * 8));
    }, 4000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  return (
    <div className="hidden sm:block w-full bg-[var(--bg-page,#0A0E14)] border-b border-[var(--border-card,#1E293B)] text-[11px] font-mono text-[var(--text-muted,#9A9E86)] select-none z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-y-1 gap-x-4">
        {/* Node & System */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[var(--text-main,#E9E7E0)] font-semibold">
            <span className="size-2 rounded-full bg-[var(--primary-accent,#C6F827)] pulse-dot inline-block" />
            NODE-LATAM-01
          </span>
          <span className="text-[var(--border-card,#1E293B)]">|</span>
          <span className="hidden sm:inline text-[var(--text-muted,#9A9E86)]">BUENOS AIRES, AR</span>
          <span className="hidden sm:inline text-[var(--border-card,#1E293B)]">|</span>
          <span className="text-[var(--primary-accent,#C6F827)] font-medium">99.99% UPTIME</span>
        </div>

        {/* Real-time telemetry */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto sm:ml-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--text-muted,#9A9E86)]">LATENCIA:</span>
            <span className="text-[var(--text-main,#E9E7E0)] font-semibold">{latency}ms</span>
          </div>
          <span className="text-[var(--border-card,#1E293B)]">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--text-muted,#9A9E86)]">RELOJ:</span>
            <span className="text-[var(--text-main,#E9E7E0)] font-semibold tabular-nums">{timeStr}</span>
          </div>
          <span className="hidden md:inline text-[var(--border-card,#1E293B)]">|</span>
          <span className="hidden md:inline text-[var(--text-muted,#9A9E86)]">VOUT/SPEC REV.01</span>
        </div>
      </div>
    </div>
  );
}
