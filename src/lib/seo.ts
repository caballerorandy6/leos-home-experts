import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface PageMetadata {
  title: string;
  description: string;
  pageRoute: string;
  ogImg?: string;
}

export const genPageMetadata = ({
  title,
  description,
  pageRoute,
  ogImg = "/brand/og-image.png",
}: PageMetadata): Metadata => {
  const fullTitle = `${title} | ${SITE_CONFIG.name}`;
  const url = `${SITE_CONFIG.url}${pageRoute}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: pageRoute,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImg],
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
};
