import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'
import { SITE_CONFIG, SERVICES, SERVICE_AREAS } from '@/lib/constants'

const navigation = [
  {
    title: 'Services',
    links: SERVICES.slice(0, 4).map(service => ({
      title: service.title,
      href: '#services',
    })),
  },
  {
    title: 'Company',
    links: [
      { title: 'About Us', href: '#about' },
      { title: 'Testimonials', href: '#testimonials' },
      { title: 'Service Areas', href: '#areas' },
      { title: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { title: 'TikTok', href: SITE_CONFIG.social.tiktok },
    ],
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-primary">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-primary"
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ContactInfo() {
  return (
    <div className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-primary">
        Contact Us
      </h2>
      <div className="mt-4 space-y-4 text-sm text-neutral-700">
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex items-center gap-2 transition hover:text-primary"
        >
          <Phone className="h-4 w-4" />
          {SITE_CONFIG.phone}
        </a>
        <a
          href={`mailto:${SITE_CONFIG.email}`}
          className="flex items-center gap-2 transition hover:text-primary"
        >
          <Mail className="h-4 w-4" />
          {SITE_CONFIG.email}
        </a>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <ContactInfo />
          </div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-primary/10 pt-12">
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.avif"
              alt="Leo's Home Experts"
              width={160}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
          <p className="text-sm text-neutral-700">
            &copy; {SITE_CONFIG.name} {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
