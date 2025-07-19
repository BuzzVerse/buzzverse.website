'use client'

import * as React from 'react'
import { Menu, X, Home, Cpu, Newspaper, Radio, User, Globe } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from '@/lib/translations'
import { useLocale } from '@/lib/translations'
import { useRouter, usePathname as useNextPathname } from 'next/navigation'

import { Button } from '@/components/ui/button'

export function CustomSidebarMenu() {
  const [open, setOpen] = React.useState(false)
  const [currentLocale, setCurrentLocale] = React.useState<string>('en')
  const locale = useLocale()
  const router = useRouter()
  const nextPathname = useNextPathname()
  const t = useTranslations('Navigation')

  const menuItems = [
    { icon: Home, label: t('home'), href: '/' },
    { icon: Cpu, label: t('projects'), href: '/projects' },
    { icon: Newspaper, label: t('news'), href: '/news' },
    { icon: Radio, label: t('media'), href: '/media' },
    { icon: User, label: t('about'), href: '/about' },
  ]

  // Funkcja do określenia aktualnej lokalizacji
  const detectLocale = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/pl')) return 'pl';
      if (path.startsWith('/en')) return 'en';
    }
    return locale || 'en';
  };

  // Ustaw lokalizację przy pierwszym renderowaniu
  React.useEffect(() => {
    const detectedLocale = detectLocale();
    setCurrentLocale(detectedLocale);
  }, []);

  // Aktualizuj lokalizację gdy zmieni się pathname
  React.useEffect(() => {
    const detectedLocale = detectLocale();
    setCurrentLocale(detectedLocale);
  }, [nextPathname, locale]);

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
    
    // Użyj Next.js router
    router.push(newUrl);
    setOpen(false);
  };

  return (
    <div className='md:hidden'>
      <Button
        variant="ghost"
        size="icon"
        className="fixed right-4 top-4 z-50 md:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 transform bg-black p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between">
          <h2 id="sidebar-title" className="text-lg font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Language Switcher */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-2">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400">
                <Globe className="h-4 w-4" />
                <span>Language</span>
              </div>
            </div>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => switchLanguage('en')}
                  className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    currentLocale === 'en' 
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">🇺🇸</span>
                  <span>English</span>
                  {currentLocale === 'en' && <span className="ml-auto">✓</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => switchLanguage('pl')}
                  className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    currentLocale === 'pl' 
                      ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">🇵🇱</span>
                  <span>Polski</span>
                  {currentLocale === 'pl' && <span className="ml-auto">✓</span>}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

