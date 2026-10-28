"use client";

import { useEffect } from "react";

export interface ProjectData {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  liveUrl: string;
  repoFolder: string;
  specs: {
    engine: string;
    database: string;
    hardwareOrSecurity: string;
    resilienceMetric: string;
  };
  features: string[];
  problemStatement: string;
  architecturalSolution: string;
  schemaSnippet: string;
  dataFlow: string[];
}

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-[var(--bg-page,#0A0E14)] border-2 border-[var(--border-card,#1E293B)] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[var(--text-main,#E9E7E0)] relative cursor-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[var(--border-card,#1E293B)] bg-[var(--bg-card,#121824)] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[var(--bg-page,#0A0E14)] border border-[var(--border-card,#1E293B)] text-[var(--primary-accent,#C6F827)] font-semibold">
              {project.slug}
            </span>
            <span className="text-sm font-mono text-[var(--text-muted,#9A9E86)] hidden sm:inline">
              // REPORTE DE ARQUITECTURA CRÍTICA
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-xl bg-[var(--bg-page,#0A0E14)] border border-[var(--border-card,#1E293B)] text-[var(--text-muted,#9A9E86)] hover:text-[var(--text-main,#FFFFFF)] hover:border-[var(--primary-accent,#C6F827)] transition-all cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Cerrar modal"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Category */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#C6F827]">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#E9E7E0]">
              {project.name}
            </h3>
            <p className="text-base text-[#9A9E86] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* 1. Problem Reality vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-2">
              <span className="text-xs font-mono text-[#FF5555] uppercase tracking-wider flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#FF5555]" />
                El Desafío Operativo Real
              </span>
              <p className="text-sm text-[#E9E7E0]/90 leading-relaxed font-normal">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-2">
              <span className="text-xs font-mono text-[#C6F827] uppercase tracking-wider flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[#C6F827]" />
                Solución de Ingeniería VOUT
              </span>
              <p className="text-sm text-[#E9E7E0]/90 leading-relaxed font-normal">
                {project.architecturalSolution}
              </p>
            </div>
          </div>

          {/* 2. Technical Stack Matrix */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#9A9E86]">
              // ESPECIFICACIONES TÉCNICAS DIRECTAS
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-[#121824] border border-[#1E293B]">
                <div className="text-[10px] font-mono text-[#9A9E86]">ENGINE</div>
                <div className="text-xs font-bold text-[#E9E7E0] mt-1">{project.specs.engine}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#121824] border border-[#1E293B]">
                <div className="text-[10px] font-mono text-[#9A9E86]">STORAGE &amp; ORM</div>
                <div className="text-xs font-bold text-[#E9E7E0] mt-1">{project.specs.database}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#121824] border border-[#1E293B]">
                <div className="text-[10px] font-mono text-[#9A9E86]">HARDWARE / SEGURIDAD</div>
                <div className="text-xs font-bold text-[#E9E7E0] mt-1">{project.specs.hardwareOrSecurity}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#121824] border border-[#1E293B]">
                <div className="text-[10px] font-mono text-[#9A9E86]">SLA / RESILIENCIA</div>
                <div className="text-xs font-bold text-[#C6F827] mt-1">{project.specs.resilienceMetric}</div>
              </div>
            </div>
          </div>

          {/* 3. System Data Flow Diagram */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#9A9E86]">
              // FLUJO TRANSACCIONAL DEL SISTEMA
            </h4>
            <div className="p-4 rounded-2xl bg-[#121824] border border-[#1E293B] space-y-2">
              {project.dataFlow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs font-mono text-[#E9E7E0]/90">
                  <span className="text-[#C6F827] font-bold">0{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Prisma Schema Snippet */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#9A9E86]">
              // MODELO DE DATOS PRISMA (FRAGMENTO REAL)
            </h4>
            <pre className="p-4 rounded-2xl bg-[#0A0E14] border border-[#1E293B] text-[11px] font-mono text-[#C6F827] overflow-x-auto leading-relaxed select-text">
              <code>{project.schemaSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 border-t border-[#1E293B] bg-[#121824] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs font-mono text-[#9A9E86]">
            Directorio local: <span className="text-[#E9E7E0]">{project.repoFolder}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#0A0E14] border border-[#1E293B] text-xs font-mono text-[#9A9E86] hover:text-white transition-colors"
            >
              Cerrar
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#C6F827] text-[#0A0E14] font-black text-xs uppercase tracking-wider hover:bg-white transition-all transform active:scale-95 flex items-center gap-2"
            >
              <span>Abrir en Producción</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
