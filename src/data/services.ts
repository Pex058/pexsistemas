export interface ServiceItem {
  id: string;
  title: string;
  badge?: string;
  description: string;
  features: string[];
  buttonText: string;
  whatsappMessage: string;
  highlight?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "presenca-digital",
    title: "Presença Digital Inteligente",
    badge: "Mais Procurado",
    highlight: true,
    description: "Reúna WhatsApp, redes sociais, localização e informações da sua empresa em uma página profissional, com QR Code e acompanhamento de acessos.",
    features: [
      "Página moderna e personalizada para sua marca",
      "Botões otimizados para conversão no WhatsApp",
      "Links organizados para todas as redes sociais",
      "QR Code exclusivo para cartões e balcão",
      "Painel administrativo simples e intuitivo",
      "Estatísticas de visitas e cliques em tempo real",
      "Rastreamento de campanhas e anúncios"
    ],
    buttonText: "Conhecer solução",
    whatsappMessage: "Olá! Tenho interesse na Presença Digital Inteligente da Sistemas Pex e gostaria de solicitar um orçamento."
  },
  {
    id: "sites-landing-pages",
    title: "Sites e Landing Pages",
    description: "Apresente sua empresa, seus produtos e serviços com uma página profissional, responsiva e preparada para receber novos clientes.",
    features: [
      "Design moderno e personalizado",
      "100% otimizado para celulares (Mobile First)",
      "Botões de contato direto via WhatsApp",
      "Configuração de SEO básico para mecanismos de busca",
      "Hospedagem segura e de alta velocidade",
      "Estrutura sob medida para seu nicho de atuação"
    ],
    buttonText: "Solicitar proposta",
    whatsappMessage: "Olá! Gostaria de uma proposta para criação de um Site / Landing Page para o meu negócio."
  },
  {
    id: "presenca-google",
    title: "Presença no Google",
    badge: "Essencial",
    description: "Ajude seus clientes a encontrar sua empresa no Google e no Google Maps quando procurarem pelos seus serviços.",
    features: [
      "Configuração do Perfil da Empresa no Google",
      "Auxílio no processo de verificação",
      "Organização e padronização dos dados comerciais",
      "Configuração dos links corretos de atendimento",
      "Orientação técnica sobre fotos, categorias e catálogo",
      "Boas práticas para avaliações de clientes"
    ],
    buttonText: "Falar com especialista",
    whatsappMessage: "Olá! Gostaria de ajuda para organizar e otimizar a Presença da minha empresa no Google."
  },
  {
    id: "sistemas-personalizados",
    title: "Sistemas Personalizados",
    description: "Transformamos planilhas, controles manuais e processos repetitivos em ferramentas digitais desenvolvidas para a realidade do seu negócio.",
    features: [
      "Controle de estoque e catálogo de itens",
      "Gestão de ordens de serviço e atendimentos",
      "Organização financeira e fluxo de caixa simplificado",
      "Cadastros personalizados de clientes e produtos",
      "Relatórios visuais para tomada de decisão rápida",
      "Automação de rotinas repetitivas"
    ],
    buttonText: "Conte seu problema",
    whatsappMessage: "Olá! Gostaria de conversar sobre o desenvolvimento de um Sistema Personalizado para o meu negócio."
  }
];
