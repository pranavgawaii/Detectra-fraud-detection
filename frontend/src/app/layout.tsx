import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { BRAND } from "@/lib/brand";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Detectra | Fraud Intelligence",
  description: BRAND.description,
  applicationName: BRAND.name,
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
  openGraph: {
    title: "Detectra",
    description: BRAND.description,
    images: [{ url: "/preview.png", width: 1200, height: 800, alt: "Detectra Dashboard" }],
    type: "website",
  },
};

import { ChatProvider } from "@/components/providers/ChatProvider";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={geist.variable}>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider>
          <ChatProvider>
            {children}
            <Analytics />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
