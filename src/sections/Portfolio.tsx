import React from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { PortfolioCard } from '../components/PortfolioCard';
import { CheckCircle2 } from 'lucide-react';

export const Portfolio: React.FC = () => {
  return (
    <section id="projetos" className="py-24 bg-[#0B1220]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
            Portfólio Comprovado
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 tracking-tight">
            Projetos reais. Soluções em funcionamento.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Não apresentamos apenas conceitos ou telas estáticas. Estes são sistemas publicados, acessíveis e construídos para atender necessidades reais de negócios.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Sistemas ativos na web
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Clique para abrir e navegar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Arquitetura sob medida
            </span>
          </div>
        </div>

        {/* Grid dos Cards de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
};
