import { SITE_CONFIG, SERVICES } from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    description:
      "Expert patio construction, remodeling, motorized screens, and awning installation in Houston, TX. Licensed, insured, and trusted by homeowners.",
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.emails[0],
    image: `${SITE_CONFIG.url}/brand/og-image.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "29.7604",
      longitude: "-95.3698",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Houston",
        "@id": "https://www.wikidata.org/wiki/Q16555",
      },
      {
        "@type": "State",
        name: "Texas",
      },
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: [SITE_CONFIG.social.tiktok],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServicesJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "LocalBusiness",
          name: SITE_CONFIG.name,
        },
        areaServed: {
          "@type": "Place",
          name: service.serviceArea,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    publisher: {
      "@id": `${SITE_CONFIG.url}/#localbusiness`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
