import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Outio — Créez plus. Pensez moins.",
    template: "%s | Outio",
  },
  description:
    "Plateforme IA tout-en-un pour créateurs, marketeurs et professionnels. Chat, agents autonomes, images, vidéos, audio et bien plus.",
  keywords: ["IA", "intelligence artificielle", "agents", "création", "marketing", "Afrique"],
  authors: [{ name: "Outio" }],
  creator: "Outio",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://outio.ai",
    siteName: "Outio",
    title: "Outio — Créez plus. Pensez moins.",
    description: "Plateforme IA tout-en-un pour créateurs et professionnels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Outio — Créez plus. Pensez moins.",
    description: "Plateforme IA tout-en-un pour créateurs et professionnels.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
