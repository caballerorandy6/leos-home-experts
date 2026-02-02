import { RootLayout } from '@/components/studio/RootLayout'
import { HeroSection } from '@/components/sections/landing/hero-section'
import { GallerySection } from '@/components/sections/landing/gallery-section'
import { VideoGallerySection } from '@/components/sections/landing/video-gallery-section'
import { ServicesSection } from '@/components/sections/landing/services-section'
import { TestimonialsSection } from '@/components/sections/landing/testimonials-section'
import { WhyChooseUsSection } from '@/components/sections/landing/why-choose-us-section'
import { ServiceAreasSection } from '@/components/sections/landing/service-areas-section'
import { ContactSection } from '@/components/sections/landing/contact-section'
import { FloatingCTA } from '@/components/sections/landing/floating-cta'
import {
  LocalBusinessJsonLd,
  ServicesJsonLd,
  WebsiteJsonLd,
} from '@/components/seo/json-ld'

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
