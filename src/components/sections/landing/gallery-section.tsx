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

// TODO: Replace with actual project images
const GALLERY_IMAGES = [
  {
    src: '/image-8.avif',
    alt: 'Interior remodeling project in Houston',
    title: 'Interior Remodeling',
  },
  {
    src: '/image-8.avif',
    alt: 'Patio renovation with custom shades',
    title: 'Patio Renovation',
  },
  {
    src: '/image-8.avif',
    alt: 'Custom patio shades installation',
    title: 'Patio Shades',
  },
  {
    src: '/image-8.avif',
    alt: 'Elegant curtains and window treatments',
    title: 'Curtains & Shades',
  },
  {
    src: '/image-8.avif',
    alt: 'Professional awning installation',
    title: 'Awnings',
  },
  {
    src: '/image-8.avif',
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
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500">
                    {/* Image with zoom effect */}
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Decorative border on hover */}
                    <div className="absolute inset-0 border-4 border-secondary/0 group-hover:border-secondary/80 rounded-2xl transition-all duration-500" />

                    {/* Content container */}
                    <div className="absolute inset-0 flex flex-col justify-end p-5">
                      {/* Title badge */}
                      <div className="transform translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <span className="inline-block px-5 py-2.5 bg-secondary text-primary font-bold text-sm rounded-full shadow-lg">
                          {image.title}
                        </span>
                      </div>

                      {/* View project text */}
                      <p className="mt-3 text-white/90 text-sm font-medium transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        View Project →
                      </p>
                    </div>
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
