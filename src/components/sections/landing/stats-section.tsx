import { Container } from '@/components/studio/Container'
import { FadeIn } from '@/components/studio/FadeIn'
import { StatList, StatListItem } from '@/components/studio/StatList'

export function StatsSection() {
  return (
    <section className="mt-24 sm:mt-32 lg:mt-40">
      <Container>
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
    </section>
  )
}
