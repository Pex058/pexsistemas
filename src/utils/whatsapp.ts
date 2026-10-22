import { SITE_CONFIG } from '../config/site';

/**
 * Cria o link seguro e formatado para o WhatsApp com mensagem pré-preenchida
 */
export function createWhatsAppUrl(message?: string): string {
  const text = message || SITE_CONFIG.whatsapp.defaultMessage;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodedText}`;
}
