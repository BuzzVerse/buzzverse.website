import type {Metadata} from "next";
import "../globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Footer} from "@/components/ui/footer";
import {Navbar, NavbarDemo} from "./(home)/components/navbar-menu";
import { CustomSidebarMenu } from "./(home)/components/custom-sidebar-menu";
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

  return (
    <div lang={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <LanguageSwitcher />
        <CustomSidebarMenu />
        <Navbar/>
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
}
