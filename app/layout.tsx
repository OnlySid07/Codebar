import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google"
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // elige los pesos
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Generador de Códigos de Barras - PROMART SJL",
  description: "JOS Cam",
  icons: {
    icon: "/Naranjito.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.className} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Contenido principal que crece */}
        <main className="flex-grow">{children}</main>

        {/* Footer abajo */}
        <Footer />
      </body>
    </html>
  );
}
