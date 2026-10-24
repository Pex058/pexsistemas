/**
 * Engine de Métricas e Análise de Conversão para SistemasPex
 * Baseado no motor de métricas e deduplicação centralizado.
 * Fuso horário de referência: America/Sao_Paulo (UTC-3).
 */

export interface ClickRecord {
  id?: string;
  sessionId?: string;
  linkId?: string;
  linkTitle?: string;
  targetUrl?: string;
  url?: string;
  source?: string;
  campaign?: string;
  device?: string;
  timestamp?: any;
  createdAt?: string | any;
}

export interface VisitRecord {
  id?: string;
  sessionId?: string;
  source?: string;
  campaign?: string;
  device?: string;
  isBot?: boolean;
  timestamp?: any;
  createdAt?: string | any;
  fullUrl?: string;
}

export interface SourceMetricItem {
  name: string;
  visits: number;
  clicks: number;
  whatsapp: number;
  ctr: number;
  ctrFormatted: string;
  whatsappConversion: number;
  whatsappConversionFormatted: string;
}

export interface LinkDistributionItem {
  title: string;
  count: number;
  percentage: number;
  percentageFormatted: string;
}

export interface DailyMetricItem {
  date: string;
  dateFormatted: string;
  visits: number;
  clicks: number;
  whatsappClicks: number;
  ctr: number;
  ctrFormatted: string;
  whatsappConversion: number;
  whatsappConversionFormatted: string;
}

export interface ProcessedAnalyticsResult {
  totalVisits: number;
  totalClicks: number;
  whatsappClicks: number;
  ctr: number;
  ctrFormatted: string;
  whatsappConversion: number;
  whatsappConversionFormatted: string;
  sourcesMap: Record<string, { visits: number; clicks: number; whatsapp: number }>;
  sourcesList: SourceMetricItem[];
  linksDistribution: LinkDistributionItem[];
  dailyGrouped: DailyMetricItem[];
  filteredVisits: VisitRecord[];
  filteredClicks: ClickRecord[];
  period: string;
  referenceTime: number;
}

export function isWhatsAppClick(click: any): boolean {
  if (!click || typeof click !== 'object') return false;

  const linkId = String(click.linkId || '').toLowerCase();
  if (linkId === 'whatsapp' || linkId.includes('whatsapp') || linkId.includes('whats')) {
    return true;
  }

  const title = String(click.linkTitle || '').toLowerCase();
  if (title.includes('whatsapp') || title.includes('whats app') || title.includes('whats')) {
    return true;
  }

  const url = String(click.targetUrl || click.url || '').toLowerCase();
  if (
    url.includes('wa.me') ||
    url.includes('whatsapp.com') ||
    url.includes('api.whatsapp.com')
  ) {
    return true;
  }

  return false;
}

export function calculateCtr(totalClicks: number, totalVisits: number): number {
  const visits = Number(totalVisits);
  const clicks = Number(totalClicks);

  if (!isFinite(visits) || visits <= 0) return 0;
  if (!isFinite(clicks) || clicks <= 0) return 0;

  return (clicks / visits) * 100;
}

export function calculateWhatsAppConversion(whatsappClicks: number, totalVisits: number): number {
  const visits = Number(totalVisits);
  const waClicks = Number(whatsappClicks);

  if (!isFinite(visits) || visits <= 0) return 0;
  if (!isFinite(waClicks) || waClicks <= 0) return 0;

  return (waClicks / visits) * 100;
}

export function formatPercentage(
  value: number,
  decimals: number = 1,
  includeSymbol: boolean = false,
  useComma: boolean = true
): string {
  const num = Number(value);

  if (!isFinite(num) || isNaN(num) || num <= 0) {
    const zeroBase = (0).toFixed(decimals);
    const zeroStr = useComma ? zeroBase.replace('.', ',') : zeroBase;
    return includeSymbol ? `${zeroStr}%` : zeroStr;
  }

  const factor = Math.pow(10, decimals);
  const rounded = Math.round(num * factor) / factor;
  const fixed = rounded.toFixed(decimals);
  const formatted = useComma ? fixed.replace('.', ',') : fixed;

  return includeSymbol ? `${formatted}%` : formatted;
}

