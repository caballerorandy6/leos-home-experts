import { Hammer, Sun, Umbrella } from 'lucide-react'
import { Container } from '@/components/studio/Container'
import { FadeIn, FadeInStagger } from '@/components/studio/FadeIn'
import { SectionIntro } from '@/components/studio/SectionIntro'
import { SERVICES } from '@/lib/constants'

const serviceIcons: Record<string, React.ElementType> = {
  'patio-build-remodeling': Hammer,
  'patio-shades': Sun,
  'awnings': Umbrella,
}

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Services"
        title="Expert Patio & Outdoor Solutions"
      >
        <p>
          From custom patio builds to professional shade and awning installations,
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
                </article>
              </FadeIn>
            )
          })}
        </FadeInStagger>
      </Container>
    </section>
  )
}
