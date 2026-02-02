import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

import { Container } from '@/components/studio/Container'

const CURRENT_YEAR = new Date().getFullYear()
import { FadeIn } from '@/components/studio/FadeIn'
import { SITE_CONFIG, SERVICES, SERVICE_AREAS } from '@/lib/constants'

const navigation = [
  {
    title: 'Navigation',
    links: [
      { title: 'Services', href: '#services' },
      { title: 'Our Work', href: '#gallery' },
      { title: 'Testimonials', href: '#testimonials' },
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
    <nav aria-label="Footer navigation">
      <ul role="list" className="grid grid-cols-2 gap-8">
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
          aria-label={`Call us at ${SITE_CONFIG.phone}`}
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          {SITE_CONFIG.phone}
        </a>
        <a
          href="mailto:lecour@ac-remodelingservice.com"
          className="flex items-center gap-2 transition hover:text-primary"
          aria-label="Email us at lecour@ac-remodelingservice.com"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          lecour@ac-remodelingservice.com
        </a>
        <a
          href="mailto:leleac1987@gmail.com"
          className="flex items-center gap-2 transition hover:text-primary"
          aria-label="Email us at leleac1987@gmail.com"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          leleac1987@gmail.com
        </a>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" aria-hidden="true" />
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
              src="/brand/logo.avif"
              alt=""
              width={200}
              height={64}
              className="h-16 w-auto"
            />
          </Link>
          <div className="text-sm text-neutral-700">
            <p>&copy; {SITE_CONFIG.name} {CURRENT_YEAR}</p>
            <p className="mt-1">
              Built by{' '}
              <a
                href="https://rcweb.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
              >
                RC Web Solutions LLC
              </a>
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
