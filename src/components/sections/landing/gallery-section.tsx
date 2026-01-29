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
    src: '/carousel/image-9.avif',
    alt: 'Interior remodeling project in Houston',
    title: 'Interior Remodeling',
  },
  {
    src: '/carousel/image-11.avif',
    alt: 'Patio renovation with custom shades',
    title: 'Patio Renovation',
  },
  {
    src: '/carousel/image-12.avif',
    alt: 'Custom patio shades installation',
    title: 'Patio Shades',
  },
  {
    src: '/carousel/image-9.avif',
    alt: 'Elegant curtains and window treatments',
    title: 'Curtains & Shades',
  },
  {
    src: '/carousel/awning.avif',
    alt: 'Professional awning installation',
    title: 'Awnings',
  },
  {
    src: '/carousel/image-11.avif',
    alt: 'Custom home renovation',
    title: 'Home Renovation',
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
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
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
