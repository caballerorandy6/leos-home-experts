import { Container } from '@/components/studio/Container'
import { FadeIn, FadeInStagger } from '@/components/studio/FadeIn'
import { SectionIntro } from '@/components/studio/SectionIntro'
import { Border } from '@/components/studio/Border'

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

export function WhyChooseUsSection() {
  return (
    <section id="about" className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Why Choose Us"
        title="Quality You Can Trust"
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
    </section>
  )
}
