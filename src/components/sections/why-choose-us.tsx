import { Shield, Calculator, Award, MapPin } from "lucide-react";
import { FEATURES } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Calculator,
  Award,
  MapPin,
};

export function WhyChooseUs() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Houston&apos;s Trusted Home Improvement Experts
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              With over a decade of experience serving the Houston area, we take
              pride in delivering exceptional craftsmanship and customer
              service. Our team is dedicated to transforming your house into the
              home of your dreams.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map((feature) => {
                const Icon = iconMap[feature.icon] || Shield;
                return (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div
                className="h-48 bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop')",
                }}
              />
              <div
                className="h-64 bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1000&auto=format&fit=crop')",
                }}
              />
            </div>
            <div className="space-y-4 pt-8">
              <div
                className="h-64 bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1000&auto=format&fit=crop')",
                }}
              />
              <div
                className="h-48 bg-cover bg-center rounded-xl"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1600573472591-ee6c563aaec3?q=80&w=1000&auto=format&fit=crop')",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
