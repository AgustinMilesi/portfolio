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
  githubUrl?: string;
  githubMobileUrl?: string;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#000000]/85 backdrop-blur-md animate-fadeIn cursor-pointer"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] bg-[#1f1f1f] border border-[#252525] rounded-[4px] shadow-2xl flex flex-col overflow-hidden text-[#e5e5e5] relative cursor-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#252525] bg-[#161616] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded-[2px] bg-[#1f1f1f] border border-[#252525] text-[#c5ff4a] font-medium">
              {project.slug}
            </span>
            <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#7a7a7a] hidden sm:inline">
              [ REPORTE DE ARQUITECTURA CRÍTICA ]
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-[4px] bg-[#1f1f1f] border border-[#252525] text-[#7a7a7a] hover:text-[#ffffff] hover:border-[#c5ff4a] transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Cerrar modal"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-8">
          {/* Title & Category */}
          <div className="space-y-2">
            <span className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[#c5ff4a]">
              [ {project.category} ]
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#ffffff] tracking-tight">
              {project.name}
            </h3>
            <p className="text-sm font-sans text-[#7a7a7a] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* 1. Problem Reality vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[4px] bg-[#161616] border border-[#252525] space-y-2">
              <span className="text-[11px] font-sans font-medium text-red-400 uppercase tracking-[0.22em] flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-red-400" />
                [ EL DESAFÍO OPERATIVO REAL ]
              </span>
              <p className="text-xs sm:text-sm font-sans text-[#e5e5e5] leading-[1.55] font-normal">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 rounded-[4px] bg-[#161616] border border-[#252525] space-y-2">
              <span className="text-[11px] font-sans font-medium text-[#c5ff4a] uppercase tracking-[0.22em] flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#c5ff4a]" />
                [ SOLUCIÓN DE INGENIERÍA VOUT ]
              </span>
              <p className="text-xs sm:text-sm font-sans text-[#e5e5e5] leading-[1.55] font-normal">
                {project.architecturalSolution}
              </p>
            </div>
          </div>

          {/* 2. Technical Stack Matrix */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
              [ ESPECIFICACIONES TÉCNICAS DIRECTAS ]
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3.5 rounded-[4px] bg-[#252525] border border-[#313131]">
                <div className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a]">ENGINE</div>
                <div className="text-xs font-mono font-medium text-[#ffffff] mt-1 break-words">{project.specs.engine}</div>
              </div>
              <div className="p-3.5 rounded-[4px] bg-[#252525] border border-[#313131]">
                <div className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a]">STORAGE &amp; ORM</div>
                <div className="text-xs font-mono font-medium text-[#ffffff] mt-1 break-words">{project.specs.database}</div>
              </div>
              <div className="p-3.5 rounded-[4px] bg-[#252525] border border-[#313131]">
                <div className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a]">HARDWARE / SEGURIDAD</div>
                <div className="text-xs font-mono font-medium text-[#ffffff] mt-1 break-words">{project.specs.hardwareOrSecurity}</div>
              </div>
              <div className="p-3.5 rounded-[4px] bg-[#252525] border border-[#313131]">
                <div className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#7a7a7a]">SLA / RESILIENCIA</div>
                <div className="text-xs font-mono font-medium text-[#c5ff4a] mt-1 break-words">{project.specs.resilienceMetric}</div>
              </div>
            </div>
          </div>

          {/* 3. System Data Flow Diagram */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-sans font-medium uppercase tracking-[0.22em] text-[#7a7a7a]">
              [ FLUJO TRANSACCIONAL DEL SISTEMA ]
            </h4>
            <div className="p-4 rounded-[4px] bg-[#161616] border border-[#252525] space-y-2">
              {project.dataFlow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs font-mono text-[#e5e5e5]">
                  <span className="text-[#c5ff4a] font-bold">0{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Modal Actions Footer */}
        <div className="p-5 sm:p-6 border-t border-[#252525] bg-[#161616] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="text-xs font-mono text-[#7a7a7a]">
            Directorio local: <span className="text-[#ffffff]">{project.repoFolder}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-[4px] bg-[#1f1f1f] border border-[#252525] text-xs font-sans uppercase tracking-[0.08em] text-[#7a7a7a] hover:text-[#ffffff] transition-colors cursor-pointer min-h-[40px]"
            >
              Cerrar
            </button>
            <a
              href={project.githubUrl || `https://github.com/AgustinMilesi/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-[4px] bg-[#1f1f1f] border border-[#313131] hover:border-[#c5ff4a] text-xs font-sans uppercase tracking-[0.08em] text-[#ffffff] transition-colors flex items-center gap-1.5 cursor-pointer min-h-[40px]"
            >
              <span>GitHub ↗</span>
            </a>
            {project.githubMobileUrl && (
              <a
                href={project.githubMobileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-[4px] bg-[#1a1a1a] border border-[#313131] hover:border-[#c5ff4a] text-xs font-sans uppercase tracking-[0.08em] text-[#a3a3a3] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <span>App Móvil ↗</span>
              </a>
            )}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-[4px] bg-[#c5ff4a] text-[#000000] font-sans font-medium text-xs uppercase tracking-[0.04em] shadow-[0_0_8px_rgba(197,255,74,0.45)] hover:opacity-95 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer min-h-[40px]"
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
