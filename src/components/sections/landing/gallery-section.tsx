'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'
import { SectionIntro } from '@/components/studio/SectionIntro'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const GALLERY_IMAGES = [
  {
    src: '/carousel/patio-build-remodeling-1.avif',
    alt: 'Custom patio build project in Houston',
    title: 'Patio Build',
  },
  {
    src: '/carousel/patio-build-remodeling-2.avif',
    alt: 'Patio remodeling with custom design',
    title: 'Patio Remodeling',
  },
  {
    src: '/carousel/patio-build-remodeling-3.avif',
    alt: 'Outdoor patio construction project',
    title: 'Patio Construction',
  },
  {
    src: '/carousel/patio-shades-1.avif',
    alt: 'Custom patio shades installation in Houston',
    title: 'Patio Shades',
  },
  {
    src: '/carousel/patio-shades-2.avif',
    alt: 'Premium shade solutions for outdoor spaces',
    title: 'Custom Shades',
  },
  {
    src: '/carousel/patio-shades-3.avif',
    alt: 'Professional patio shade project',
    title: 'Shade Installation',
  },
  {
    src: '/carousel/awning-1.avif',
    alt: 'Professional awning installation',
    title: 'Awnings',
  },
  {
    src: '/carousel/awning-2.avif',
    alt: 'Custom awning for residential home',
    title: 'Residential Awning',
  },
  {
    src: '/carousel/awning-3.avif',
    alt: 'Awning project showcase in Houston area',
    title: 'Awning Project',
  },
]

export function GallerySection() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section id="gallery" className="scroll-mt-24 py-24 sm:py-32 bg-neutral-50">
      <SectionIntro
        eyebrow="Our Work"
        title="Projects That Speak for Themselves"
      >
        <p>
          Take a look at some of our recent projects. Quality craftsmanship
          that transforms Houston homes.
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <FadeIn>
          {isMounted && <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {GALLERY_IMAGES.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl group shadow-md hover:shadow-2xl transition-[transform,box-shadow] duration-500 hover:-translate-y-1">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Title on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <span className="text-white font-semibold text-sm tracking-wide drop-shadow-lg">
                        {image.title}
                      </span>
                    </div>

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-4 lg:-left-12 bg-white/90 hover:bg-white border-none shadow-lg" />
            <CarouselNext className="hidden sm:flex -right-4 lg:-right-12 bg-white/90 hover:bg-white border-none shadow-lg" />
          </Carousel>}
        </FadeIn>
      </Container>
    </section>
  )
}
