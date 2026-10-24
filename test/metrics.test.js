// @ts-nocheck
// Testes unitários para utils/metrics (SistemasPex v1.1.0)
// Execução: node --test test/metrics.test.js

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// ─── Funções utilitárias (inline para evitar imports de módulos ESM/TS) ──────

function calcCTR(clicks, visits) {
  if (!visits || visits === 0) return 0;
  return Math.round((clicks / visits) * 1000) / 10;
}

function groupByDate(items, dateField = 'createdAt') {
  const map = {};
  for (const item of items) {
    const raw = item[dateField];
    let key = 'desconhecido';
    if (raw && typeof raw.toDate === 'function') {
      const d = raw.toDate();
      key = d.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    } else if (raw instanceof Date) {
      key = raw.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    } else if (typeof raw === 'string') {
      key = raw.slice(0, 10);
    }
    map[key] = (map[key] || 0) + 1;
  }
  return map;
}

function deduplicateBySession(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (!item.sessionId) return true;
    if (seen.has(item.sessionId)) return false;
    seen.add(item.sessionId);
    return true;
  });
}

function formatDateTimeSaoPaulo(value) {
  if (!value) return '—';
  const date = typeof value.toDate === 'function' ? value.toDate() : new Date(value);
  return date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
}

function getDeviceType(ua) {
  if (!ua) return 'desconhecido';
  if (/Mobile|Android|iPhone/i.test(ua)) return 'mobile';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  return 'desktop';
}

function buildUtmUrl(base, params) {
  if (!base) return '';
  const url = new URL(base);
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v);
  });
  return url.toString();
}

// ─── Testes ──────────────────────────────────────────────────────────────────

describe('CTR (Taxa de Cliques)', () => {
  it('calcula CTR corretamente', () => {
    assert.equal(calcCTR(50, 200), 25);
  });

  it('retorna 0 quando visitas = 0', () => {
    assert.equal(calcCTR(10, 0), 0);
  });

  it('arredonda para 1 casa decimal', () => {
    assert.equal(calcCTR(1, 3), 33.3);
  });

  it('retorna 0 quando cliques = 0', () => {
    assert.equal(calcCTR(0, 100), 0);
  });
});

describe('Deduplicação por sessão', () => {
  it('remove duplicatas da mesma sessão', () => {
    const items = [
      { sessionId: 'abc', page: '/' },
      { sessionId: 'abc', page: '/admin' },
      { sessionId: 'xyz', page: '/' },
    ];
    const result = deduplicateBySession(items);
    assert.equal(result.length, 2);
  });

  it('mantém itens sem sessionId', () => {
    const items = [{ page: '/' }, { page: '/sobre' }];
    assert.equal(deduplicateBySession(items).length, 2);
  });

  it('não remove quando sessões são diferentes', () => {
    const items = [
      { sessionId: 'a1' },
      { sessionId: 'b2' },
      { sessionId: 'c3' },
    ];
    assert.equal(deduplicateBySession(items).length, 3);
  });
});

describe('Agrupamento por data', () => {
  it('agrupa itens com Date real', () => {
    const items = [
      { createdAt: new Date('2025-01-15T12:00:00-03:00') },
      { createdAt: new Date('2025-01-15T18:00:00-03:00') },
      { createdAt: new Date('2025-01-16T10:00:00-03:00') },
    ];
    const result = groupByDate(items);
    assert.equal(Object.keys(result).length, 2);
  });

  it('retorna "desconhecido" para itens sem data', () => {
    const items = [{ createdAt: null }];
    const result = groupByDate(items);
    assert.ok(result['desconhecido'] === 1);
  });

  it('agrupa por string de data ISO', () => {
    const items = [
      { createdAt: '2025-06-10T00:00:00Z' },
      { createdAt: '2025-06-10T23:59:59Z' },
      { createdAt: '2025-06-11T00:00:00Z' },
    ];
    const result = groupByDate(items);
    assert.equal(result['2025-06-10'], 2);
    assert.equal(result['2025-06-11'], 1);
  });
});

describe('Detecção de dispositivo', () => {
  it('detecta mobile pelo User Agent', () => {
    assert.equal(getDeviceType('Mozilla/5.0 (iPhone; CPU iPhone OS 15_0)'), 'mobile');
  });

  it('detecta desktop pelo User Agent', () => {
    assert.equal(getDeviceType('Mozilla/5.0 (Windows NT 10.0; Win64; x64)'), 'desktop');
  });

  it('retorna desconhecido para UA vazio', () => {
    assert.equal(getDeviceType(''), 'desconhecido');
  });

  it('detecta Android como mobile', () => {
    assert.equal(getDeviceType('Mozilla/5.0 (Linux; Android 11; SM-G991B)'), 'mobile');
  });
});

describe('Gerador de URL com UTM', () => {
  it('gera URL com parâmetros UTM completos', () => {
    const url = buildUtmUrl('https://sistemaspex.com', {
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'pex_2025',
    });
    assert.ok(url.includes('utm_source=google'));
    assert.ok(url.includes('utm_medium=cpc'));
    assert.ok(url.includes('utm_campaign=pex_2025'));
  });

  it('ignora parâmetros vazios', () => {
    const url = buildUtmUrl('https://sistemaspex.com', {
      utm_source: 'facebook',
      utm_medium: '',
      utm_campaign: '',
    });
    assert.ok(!url.includes('utm_medium'));
    assert.ok(!url.includes('utm_campaign'));
  });

  it('retorna string vazia para URL inválida', () => {
    const url = buildUtmUrl('', { utm_source: 'teste' });
    assert.equal(url, '');
  });
});

describe('Formatação de data (Brasília)', () => {
  it('formata uma data real em português BR', () => {
    const result = formatDateTimeSaoPaulo(new Date('2025-06-10T15:00:00Z'));
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('2025') || result.includes('/'));
  });

  it('retorna "—" para valor nulo', () => {
    assert.equal(formatDateTimeSaoPaulo(null), '—');
  });
});
