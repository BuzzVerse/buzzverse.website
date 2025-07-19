// Simple translation utility for Cloudflare compatibility
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import enMessages from '../../messages/en.json';
import plMessages from '../../messages/pl.json';

export type Locale = 'en' | 'pl';

const messages = {
  en: enMessages,
  pl: plMessages,
};

// Function to detect locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  console.log('🌍 Checking pathname:', pathname);
  if (pathname.startsWith('/pl')) {
    console.log('🇵🇱 Detected Polish locale');
    return 'pl';
  }
  if (pathname.startsWith('/en')) {
    console.log('🇺🇸 Detected English locale');
    return 'en';
  }
  console.log('🔄 Using default locale: en');
  return 'en';
}

// Function to detect current locale from URL (client-side only)
export function getCurrentLocale(): Locale {
  if (typeof window !== 'undefined') {
    return getLocaleFromPathname(window.location.pathname);
  }
  
  // Server-side fallback
  console.log('🔄 Using default locale: en (SSR or fallback)');
  return 'en';
}

// Reactive hook for locale that updates when pathname changes
export function useLocale(): Locale {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>('en'); // Always start with 'en' for SSR consistency
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const newLocale = getLocaleFromPathname(pathname);
    console.log('🔄 Locale changed to:', newLocale, 'from pathname:', pathname);
    setLocale(newLocale);
  }, [pathname]);

  // During SSR or before mount, always return 'en' to match server rendering
  if (!mounted) {
    return 'en';
  }

  return locale;
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
  const currentLocale = useLocale(); // Use reactive hook instead of getCurrentLocale
  console.log('🎯 Using locale for translations:', currentLocale);
  
  return function t(key: string): string {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const translation = getTranslations(currentLocale)(fullKey);
    console.log(`🔤 Translation for "${fullKey}" (${currentLocale}):`, translation);
    return translation;
  };
}

// Create a mock next-intl module for compatibility
export { useTranslations as default };