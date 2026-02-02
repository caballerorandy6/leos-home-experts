"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/studio/Container";
import { FadeIn } from "@/components/studio/FadeIn";
import { SectionIntro } from "@/components/studio/SectionIntro";
import { QuoteForm } from "@/components/sections/quote-form";
import { SITE_CONFIG } from "@/lib/constants";

const contactDetails = [
  {
    icon: Phone,
    label: "Call Us",
    value: SITE_CONFIG.phone,
    href: `tel:${SITE_CONFIG.phone}`,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: SITE_CONFIG.emails as unknown as string[],
  },
  {
    icon: MapPin,
    label: "Location",
    value: `${SITE_CONFIG.address.city}, ${SITE_CONFIG.address.state}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri 8am-6pm, Sat 9am-2pm",
  },
];

export function ContactForm() {
  return (
    <section id="contact" className="scroll-mt-24 mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro
        eyebrow="Contact"
        title="Ready to Transform Your Outdoor Space?"
      >
        <p>
          Get a free, no-obligation quote for your project. Our team is ready to
          help bring your vision to life.
        </p>
      </SectionIntro>

      <Container className="mt-16">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-16">
            {/* Left: Contact Info */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {contactDetails.map((item) => {
                  const Icon = item.icon;
                  const isEmailList = Array.isArray(item.value);

                  const content = (
                    <div className="flex items-start gap-4 group">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary transition-colors duration-200">
                        <Icon
                          className="h-5 w-5 text-primary group-hover:text-white transition-colors duration-200"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">
                          {item.label}
                        </div>
                        {isEmailList ? (
                          <div className="space-y-1">
                            {(item.value as string[]).map((email) => (
                              <a
                                key={email}
                                href={`mailto:${email}`}
                                className="block font-semibold text-primary hover:text-primary/80 transition-colors duration-200 text-sm sm:text-base"
                              >
                                {email}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <div className="font-semibold text-primary group-hover:text-primary/80 transition-colors duration-200">
                            {item.value as string}
                          </div>
                        )}
                      </div>
                    </div>
                  );

                  return item.href ? (
                    <a key={item.label} href={item.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>

              {/* Map / Trust badge area */}
              <div className="mt-10 rounded-2xl bg-primary p-6">
                <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
                  Why Customers Choose Us
                </p>
                <ul className="space-y-3">
                  {[
                    "Free estimates with no obligation",
                    "Licensed & insured professionals",
                    "Serving Houston & 150 miles around",
                    "Quality materials, honest pricing",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm text-white/90"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-secondary shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="rounded-3xl bg-white p-6 sm:p-10 shadow-xl ring-1 ring-primary/5">
                <QuoteForm variant="contact" />
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
