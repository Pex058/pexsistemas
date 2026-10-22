import React from 'react';
import { ExternalLink, Check, AlertCircle, Sparkles } from 'lucide-react';
import { ProjectItem } from '../data/projects';

interface PortfolioCardProps {
  project: ProjectItem;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ project }) => {
  return (
    <article className="rounded-2xl bg-[#111C2E] border border-[#1E293B] hover:border-emerald-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/40 group">
      <div>
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {project.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {project.status}
          </span>
        </div>

        {/* Nome do Projeto */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
          {project.name}
        </h3>

        {/* Problema */}
        <div className="mb-4 bg-[#0B1220]/70 p-3.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400/90 mb-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Desafio Real</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Solução Entregue */}
        <div className="mb-5 bg-[#0B1220]/70 p-3.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solução Sistemas Pex</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {project.solution}
          </p>
        </div>

        {/* Destaques */}
        <div className="mb-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Botão para abrir o sistema real */}
      <div className="pt-4 border-t border-slate-800">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-sm font-semibold transition-all duration-200 group-hover:border-emerald-500/30"
          aria-label={`Ver projeto real ${project.name} (abre em nova aba)`}
        >
          <span>Acessar sistema real</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </article>
  );
};
