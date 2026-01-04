import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SquareFaceAI - Transform Your Photo into a Unique Pixel Avatar",
  description: "AI-powered photo to pixel avatar generator. Transform your photo into a unique pixel avatar in seconds with advanced AI technology.",
  keywords: [
    "square face icon generator",
    "photo to pixel avatar",
    "ai avatar generator from photo",
    "pixel avatar maker",
    "discord avatar generator",
  ],
  authors: [{ name: "SquareFaceAI" }],
  openGraph: {
    title: "SquareFaceAI - Your Face, Pixelated Perfectly",
    description: "Transform your photo into a unique pixel avatar in seconds",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
