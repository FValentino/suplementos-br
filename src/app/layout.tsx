import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/features/cart/context/cart-context";
import { Footer } from "@/features/layout/components/footer";
import { Header } from "@/features/layout/components/header";
import { TopBar } from "@/features/layout/components/top-bar";
import { WhatsAppFab } from "@/features/layout/components/whatsapp-fab";

const displayFont = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Suplementos BR | Suplementación deportiva en Tucumán",
    template: "%s | Suplementos BR",
  },
  description:
    "Tienda online de suplementación deportiva y bienestar en San Miguel de Tucumán. Proteínas, creatinas, pre-entrenos y más. Consultas y pedidos por WhatsApp.",
  applicationName: "Suplementos BR",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <TopBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </CartProvider>
      </body>
    </html>
  );
}
