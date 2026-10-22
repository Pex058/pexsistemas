import React from 'react';
import { MessageSquareText, Search, FileText, Rocket } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: <MessageSquareText className="w-6 h-6 text-emerald-400" />,
      title: "Você conta sua necessidade",
      description: "Conversamos de forma direta pelo WhatsApp sobre as dores, gargalos ou objetivos que sua empresa enfrenta no dia a dia."
    },
    {
      number: "02",
      icon: <Search className="w-6 h-6 text-emerald-400" />,
      title: "Analisamos as possibilidades",
      description: "Estudamos a alternativa mais prática e econômica: uma landing page, uma central digital ou uma ferramenta sob medida."
    },
    {
      number: "03",
      icon: <FileText className="w-6 h-6 text-emerald-400" />,
      title: "Apresentamos uma proposta",
      description: "Uma proposta transparente, com escopo claro, prazos realistas e valores definidos — sem taxas escondidas."
    },
    {
      number: "04",
      icon: <Rocket className="w-6 h-6 text-emerald-400" />,
      title: "Desenvolvemos e entregamos",
      description: "Construímos a aplicação, colocamos no ar, configuramos os links e treinamos você para utilizar tudo com tranquilidade."
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#080E18] border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
            Processo Transparente
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 tracking-tight">
            Como trabalhamos
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            "Cada negócio tem sua realidade. Nosso trabalho é entender o problema antes de escolher a tecnologia."
          </p>
        </div>

        {/* Grade de 4 Etapas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="rounded-2xl bg-[#111C2E] border border-slate-800 p-6 sm:p-7 relative flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-700 select-none font-mono">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
