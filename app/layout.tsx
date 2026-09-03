import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";
import ScrollProgress from "@/components/ScrollProgress";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Burra Bristol — Award-Winning Coffee",
  description:
    "Inspiring our community through award-winning coffee, food & drink. Three locations across Bristol: Redland, North Street & Clifton Village.",
  openGraph: {
    title: "Burra Bristol",
    description: "Award-winning Antipodean café in Bristol.",
    url: "https://burrabristol.co.uk",
    siteName: "Burra Bristol",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased" style={{ backgroundColor: "var(--cream)" }}>
        <CartProvider>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
