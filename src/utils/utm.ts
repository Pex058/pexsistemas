const STORAGE_KEY = 'utm_params';

export interface UtmParams {
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_content?: string;
  utm_term?: string;
}

export function getReferrerSource(): string {
  if (typeof window === 'undefined') return 'direto';

  const referrer = (document.referrer || '').toLowerCase();
  if (!referrer) return 'direto';

  if (referrer.includes('instagram.com')) return 'instagram';
  if (referrer.includes('facebook.com') || referrer.includes('fb.com')) return 'facebook';
  if (referrer.includes('whatsapp') || referrer.includes('wa.me')) return 'whatsapp';
  if (referrer.includes('google.com')) return 'google';
  if (referrer.includes('tiktok.com')) return 'tiktok';
  if (referrer.includes('linktr.ee')) return 'linktree';

  try {
    const host = new URL(referrer).hostname;
    return host.replace('www.', '');
  } catch {
    return 'referral';
  }
}

export function getUtmParamsFromUrl(): UtmParams {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);

  let source =
    params.get('utm_source') ||
    params.get('src') ||
    params.get('source') ||
    params.get('ref') ||
    '';

  const campaign =
    params.get('utm_campaign') ||
    params.get('camp') ||
    params.get('campaign') ||
    '';

  const medium = params.get('utm_medium') || params.get('medium') || '';
  const content = params.get('utm_content') || params.get('content') || '';
  const term = params.get('utm_term') || params.get('term') || '';

  if (!source) {
    source = getReferrerSource();
  }

  return {
    utm_source: source.trim().toLowerCase(),
    utm_campaign: campaign.trim(),
    utm_medium: medium.trim(),
    utm_content: content.trim(),
    utm_term: term.trim(),
  };
}

export function persistUtmParams(utmParams: UtmParams): void {
  if (typeof window === 'undefined') return;

  const hasAny = Object.values(utmParams).some((value) => Boolean(value));
  if (hasAny) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utmParams));
  }
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function resolveUtmParams(): UtmParams {
  const fromUrl = getUtmParamsFromUrl();
  const hasSpecificSource = fromUrl.utm_source && fromUrl.utm_source !== 'direto';

  if (hasSpecificSource || fromUrl.utm_campaign) {
    persistUtmParams(fromUrl);
    return fromUrl;
  }

  const stored = getStoredUtmParams();
  if (stored && Object.keys(stored).length > 0) {
    return stored;
  }

  persistUtmParams(fromUrl);
  return fromUrl;
}
