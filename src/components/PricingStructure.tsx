import React from 'react';
import { Check, MessageSquare } from 'lucide-react';
import { PRICING_PACKAGES } from '../data/pricing';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const PricingStructure: React.FC = () => {
  return (
    <section className="py-20 bg-[#0B1220] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
            Estrutura Comercial
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 tracking-tight">
            Pacotes e Modelos de Solução
          </h2>
          <p className="text-base text-slate-400">
            Cada negócio possui uma realidade diferente. Nossas propostas são dimensionadas exatamente para o tamanho do seu desafio, sem cobranças abusivas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6 flex flex-col justify-between border transition-all ${
                pkg.isPopular
                  ? 'bg-[#111C2E] border-emerald-500 shadow-xl shadow-emerald-950/20 relative'
                  : 'bg-[#0E1726] border-slate-800 hover:border-slate-700'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Recomendado
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{pkg.subtitle}</p>

                <div className="p-3 bg-[#080E18] rounded-xl border border-slate-800/70 mb-5">
                  <span className="text-xs text-slate-400 block font-medium">Investimento:</span>
                  <span className="text-sm font-semibold text-emerald-400">{pkg.priceDisplay}</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <a
                  href={createWhatsAppUrl(pkg.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    pkg.isPopular
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{pkg.ctaText}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
