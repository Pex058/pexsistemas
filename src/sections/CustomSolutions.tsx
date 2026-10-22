import React from 'react';
import { HelpCircle, ExternalLink, Lightbulb } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const CustomSolutions: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0B1220] via-[#0F1C30] to-[#0B1220] border-y border-slate-800 relative overflow-hidden">
      
      {/* Detalhe de fundo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 mb-6">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Demandas Fora do Padrão</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
          Não encontrou exatamente o que precisa?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-10">
          Nem todo problema se resolve com uma ferramenta pronta. Se sua empresa utiliza planilhas complicadas, repete tarefas manualmente todos os dias ou precisa organizar informações específicas, podemos investigar uma solução customizada.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={SITE_CONFIG.links.meexplica}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Lightbulb className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>Me explica seu problema!</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Você será direcionado para o MeExplica, nossa plataforma exclusiva de diagnóstico para novos desafios.
        </p>

      </div>
    </section>
  );
};
