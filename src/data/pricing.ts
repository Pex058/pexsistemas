export interface PricingPackage {
  id: string;
  name: string;
  subtitle: string;
  priceDisplay: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  whatsappMessage: string;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: "cartao-digital",
    name: "Cartão & Presença Rápida",
    subtitle: "Para quem quer organizar seus links essenciais",
    priceDisplay: "Sob consulta personalizada",
    features: [
      "Página otimizada com links e WhatsApp",
      "QR Code para balcão ou cartões",
      "Hospedagem inclusa",
      "Suporte na implantação"
    ],
    ctaText: "Solicitar proposta",
    whatsappMessage: "Olá! Gostaria de uma proposta para o pacote Cartão & Presença Rápida."
  },
  {
    id: "central-digital",
    name: "Central Digital Inteligente",
    subtitle: "A melhor solução para negócios locais e comércio",
    priceDisplay: "Orçamento sob medida",
    isPopular: true,
    features: [
      "Painel administrativo independente",
      "Métricas de cliques e conversões WhatsApp",
      "Rastreamento de campanhas e QR Code dinâmico",
      "Gestão de botões e links em tempo real",
      "Exportação de dados e relatórios"
    ],
    ctaText: "Solicitar proposta",
    whatsappMessage: "Olá! Gostaria de um orçamento para a Central Digital Inteligente."
  },
  {
    id: "site-profissional",
    name: "Site ou Landing Page",
    subtitle: "Para empresas que querem máxima autoridade e conversão",
    priceDisplay: "A partir de orçamento personalizado",
    features: [
      "Design moderno e exclusivo para sua marca",
      "Estrutura focada em conversão e captação",
      "Otimização de SEO para o Google",
      "Integração com WhatsApp e canais de contato",
      "Carregamento ultra-rápido em celulares"
    ],
    ctaText: "Solicitar proposta",
    whatsappMessage: "Olá! Gostaria de receber uma proposta para Site ou Landing Page."
  },
  {
    id: "sistema-medida",
    name: "Sistema Sob Medida",
    subtitle: "Para resolver gargalos específicos e processos manuais",
    priceDisplay: "Avaliação técnica personalizada",
    features: [
      "Desenvolvimento focado na sua rotina real",
      "Substituição de planilhas complexas",
      "Controle de estoque, clientes ou serviços",
      "Acesso seguro e relatórios gerenciais",
      "Evolução contínua conforme sua empresa cresce"
    ],
    ctaText: "Explicar meu cenário",
    whatsappMessage: "Olá! Gostaria de agendar uma conversa sobre o desenvolvimento de um Sistema Sob Medida."
  }
];
