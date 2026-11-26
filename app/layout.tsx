import type { Metadata } from "next";
import { Kantumruy_Pro } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  variable: "--font-kantumruy-pro",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "KalapakTTS — Open-source Khmer text to speech",
  description:
    "An open-source Khmer text-to-speech studio for learners and creators. Turn your writing into expressive, natural-sounding speech.",
  openGraph: {
    title: "KalapakTTS — Open-source Khmer text to speech",
    description:
      "An open-source Khmer text-to-speech studio for learners and creators. Turn your writing into expressive, natural-sounding speech.",
    siteName: "KalapakTTS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KalapakTTS — Open-source Khmer text to speech",
    description:
      "An open-source Khmer text-to-speech studio for learners and creators. Turn your writing into expressive, natural-sounding speech.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kantumruyPro.variable}>{children}</body>
    </html>
  );
}
