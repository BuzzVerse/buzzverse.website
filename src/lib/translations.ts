// Simple translation utility for Cloudflare compatibility
import enMessages from '../../messages/en.json';
import plMessages from '../../messages/pl.json';

export type Locale = 'en' | 'pl';

const messages = {
  en: enMessages,
  pl: plMessages,
};

// Function to detect current locale from URL
export function getCurrentLocale(): Locale {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    console.log('🌍 Current pathname:', pathname);
    if (pathname.startsWith('/pl')) {
      console.log('🇵🇱 Detected Polish locale');
      return 'pl';
    }
    if (pathname.startsWith('/en')) {
      console.log('🇺🇸 Detected English locale');
      return 'en';
    }
  }
  
  // Server-side: try to get locale from URL params (if available in Next.js context)
  // This is a fallback - for proper SSR, the locale should be passed as a parameter
  console.log('🔄 Using default locale: en (SSR or fallback)');
  return 'en'; // Default fallback
}

// Helper function to create locale-aware paths
export function createLocalePath(path: string, locale?: Locale): string {
  const currentLocale = locale || getCurrentLocale();
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // If path is empty or just '/', return locale root
  if (!cleanPath || cleanPath === '') {
    return `/${currentLocale}`;
  }
  return `/${currentLocale}/${cleanPath}`;
}

export function getTranslations(locale?: Locale) {
  const currentLocale = locale || getCurrentLocale();
  
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = messages[currentLocale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Fallback to English if translation not found
    if (value === undefined && currentLocale !== 'en') {
      let fallbackValue: any = messages.en;
      for (const k of keys) {
        fallbackValue = fallbackValue?.[k];
      }
      value = fallbackValue;
    }
    
    return value || key;
  };
}

export function useTranslations(namespace?: string) {
  const currentLocale = getCurrentLocale();
  console.log('🎯 Using locale for translations:', currentLocale);
  
  return function t(key: string): string {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const translation = getTranslations(currentLocale)(fullKey);
    console.log(`🔤 Translation for "${fullKey}" (${currentLocale}):`, translation);
    return translation;
  };
}

export function useLocale(): Locale {
  return getCurrentLocale();
}

// Create a mock next-intl module for compatibility
export { useTranslations as default };