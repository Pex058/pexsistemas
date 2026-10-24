export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  url: string;
  problem: string;
  solution: string;
  features: string[];
  tag: string;
  status: "No ar" | "Produção ativa";
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "campomaq",
    name: "Campomaq",
    category: "Presença Digital / Analytics",
    url: "https://campomaq.web.app/?src=sistemaspex",
    tag: "Central Digital",
    status: "No ar",
    problem: "Centralizar todos os canais digitais da empresa, catálogo e contatos em um só ponto, além de acompanhar com precisão a origem das visitas e interações comerciais.",
    solution: "Página corporativa moderna com links personalizados, painel administrativo independente, estatísticas em tempo real, links rastreáveis de campanhas e gerador de QR Codes.",
    features: [
      "Painel administrativo em tempo real",
      "Métricas de visitantes e cliques",
      "Leads iniciados no WhatsApp",
      "Links rastreáveis e QR Code"
    ]
  },
  {
    id: "sistema-bgs",
    name: "Sistema BGS",
    category: "Sistema Personalizado / Estoque",
    url: "https://sistema-bgs.web.app",
    tag: "Gestão Operacional",
    status: "No ar",
    problem: "Dificuldade em catalogar e organizar um acervo de peças importadas cujas referências e valores flutuavam em fornecedores estrangeiros.",
    solution: "Sistema web sob medida para busca rápida de produtos, visualização de especificações técnicas, organização de estoque e cálculo de precificação com conversão cambial.",
    features: [
      "Consulta ágil de códigos e peças",
      "Apoio direto à precificação",
      "Controle de itens e categorias",
      "Interface simplificada e veloz"
    ]
  },
  {
    id: "meexplica",
    name: "MeExplica",
    category: "Projeto Web / Captação de Leads",
    url: "https://meexplica.web.app/?utm_source=sistemaspex&src=sistemaspex&utm_medium=lp-sistemaspex",
    tag: "Plataforma Digital",
    status: "No ar",
    problem: "Necessidade de canal estruturado para captar, qualificar e organizar solicitações de empresas com demandas específicas de digitalização.",
    solution: "Landing page de captação aliada a formulários inteligentes e painel administrativo para triagem de demandas e acompanhamento de campanhas de divulgação.",
    features: [
      "Formulário dinâmico de triagem",
      "Painel administrativo de mensagens",
      "Rastreamento de origem de tráfego",
      "Fluxo de comunicação direto"
    ]
  }
];
