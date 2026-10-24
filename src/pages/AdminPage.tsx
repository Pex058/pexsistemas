import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BarChart3,
  Link2,
  Settings,
  LogOut,
  RefreshCw,
  Download,
  ExternalLink,
  MessageCircle,
  MousePointerClick,
  Users,
  Percent,
  Check,
  Radio,
} from 'lucide-react';
import { getAllVisits, getAllClicks } from '../services/leadService';
import { logout } from '../services/authService';
import { downloadAnalyticsCsv } from '../utils/csv';
import { formatTimestamp } from '../utils/date';
import { processAnalytics, VisitRecord, ClickRecord } from '../utils/metrics';
import { getSettings, updateSettings } from '../services/settingsService';
import { UtmBuilder } from '../components/UtmBuilder';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'metricas' | 'gerador' | 'config'>('metricas');
  const [visits, setVisits] = useState<VisitRecord[]>([]);
  const [clicks, setClicks] = useState<ClickRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [periodFilter, setPeriodFilter] = useState<'today' | '7days' | '30days' | 'all'>('7days');
  const [error, setError] = useState('');
  const [pixelId, setPixelId] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  }

  async function loadAllData() {
    setLoading(true);
    setError('');

    try {
      const [visitsData, clicksData, settings] = await Promise.all([
        getAllVisits(),
        getAllClicks(),
        getSettings(),
      ]);

      setVisits(visitsData);
      setClicks(clicksData);
      setPixelId(settings.pixelId || '');
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Não foi possível carregar os dados completos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      localStorage.setItem('pex_is_admin', 'true');
      sessionStorage.setItem('pex_is_admin', 'true');
    } catch (err) {
      void err;
    }
    loadAllData();
  }, []);

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaveStatus('Salvando...');
    try {
      await updateSettings({ pixelId });
      setSaveStatus('Salvo!');
      setTimeout(() => setSaveStatus(''), 2500);
      showToast('Configurações atualizadas com sucesso!');
    } catch {
      setSaveStatus('Erro ao salvar');
    }
  }

  async function handleLogout() {
    try {
      localStorage.removeItem('pex_is_admin');
      sessionStorage.removeItem('pex_is_admin');
    } catch (err) {
      void err;
    }
    await logout();
    navigate('/admin/login', { replace: true });
  }

  // Motor Centralizado de Métricas com Deduplicação e Fuso America/Sao_Paulo
  const analyticsData = useMemo(() => {
    const validVisits = visits.filter((v) => !v.isBot);
    const processed = processAnalytics({
      visits: validVisits,
      clicks,
      period: periodFilter,
      deduplicate: true,
    });

    // Feed de atividades em tempo real
    const events: any[] = [];

    processed.filteredVisits.forEach((v) => {
      let time = new Date();
      if (v.createdAt) time = new Date(v.createdAt);
      else if (v.timestamp?.toDate) time = v.timestamp.toDate();

      events.push({
        id: 'visit_' + (v.id || Math.random()),
        type: 'visit',
        time,
        source: v.source || 'direto',
        campaign: v.campaign || '-',
        device: v.device || 'Desktop',
        detail: 'Acessou o site',
      });
    });

    processed.filteredClicks.forEach((c) => {
      let time = new Date();
      if (c.createdAt) time = new Date(c.createdAt);
      else if (c.timestamp?.toDate) time = c.timestamp.toDate();

      events.push({
        id: 'click_' + (c.id || Math.random()),
        type: 'click',
        time,
        source: c.source || 'direto',
        campaign: c.campaign || '-',
        device: c.device || 'Desktop',
        detail: `Clicou em "${c.linkTitle || c.linkId}"`,
      });
    });

    events.sort((a, b) => b.time.getTime() - a.time.getTime());
    const recentEvents = events.slice(0, 40);

    return {
      ...processed,
      recentEvents,
    };
  }, [visits, clicks, periodFilter]);

  function getSourceIcon(src: string = '') {
    const s = src.toLowerCase();
    if (s.includes('instagram')) return '📸';
    if (s.includes('facebook') || s.includes('fb')) return '📘';
    if (s.includes('whatsapp')) return '💬';
    if (s.includes('qrcode')) return '🏁';
    if (s.includes('google')) return '🔍';
    if (s.includes('tiktok')) return '🎵';
    if (s.includes('linktree')) return '🌲';
    return '🌐';
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-2xl shadow-emerald-500/30 animate-fadeIn text-sm">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header do Painel */}
      <header className="bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center font-extrabold text-white text-lg shadow-md shadow-emerald-950">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">Sistemas Pex</h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Analytics & Controle
                </span>
                <span className="text-xs text-slate-500 font-mono">v1.1.0</span>
              </div>
              <p className="text-xs text-slate-400">
                Acessos reais, tráfego filtrado contra robôs e conversão de campanhas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              <span>Ver Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 text-red-300 border border-red-800/40 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>

        {/* Abas */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 border-t border-slate-800/60 pt-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('metricas')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'metricas'
                ? 'text-emerald-400 border-emerald-500 bg-slate-800/40'
                : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/20'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>📊 Métricas & Acessos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gerador')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'gerador'
                ? 'text-emerald-400 border-emerald-500 bg-slate-800/40'
                : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/20'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>🔗 Gerador de Links & Campanhas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
              activeTab === 'config'
                ? 'text-emerald-400 border-emerald-500 bg-slate-800/40'
                : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/20'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>⚙️ Pixel & Rastreamento</span>
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* ABA 1: MÉTRICAS */}
        {activeTab === 'metricas' && (
          <div className="space-y-8">
            {/* Toolbar com Filtro de Período e Ações */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <label htmlFor="period-select" className="text-xs font-semibold text-slate-400 uppercase">
                  Período:
                </label>
                <select
                  id="period-select"
                  value={periodFilter}
                  onChange={(e) => setPeriodFilter(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 text-white text-xs font-medium rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                >
                  <option value="today">Hoje</option>
                  <option value="7days">Últimos 7 dias</option>
                  <option value="30days">Últimos 30 dias</option>
                  <option value="all">Todo o período</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadAllData}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? 'Carregando...' : 'Atualizar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    downloadAnalyticsCsv(analyticsData.filteredVisits, analyticsData.filteredClicks)
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* 4 Cards de Métricas (KPIs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Acessos Totais</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {analyticsData.totalVisits.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-slate-500 mt-1">Visitantes reais (robôs eliminados)</p>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total de Cliques</span>
                  <MousePointerClick className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {analyticsData.totalClicks.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  CTR: {analyticsData.ctrFormatted}%
                </p>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Cliques WhatsApp</span>
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {analyticsData.whatsappClicks.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-emerald-400 font-semibold mt-1">
                  Conversão WA: {analyticsData.whatsappConversionFormatted}%
                </p>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Taxa de Conversão</span>
                  <Percent className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">
                  {analyticsData.ctrFormatted}%
                </div>
                <p className="text-xs text-slate-500 mt-1">% Visitantes com interação</p>
              </div>
            </div>

            {/* Tabela de Origens & Destino dos Cliques */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tabela de Origens (2 cols) */}
              <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Conversão por Origem / Canal</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    De onde vieram os acessos e qual rede social gerou mais cliques no WhatsApp
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-3">Origem / Canal</th>
                        <th className="py-3 px-3 text-center">Acessos</th>
                        <th className="py-3 px-3 text-center">Cliques (CTR)</th>
                        <th className="py-3 px-3 text-center">WhatsApp</th>
                        <th className="py-3 px-3 text-right">Conv. WA</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {analyticsData.sourcesList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-slate-500">
                            Nenhum acesso registrado no período selecionado.
                          </td>
                        </tr>
                      ) : (
                        analyticsData.sourcesList.map((item) => (
                          <tr key={item.name} className="hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <span>{getSourceIcon(item.name)}</span>
                                <strong className="font-semibold text-white capitalize">
                                  {item.name.replace(/_/g, ' ')}
                                </strong>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-center font-medium text-slate-300">{item.visits}</td>
                            <td className="py-3 px-3 text-center text-slate-400">
                              {item.clicks} <span className="text-[10px] text-slate-500">({item.ctrFormatted}%)</span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">
                                {item.whatsapp} WA
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right font-bold text-emerald-400">
                              {item.whatsappConversionFormatted}%
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Destino dos Cliques (1 col) */}
              <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">Destino dos Cliques</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Quais botões e CTAs tiveram mais engajamento
                  </p>
                </div>

                <div className="space-y-3.5">
                  {analyticsData.linksDistribution.length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">
                      Nenhum clique registrado no período.
                    </p>
                  ) : (
                    analyticsData.linksDistribution.map((item) => (
                      <div key={item.title} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <strong className="text-white truncate pr-2">{item.title}</strong>
                          <span className="text-slate-400 shrink-0 font-medium">
                            {item.count} ({item.percentageFormatted}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Histórico Recente de Atividades (Live Feed) */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Histórico Recente de Atividades</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Registro em tempo real de cada visitante e ação realizada
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                  <span>Live Feed</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-3">Data / Hora</th>
                      <th className="py-3 px-3">Tipo</th>
                      <th className="py-3 px-3">Origem</th>
                      <th className="py-3 px-3">Campanha</th>
                      <th className="py-3 px-3">Dispositivo</th>
                      <th className="py-3 px-3">Detalhe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {analyticsData.recentEvents.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-6 text-center text-slate-500 font-sans">
                          Nenhuma atividade recente encontrada no período.
                        </td>
                      </tr>
                    ) : (
                      analyticsData.recentEvents.map((evt) => (
                        <tr key={evt.id} className="hover:bg-slate-800/30 transition-colors font-sans">
                          <td className="py-3 px-3 text-slate-400 text-[11px] whitespace-nowrap">
                            {formatTimestamp(evt.time)}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                evt.type === 'click'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                  : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              }`}
                            >
                              {evt.type === 'click' ? 'Clique' : 'Visita'}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-semibold text-white capitalize">{evt.source}</td>
                          <td className="py-3 px-3 text-slate-400">{evt.campaign}</td>
                          <td className="py-3 px-3 text-slate-400">{evt.device}</td>
                          <td className="py-3 px-3 text-slate-300 font-medium">{evt.detail}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: GERADOR DE LINKS & CAMPANHAS */}
        {activeTab === 'gerador' && <UtmBuilder />}

        {/* ABA 3: CONFIGURAÇÕES DE PIXEL & RASTREAMENTO */}
        {activeTab === 'config' && (
          <div className="max-w-2xl bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-400" />
                <span>Configurações de Rastreamento</span>
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Configure o Meta Pixel (Facebook & Instagram) para rodar anúncios com conversão personalizada.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  ID do Meta Pixel (Facebook Pixel)
                </label>
                <input
                  type="text"
                  value={pixelId}
                  onChange={(e) => setPixelId(e.target.value)}
                  placeholder="ex: 1234567890123456"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                />
                <p className="text-xs text-slate-500 mt-1.5">
                  Localize seu Pixel ID no Gerenciador de Eventos da Meta (Facebook Business).
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
              >
                <span>{saveStatus || 'Salvar Configurações'}</span>
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
