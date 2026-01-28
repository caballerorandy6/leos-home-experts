"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              Ready to Transform Your Home?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today for a free, no-obligation quote. Our team is
              ready to help bring your vision to life.
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
                  <Phone className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Call Us</div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {SITE_CONFIG.phone}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-200">
                  <Mail className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email Us</div>
                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {SITE_CONFIG.email}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-semibold text-foreground">
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-muted rounded-2xl p-6 md:p-8">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12" role="status" aria-live="polite">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  We&apos;ve received your message and will get back to you
                  within 24&nbsp;hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Request a Free Quote
                </h3>

                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Smith…"
                    autoComplete="name"
                    aria-invalid={errors.name ? "true" : undefined}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com…"
                    autoComplete="email"
                    spellCheck={false}
                    aria-invalid={errors.email ? "true" : undefined}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="(713) 555-0123…"
                    autoComplete="tel"
                    aria-invalid={errors.phone ? "true" : undefined}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    {...register("phone")}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-sm text-destructive" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Service */}
                <div className="space-y-2">
                  <Label htmlFor="service">Service Needed</Label>
                  <Select onValueChange={(value) => setValue("service", value)}>
                    <SelectTrigger
                      id="service"
                      aria-invalid={errors.service ? "true" : undefined}
                      aria-describedby={errors.service ? "service-error" : undefined}
                      className={errors.service ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select a service…" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <p id="service-error" className="text-sm text-destructive" role="alert">
                      {errors.service.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project…"
                    rows={4}
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive" role="alert">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
