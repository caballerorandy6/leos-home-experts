'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Phone, X, Menu } from 'lucide-react'

import { Button } from '@/components/studio/Button'
import { Container } from '@/components/studio/Container'
import { Footer } from '@/components/studio/Footer'
import { SITE_CONFIG } from '@/lib/constants'

const NAV_ITEMS = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
  { label: 'Areas', href: '#areas', id: 'areas' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const shouldReduceMotion = useReducedMotion()

  // Track scroll position for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for active section detection
  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
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

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-20" aria-label="Main navigation">
          {/* Logo */}
          <Link href="/" aria-label="Leo's Home Experts - Home" className="shrink-0">
            <Image
              src="/logo.avif"
              alt=""
              width={180}
              height={60}
              className={clsx(
                'h-12 w-auto sm:h-14 transition-all duration-300',
                isScrolled ? 'brightness-100' : 'brightness-0 invert'
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
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
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-x-4">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
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
          <div className="flex lg:hidden items-center gap-3">
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
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </motion.div>
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-primary/10 shadow-lg"
          >
            <Container>
              <nav className="py-6" aria-label="Mobile navigation">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
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
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <div className="mt-6 pt-6 border-t border-primary/10 space-y-4">
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
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
                  <Button href="#contact" variant="secondary" className="w-full justify-center py-3" onClick={handleLinkClick}>
                    Get Free Quote
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />

      <div className="relative flex flex-auto flex-col bg-white">
        <main className="w-full flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
