import { RootLayout } from '@/components/studio/RootLayout'
import { HeroSection } from '@/components/sections/landing/hero-section'
import { StatsSection } from '@/components/sections/landing/stats-section'
import { ServicesSection } from '@/components/sections/landing/services-section'
import { WhyChooseUsSection } from '@/components/sections/landing/why-choose-us-section'
import { TestimonialsSection } from '@/components/sections/landing/testimonials-section'
import { ServiceAreasSection } from '@/components/sections/landing/service-areas-section'
import { ContactSection } from '@/components/sections/landing/contact-section'
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
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <ServiceAreasSection />
      <ContactSection />
    </RootLayout>
  )
}
