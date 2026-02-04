'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Hammer, Sun, Umbrella, Play, X, ArrowRight } from 'lucide-react'
import { Container } from '@/components/studio/Container'
import { FadeIn, FadeInStagger } from '@/components/studio/FadeIn'
import { SectionIntro } from '@/components/studio/SectionIntro'
import { SERVICES } from '@/lib/constants'

const serviceIcons: Record<string, React.ElementType> = {
  'patio-build-remodeling': Hammer,
  'motorized-screens': Sun,
  'awnings': Umbrella,
}

const SERVICE_VIDEOS: Record<string, { id: string; title: string }[]> = {
  'patio-build-remodeling': [
    { id: 'patio-build-remodeling-1', title: 'Patio Build' },
    { id: 'patio-build-remodeling-2', title: 'Patio Renovation' },
    { id: 'patio-build-remodeling-3', title: 'Patio Remodeling' },
  ],
  'motorized-screens': [
    { id: 'patio-shades-1', title: 'Motorized Screens' },
    { id: 'patio-shades-2', title: 'Custom Screens' },
    { id: 'patio-shades-3', title: 'Screen Installation' },
  ],
  'awnings': [
    { id: 'awning-1', title: 'Awning Installation' },
    { id: 'awning-2', title: 'Residential Awning' },
    { id: 'awning-3', title: 'Awning Project' },
  ],
}

function getVideoUrl(id: string) {
  return `https://res.cloudinary.com/caballerorandy/video/upload/f_auto,q_auto/leos-home-expert/${id}`
}

interface ServiceModalProps {
  service: typeof SERVICES[number] | null
  onClose: () => void
}

function ServiceModal({ service, onClose }: ServiceModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null)

  const closeDialog = useCallback(() => {
    if (activeVideo) {
      setActiveVideo(null)
    } else {
      onClose()
    }
  }, [activeVideo, onClose])

  useEffect(() => {
    if (!service) return

    closeButtonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDialog()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [service, closeDialog])

  if (!service) return null

  const videos = SERVICE_VIDEOS[service.id] || []
  const Icon = serviceIcons[service.id] || Hammer

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-label={`${service.title} videos`}
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeDialog}
        role="button"
        tabIndex={-1}
        aria-label="Close dialog"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeDialog() }}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-primary">
                {service.title}
              </h2>
              <p className="text-sm text-neutral-500">{service.serviceArea}</p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100 focus-visible:bg-neutral-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-5 w-5 text-neutral-500" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-neutral-600 mb-6">{service.description}</p>

          <h3 className="font-semibold text-primary mb-4">Our Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {videos.map((video) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideo(video)}
                aria-label={`Watch ${video.title} video`}
                className="relative w-full overflow-hidden rounded-xl group shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <video
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="w-full aspect-4/3 object-cover"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0 }}
                >
                  <source src={getVideoUrl(video.id)} type="video/mp4" />
                </video>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="h-5 w-5 text-primary ml-0.5" aria-hidden="true" />
                  </div>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black/70 to-transparent">
                  <span className="text-white font-medium text-sm">{video.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50 shrink-0">
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
          >
            Get a Free Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Video Playback Modal */}
      {activeVideo && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center p-4"
          role="dialog"
          aria-label={`${activeVideo.title} video`}
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setActiveVideo(null)}
            role="button"
            tabIndex={-1}
            aria-label="Close video"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveVideo(null) }}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100">
              <span className="font-semibold text-primary text-sm">{activeVideo.title}</span>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X className="h-5 w-5 text-neutral-500" aria-hidden="true" />
              </button>
            </div>
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full aspect-square object-cover"
            >
              <source src={getVideoUrl(activeVideo.id)} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  )
}

export function ServicesSection() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[number] | null>(null)

  return (
    <>
      <section id="services" className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40">
        <SectionIntro
          eyebrow="Services"
          title="Expert Patio & Outdoor Solutions"
        >
          <p>
            From custom patio builds to professional motorized screen and awning installations,
            we provide quality outdoor living solutions tailored to your needs.
          </p>
        </SectionIntro>
        <Container className="mt-16">
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = serviceIcons[service.id] || Hammer
              return (
                <FadeIn key={service.id} className="flex">
                  <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-primary/5 transition-colors duration-200 hover:bg-neutral-50 sm:p-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-primary text-pretty">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-base text-neutral-600">
                      {service.description}
                    </p>
                    <p className="mt-4 text-sm font-medium text-secondary">
                      {service.serviceArea}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer group"
                    >
                      See Our Work
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </button>
                  </article>
                </FadeIn>
              )
            })}
          </FadeInStagger>
        </Container>
      </section>

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </>
  )
}
