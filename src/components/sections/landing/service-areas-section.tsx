import { CheckCircle } from 'lucide-react'
import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'
import { SectionIntro } from '@/components/studio/SectionIntro'
import { SERVICE_AREAS } from '@/lib/constants'

export function ServiceAreasSection() {
  return (
    <section id="areas" className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40">
      <Container>
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
    </section>
  )
}
