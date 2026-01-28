import { MapPin, CheckCircle } from "lucide-react";
import { SERVICE_AREAS, SERVICES } from "@/lib/constants";

export function ServiceAreas() {
  const houstonServices = SERVICES.filter(
    (s) => s.serviceArea === "Houston Area"
  );
  const extendedServices = SERVICES.filter(
    (s) => s.serviceArea === "150 Miles Around Houston"
  );

  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Content */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Service Areas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Proudly Serving Houston &amp; Beyond
            </h2>
            <p className="text-white/80 text-lg mb-8">
              We serve the greater Houston area and extend our reach up to 150
              miles for select services. No matter where you are in the region,
              quality home improvement is just a call away.
            </p>

            {/* Service Coverage */}
            <div className="space-y-6">
              {/* Houston Area Services */}
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  Houston Metropolitan Area
                </h3>
                <div className="space-y-2">
                  {houstonServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center gap-2 text-white/80"
                    >
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      {service.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Extended Area Services */}
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary" />
                  150 Miles Around Houston
                </h3>
                <div className="space-y-2">
                  {extendedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center gap-2 text-white/80"
                    >
                      <CheckCircle className="h-4 w-4 text-secondary" />
                      {service.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cities Grid */}
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">
                Houston Area Cities We Serve
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_AREAS.houston.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 text-white/80"
                  >
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    {city}, TX
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">
                Extended Service Area
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SERVICE_AREAS.extended.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 text-white/80"
                  >
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                    {city}, TX
                  </div>
                ))}
              </div>
              <p className="text-white/60 text-sm mt-4">
                * Curtains, Shades &amp; Awnings services available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
