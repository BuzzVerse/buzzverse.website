import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'pl'];

export default getRequestConfig(async ({ locale }) => {
  // Validate locale and fallback to default if invalid
  const validLocale = locales.includes(locale) ? locale : 'en';

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default
  };
});
