import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Patio Build, Shades & Awnings Houston TX`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description:
    "Expert patio construction, remodeling, patio shades, and awning installation in Houston, TX. Licensed, insured, and trusted by homeowners. Get a free quote today!",
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
  keywords: [
    "patio build Houston TX",
    "patio remodeling Houston TX",
    "patio shades Houston",
    "awnings Houston Texas",
    "awning installation Houston",
    "outdoor living spaces Houston",
    "patio construction Houston",
    "Houston home improvement",
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
    title: `${SITE_CONFIG.name} | Patio Build, Shades & Awnings Houston TX`,
    description:
      "Expert patio construction, remodeling, patio shades, and awning installation in Houston, TX. Get a free quote today!",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - Expert patio construction, shades, and awnings in Houston TX`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Patio Build, Shades & Awnings Houston TX`,
    description:
      "Expert patio construction, remodeling, patio shades, and awning installation in Houston, TX.",
    images: ["/brand/og-image.png"],
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
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-primary text-base antialiased scroll-smooth">
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
