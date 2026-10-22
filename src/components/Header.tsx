import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B1220]/90 backdrop-blur-md border-b border-[#1E293B] py-3.5 shadow-lg shadow-black/30' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Tipográfica & Símbolo */}
          <a 
            href="#hero" 
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Sistemas Pex - Início"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-md shadow-emerald-900/30 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-extrabold text-xl tracking-tight">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                SISTEMAS <span className="text-emerald-400 font-semibold ml-1.5 text-base tracking-widest uppercase">PEX</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium -mt-1 hidden sm:block">
                Soluções Digitais
              </span>
            </div>
          </a>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Menu principal">
            {SITE_CONFIG.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors duration-200 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Header Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-emerald-500/25 hover:shadow-lg active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Solicitar orçamento</span>
            </a>
          </div>

          {/* Botão Menu Mobile */}
          <div className="flex items-center lg:hidden gap-3">
            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-xs"
              aria-label="Orçamento via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Contato</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A]/98 border-b border-slate-800 px-5 pt-3 pb-6 animate-fadeIn shadow-2xl">
          <nav className="flex flex-col gap-2 pt-2" aria-label="Menu mobile">
            {SITE_CONFIG.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-300 hover:text-emerald-400 py-2.5 border-b border-slate-800/50"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-base shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Solicitar orçamento no WhatsApp</span>
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
