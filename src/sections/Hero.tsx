import React from 'react';
import { MessageCircle, ArrowRight, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden tech-grid"
    >
      {/* Luz ambiente de fundo */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Lado Esquerdo: Mensagem de Alto Impacto */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Tecnologia prática para pequenos negócios</span>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Seu negócio tem desafios. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
                Nós criamos soluções.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Sites, presença digital, automações e sistemas personalizados desenvolvidos para facilitar a rotina da sua empresa — sem termos complicados e adaptados à sua realidade.
            </p>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a
                href={createWhatsAppUrl("Olá! Conheci a Sistemas Pex pelo site e gostaria de conversar sobre uma solução para minha empresa.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950 text-slate-950" />
                <span>Solicitar orçamento</span>
              </a>

              <a
                href="#projetos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-base border border-slate-700 hover:border-slate-600 transition-all duration-200"
              >
                <span>Conhecer nossos projetos</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </a>
            </div>

            {/* Provas de Valor Rápidas */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Atendimento Próximo</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Soluções Rápidas</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sem Mensalidades Ocultas</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Elemento Visual Tecnológico Interativo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Ilustrativo de Conexão Problema -> Solução */}
              <div className="rounded-2xl bg-gradient-to-b from-[#111C2E] to-[#0A101C] border border-[#233554] p-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    pex-terminal://diagnostico
                  </span>
                </div>

                <div className="py-5 space-y-4">
                  {/* Cenário Manual */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-rose-500/20">
                    <div className="flex items-center justify-between text-xs text-rose-400 font-medium mb-1">
                      <span>Problema comum:</span>
                      <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded">Antes</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      "Perdendo clientes no WhatsApp, sem controle de estoque e informações espalhadas em cadernos e planilhas lentas."
                    </p>
                  </div>

                  {/* Seta de transformação */}
                  <div className="flex items-center justify-center">
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                      <span>Transformação Sistemas Pex</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Cenário Digitalizado */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/40">
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-medium mb-1">
                      <span>Solução entregue:</span>
                      <span className="text-[10px] bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded font-semibold">Depois</span>
                    </div>
                    <p className="text-xs text-slate-200">
                      "Central de links inteligente, botões diretos de atendimento, métricas em tempo real e sistema customizado para a sua rotina."
                    </p>
                  </div>
                </div>

                {/* Métricas ilustrativas de ganho de eficiência */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-2.5 rounded-lg bg-[#16233B] border border-slate-700/60 text-center">
                    <span className="block text-emerald-400 font-bold text-lg">100%</span>
                    <span className="text-[10px] text-slate-400">Focado na sua operação</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#16233B] border border-slate-700/60 text-center">
                    <span className="block text-emerald-400 font-bold text-lg">Ágil</span>
                    <span className="text-[10px] text-slate-400">Entrega rápida e objetiva</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
