"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ArrowRight, Loader2, Send } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { submitContactForm } from "@/actions/contact";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

interface QuoteFormProps {
  variant?: "hero" | "contact";
}

const inputBase =
  "w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors";

const inputError = "border-red-400 focus:border-red-500 focus:ring-red-200";

const inputDisabled = "disabled:bg-neutral-100 disabled:text-neutral-400";

export function QuoteForm({ variant = "contact" }: QuoteFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [widthUnknown, setWidthUnknown] = useState(false);
  const [heightUnknown, setHeightUnknown] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const selectedService = watch("service");
  const isHero = variant === "hero";

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(data);

      if (!result.success) {
        throw new Error(result.error);
      }

      setIsSubmitted(true);
      setWidthUnknown(false);
      setHeightUnknown(false);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      alert(
        "There was an error sending your message. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceChange = (value: string) => {
    setValue("service", value);
    if (value !== "patio-shades") {
      setValue("width", undefined);
      setValue("height", undefined);
      setWidthUnknown(false);
      setHeightUnknown(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center ${isHero ? "py-8" : "py-12 h-full"}`}
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">
          Thank You!
        </h3>
        <p className="text-neutral-600">
          We&apos;ll call you back within 24&nbsp;hours.
        </p>
      </div>
    );
  }

  return (
    <>
      {isHero && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-primary">
            Get Your Free Quote
          </h2>
          <p className="text-neutral-600 mt-1">
            We&apos;ll call you back today
          </p>
        </div>
      )}

      {!isHero && (
        <h3 className="text-xl font-semibold text-primary mb-6">
          Request a Free Quote
        </h3>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={isHero ? "space-y-3" : "space-y-5"}
      >
        {/* Name */}
        <div>
          {!isHero && (
            <label htmlFor={`${variant}-name`} className="block text-sm font-medium text-neutral-700 mb-1.5">
              Full Name
            </label>
          )}
          <input
            type="text"
            id={isHero ? undefined : `${variant}-name`}
            placeholder="Full Name"
            autoComplete="name"
            aria-label={isHero ? "Full Name" : undefined}
            aria-invalid={errors.name ? "true" : undefined}
            {...register("name")}
            className={`${inputBase} ${errors.name ? inputError : ""}`}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            {!isHero && (
              <label htmlFor={`${variant}-email`} className="block text-sm font-medium text-neutral-700 mb-1.5">
                Email Address
              </label>
            )}
            <input
              type="email"
              id={isHero ? undefined : `${variant}-email`}
              placeholder="Email Address"
              autoComplete="email"
              spellCheck={false}
              aria-label={isHero ? "Email Address" : undefined}
              aria-invalid={errors.email ? "true" : undefined}
              {...register("email")}
              className={`${inputBase} ${errors.email ? inputError : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            {!isHero && (
              <label htmlFor={`${variant}-phone`} className="block text-sm font-medium text-neutral-700 mb-1.5">
                Phone Number
              </label>
            )}
            <input
              type="tel"
              id={isHero ? undefined : `${variant}-phone`}
              placeholder="Phone Number"
              autoComplete="tel"
              inputMode="tel"
              aria-label={isHero ? "Phone Number" : undefined}
              aria-invalid={errors.phone ? "true" : undefined}
              {...register("phone")}
              className={`${inputBase} ${errors.phone ? inputError : ""}`}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Service */}
        <div>
          {!isHero && (
            <label htmlFor={`${variant}-service`} className="block text-sm font-medium text-neutral-700 mb-1.5">
              Service Needed
            </label>
          )}
          <select
            id={isHero ? undefined : `${variant}-service`}
            aria-label={isHero ? "Service Needed" : undefined}
            aria-invalid={errors.service ? "true" : undefined}
            {...register("service", {
              onChange: (e) => handleServiceChange(e.target.value),
            })}
            className={`${inputBase} text-neutral-600 ${errors.service ? inputError : ""}`}
            defaultValue=""
          >
            <option value="" disabled>
              Select a Service
            </option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
            {!isHero && <option value="other">Other</option>}
          </select>
          {errors.service && (
            <p className="text-sm text-red-500 mt-1" role="alert">
              {errors.service.message}
            </p>
          )}
        </div>

        {/* Patio Shades Measurements */}
        {selectedService === "patio-shades" && (
          <div className={`rounded-xl border border-secondary/30 bg-secondary/5 ${isHero ? "space-y-3 p-3" : "space-y-4 p-4"}`}>
            <p className={`font-medium ${isHero ? "text-xs text-neutral-700" : "text-sm text-neutral-700"}`}>
              Shade Measurements (inches)
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* Width */}
              <div className="space-y-1.5">
                {!isHero && (
                  <label htmlFor={`${variant}-width`} className="block text-sm font-medium text-neutral-700">
                    Width (in)
                  </label>
                )}
                <input
                  type="number"
                  id={isHero ? undefined : `${variant}-width`}
                  inputMode="numeric"
                  placeholder={isHero ? "Width (in)" : "e.g. 120"}
                  aria-label={isHero ? "Width in inches" : undefined}
                  disabled={widthUnknown}
                  aria-invalid={errors.width ? "true" : undefined}
                  {...register("width")}
                  className={`${inputBase} ${inputDisabled} ${errors.width ? inputError : ""}`}
                />
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={widthUnknown}
                    onChange={(e) => {
                      setWidthUnknown(e.target.checked);
                      setValue("width", e.target.checked ? "unknown" : "");
                    }}
                    className="rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-neutral-500">Unknown</span>
                </label>
                {errors.width && (
                  <p className="text-xs text-red-500" role="alert">
                    {errors.width.message}
                  </p>
                )}
              </div>

              {/* Height */}
              <div className="space-y-1.5">
                {!isHero && (
                  <label htmlFor={`${variant}-height`} className="block text-sm font-medium text-neutral-700">
                    Height (in)
                  </label>
                )}
                <input
                  type="number"
                  id={isHero ? undefined : `${variant}-height`}
                  inputMode="numeric"
                  placeholder={isHero ? "Height (in)" : "e.g. 96"}
                  aria-label={isHero ? "Height in inches" : undefined}
                  disabled={heightUnknown}
                  aria-invalid={errors.height ? "true" : undefined}
                  {...register("height")}
                  className={`${inputBase} ${inputDisabled} ${errors.height ? inputError : ""}`}
                />
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={heightUnknown}
                    onChange={(e) => {
                      setHeightUnknown(e.target.checked);
                      setValue("height", e.target.checked ? "unknown" : "");
                    }}
                    className="rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-neutral-500">Unknown</span>
                </label>
                {errors.height && (
                  <p className="text-xs text-red-500" role="alert">
                    {errors.height.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Message */}
        <div>
          {!isHero && (
            <label htmlFor={`${variant}-message`} className="block text-sm font-medium text-neutral-700 mb-1.5">
              Project Details
            </label>
          )}
          <textarea
            id={isHero ? undefined : `${variant}-message`}
            placeholder="Tell us about your project..."
            rows={isHero ? 3 : 4}
            aria-label={isHero ? "Project Details" : undefined}
            aria-invalid={errors.message ? "true" : undefined}
            {...register("message")}
            className={`${inputBase} resize-none ${errors.message ? inputError : ""}`}
          />
          {errors.message && (
            <p className="text-sm text-red-500 mt-1" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`w-full py-4 px-6 font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 ${
            isHero
              ? "bg-secondary hover:bg-secondary/90 text-primary"
              : "bg-primary hover:bg-primary/90 text-white"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : isHero ? (
            <>
              Get Free Quote
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden="true" />
              Send Message
            </>
          )}
        </button>
      </form>

      {isHero && (
        <p className="text-center text-sm text-neutral-500 mt-4">
          Or call us directly:{" "}
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="text-primary font-semibold hover:underline"
          >
            {SITE_CONFIG.phone}
          </a>
        </p>
      )}
    </>
  );
}
