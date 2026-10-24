import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppFloating } from '../components/WhatsAppFloating';
import { PricingStructure } from '../components/PricingStructure';

import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { FeaturedProduct } from '../sections/FeaturedProduct';
import { Portfolio } from '../sections/Portfolio';
import { HowItWorks } from '../sections/HowItWorks';
import { CustomSolutions } from '../sections/CustomSolutions';
import { FAQ } from '../sections/FAQ';
import { ContactCTA } from '../sections/ContactCTA';

import { trackVisit, trackClick, initPixel } from '../services/tracking';
import { getSettings } from '../services/settingsService';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    // 1. Inicializa rastreamento com gatilho de engajamento humano
    trackVisit();

    // 2. Carrega configurações do Meta Pixel se cadastrado no painel
    async function loadPixel() {
      const settings = await getSettings();
      if (settings?.pixelId) {
        initPixel(settings.pixelId);
      }
    }
    loadPixel();

    // 3. Rastreamento inteligente automático de cliques em botões e WhatsApp
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = target.textContent?.trim() || '';

      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        trackClick('whatsapp', text || 'Botão WhatsApp', href);
      } else if (href.startsWith('#')) {
        trackClick('cta_nav', text || href, href);
      } else if (href.startsWith('http')) {
        trackClick('link_externo', text || href, href);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1220] text-[#F8FAFC]">
      {/* Header Sticky com Blur */}
      <Header />

      {/* Conteúdo Principal */}
      <main className="flex-grow">
        <Hero />
        <Services />
        <FeaturedProduct />
        <Portfolio />
        <HowItWorks />
        <CustomSolutions />
        <PricingStructure />
        <FAQ />
        <ContactCTA />
      </main>

      {/* Rodapé Comercial */}
      <Footer />

      {/* Botão Flutuante WhatsApp */}
      <WhatsAppFloating />
    </div>
  );
};

export default LandingPage;
