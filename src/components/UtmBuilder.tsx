import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Link as LinkIcon,
  QrCode as QrCodeIcon,
  Copy,
  Download,
  BookmarkPlus,
  Trash2,
  Check,
  ExternalLink,
} from 'lucide-react';
import { createCampaign, getAllCampaigns, deleteCampaign, CampaignItem } from '../services/campaignService';

interface PresetItem {
  label: string;
  source: string;
  title: string;
}

const PRESETS: PresetItem[] = [
  { label: '📸 Instagram (Bio)', source: 'instagram_bio', title: 'Instagram - Link na Bio' },
  { label: '⚡ Instagram (Stories)', source: 'instagram_stories', title: 'Instagram - Stories' },
  { label: '📘 Facebook (Página)', source: 'facebook_pagina', title: 'Facebook - Post / Página' },
  { label: '📢 Facebook (Anúncio)', source: 'facebook_ads', title: 'Facebook Ads - Campanha Paga' },
  { label: '💬 WhatsApp (Status)', source: 'whatsapp_status', title: 'WhatsApp - Status / Grupos' },
  { label: '🏁 QR Code (Cartão/Balcão)', source: 'qrcode_balcao', title: 'QR Code - Impresso / Balcão' },
  { label: '🔍 Google Ads', source: 'google_ads', title: 'Google Ads - Pesquisa' },
];

