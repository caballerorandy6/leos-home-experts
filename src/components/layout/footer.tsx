import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SITE_CONFIG, NAV_LINKS, SERVICES, SERVICE_AREAS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image
              src="/brand/logo.avif"
              alt="Leo's Home Experts Logo"
              width={200}
              height={70}
              className="h-16 w-auto brightness-0 invert contrast-110"
            />
            <p className="text-white/80 text-sm">
              Your trusted partner for home improvement in Houston and
              surrounding areas. Quality craftsmanship, honest pricing.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={SITE_CONFIG.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href="#services"
                    className="text-white/80 text-sm hover:text-secondary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Service Areas</h3>
            <ul className="space-y-2">
              {SERVICE_AREAS.houston.slice(0, 6).map((area) => (
                <li key={area} className="text-white/80 text-sm">
                  {area}, TX
                </li>
              ))}
              <li className="text-secondary text-sm font-medium">
                + More cities
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="flex items-center gap-2 text-white/80 text-sm hover:text-secondary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              {SITE_CONFIG.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-white/80 text-sm hover:text-secondary transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {email}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-2 text-white/80 text-sm">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
