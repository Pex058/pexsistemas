import { logEvent } from 'firebase/analytics';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { analytics, auth, db } from '../firebase/firebaseConfig';
import { getUtmParamsFromUrl, getReferrerSource } from '../utils/utm';

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    gtag?: any;
    _phantom?: any;
    __nightmare?: any;
    callPhantom?: any;
    Cypress?: any;
    __puppeteer_evaluation_script__?: any;
  }
}

// Detect if current visitor is an automated bot, web crawler or headless browser
export function isRobotOrCrawler(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;

  // 1. Automated webdriver flag (Selenium, Puppeteer, Playwright, Chrome DevTools Protocol)
  if (navigator.webdriver === true) return true;
  if (window.document?.documentElement?.getAttribute?.('webdriver') !== null) return true;

  // 2. Automation environment properties
  if (
    window._phantom ||
    window.__nightmare ||
    window.callPhantom ||
    window.Cypress ||
    window.__puppeteer_evaluation_script__
  ) {
    return true;
  }

  // 3. Crawler/bot User-Agent inspection
  const ua = (navigator.userAgent || '').toLowerCase();
  const botRegex = /(bot|crawl|spider|slurp|facebookexternalhit|meta-externalagent|bytespider|googlebot|bingbot|yandex|duckduckbot|applebot|whatsapp|twitterbot|linkedinbot|pinterest|headless|phantom|wget|curl|python|axios|go-http-client|node-fetch|java|php|ruby|scraper|screaming frog|semrush|ahrefs|mj12bot|dotbot|petalbot|urllib|postman|insomnia|lighthouse)/i;
  if (botRegex.test(ua)) return true;

  // 4. Inconsistent screen attributes indicative of headless environment
  if (window.screen && (window.screen.width === 0 || window.screen.height === 0)) {
    return true;
  }

  return false;
}

// Verifica se o tráfego atual deve ser ignorado (Robôs ou Administrador testando)
export function isExcludedTraffic(): boolean {
  if (typeof window === 'undefined') return true;

  // 1. Exclusão de Administrador (sessão ativa, flag em storage ou rota admin)
  try {
    if (localStorage.getItem('pex_is_admin') === 'true') return true;
    if (sessionStorage.getItem('pex_is_admin') === 'true') return true;
    if (auth && auth.currentUser) return true;
    if (window.location && window.location.pathname.startsWith('/admin')) return true;
  } catch (err) {
    void err;
  }

  // 2. Detecção de robôs e automações
  return isRobotOrCrawler();
}

// Session identifier management
export function getSessionId(): string {
  if (typeof window === 'undefined') return 'sid_server';
  let sid = sessionStorage.getItem('pex_sid');
  if (!sid) {
    sid = 'sid_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    sessionStorage.setItem('pex_sid', sid);
  }
  return sid;
}

// Detect device type
export function getDeviceType(): string {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'Desktop';
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'Mobile';
  if (/tablet|ipad/i.test(ua)) return 'Tablet';
  return 'Desktop';
}

// Extract tracking source and campaign info
export function getTrackingInfo() {
  if (typeof window === 'undefined') {
    return {
      source: 'direto',
      campaign: '',
      medium: '',
      content: '',
      fullUrl: '',
      referrer: 'direto',
    };
  }

  const utms = getUtmParamsFromUrl();
  const referrer = document.referrer || getReferrerSource();

  return {
    source: (utms.utm_source || 'direto').toLowerCase().trim(),
    campaign: (utms.utm_campaign || '').trim(),
    medium: (utms.utm_medium || '').trim(),
    content: (utms.utm_content || '').trim(),
    fullUrl: window.location.href,
    referrer: referrer || 'direto',
  };
}

export function initPixel(pixelId?: string): void {
  if (!pixelId || typeof window === 'undefined') return;

  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  if (window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }
}

// Grava a visita real confirmada no Firestore e Google Analytics
let isVisitRecordingInProgress = false;

