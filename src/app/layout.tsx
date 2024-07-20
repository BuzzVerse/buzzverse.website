import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {ModeToggle} from "@/components/ui/mode-toogle";
import {Footer} from "@/components/ui/footer";
import { TrackingBeam } from "@/components/ui/tracking-beam";

const inter = Inter({subsets: ["latin"]});

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
                <TrackingBeam>
                {children}
                <Footer />
                </TrackingBeam>
            </ThemeProvider>
            </body>
            </html>
        </>
    );
}
