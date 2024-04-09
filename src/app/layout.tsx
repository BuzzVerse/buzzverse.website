"use client"
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {ModeToggle} from "@/components/ui/mode-toogle";

const inter = Inter({subsets: ["latin"]});

// export const metadata: Metadata = {
//   title: "BuzzVerse",
//   description: "University of Zielona Góra",
// };
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
            <head><title></title></head>
            <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {/*<ModeToggle />*/}

                {children}
            </ThemeProvider>
            </body>
            </html>
        </>
    );
}
