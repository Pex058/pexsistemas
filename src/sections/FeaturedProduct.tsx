import React from 'react';
import { 
  ExternalLink, 
  MessageCircle, 
  Smartphone, 
  BarChart3, 
  QrCode, 
  Sliders, 
  Share2, 
  Check, 
  Layers
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const FeaturedProduct: React.FC = () => {
  return (
    <section id="produto-destaque" className="py-24 bg-[#080E18] border-y border-[#1E293B] relative overflow-hidden">
      
      {/* Luz ambiente de fundo */}
      <div 
        className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho do Produto em Destaque */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Produto em Destaque</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Central Digital Inteligente
          </h2>
          <p className="text-xl sm:text-2xl text-emerald-400 font-semibold mb-4">
            "Mais do que um link na bio. Uma central digital para seu negócio."
          </p>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Esqueça árvores de links limitadas ou genéricas. Tenha uma página proprietária rápida, personalizada com a sua identidade visual e acompanhada de um painel de inteligência comercial.
          </p>
        </div>

        {/* Comparativo em Duas Colunas: Página Pública vs Painel Administrativo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          
          {/* Lado 1: A Experiência do Seu Cliente */}
          <div className="lg:col-span-6 rounded-2xl bg-[#111C2E] border border-slate-800 p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Para os Seus Clientes</h3>
                  <p className="text-xs text-slate-400">Página pública com carregamento instantâneo</p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-6">
                {[
                  "Logomarca oficial da sua empresa com visual profissional",
                  "Botões direcionados para WhatsApp com mensagens personalizadas",
                  "Links para Instagram, Facebook, TikTok e redes sociais",
                  "Endereço físico integrado ao Google Maps e Waze",
                  "Catálogos de produtos e horários de atendimento visíveis",
                  "Design mobile first fluido e responsivo em qualquer celular"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mockup visual de botão */}
            <div className="p-4 rounded-xl bg-[#0B1220] border border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 block mb-2">Simulação de link rápido:</span>
              <div className="w-full py-2.5 px-4 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-between">
                <span>💬 Falar com Vendedor no WhatsApp</span>
                <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">Ativo</span>
              </div>
            </div>
          </div>

          {/* Lado 2: O Seu Controle e Métricas */}
          <div className="lg:col-span-6 rounded-2xl bg-[#111C2E] border border-slate-800 p-7 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Painel Administrativo Próprio</h3>
                  <p className="text-xs text-slate-400">Você no controle total, sem complicação</p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-6">
                {[
                  "Gerencie, altere, reordene ou desative botões em segundos",
                  "Acompanhe quantas visitas seu link recebeu em tempo real",
                  "Saiba exatamente quantos cliques foram para o WhatsApp",
                  "Identifique a origem dos acessos (Instagram, Google, panfleto)",
                  "Crie links rastreáveis para anúncios e campanhas específicas",
                  "Gerador integrado de QR Code para impressão de balcão e cartões",
                  "Exportação simples de relatórios em CSV"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Destaque das ferramentas */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#0B1220] border border-slate-800">
                <QrCode className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] text-slate-300 font-medium block">QR Code</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0B1220] border border-slate-800">
                <Sliders className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] text-slate-300 font-medium block">Customizável</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0B1220] border border-slate-800">
                <Share2 className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] text-slate-300 font-medium block">Rastreável</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA do Produto em Destaque */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#111C2E] to-[#111C2E] border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Veja a Central Digital rodando na prática
            </h4>
            <p className="text-sm text-slate-300 max-w-xl">
              Confira o caso real da Campomaq, um dos nossos primeiros clientes a utilizar o sistema para centralizar atendimentos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0">
            <a
              href={SITE_CONFIG.links.campomaq}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
            >
              <span>Ver exemplo funcionando</span>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </a>

            <a
              href={createWhatsAppUrl("Olá! Tenho interesse na Central Digital da Sistemas Pex e gostaria de solicitar um orçamento para minha empresa.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Quero uma para minha empresa</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
