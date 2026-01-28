import { Phone, Star, CheckCircle, Home as HomeIcon, Hammer, Sun, Blinds, Umbrella } from 'lucide-react'

import { RootLayout } from '@/components/studio/RootLayout'
import { Container } from '@/components/studio/Container'
import { FadeIn, FadeInStagger } from '@/components/studio/FadeIn'
import { SectionIntro } from '@/components/studio/SectionIntro'
import { StatList, StatListItem } from '@/components/studio/StatList'
import { Button } from '@/components/studio/Button'
import { GridPattern } from '@/components/studio/GridPattern'
import { Border } from '@/components/studio/Border'
import { ContactForm } from '@/components/sections/contact-form'
import { SITE_CONFIG, SERVICES, TESTIMONIALS, SERVICE_AREAS } from '@/lib/constants'
import {
  LocalBusinessJsonLd,
  ServicesJsonLd,
  WebsiteJsonLd,
} from "@/components/seo/json-ld"

const serviceIcons: Record<string, React.ElementType> = {
  'interior-remodeling': HomeIcon,
  'patio-remodeling': Hammer,
  'patio-shades': Sun,
  'curtains-shades': Blinds,
  'awnings': Umbrella,
}

function Hero() {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56">
      <FadeIn className="max-w-3xl">
        <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-pretty text-primary sm:text-7xl">
          Transform Your Home Inside &amp; Out
        </h1>
        <p className="mt-6 text-xl text-neutral-600">
          Expert interior remodeling, patio renovations, custom shades, curtains,
          and awnings. Serving Houston and surrounding areas with quality craftsmanship
          and honest pricing.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="#contact" variant="secondary">
            Get Free Quote
          </Button>
          <Button href={`tel:${SITE_CONFIG.phone}`}>
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            Call Now
          </Button>
        </div>
      </FadeIn>
    </Container>
  )
}

function Stats() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="-mx-6 rounded-4xl bg-primary px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="max-w-xl">
              <h2 className="font-display text-3xl font-medium text-balance text-white sm:text-4xl">
                Trusted by Houston Homeowners
              </h2>
              <p className="mt-4 text-neutral-300">
                We take pride in delivering exceptional results that transform houses into dream homes.
              </p>
            </div>
            <div className="mt-16">
              <StatList>
                <StatListItem value="500+" label="Projects Completed" invert />
                <StatListItem value="10+" label="Years Experience" invert />
                <StatListItem value="100%" label="Satisfaction Rate" invert />
              </StatList>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="Complete Home Improvement Solutions"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          From interior renovations to outdoor living spaces, we provide comprehensive
          home improvement services tailored to your needs.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = serviceIcons[service.id] || HomeIcon
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
                </article>
              </FadeIn>
            )
          })}
        </FadeInStagger>
      </Container>
    </>
  )
}

function WhyChooseUs() {
  const features = [
    {
      title: 'Licensed & Insured',
      description: 'Fully licensed and insured for your peace of mind. We meet all Texas state requirements.',
    },
    {
      title: 'Free Estimates',
      description: 'Get a detailed, no-obligation quote for your project. We believe in transparent pricing.',
    },
    {
      title: 'Quality Materials',
      description: 'We use only premium materials from trusted suppliers to ensure lasting results.',
    },
    {
      title: 'Local Houston Business',
      description: 'Proudly serving the Houston community. We understand local needs and building codes.',
    },
  ]

  return (
    <>
      <SectionIntro
        eyebrow="Why Choose Us"
        title="Quality You Can Trust"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          We combine years of experience with a commitment to excellence,
          delivering results that exceed expectations.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <FadeIn key={feature.title}>
                <Border className="pt-8">
                  <h3 className="font-display text-xl font-semibold text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-base text-neutral-600">
                    {feature.description}
                  </p>
                </Border>
              </FadeIn>
            ))}
          </div>
        </FadeInStagger>
      </Container>
    </>
  )
}

function Testimonials() {
  return (
    <div className="relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32 mt-24 sm:mt-32 lg:mt-40">
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full mask-[linear-gradient(to_bottom_left,white_50%,transparent_60%)] fill-neutral-100 stroke-primary/5"
        yOffset={-256}
      />
      <SectionIntro
        eyebrow="Testimonials"
        title="What Our Customers Say"
      >
        <p>
          Don&apos;t just take our word for it. Here&apos;s what Houston
          homeowners have to say about working with us.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <FadeIn key={testimonial.id}>
              <figure className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-primary/5">
                <div className="flex gap-1 mb-4" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-neutral-600">
                  <p>&quot;{testimonial.text}&quot;</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold" aria-hidden="true">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="font-semibold text-primary not-italic">{testimonial.name}</cite>
                    <div className="text-sm text-neutral-500">{testimonial.location}</div>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}

function ServiceAreas() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="-mx-6 rounded-4xl bg-primary px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
          <div className="mx-auto max-w-4xl">
            <SectionIntro
              eyebrow="Service Areas"
              title="Proudly Serving Houston & Beyond"
              invert
              className="!px-0"
            >
              <p>
                We serve the greater Houston area and extend our reach up to 150
                miles for select services.
              </p>
            </SectionIntro>

            <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-white mb-4">
                  Houston Metro Area
                </h3>
                <ul className="grid grid-cols-2 gap-2" role="list">
                  {SERVICE_AREAS.houston.slice(0, 8).map((city) => (
                    <li key={city} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-secondary shrink-0" aria-hidden="true" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white mb-4">
                  Extended Service Area (150 mi)
                </h3>
                <ul className="grid grid-cols-2 gap-2" role="list">
                  {SERVICE_AREAS.extended.slice(0, 8).map((city) => (
                    <li key={city} className="flex items-center gap-2 text-neutral-300 text-sm">
                      <CheckCircle className="h-4 w-4 text-secondary shrink-0" aria-hidden="true" />
                      {city}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-neutral-400">
                  * Curtains, Shades &amp; Awnings services available
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}

function Contact() {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-40" id="contact">
      <ContactForm />
    </div>
  )
}

export default function Home() {
  return (
    <RootLayout>
      <LocalBusinessJsonLd />
      <ServicesJsonLd />
      <WebsiteJsonLd />
      <Hero />
      <Stats />
      <section id="services" className="scroll-mt-24">
        <Services />
      </section>
      <section id="about" className="scroll-mt-24">
        <WhyChooseUs />
      </section>
      <section id="testimonials" className="scroll-mt-24">
        <Testimonials />
      </section>
      <section id="areas" className="scroll-mt-24">
        <ServiceAreas />
      </section>
      <Contact />
    </RootLayout>
  )
}
