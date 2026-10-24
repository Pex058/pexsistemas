import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070D18] border-t border-[#1E293B] pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Coluna 1: Sobre */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-extrabold text-white text-lg shadow-md shadow-emerald-950">
                S
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                SISTEMAS <span className="text-emerald-400 font-semibold text-sm tracking-widest uppercase">PEX</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              "{SITE_CONFIG.slogan}"
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Desenvolvimento de sites, landing pages, centrais digitais e ferramentas sob medida para pequenos negócios, comércios e autônomos.
            </p>
          </div>

          {/* Coluna 2: Navegação rápida */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navegação
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SITE_CONFIG.nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-emerald-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Projetos Reais */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Projetos no Ar
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.links.campomaq}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <span>Campomaq</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.links.sistemaBgs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <span>Sistema BGS</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.links.meexplica}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                >
                  <span>MeExplica</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato Direto */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Atendimento Comercial
            </h3>
            <p className="text-sm text-slate-400">
              Pronto para conversar sobre o que sua empresa precisa?
            </p>
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 hover:border-emerald-500/50 text-sm font-medium transition-all group"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>{SITE_CONFIG.whatsapp.display}</span>
            </a>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Atendimento direto e sem burocracia</span>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1 flex-wrap justify-center">
            <span>Feito com foco em soluções práticas</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 mx-1 inline" />
            <span>para empresas reais.</span>
            <span className="mx-2 text-slate-700">·</span>
            <Link to="/admin" className="text-slate-600 hover:text-slate-400 transition-colors">
              Painel Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
