import { formatDateTimeSaoPaulo } from './metrics';

function formatField(value: any): string {
  if (!value) return '';
  if (typeof value === 'object' && value.toDate) {
    return formatDateTimeSaoPaulo(value);
  }
  return String(value);
}

export function downloadAnalyticsCsv(visits: any[] = [], clicks: any[] = []): void {
  let csv = 'Tipo;Data/Hora (Brasília);Origem;Campanha;Dispositivo;Detalhe;URL\n';

  visits.forEach((v) => {
    const time = formatDateTimeSaoPaulo(v.createdAt || v.timestamp);
    csv += `Visita;${time};${formatField(v.source) || 'direto'};${formatField(v.campaign)};${formatField(v.device)};Acessou o Site;${formatField(v.fullUrl)}\n`;
  });

  clicks.forEach((c) => {
    const time = formatDateTimeSaoPaulo(c.createdAt || c.timestamp);
    csv += `Clique;${time};${formatField(c.source) || 'direto'};${formatField(c.campaign)};${formatField(c.device)};Clicou em "${formatField(c.linkTitle || c.linkId)}";${formatField(c.targetUrl)}\n`;
  });

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sistemaspex_analytics_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
