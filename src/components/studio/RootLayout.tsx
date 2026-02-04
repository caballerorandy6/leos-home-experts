'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Phone, X, Menu } from 'lucide-react'

import { Button } from '@/components/studio/Button'
import { Container } from '@/components/studio/Container'
import { Footer } from '@/components/studio/Footer'
import { SITE_CONFIG } from '@/lib/constants'

const NAV_ITEMS = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Our Work', href: '#gallery', id: 'gallery' },
  { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

// All sections observed by the scroll spy (hero + nav sections)
const SECTION_IDS = ['home', ...NAV_ITEMS.map((item) => item.id)]

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Track scroll position for header background only
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll spy: IntersectionObserver drives active section + URL hash
  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id

            if (id === 'home') {
              setActiveSection('')
              if (window.location.hash) {
                history.replaceState(null, '', window.location.pathname)
              }
            } else {
              setActiveSection(id)
              const newHash = `#${id}`
              if (window.location.hash !== newHash) {
                history.replaceState(null, '', newHash)
              }
            }
            break
          }
        }
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-20" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" aria-label="Leo's Home Experts - Home" className="shrink-0">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet="/brand/logo-mobile.avif"
                width={144}
                height={48}
              />
              <img
                src="/brand/logo-sm.avif"
                alt=""
                width={168}
                height={56}
                className={clsx(
                  'h-12 w-auto sm:h-14 transition-[filter] duration-300',
                  isScrolled ? 'brightness-100' : 'brightness-0 invert'
                )}
                fetchPriority="high"
              />
            </picture>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={clsx(
                    'relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200',
                    isScrolled
                      ? isActive
                        ? 'text-primary'
                        : 'text-primary/70 hover:text-primary hover:bg-primary/5'
                      : isActive
                        ? 'text-white'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                  {/* Active indicator with animation */}
                  {isActive && (
                    <motion.span
                      layoutId="activeSection"
                      className={clsx(
                        'absolute inset-0 rounded-full -z-10',
                        isScrolled ? 'bg-secondary/20' : 'bg-white/20'
                      )}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-x-4">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              aria-label={`Call us at ${SITE_CONFIG.phone}`}
              className={clsx(
                'flex items-center gap-2 text-sm font-semibold transition-colors duration-200',
                isScrolled
                  ? 'text-primary/70 hover:text-primary'
                  : 'text-white/80 hover:text-white'
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <Button href="#contact" variant="secondary">
              Get Free Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className={clsx(
                'p-2.5 rounded-full transition-colors duration-200',
                isScrolled
                  ? 'text-primary hover:bg-primary/10'
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <Button href="#contact" variant="secondary" className="hidden sm:inline-flex text-xs px-3 py-1">
              Get Quote
            </Button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={clsx(
                'p-2.5 rounded-full transition-colors duration-200',
                isScrolled
                  ? 'text-primary hover:bg-primary/10'
                  : 'text-white hover:bg-white/10',
                isMobileMenuOpen && (isScrolled ? 'bg-primary/10' : 'bg-white/10')
              )}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div
                className="transition-transform duration-200"
                style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </div>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={clsx(
          'lg:hidden bg-white/95 backdrop-blur-md border-t border-primary/10 shadow-lg transition-all duration-200 ease-out overflow-hidden',
          isMobileMenuOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <Container>
          <nav className="py-6" aria-label="Mobile navigation">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      tabIndex={isMobileMenuOpen ? 0 : -1}
                      className={clsx(
                        'flex items-center justify-between px-4 py-3 text-lg font-semibold rounded-xl transition-colors duration-200',
                        isActive
                          ? 'text-primary bg-secondary/20'
                          : 'text-primary/70 hover:text-primary hover:bg-primary/5'
                      )}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 pt-6 border-t border-primary/10 space-y-4">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                aria-label={`Call us at ${SITE_CONFIG.phone}`}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className="flex items-center gap-3 px-4 py-3 text-primary font-semibold rounded-xl hover:bg-primary/5 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs text-primary/60 uppercase tracking-wider">Call Us</div>
                  <div>{SITE_CONFIG.phone}</div>
                </div>
              </a>
              <Button href="#contact" variant="secondary" className="w-full justify-center py-3" tabIndex={isMobileMenuOpen ? 0 : -1} onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#contact')}>
                Get Free Quote
              </Button>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-60 focus:px-3 focus:py-1.5 focus:text-sm focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        Skip to main content
      </a>
      <Header />

      <div className="relative flex flex-auto flex-col bg-white">
        <main id="main-content" className="w-full flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
