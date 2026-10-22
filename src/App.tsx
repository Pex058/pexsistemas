import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { PricingStructure } from './components/PricingStructure';

import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { FeaturedProduct } from './sections/FeaturedProduct';
import { Portfolio } from './sections/Portfolio';
import { HowItWorks } from './sections/HowItWorks';
import { CustomSolutions } from './sections/CustomSolutions';
import { FAQ } from './sections/FAQ';
import { ContactCTA } from './sections/ContactCTA';

export const App: React.FC = () => {
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

export default App;
