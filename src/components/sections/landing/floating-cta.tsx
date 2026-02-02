'use client'

import { useEffect, useState } from 'react'
import { MessageSquare, Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 80% of viewport height (roughly past hero)
      const scrollThreshold = window.innerHeight * 0.8
      setIsVisible(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 flex flex-col gap-3 transition-[transform,opacity] duration-300 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      {/* Phone Button - Mobile only */}
      <a
        href={`tel:${SITE_CONFIG.phone}`}
        className="sm:hidden flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors duration-200"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" aria-hidden="true" />
      </a>

      {/* Quote Button */}
      <a
        href="#contact"
        className="flex items-center gap-3 px-5 py-3 bg-secondary text-primary font-semibold rounded-full shadow-lg hover:bg-secondary/90 transition-colors duration-200"
        aria-label="Get a free quote"
      >
        <MessageSquare className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">Get Free Quote</span>
      </a>
    </div>
  )
}
