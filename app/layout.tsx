import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import ShaderBackground from "@/components/ShaderBackground";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "X-Faskara | SMAN 1 Pandaan",
  description: "Official class website for X-Faskara SMAN 1 Pandaan - Creative thinkers and future leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`dark scroll-smooth ${plusJakartaSans.variable} ${syne.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="antialiased font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container">
        <ShaderBackground />
        {children}
      </body>
    </html>
  );
}
