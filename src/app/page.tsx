import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { ServiceAreas } from "@/components/sections/service-areas";
import { ContactForm } from "@/components/sections/contact-form";
import { FloatingCTA } from "@/components/sections/floating-cta";
import {
  LocalBusinessJsonLd,
  ServicesJsonLd,
  WebsiteJsonLd,
} from "@/components/seo/json-ld";

export default function Home() {
  return (
    <>
      {/* Schema Markup */}
      <LocalBusinessJsonLd />
      <ServicesJsonLd />
      <WebsiteJsonLd />

      {/* Page Content */}
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Testimonials />
        <ServiceAreas />
        <ContactForm />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
