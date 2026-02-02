import dynamic from 'next/dynamic'
import { RootLayout } from '@/components/studio/RootLayout'
import { HeroSection } from '@/components/sections/landing/hero-section'
import { ServicesSection } from '@/components/sections/landing/services-section'
import { WhyChooseUsSection } from '@/components/sections/landing/why-choose-us-section'
import { ServiceAreasSection } from '@/components/sections/landing/service-areas-section'
import {
  LocalBusinessJsonLd,
  ServicesJsonLd,
  WebsiteJsonLd,
} from '@/components/seo/json-ld'

const GallerySection = dynamic(() =>
  import('@/components/sections/landing/gallery-section').then(mod => ({ default: mod.GallerySection }))
)

const VideoGallerySection = dynamic(() =>
  import('@/components/sections/landing/video-gallery-section').then(mod => ({ default: mod.VideoGallerySection }))
)

const TestimonialsSection = dynamic(() =>
  import('@/components/sections/landing/testimonials-section').then(mod => ({ default: mod.TestimonialsSection }))
)

const ContactSection = dynamic(() =>
  import('@/components/sections/landing/contact-section').then(mod => ({ default: mod.ContactSection }))
)

const FloatingCTA = dynamic(() =>
  import('@/components/sections/landing/floating-cta').then(mod => ({ default: mod.FloatingCTA }))
)

export default function HomePage() {
  return (
    <RootLayout>
      <LocalBusinessJsonLd />
      <ServicesJsonLd />
      <WebsiteJsonLd />
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <VideoGallerySection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <ServiceAreasSection />
      <ContactSection />
      <FloatingCTA />
    </RootLayout>
  )
}
