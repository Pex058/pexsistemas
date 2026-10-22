# Sistemas Pex — Site Institucional e Comercial (V1.0.1)

> "Soluções digitais para problemas reais."

Site oficial da **Sistemas Pex**, empresa brasileira especializada em soluções digitais acessíveis, práticas e personalizadas para comerciantes, prestadores de serviços, autônomos e pequenas empresas.

---

## 🎯 Objetivo do Projeto

Transformar visitantes em potenciais clientes através de uma landing page moderna, rápida e responsiva. O site apresenta os serviços ofertados, demonstra cases reais em funcionamento e facilita o contato comercial imediato via WhatsApp.

---

## 🛠️ Tecnologias Utilizadas

- **React 19**
- **Vite** (Build tool ultrarrápida)
- **TypeScript** (Tipagem estrita e manutenibilidade)
- **Tailwind CSS** (Estilização utilitária e design system próprio)
- **Lucide React** (Ícones semânticos)
- **Firebase Hosting** (Hospedagem estática de alta performance)

---

## 📁 Estrutura de Pastas

```text
SistemasPex/
├── public/                 # Arquivos públicos e SEO (favicon, robots.txt, sitemap.xml)
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header.tsx      # Navegação com logo e menu mobile
│   │   ├── Footer.tsx      # Rodapé institucional e links
│   │   ├── ServiceCard.tsx # Card de serviços com gatilho WhatsApp
│   │   ├── PortfolioCard.tsx # Apresentação de cases reais
│   │   ├── FAQAccordion.tsx # Sanfona de dúvidas acessível
│   │   ├── PricingStructure.tsx # Modelos de pacotes configuráveis
│   │   └── WhatsAppFloating.tsx # Botão flutuante de atendimento
│   ├── sections/           # Seções da landing page
│   │   ├── Hero.tsx        # Primeira dobra com proposta de valor
│   │   ├── Services.tsx    # Seção de 4 serviços principais
│   │   ├── FeaturedProduct.tsx # Destaque da Central Digital Inteligente
│   │   ├── Portfolio.tsx   # Cases reais (Campomaq, BGS, MeExplica)
│   │   ├── HowItWorks.tsx  # As 4 etapas do processo transparente
│   │   ├── CustomSolutions.tsx # Encaminhamento para o MeExplica
│   │   ├── FAQ.tsx         # Perguntas frequentes
│   │   └── ContactCTA.tsx  # Chamada final para WhatsApp
│   ├── data/               # Dados desacoplados da interface
│   │   ├── services.ts     # Catálogo de serviços
│   │   ├── projects.ts     # Cases de portfólio
│   │   ├── faq.ts          # Perguntas e respostas
│   │   └── pricing.ts      # Pacotes comerciais
│   ├── config/             # Configurações globais (empresa, telefones, URLs)
│   │   └── site.ts
│   ├── utils/              # Funções utilitárias
│   │   └── whatsapp.ts     # Gerador de links seguros para WhatsApp
│   ├── App.tsx             # Composição da aplicação
│   ├── main.tsx            # Ponto de entrada React
│   └── index.css           # Estilos globais e Tailwind
├── firebase.json           # Configuração de SPA para Firebase Hosting
├── .firebaserc             # Associação com o projeto Firebase
└── package.json
```

---

## 🚀 Como Executar Localmente

1. **Instalar as dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a URL exibida no terminal (normalmente `http://localhost:5173`).

---

## 🏗️ Como Gerar o Build de Produção

Execute o comando:
```bash
npm run build
```
Os arquivos otimizados para produção serão compilados na pasta `dist/`.

Para testar o build localmente antes de publicar:
```bash
npm run preview
```

---

## ☁️ Como Configurar e Publicar no Firebase Hosting

> [!NOTE]
> Para esta versão (V1.0), **NÃO é necessário criar banco de dados (Firestore) e nem Authentication** no Firebase. Apenas o recurso gratuito de **Hosting** é utilizado.

### 1. Fazer login no Firebase CLI (caso ainda não esteja logado):
```bash
firebase login
```

### 2. O projeto já está configurado no arquivo `.firebaserc`:
```json
{
  "projects": {
    "default": "sistemaspex-ae1b9"
  }
}
```

### 3. Publicar o site:
Você pode rodar o comando direto:
```bash
npm run deploy
```
Ou manualmente:
```bash
npm run build
firebase deploy --only hosting
```

Seu site estará disponível no endereço:
👉 **https://sistemaspex.web.app**

---

## ✏️ Como Editar e Personalizar o Conteúdo

### Editar Informações da Empresa e WhatsApp
Abra o arquivo `src/config/site.ts` e ajuste:
- Nome da empresa e slogan
- Número de telefone do WhatsApp
- Mensagem padrão de abertura

### Adicionar ou Alterar Serviços
Abra `src/data/services.ts`. Basta incluir ou modificar objetos na lista `SERVICES_DATA`. Cada serviço pode ter seu título, badge, descrição, lista de benefícios e mensagem individualizada de WhatsApp.

### Adicionar Novos Projetos ao Portfólio
Abra `src/data/projects.ts` e adicione um novo objeto na lista `PROJECTS_DATA` com:
- Nome, categoria e URL real
- Problema enfrentado pelo cliente
- Solução entregue pela Sistemas Pex

---

## 🗺️ Roadmap de Evolução

- **V1.0 (Atual):** Landing page institucional e comercial, apresentação de serviços, cases reais e conversão direta via WhatsApp.
- **V1.1:** Refinamentos visuais, capturas de tela e vídeos dos projetos em alta resolução.
- **V1.2:** Rastreamento avançado de campanhas com UTMs e eventos de conversão.
- **V1.3:** Formulário integrado de orçamento com triagem de leads.
- **V2.0:** Painel administrativo comercial e gestão de propostas.
