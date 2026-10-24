# Changelog

Todas as alterações notáveis deste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.1.1] - 2026-10-24

### Alterado
- Links do portfólio atualizados com parâmetros de rastreamento UTM:
  - **MeExplica**: `https://meexplica.web.app/?utm_source=sistemaspex&src=sistemaspex&utm_medium=lp-sistemaspex`
  - **Campomaq**: `https://campomaq.web.app/?src=sistemaspex`

## [1.1.0] - 2026-10-24

### Adicionado
- **Painel Admin completo** (`/admin`) com autenticação Firebase Auth e rota protegida.
- **Página de Login** (`/admin/login`) com design dark theme (emerald).
- **Aba Métricas & Acessos**: exibe visitas únicas, cliques, CTR, gráfico diário e tabela de leads com busca e download CSV.
- **Aba Gerador de Links & Campanhas**: UTM Builder com presets de canais, QR Code, cópia rápida e persistência local de campanhas salvas.
- **Aba Pixel & Rastreamento**: configuração de Facebook Pixel ID e ativação/desativação via Firestore.
- **Anti-bot tracking**: rastreamento ativado após 1,8 s de engajamento humano real; ignora bots, crawlers e IPs de admin.
- **Motor de métricas centralizado** (`utils/metrics.ts`) com deduplicação por sessão e timezone `America/Sao_Paulo`.
- **React Router DOM** substituindo o layout de página única (`App.tsx` → `AppRoutes.tsx`).
- **Link discreto "Painel Admin"** no Footer para acesso ao login.
- **19 testes unitários** (`test/metrics.test.js`) cobrindo CTR, deduplicação, agrupamento por data, detecção de dispositivo, UTM e formatação de datas.
- Chaves de sessão com prefixo `pex_` (`pex_is_admin`, `pex_visit_logged`, `pex_sid`, `pex_saved_campaigns`).

### Dependências adicionadas
- `firebase ^13.1.0`
- `react-router-dom ^7.18.4`
- `qrcode ^1.5.4` + `@types/qrcode ^1.5.6`

## [1.0.1] - 2026-10-22

### Alterado
- Atualização da nomenclatura oficial da marca para **Sistemas Pex** em toda a aplicação (Header, Footer, Hero, Portfólio, Metatags SEO e mensagens de WhatsApp).
- Atualização do monograma do favicon para a letra "S".

## [1.0.0] - 2026-10-22

### Adicionado
- Criação inicial do projeto com React, Vite, TypeScript e Tailwind CSS.
- Identidade visual própria da Pex Sistemas com tons escuros (#0B1220), superfícies (#111C2E) e verde tecnológico (#10B981).
- Header fixo com efeito blur, logo tipográfica, navegação por âncoras e menu mobile responsivo.
- Hero de alto impacto com proposta de valor, botões de ação e elemento visual interativo.
- Seção de Serviços apresentando os 4 modelos principais:
  - Presença Digital Inteligente
  - Sites e Landing Pages
  - Presença no Google
  - Sistemas Personalizados
- Seção de Produto em Destaque: "Central Digital Inteligente" com comparativo entre página pública e painel administrativo.
- Seção de Portfólio Real apresentando os cases:
  - Campomaq (https://campomaq.web.app)
  - Sistema BGS (https://sistema-bgs.web.app)
  - MeExplica (https://meexplica.web.app)
- Seção "Como Trabalhamos" em 4 etapas transparentes.
- Seção de Soluções Personalizadas com direcionamento para a plataforma MeExplica.
- Estrutura configurável de pacotes comerciais para expansão futura sem refatoração de código.
- FAQ completo em formato accordion acessível.
- Seção final de contato com CTA forte para WhatsApp.
- Botão flutuante acessível do WhatsApp.
- Configuração de SEO básico (Title, Description, Open Graph, Favicon SVG, Sitemap XML e Robots.txt).
- Configuração para publicação no Firebase Hosting via `firebase.json` e `.firebaserc`.
- Scripts npm para build (`npm run build`), preview (`npm run preview`) e deploy (`npm run deploy`).
