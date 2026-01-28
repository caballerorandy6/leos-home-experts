import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Interior Remodeling & Patio Services Houston TX`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Expert interior remodeling, patio renovations, shades, curtains, and awnings in Houston, TX. Licensed, insured, and trusted by homeowners. Get a free quote today!",
  metadataBase: new URL(SITE_CONFIG.url),
  keywords: [
    "interior remodeling Houston",
    "patio remodeling Houston TX",
    "patio shades Houston",
    "awnings Houston Texas",
    "curtains installation Houston",
    "home remodeling near me",
    "Houston home improvement",
    "outdoor living spaces Houston",
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Interior Remodeling & Patio Services Houston TX`,
    description:
      "Expert interior remodeling, patio renovations, shades, curtains, and awnings in Houston, TX. Get a free quote today!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Interior Remodeling & Patio Services Houston TX`,
    description:
      "Expert interior remodeling, patio renovations, shades, curtains, and awnings in Houston, TX.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
