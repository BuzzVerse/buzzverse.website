import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Footer} from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "BuzzVerse",
  description: "University of Zielona Góra",
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
            <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {/*<ModeToggle />*/}
                
                {children}
                <Footer />
                
            </ThemeProvider>
            </body>
            </html>
        </>
    );
}