export function getItemTimestamp(item: any): number {
  if (!item || typeof item !== 'object') return 0;

  if (item.timestamp) {
    if (typeof item.timestamp.toMillis === 'function') {
      const ms = item.timestamp.toMillis();
      if (isFinite(ms) && ms > 0) return ms;
    }
    if (typeof item.timestamp.toDate === 'function') {
      const ms = item.timestamp.toDate().getTime();
      if (isFinite(ms) && ms > 0) return ms;
    }
    if (typeof item.timestamp.seconds === 'number') {
      const ms = item.timestamp.seconds * 1000;
      if (isFinite(ms) && ms > 0) return ms;
    }
    if (typeof item.timestamp === 'number' && isFinite(item.timestamp) && item.timestamp > 0) {
      return item.timestamp;
    }
  }

  if (item.createdAt) {
    if (typeof item.createdAt.toDate === 'function') {
      const ms = item.createdAt.toDate().getTime();
      if (isFinite(ms) && ms > 0) return ms;
    }
    if (typeof item.createdAt.toMillis === 'function') {
      const ms = item.createdAt.toMillis();
      if (isFinite(ms) && ms > 0) return ms;
    }
    const ms = new Date(item.createdAt).getTime();
    if (isFinite(ms) && ms > 0) return ms;
  }

  return 0;
}

export function getStartOfDaySaoPaulo(refDate?: Date | number): number {
  const dateObj = refDate ? new Date(refDate) : new Date();

  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const parts = formatter.formatToParts(dateObj);
  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;

  const midnightIso = `${year}-${month}-${day}T00:00:00.000-03:00`;
  return new Date(midnightIso).getTime();
}

export function formatLocalDateSaoPaulo(timestamp: number | Date): string {
  const d = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(d);
}

export function formatDateTimeSaoPaulo(timestamp: any): string {
  const ms =
    typeof timestamp === 'object' && timestamp !== null
      ? getItemTimestamp(timestamp) ||
        (timestamp.toDate ? timestamp.toDate().getTime() : new Date(timestamp).getTime())
      : Number(timestamp);

  if (!ms || !isFinite(ms)) return '';

  const d = new Date(ms);
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(d);
}

export function deduplicateVisits(visits: VisitRecord[]): VisitRecord[] {
  if (!Array.isArray(visits)) return [];

  const seenIds = new Set<string>();
  const seenSessions = new Set<string>();
  const deduplicated: VisitRecord[] = [];

  for (const v of visits) {
    if (!v || typeof v !== 'object') continue;

    if (v.id) {
      if (seenIds.has(v.id)) continue;
      seenIds.add(v.id);
    }

    if (v.sessionId) {
      if (seenSessions.has(v.sessionId)) continue;
      seenSessions.add(v.sessionId);
    }

    deduplicated.push(v);
  }

  return deduplicated;
}

export function deduplicateClicks(clicks: ClickRecord[], burstThresholdMs: number = 1200): ClickRecord[] {
  if (!Array.isArray(clicks)) return [];

  const seenIds = new Set<string>();
  const lastClickBySessionAndTarget = new Map<string, number>();
  const deduplicated: ClickRecord[] = [];

  for (const c of clicks) {
    if (!c || typeof c !== 'object') continue;

    if (c.id) {
      if (seenIds.has(c.id)) continue;
      seenIds.add(c.id);
    }

    const sessionId = c.sessionId;
    const target = c.linkId || c.linkTitle || c.targetUrl || 'default';
    const timeMs = getItemTimestamp(c);

    if (sessionId && target && timeMs > 0) {
      const key = `${sessionId}_${target}`;
      const lastTime = lastClickBySessionAndTarget.get(key);

      if (lastTime !== undefined && Math.abs(timeMs - lastTime) < burstThresholdMs) {
        continue;
      }

      lastClickBySessionAndTarget.set(key, timeMs);
    }

    deduplicated.push(c);
  }

  return deduplicated;
}

