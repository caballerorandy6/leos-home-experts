import { Star } from 'lucide-react'
import { Container } from '@/components/studio/Container'
import { FadeIn, FadeInStagger } from '@/components/studio/FadeIn'
import { SectionIntro } from '@/components/studio/SectionIntro'
import { GridPattern } from '@/components/studio/GridPattern'
import { TESTIMONIALS } from '@/lib/constants'

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-24 relative isolate bg-neutral-50 py-16 sm:py-28 md:py-32 mt-24 sm:mt-32 lg:mt-40">
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
    </section>
  )
}
