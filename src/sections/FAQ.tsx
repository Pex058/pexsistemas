import React from 'react';
import { FAQ_DATA } from '../data/faq';
import { FAQAccordion } from '../components/FAQAccordion';
import { HelpCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-[#0B1220]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Respostas claras e diretas para entender como trabalhamos e o que podemos fazer pelo seu negócio.
          </p>
        </div>

        {/* Accordion */}
        <FAQAccordion items={FAQ_DATA} />

      </div>
    </section>
  );
};