export function filterByPeriod<T>(
  items: T[],
  period: string = 'all',
  options: { referenceTime?: number } = {}
): T[] {
  if (!Array.isArray(items)) return [];
  if (period === 'all') return items;

  const refTime = options.referenceTime || Date.now();
  let timeLimit = 0;

  if (period === 'today') {
    timeLimit = getStartOfDaySaoPaulo(refTime);
  } else if (period === '7days') {
    timeLimit = refTime - 7 * 24 * 60 * 60 * 1000;
  } else if (period === '30days') {
    timeLimit = refTime - 30 * 24 * 60 * 60 * 1000;
  } else {
    return items;
  }

  return items.filter((item) => {
    const t = getItemTimestamp(item);
    return t >= timeLimit && t <= refTime + 60000;
  });
}

export function normalizeSource(src?: string): string {
  if (!src || typeof src !== 'string') return 'direto';
  const clean = src.trim().toLowerCase();
  return clean || 'direto';
}

export function groupBySource({
  visits = [],
  clicks = [],
}: {
  visits?: VisitRecord[];
  clicks?: ClickRecord[];
}) {
  const sourcesMap: Record<string, { visits: number; clicks: number; whatsapp: number }> = {};

  function ensureSource(s: string) {
    if (!sourcesMap[s]) {
      sourcesMap[s] = { visits: 0, clicks: 0, whatsapp: 0 };
    }
    return sourcesMap[s];
  }

  (visits || []).forEach((v) => {
    const s = normalizeSource(v.source);
    ensureSource(s).visits++;
  });

  (clicks || []).forEach((c) => {
    const s = normalizeSource(c.source);
    const item = ensureSource(s);
    item.clicks++;
    if (isWhatsAppClick(c)) {
      item.whatsapp++;
    }
  });

  const sourcesList: SourceMetricItem[] = Object.keys(sourcesMap).map((name) => {
    const item = sourcesMap[name];
    const ctr = calculateCtr(item.clicks, item.visits);
    const waConv = calculateWhatsAppConversion(item.whatsapp, item.visits);

    return {
      name,
      visits: item.visits,
      clicks: item.clicks,
      whatsapp: item.whatsapp,
      ctr,
      ctrFormatted: formatPercentage(ctr, 1),
      whatsappConversion: waConv,
      whatsappConversionFormatted: formatPercentage(waConv, 1),
    };
  });

  sourcesList.sort((a, b) => b.visits - a.visits || b.clicks - a.clicks);

  return { sourcesMap, sourcesList };
}

