import React from 'react';
import { 
  Smartphone, 
  Globe, 
  MapPin, 
  Cpu, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { ServiceItem } from '../data/services';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Ícone contextual por ID do serviço
  const getIcon = (id: string) => {
    switch (id) {
      case 'presenca-digital':
        return <Smartphone className="w-6 h-6 text-emerald-400" />;
      case 'sites-landing-pages':
        return <Globe className="w-6 h-6 text-emerald-400" />;
      case 'presenca-google':
        return <MapPin className="w-6 h-6 text-emerald-400" />;
      case 'sistemas-personalizados':
        return <Cpu className="w-6 h-6 text-emerald-400" />;
      default:
        return <Globe className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div 
      className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 border ${
        service.highlight 
          ? 'bg-[#132238] border-emerald-500/40 shadow-xl shadow-emerald-950/20 ring-1 ring-emerald-500/30' 
          : 'bg-[#111C2E] border-slate-800 hover:border-slate-700 shadow-md hover:shadow-lg'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
            {getIcon(service.id)}
          </div>
          {service.badge && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-3">
          {service.title}
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {service.description}
        </p>

        <div className="pt-2 pb-6 border-t border-slate-800/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            O que está incluso:
          </p>
          <ul className="space-y-2.5">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-4 mt-auto">
        <a
          href={createWhatsAppUrl(service.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group ${
            service.highlight
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md hover:shadow-emerald-500/20'
              : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
          }`}
        >
          <span>{service.buttonText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};