export const UtmBuilder: React.FC = () => {
  const [baseUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'https://sistemaspex-ae1b9.web.app';
  });

  const [source, setSource] = useState('instagram_bio');
  const [campaign, setCampaign] = useState('');
  const [medium, setMedium] = useState('social');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Instagram - Link na Bio');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [savedCampaigns, setSavedCampaigns] = useState<CampaignItem[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generatedUrl = (() => {
    try {
      const url = new URL(baseUrl || 'https://sistemaspex-ae1b9.web.app');
      const cleanSrc = (source || 'direto').trim().toLowerCase().replace(/\s+/g, '_');
      const cleanCamp = (campaign || '').trim().toLowerCase().replace(/\s+/g, '_');

      if (cleanSrc) {
        url.searchParams.set('utm_source', cleanSrc);
        url.searchParams.set('src', cleanSrc);
      }
      if (cleanCamp) {
        url.searchParams.set('utm_campaign', cleanCamp);
        url.searchParams.set('camp', cleanCamp);
      }
      if (medium) {
        url.searchParams.set('utm_medium', medium.trim().toLowerCase());
      }
      if (content) {
        url.searchParams.set('utm_content', content.trim().toLowerCase().replace(/\s+/g, '_'));
      }

      return url.toString();
    } catch {
      return `${baseUrl}?utm_source=${source}&utm_campaign=${campaign}`;
    }
  })();

  useEffect(() => {
    if (canvasRef.current && generatedUrl) {
      QRCode.toCanvas(canvasRef.current, generatedUrl, {
        width: 180,
        margin: 2,
        color: {
          dark: '#0B1220',
          light: '#ffffff',
        },
      }).catch((err) => console.error('Erro ao gerar QR code:', err));
    }
  }, [generatedUrl]);

  async function loadCampaigns() {
    setLoadingCampaigns(true);
    try {
      const list = await getAllCampaigns();
      setSavedCampaigns(list);
    } catch (e) {
      console.warn('Erro ao carregar campanhas:', e);
    } finally {
      setLoadingCampaigns(false);
    }
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  function handlePresetClick(preset: PresetItem) {
    setSource(preset.source);
    setTitle(preset.title);
    if (preset.source.includes('ads')) {
      setMedium('paid');
    } else if (preset.source.includes('qrcode')) {
      setMedium('offline');
    } else if (preset.source.includes('whatsapp')) {
      setMedium('chat');
    } else {
      setMedium('social');
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } catch {
      prompt('Copie o link abaixo:', generatedUrl);
    }
  }

  function handleDownloadQrCode() {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `qrcode_${source || 'campanha'}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }

  async function handleSaveCampaign() {
    setSaveStatus('Salvando...');
    try {
      await createCampaign({
        name: title || source,
        channel: source,
        url: generatedUrl,
        source,
        medium,
        campaign,
        content,
      });
      setSaveStatus('Salvo!');
      setTimeout(() => setSaveStatus(''), 2500);
      loadCampaigns();
    } catch {
      setSaveStatus('Erro ao salvar');
    }
  }

  async function handleDeleteCampaign(id?: string) {
    if (!id) return;
    if (!window.confirm('Deseja realmente remover esta campanha salva?')) return;
    await deleteCampaign(id);
    loadCampaigns();
  }

  return (
    <div className="space-y-8">
      {/* Box do Gerador */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1 & 2: Formulário & Presets */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-emerald-400" />
              <span>Gerador de Links de Campanha</span>
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Crie links rastreáveis com parâmetros UTM para saber exatamente de onde vêm seus visitantes.
            </p>
          </div>

          {/* Presets de 1 Clique */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Canais Rápidos (1 Clique):
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.source}
                  type="button"
                  onClick={() => handlePresetClick(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    source === p.source
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Campos do Formulário */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Origem (utm_source) *
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="ex: instagram_bio, panfleto"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Nome da Campanha (utm_campaign)
              </label>
              <input
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="ex: promocao_maio, lancamento"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Mídia / Tipo (utm_medium)
              </label>
              <input
                type="text"
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="ex: social, paid, offline, banner"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Conteúdo / Variação (utm_content)
              </label>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="ex: botao_verde, video_explicativo"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* URL Gerada */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Link Gerado:
            </span>
            <div className="font-mono text-xs text-emerald-400 break-all select-all bg-black/40 p-3 rounded-lg border border-slate-800">
              {generatedUrl}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all"
              >
                {copyFeedback ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copyFeedback ? 'Link Copiado!' : 'Copiar Link'}</span>
              </button>

              <button
                type="button"
                onClick={handleSaveCampaign}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg transition-all border border-slate-700"
              >
                <BookmarkPlus className="w-4 h-4 text-emerald-400" />
                <span>{saveStatus || 'Salvar Campanha'}</span>
              </button>

              <a
                href={generatedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-slate-400 hover:text-white text-xs transition-colors"
              >
                <span>Testar Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Coluna 3: Preview do QR Code */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between text-center space-y-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center justify-center gap-2">
              <QrCodeIcon className="w-4 h-4 text-emerald-400" />
              <span>QR Code da Campanha</span>
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Pronto para imprimir em placas, cartões de visita ou materiais físicos.
            </p>
          </div>

          <div className="bg-white p-3 rounded-2xl shadow-xl shadow-black/40">
            <canvas ref={canvasRef} />
          </div>

          <button
            type="button"
            onClick={handleDownloadQrCode}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold text-xs rounded-xl border border-slate-700 transition-all hover:border-emerald-500/50"
          >
            <Download className="w-4 h-4" />
            <span>Baixar Imagem PNG</span>
          </button>
        </div>
      </div>

      {/* Tabela de Campanhas Salvas */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-white">Campanhas Salvas</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Histórico das campanhas ativas e links gerados para seus canais.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium bg-slate-800 px-3 py-1 rounded-full">
            {savedCampaigns.length} salvas
          </span>
        </div>

        {loadingCampaigns ? (
          <p className="text-xs text-slate-400 py-4">Carregando campanhas...</p>
        ) : savedCampaigns.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            Nenhuma campanha salva ainda. Gere seu primeiro link acima e clique em "Salvar Campanha".
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-3">Nome / Canal</th>
                  <th className="py-3 px-3">Origem (Source)</th>
                  <th className="py-3 px-3">Campanha</th>
                  <th className="py-3 px-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {savedCampaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">{camp.name || camp.channel}</td>
                    <td className="py-3 px-3 font-mono text-emerald-400">{camp.source}</td>
                    <td className="py-3 px-3 text-slate-400">{camp.campaign || '-'}</td>
                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(camp.url);
                            alert('Link copiado com sucesso!');
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Copiar Link"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCampaign(camp.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950/50 text-slate-400 hover:text-red-400 transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UtmBuilder;