export function groupByDay(
  {
    visits = [],
    clicks = [],
  }: {
    visits?: VisitRecord[];
    clicks?: ClickRecord[];
  },
  options: { period?: string; referenceTime?: number } = {}
): DailyMetricItem[] {
  const period = options.period || '7days';
  const refTime = options.referenceTime || Date.now();

  let numDays = 7;
  if (period === 'today') numDays = 1;
  else if (period === '30days') numDays = 30;
  else if (period === 'all') {
    let minTime = refTime;
    [...visits, ...clicks].forEach((item) => {
      const t = getItemTimestamp(item);
      if (t > 0 && t < minTime) minTime = t;
    });
    const diffMs = refTime - minTime;
    numDays = Math.max(1, Math.min(90, Math.ceil(diffMs / (24 * 60 * 60 * 1000)) + 1));
  }

  const daysMap = new Map<string, any>();
  for (let i = numDays - 1; i >= 0; i--) {
    const dayTime = refTime - i * 24 * 60 * 60 * 1000;
    const dateKey = formatLocalDateSaoPaulo(dayTime);
    if (!daysMap.has(dateKey)) {
      const parts = dateKey.split('-');
      const dateFormatted = `${parts[2]}/${parts[1]}`;
      daysMap.set(dateKey, {
        date: dateKey,
        dateFormatted,
        visits: 0,
        clicks: 0,
        whatsappClicks: 0,
      });
    }
  }

  (visits || []).forEach((v) => {
    const t = getItemTimestamp(v);
    if (t <= 0) return;
    const key = formatLocalDateSaoPaulo(t);
    if (daysMap.has(key)) daysMap.get(key).visits++;
  });

  (clicks || []).forEach((c) => {
    const t = getItemTimestamp(c);
    if (t <= 0) return;
    const key = formatLocalDateSaoPaulo(t);
    if (daysMap.has(key)) {
      const dayObj = daysMap.get(key);
      dayObj.clicks++;
      if (isWhatsAppClick(c)) dayObj.whatsappClicks++;
    }
  });

  const result: DailyMetricItem[] = Array.from(daysMap.values()).map((day) => {
    const ctr = calculateCtr(day.clicks, day.visits);
    const waConv = calculateWhatsAppConversion(day.whatsappClicks, day.visits);

    return {
      ...day,
      ctr,
      ctrFormatted: formatPercentage(ctr, 1),
      whatsappConversion: waConv,
      whatsappConversionFormatted: formatPercentage(waConv, 1),
    };
  });

  result.sort((a, b) => a.date.localeCompare(b.date));
  return result;
}

export function getLinkDistribution(clicks: ClickRecord[] = []): LinkDistributionItem[] {
  if (!Array.isArray(clicks) || clicks.length === 0) return [];

  const counts: Record<string, number> = {};
  clicks.forEach((c) => {
    const title = c && (c.linkTitle || c.linkId) ? String(c.linkTitle || c.linkId).trim() : 'Outro';
    counts[title] = (counts[title] || 0) + 1;
  });

  const total = clicks.length;
  const list: LinkDistributionItem[] = Object.keys(counts).map((title) => {
    const count = counts[title];
    const pct = total > 0 ? (count / total) * 100 : 0;
    return {
      title,
      count,
      percentage: pct,
      percentageFormatted: formatPercentage(pct, 1),
    };
  });

  list.sort((a, b) => b.count - a.count);
  return list;
}

export function processAnalytics({
  visits = [],
  clicks = [],
  period = '7days',
  referenceTime = Date.now(),
  deduplicate = true,
}: {
  visits?: VisitRecord[];
  clicks?: ClickRecord[];
  period?: string;
  referenceTime?: number;
  deduplicate?: boolean;
} = {}): ProcessedAnalyticsResult {
  const cleanVisits = deduplicate ? deduplicateVisits(visits) : visits || [];
  const cleanClicks = deduplicate ? deduplicateClicks(clicks) : clicks || [];

  const filteredVisits = filterByPeriod(cleanVisits, period, { referenceTime });
  const filteredClicks = filterByPeriod(cleanClicks, period, { referenceTime });

  const totalVisits = filteredVisits.length;
  const totalClicks = filteredClicks.length;
  const whatsappClicks = filteredClicks.filter(isWhatsAppClick).length;

  const ctr = calculateCtr(totalClicks, totalVisits);
  const whatsappConversion = calculateWhatsAppConversion(whatsappClicks, totalVisits);

  const { sourcesMap, sourcesList } = groupBySource({
    visits: filteredVisits,
    clicks: filteredClicks,
  });

  const linksDistribution = getLinkDistribution(filteredClicks);

  const dailyGrouped = groupByDay(
    {
      visits: filteredVisits,
      clicks: filteredClicks,
    },
    { period, referenceTime }
  );

  return {
    totalVisits,
    totalClicks,
    whatsappClicks,
    ctr,
    ctrFormatted: formatPercentage(ctr, 1),
    whatsappConversion,
    whatsappConversionFormatted: formatPercentage(whatsappConversion, 1),
    sourcesMap,
    sourcesList,
    linksDistribution,
    dailyGrouped,
    filteredVisits,
    filteredClicks,
    period,
    referenceTime,
  };
}
