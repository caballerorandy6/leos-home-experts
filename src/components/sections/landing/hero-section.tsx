'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Phone, CheckCircle, ArrowRight } from 'lucide-react'
import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'
import { QuoteForm } from '@/components/sections/quote-form'
import { SITE_CONFIG } from '@/lib/constants'

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      setShowVideo(true)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Fallback Image */}
        <Image
          src="/carousel/patio-build-remodeling-1.avif"
          alt="Professional patio construction and remodeling by Leo's Home Experts in Houston, TX"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Video */}
        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/carousel/patio-build-remodeling-1.avif"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://res.cloudinary.com/caballerorandy/video/upload/f_auto,q_auto/leos-home-expert/hero-video" type="video/webm" />
          </video>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/70 via-primary/50 to-primary/30" />
      </div>

      <Container className="relative z-10 py-24 pt-32 lg:py-32 lg:pt-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <FadeIn>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full text-white text-sm mb-8 border border-white/20">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" aria-hidden="true" />
              Serving Houston &amp; 150 Miles Around
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance text-white leading-[1.1]"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
            >
              Transform Your{' '}
              <span className="text-secondary drop-shadow-lg">Outdoor Space</span>
            </h1>

            <p
              className="mt-6 text-lg sm:text-xl text-white max-w-xl leading-relaxed"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
            >
              Expert patio construction, remodeling, custom shades,
              and awnings. Quality craftsmanship and honest pricing.
            </p>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              {[
                { value: '500+', label: 'Projects' },
                { value: '10+', label: 'Years' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/90" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons - Mobile */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 lg:hidden">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary/90 text-primary font-semibold text-lg rounded-full shadow-lg transition-colors duration-200"
              >
                Get Free Quote
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold text-lg rounded-full border-2 border-white/30 backdrop-blur-md transition-colors duration-200"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Now
              </a>
            </div>

            {/* Features List - Desktop */}
            <ul className="mt-10 hidden lg:flex flex-wrap gap-x-6 gap-y-2">
              {['Licensed & Insured', 'Free Estimates', 'Quality Materials'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-white text-sm drop-shadow-md">
                  <CheckCircle className="h-4 w-4 text-secondary shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Right: Quick Contact Form */}
          <FadeIn className="hidden lg:block">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
              <QuoteForm variant="hero" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
