import test, { describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  isWhatsAppClick,
  calculateCtr,
  calculateWhatsAppConversion,
  formatPercentage,
  getItemTimestamp,
  getStartOfDaySaoPaulo,
  formatLocalDateSaoPaulo,
  formatDateTimeSaoPaulo,
  deduplicateVisits,
  deduplicateClicks,
  filterByPeriod,
  groupBySource,
  groupByDay,
  getLinkDistribution,
  processAnalytics,
} from '../src/utils/metrics.ts';

describe('SistemasPex - Validação das Métricas & Analytics', () => {
  describe('1. Cenário Base e Separação de Indicadores', () => {
    test('Calcula CTR e Conversão para WhatsApp corretamente', () => {
      const visits = 20;
      const clicks = 6;
      const waClicks = 2;

      const ctr = calculateCtr(clicks, visits);
      const waConv = calculateWhatsAppConversion(waClicks, visits);

      assert.equal(ctr, 30);
      assert.equal(waConv, 10);
      assert.equal(formatPercentage(ctr, 1), '30,0');
      assert.equal(formatPercentage(waConv, 1), '10,0');
    });

    test('ProcessAnalytics integra cenário com deduplicação e fuso oficial', () => {
      const now = new Date('2026-10-24T15:00:00-03:00').getTime();

      const visits = [
        { id: 'v1', sessionId: 's1', source: 'instagram', createdAt: new Date(now - 1000).toISOString() },
        { id: 'v2', sessionId: 's2', source: 'google', createdAt: new Date(now - 2000).toISOString() },
        { id: 'v3', sessionId: 's3', source: 'direto', createdAt: new Date(now - 3000).toISOString() },
      ];

      const clicks = [
        { id: 'c1', sessionId: 's1', linkId: 'whatsapp', linkTitle: 'Conversar no WhatsApp', source: 'instagram', createdAt: new Date(now - 500).toISOString() },
        { id: 'c2', sessionId: 's2', linkId: 'cta_header', linkTitle: 'Solicitar Orçamento', source: 'google', createdAt: new Date(now - 800).toISOString() },
      ];

      const result = processAnalytics({
        visits,
        clicks,
        period: 'today',
        referenceTime: now,
      });

      assert.equal(result.totalVisits, 3);
      assert.equal(result.totalClicks, 2);
      assert.equal(result.whatsappClicks, 1);
      assert.equal(result.ctrFormatted, '66,7');
      assert.equal(result.whatsappConversionFormatted, '33,3');
      assert.equal(result.sourcesList.length, 3);
    });
  });

  describe('2. Cenários de Borda e Denominador Zero', () => {
    test('Nenhum acesso: não gera NaN nem Infinity', () => {
      assert.equal(calculateCtr(0, 0), 0);
      assert.equal(calculateWhatsAppConversion(0, 0), 0);
      assert.equal(formatPercentage(calculateCtr(0, 0)), '0,0');
      assert.equal(formatPercentage(NaN), '0,0');
      assert.equal(formatPercentage(Infinity), '0,0');
    });

    test('Cliques com acessos zero (anomalia de rastreamento): protegido', () => {
      assert.equal(calculateCtr(5, 0), 0);
      assert.equal(calculateWhatsAppConversion(2, 0), 0);
    });
  });

  describe('3. Classificação de Cliques no WhatsApp', () => {
    test('Identifica cliques por linkId === "whatsapp"', () => {
      assert.equal(isWhatsAppClick({ linkId: 'whatsapp' }), true);
      assert.equal(isWhatsAppClick({ linkId: 'btn_whatsapp_flutuante' }), true);
    });

    test('Identifica cliques por título contendo whatsapp', () => {
      assert.equal(isWhatsAppClick({ linkTitle: 'Conversar pelo WhatsApp' }), true);
      assert.equal(isWhatsAppClick({ linkTitle: 'Chamar no Whats' }), true);
    });

    test('Identifica cliques por URL de destino (wa.me, api.whatsapp.com)', () => {
      assert.equal(isWhatsAppClick({ targetUrl: 'https://wa.me/5541999999999' }), true);
      assert.equal(isWhatsAppClick({ targetUrl: 'https://api.whatsapp.com/send?phone=5541999999999' }), true);
    });

    test('Não confunde botões de navegação interna com WhatsApp', () => {
      assert.equal(isWhatsAppClick({ linkId: 'cta_nav', linkTitle: 'Serviços' }), false);
    });
  });

  describe('4. Deduplicação de Eventos', () => {
    test('Deduplica visitas com mesmo doc.id e sessionId', () => {
      const visits = [
        { id: 'v1', sessionId: 's1' },
        { id: 'v1', sessionId: 's1' },
        { id: 'v2', sessionId: 's1' },
      ];
      const deduped = deduplicateVisits(visits);
      assert.equal(deduped.length, 1);
    });

    test('Debounce de cliques repetidos acidentais (< 1200ms na mesma sessão)', () => {
      const clicks = [
        { sessionId: 's1', linkId: 'whatsapp', createdAt: '2026-10-24T12:00:00.000Z' },
        { sessionId: 's1', linkId: 'whatsapp', createdAt: '2026-10-24T12:00:00.500Z' }, // 500ms depois
        { sessionId: 's1', linkId: 'whatsapp', createdAt: '2026-10-24T12:00:05.000Z' }, // 5000ms depois
      ];
      const deduped = deduplicateClicks(clicks);
      assert.equal(deduped.length, 2);
    });
  });

  describe('5. Fuso Horário America/Sao_Paulo e Filtros de Período', () => {
    test('Filtro "today" usa início do dia em America/Sao_Paulo (UTC-3)', () => {
      const refTime = new Date('2026-10-24T14:30:00-03:00').getTime();
      const startOfDay = getStartOfDaySaoPaulo(refTime);
      const expectedStart = new Date('2026-10-24T00:00:00-03:00').getTime();
      assert.equal(startOfDay, expectedStart);
    });

    test('formatLocalDateSaoPaulo formata data YYYY-MM-DD em America/Sao_Paulo', () => {
      const timeUtc = new Date('2026-10-25T01:30:00Z').getTime(); // 22:30 de 24/10 em SP
      assert.equal(formatLocalDateSaoPaulo(timeUtc), '2026-10-24');
    });

    test('formatDateTimeSaoPaulo formata DD/MM/AAAA HH:mm:ss', () => {
      const time = new Date('2026-10-24T15:30:45-03:00').getTime();
      const formatted = formatDateTimeSaoPaulo(time);
      assert.match(formatted, /24\/10\/2026/);
      assert.match(formatted, /15:30:45/);
    });
  });

  describe('6. Consistência entre Cards, Origens e Gráfico', () => {
    test('A soma das origens na tabela é exatamente igual aos totais gerais dos cards', () => {
      const visits = [
        { id: '1', source: 'Instagram' },
        { id: '2', source: 'instagram' },
        { id: '3', source: 'Google' },
        { id: '4', source: 'direto' },
      ];
      const clicks = [
        { id: 'c1', source: 'instagram', linkId: 'whatsapp' },
        { id: 'c2', source: 'google', linkId: 'cta' },
      ];

      const { sourcesList } = groupBySource({ visits, clicks });
      const sumVisits = sourcesList.reduce((acc, s) => acc + s.visits, 0);
      const sumClicks = sourcesList.reduce((acc, s) => acc + s.clicks, 0);

      assert.equal(sumVisits, 4);
      assert.equal(sumClicks, 2);
    });

    test('getLinkDistribution calcula contagens e porcentagens', () => {
      const clicks = [
        { linkTitle: 'WhatsApp' },
        { linkTitle: 'WhatsApp' },
        { linkTitle: 'Orçamento' },
      ];
      const dist = getLinkDistribution(clicks);
      assert.equal(dist.length, 2);
      assert.equal(dist[0].count, 2);
      assert.equal(dist[1].count, 1);
    });
  });

  describe('7. Agrupamento Diário e Resiliência', () => {
    test('groupByDay preenche dias vazios com zero e ordena cronologicamente', () => {
      const refTime = new Date('2026-10-24T12:00:00-03:00').getTime();
      const visits = [
        { createdAt: '2026-10-24T10:00:00-03:00' },
        { createdAt: '2026-10-22T10:00:00-03:00' },
      ];

      const days = groupByDay({ visits, clicks: [] }, { period: '7days', referenceTime: refTime });
      assert.equal(days.length, 7);
      assert.equal(days[6].date, '2026-10-24');
      assert.equal(days[6].visits, 1);
      assert.equal(days[5].date, '2026-10-23');
      assert.equal(days[5].visits, 0);
      assert.equal(days[4].date, '2026-10-22');
      assert.equal(days[4].visits, 1);
    });

    test('getItemTimestamp extrai de Firestore Timestamp e createdAt', () => {
      assert.equal(getItemTimestamp({ timestamp: { toMillis: () => 1700000000000 } }), 1700000000000);
      assert.equal(getItemTimestamp({ createdAt: '2026-10-24T12:00:00Z' }), new Date('2026-10-24T12:00:00Z').getTime());
      assert.equal(getItemTimestamp(null), 0);
    });
  });
});
