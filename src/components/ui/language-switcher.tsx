'use client';

import { useState, useEffect } from 'react';
import { useLocale } from '@/lib/translations';
import { useRouter, usePathname as useNextPathname } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const nextPathname = useNextPathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<string>('en');

  // Funkcja do określenia aktualnej lokalizacji
  const detectLocale = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      console.log('detectLocale - pathname:', path);
      if (path.startsWith('/pl')) return 'pl';
      if (path.startsWith('/en')) return 'en';
    }
    // Fallback na useLocale hook
    return locale || 'en';
  };

  // Ustaw lokalizację przy pierwszym renderowaniu
  useEffect(() => {
    const detectedLocale = detectLocale();
    console.log('Initial locale detection:', detectedLocale);
    setCurrentLocale(detectedLocale);
  }, []);

  // Aktualizuj lokalizację gdy zmieni się pathname
  useEffect(() => {
    const detectedLocale = detectLocale();
    console.log('Pathname changed, new locale:', detectedLocale, 'pathname:', nextPathname);
    setCurrentLocale(detectedLocale);
  }, [nextPathname, locale]);

  console.log('Rendering with locale:', currentLocale, 'useLocale:', locale, 'pathname:', nextPathname);

  const switchLanguage = (newLocale: string) => {
    // Pobierz obecną ścieżkę bez locale
    const fullPath = window.location.pathname;
    
    // Usuń aktualny locale z początku URL
    let pathWithoutLocale = fullPath;
    if (pathWithoutLocale.startsWith('/en/')) {
      pathWithoutLocale = pathWithoutLocale.substring(3);
    } else if (pathWithoutLocale.startsWith('/pl/')) {
      pathWithoutLocale = pathWithoutLocale.substring(3);
    } else if (pathWithoutLocale === '/en' || pathWithoutLocale === '/pl') {
      pathWithoutLocale = '';
    }
    
    // Zbuduj nowy URL
    const newUrl = `/${newLocale}${pathWithoutLocale}`;
    
    console.log('Language switch from', fullPath, 'to', newUrl);
    
    // Użyj Next.js router
    router.push(newUrl);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50 hidden md:block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2 px-4 py-2.5 text-sm bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md hover:from-white/20 hover:to-white/10 border border-white/20 hover:border-white/30 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <span className="uppercase font-semibold text-white">
          {currentLocale === 'pl' ? 'Polish' : 'English'}
        </span>
        <svg 
          className={`w-3 h-3 transition-all duration-300 text-white/80 group-hover:text-white ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown */}
          <div className="absolute top-full mt-3 right-0 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md border border-white/20 rounded-xl shadow-2xl z-50 min-w-[160px] overflow-hidden animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => switchLanguage('en')}
              className={`group w-full flex items-center space-x-3 px-4 py-3.5 text-sm hover:bg-white/20 transition-all duration-200 ${
                currentLocale === 'en' ? 'bg-white/20 text-yellow-400' : 'text-white hover:text-yellow-300'
              }`}
            >
              <span className="text-xl transition-transform duration-200 group-hover:scale-110">EN</span>
              <span className="font-medium">English</span>
              {currentLocale === 'en' && (
                <span className="ml-auto text-yellow-400 animate-in fade-in duration-200">✓</span>
              )}
            </button>
            
            <div className="border-t border-white/10" />
            
            <button
              onClick={() => switchLanguage('pl')}
              className={`group w-full flex items-center space-x-3 px-4 py-3.5 text-sm hover:bg-white/20 transition-all duration-200 ${
                currentLocale === 'pl' ? 'bg-white/20 text-yellow-400' : 'text-white hover:text-yellow-300'
              }`}
            >
              <span className="text-xl transition-transform duration-200 group-hover:scale-110">PL</span>
              <span className="font-medium">Polish</span>
              {currentLocale === 'pl' && (
                <span className="ml-auto text-yellow-400 animate-in fade-in duration-200">✓</span>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
