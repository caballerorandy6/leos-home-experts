'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'
import { SITE_CONFIG, SERVICES } from '@/lib/constants'

const quickFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone required'),
  service: z.string().min(1, 'Select a service'),
  message: z.string().min(10, 'Please describe your project'),
})

type QuickFormData = z.infer<typeof quickFormSchema>

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuickFormData>({
    resolver: zodResolver(quickFormSchema),
  })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      setShowVideo(true)
    }
  }, [])

  const onSubmit = async (data: QuickFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send')
      }

      setIsSubmitted(true)
      reset()
      setTimeout(() => setIsSubmitted(false), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error sending your message. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Fallback Image */}
        <img
          src="/image-8.avif"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video */}
        {showVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/image-8.avif"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/v-8.webm" type="video/webm" />
          </video>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/95 via-primary/85 to-primary/70" />
      </div>

      <Container className="relative z-10 py-24 pt-32 lg:py-32 lg:pt-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <FadeIn>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-8 border border-white/10">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" aria-hidden="true" />
              Serving Houston &amp; 150 Miles Around
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance text-white leading-[1.1]">
              Transform Your Home{' '}
              <span className="text-secondary">Inside &amp; Out</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">
              Expert interior remodeling, patio renovations, custom shades, curtains,
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
                  <div className="text-sm text-white/70">{stat.label}</div>
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-lg rounded-full border-2 border-white/30 backdrop-blur-sm transition-colors duration-200"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call Now
              </a>
            </div>

            {/* Features List - Desktop */}
            <ul className="mt-10 hidden lg:flex flex-wrap gap-x-6 gap-y-2">
              {['Licensed & Insured', 'Free Estimates', 'Quality Materials'].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-white/80 text-sm">
                  <CheckCircle className="h-4 w-4 text-secondary shrink-0" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Right: Quick Contact Form */}
          <FadeIn className="hidden lg:block">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-8" role="status" aria-live="polite">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Thank You!</h3>
                  <p className="text-neutral-600">
                    We&apos;ll call you back within 24&nbsp;hours.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-primary">Get Your Free Quote</h2>
                    <p className="text-neutral-600 mt-1">We&apos;ll call you back today</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        autoComplete="name"
                        aria-invalid={errors.name ? 'true' : undefined}
                        {...register('name')}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1" role="alert">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          autoComplete="email"
                          spellCheck={false}
                          aria-invalid={errors.email ? 'true' : undefined}
                          {...register('email')}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500 mt-1" role="alert">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          autoComplete="tel"
                          inputMode="tel"
                          aria-invalid={errors.phone ? 'true' : undefined}
                          {...register('phone')}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-500 mt-1" role="alert">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <select
                        aria-invalid={errors.service ? 'true' : undefined}
                        {...register('service')}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors text-neutral-600"
                        defaultValue=""
                      >
                        <option value="" disabled>Select a Service</option>
                        {SERVICES.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-sm text-red-500 mt-1" role="alert">{errors.service.message}</p>
                      )}
                    </div>

                    <div>
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={3}
                        aria-invalid={errors.message ? 'true' : undefined}
                        {...register('message')}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none"
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500 mt-1" role="alert">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="w-full py-4 px-6 bg-secondary hover:bg-secondary/90 text-primary font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Get Free Quote
                          <ArrowRight className="h-5 w-5" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-center text-sm text-neutral-500 mt-4">
                    Or call us directly:{' '}
                    <a href={`tel:${SITE_CONFIG.phone}`} className="text-primary font-semibold hover:underline">
                      {SITE_CONFIG.phone}
                    </a>
                  </p>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