export async function recordActualVisit(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (isVisitRecordingInProgress) return;
  if (isExcludedTraffic()) return;

  const alreadyTracked = sessionStorage.getItem('pex_visit_logged');
  if (alreadyTracked) return;

  isVisitRecordingInProgress = true;

  const tracking = getTrackingInfo();
  const sessionId = getSessionId();
  const device = getDeviceType();

  const visitData = {
    sessionId,
    source: tracking.source,
    campaign: tracking.campaign,
    medium: tracking.medium,
    content: tracking.content,
    referrer: tracking.referrer,
    device,
    userAgent: navigator.userAgent || '',
    language: navigator.language || 'pt-BR',
    screen: window.screen ? `${window.screen.width}x${window.screen.height}` : '',
    isBot: false,
    timestamp: serverTimestamp(),
    createdAt: new Date().toISOString(),
  };

  try {
    const visitsCollection = collection(db, 'visits');
    await addDoc(visitsCollection, visitData);
    sessionStorage.setItem('pex_visit_logged', 'true');
  } catch (err: any) {
    console.warn('Could not log visit to Firestore:', err?.message);
  } finally {
    isVisitRecordingInProgress = false;
  }

  // Envia evento para o Google Analytics 4
  try {
    const instance = await analytics;
    if (instance) {
      logEvent(instance, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        source: tracking.source,
        campaign: tracking.campaign,
        device,
      });
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        source: tracking.source,
        campaign: tracking.campaign,
      });
    }

    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  } catch (e) {
    console.warn('Analytics logEvent error:', e);
  }
}

/**
 * Registra visita na página com Gatilho por Engajamento Humano:
 * Só salva após interação humana legítima (scroll, movimento de mouse, toque ou tecla)
 * OU após permanência visível de pelo menos 1.8 segundos.
 */
export function trackVisit(): void {
  if (typeof window === 'undefined') return;
  if (isExcludedTraffic()) return;
  if (sessionStorage.getItem('pex_visit_logged')) return;

  let triggered = false;
  let timerId: any = null;

  function handleHumanAction() {
    if (triggered) return;
    triggered = true;

    window.removeEventListener('scroll', handleHumanAction);
    window.removeEventListener('mousemove', handleHumanAction);
    window.removeEventListener('touchstart', handleHumanAction);
    window.removeEventListener('keydown', handleHumanAction);
    if (timerId) clearTimeout(timerId);

    recordActualVisit();
  }

  window.addEventListener('scroll', handleHumanAction, { passive: true, once: true });
  window.addEventListener('mousemove', handleHumanAction, { passive: true, once: true });
  window.addEventListener('touchstart', handleHumanAction, { passive: true, once: true });
  window.addEventListener('keydown', handleHumanAction, { passive: true, once: true });

  timerId = setTimeout(() => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      handleHumanAction();
    }
  }, 1800);
}

// Track interactive clicks (CTAs, WhatsApp buttons, Links)
export async function trackClick(linkId: string, linkTitle?: string, targetUrl: string = ''): Promise<void> {
  if (typeof window === 'undefined') return;
  if (isExcludedTraffic()) return;

  if (!sessionStorage.getItem('pex_visit_logged')) {
    await recordActualVisit();
  }

  const tracking = getTrackingInfo();
  const sessionId = getSessionId();
  const device = getDeviceType();

  const clickData = {
    linkId: linkId || 'cta',
    linkTitle: linkTitle || 'Clique',
    targetUrl: targetUrl || '',
    source: tracking.source,
    campaign: tracking.campaign,
    device,
    sessionId,
    timestamp: serverTimestamp(),
    createdAt: new Date().toISOString(),
  };

  try {
    const clicksCollection = collection(db, 'clicks');
    await addDoc(clicksCollection, clickData);
  } catch (err: any) {
    console.warn('Could not log click to Firestore:', err?.message);
  }

  // Log event in Analytics
  try {
    const instance = await analytics;
    if (instance) {
      logEvent(instance, 'select_content', {
        content_type: 'button',
        content_id: linkId,
        link_title: linkTitle,
        link_url: targetUrl,
      });
    }

    if (window.gtag) {
      window.gtag('event', 'select_content', {
        content_id: linkId,
        link_title: linkTitle,
      });
    }

    if (window.fbq) {
      window.fbq('trackCustom', 'CtaClick', {
        link_id: linkId,
        link_title: linkTitle,
      });
    }
  } catch (e) {
    console.warn('Analytics click log error:', e);
  }
}
