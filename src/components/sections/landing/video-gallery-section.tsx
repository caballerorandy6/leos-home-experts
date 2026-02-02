'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Play, X } from 'lucide-react'
import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'

const GALLERY_VIDEOS = [
  { id: 'patio-build-remodeling-1', title: 'Patio Build' },
  { id: 'patio-build-remodeling-2', title: 'Patio Renovation' },
  { id: 'patio-build-remodeling-3', title: 'Patio Remodeling' },
  { id: 'patio-shades-1', title: 'Patio Shades' },
  { id: 'patio-shades-2', title: 'Custom Shades' },
  { id: 'patio-shades-3', title: 'Shade Installation' },
  { id: 'awning-1', title: 'Awning Installation' },
  { id: 'awning-2', title: 'Residential Awning' },
  { id: 'awning-3', title: 'Awning Project' },
]

function getVideoUrl(id: string) {
  return `https://res.cloudinary.com/caballerorandy/video/upload/f_auto,q_auto/leos-home-expert/${id}`
}

export function VideoGallerySection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const dialogVideoRef = useRef<HTMLVideoElement>(null)
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const videos = gridRef.current.querySelectorAll('video')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { rootMargin: '50px 0px', threshold: 0.25 }
    )

    videos.forEach((video) => observer.observe(video))

    return () => observer.disconnect()
  }, [])

  const closeDialog = useCallback(() => {
    setActiveVideo(null)
  }, [])

  useEffect(() => {
    if (!activeVideo) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDialog()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeVideo, closeDialog])

  return (
    <>
      <section className="py-16 sm:py-24 bg-neutral-50">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                <Play className="h-4 w-4" aria-hidden="true" />
                Watch Our Work
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-primary tracking-tight">
                See Our Projects in Action
              </h2>
            </div>
          </FadeIn>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {GALLERY_VIDEOS.map((item) => (
              <FadeIn key={item.id}>
                <button
                  type="button"
                  onClick={() => setActiveVideo(item)}
                  aria-label={`Watch ${item.title} video`}
                  className="relative w-full overflow-hidden rounded-2xl group shadow-md hover:shadow-2xl transition-[transform,box-shadow] duration-500 hover:-translate-y-1 cursor-pointer"
                >
                  <video
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-hidden="true"
                    className="w-full aspect-4/3 object-cover"
                  >
                    <source src={getVideoUrl(item.id)} type="video/mp4" />
                  </video>

                  {/* Play button on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                      <Play className="h-7 w-7 text-primary ml-1" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Title on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out pointer-events-none">
                    <span className="text-white font-semibold text-sm tracking-wide drop-shadow-lg">
                      {item.title}
                    </span>
                  </div>

                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left pointer-events-none" />
                </button>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Video Dialog */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-label={`${activeVideo.title} video`}
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeDialog}
          />

          {/* Dialog Box */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100">
              <span className="font-semibold text-primary text-sm">{activeVideo.title}</span>
              <button
                type="button"
                onClick={closeDialog}
                aria-label="Close video"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5 text-neutral-500" aria-hidden="true" />
              </button>
            </div>

            {/* Video */}
            <video
              ref={dialogVideoRef}
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
    </>
  )
}
