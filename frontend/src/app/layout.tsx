import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { BRAND } from "@/lib/brand";

const detectraSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Detectra | Fraud Intelligence",
  description: BRAND.description,
  applicationName: BRAND.name,
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Detectra",
    description: BRAND.description,
    images: [{ url: "/preview.png", width: 1200, height: 800, alt: "Detectra Dashboard" }],
    type: "website",
  },
};

import { ChatProvider } from "@/components/providers/ChatProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={detectraSans.variable}>
      <body className="antialiased">
        <ThemeProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
