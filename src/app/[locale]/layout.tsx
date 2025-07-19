import type {Metadata} from "next";
import "../globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Footer} from "@/components/ui/footer";
import {Navbar, NavbarDemo} from "./(home)/components/navbar-menu";
import { CustomSidebarMenu } from "./(home)/components/custom-sidebar-menu";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export const metadata: Metadata = {
  title: "BuzzVerse",
  description: "University of Zielona Góra",
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pl' }];
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Ensure that the incoming `locale` is valid
  if (!['en', 'pl'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageSwitcher />
            <CustomSidebarMenu />
            <Navbar/>
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
