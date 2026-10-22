import React from 'react';
import { MessageCircle, ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const ContactCTA: React.FC = () => {
  return (
    <section id="contato" className="py-24 bg-[#080E18] border-t border-[#1E293B] relative overflow-hidden">
      
      {/* Luz ambiente de destaque */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 inline-block mb-6">
          Próximo Passo
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
          Vamos simplificar o seu negócio?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Conte o que sua empresa precisa e vamos conversar sobre uma solução prática, sem rodeios e sem compromisso.
        </p>

        {/* Botão Principal de Conversão */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={createWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-lg shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <MessageCircle className="w-6 h-6 fill-slate-950 text-slate-950" />
            <span>Conversar pelo WhatsApp</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>
        </div>

        {/* Benefícios rápidos do atendimento */}
        <div className="inline-grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-400 text-xs sm:text-sm pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Resposta rápida e direta</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Orçamento sem compromisso</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Tecnologia na medida certa</span>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          Atendimento comercial via WhatsApp: <strong className="text-slate-400 font-semibold">{SITE_CONFIG.whatsapp.display}</strong>
        </div>

      </div>
    </section>
  );
};
