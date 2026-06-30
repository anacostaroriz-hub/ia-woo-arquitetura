import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "IA — WOO Arquitetura",
  description: "Painel de Inteligência Artificial Aplicada à WOO Arquitetura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-inter)]">{children}</body>
    </html>
  );
}
