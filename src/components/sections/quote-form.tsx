"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, ArrowRight, Loader2, Send, Check, HelpCircle } from "lucide-react";
import { contactFormSchema, type ContactFormData, SHADE_COLORS } from "@/lib/validations";
import { submitContactForm } from "@/actions/contact";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

interface QuoteFormProps {
  variant?: "hero" | "contact";
}

const inputBase =
  "w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors";

const inputError = "border-red-400 focus:border-red-500 focus:ring-red-200";

const inputDisabled = "disabled:bg-neutral-100 disabled:text-neutral-400";

const SHADE_COUNT_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export function QuoteForm({ variant = "contact" }: QuoteFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unknownFields, setUnknownFields] = useState<Record<string, boolean>>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      shades: [],
      shadeCount: undefined,
      shadeColor: undefined,
    },
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "shades",
  });

  const selectedService = watch("service");
  const shadeColor = watch("shadeColor");
  const shadeCount = watch("shadeCount");
  const isHero = variant === "hero";

  // Update shades array when shadeCount changes
  useEffect(() => {
    if (selectedService === "patio-shades" && shadeCount && shadeCount > 0) {
      const currentShades = fields.length;
      if (shadeCount !== currentShades) {
        const newShades = Array.from({ length: shadeCount }, (_, i) => ({
          width: fields[i]?.width || "",
          height: fields[i]?.height || "",
        }));
        replace(newShades);
      }
    }
  }, [shadeCount, selectedService, fields, replace]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(data);

      if (!result.success) {
        throw new Error(result.error);
      }

      setIsSubmitted(true);
      setUnknownFields({});
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
      setValue("shadeColor", undefined);
      setValue("shadeCount", undefined);
      setValue("shades", []);
      setUnknownFields({});
    }
  };

  const handleUnknownToggle = (fieldKey: string, index: number, field: "width" | "height", checked: boolean) => {
    setUnknownFields((prev) => ({ ...prev, [fieldKey]: checked }));
    setValue(`shades.${index}.${field}`, checked ? "unknown" : "");
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
            aria-describedby={errors.name ? `${variant}-name-error` : undefined}
            {...register("name")}
            className={`${inputBase} ${errors.name ? inputError : ""}`}
          />
          {errors.name && (
            <p id={`${variant}-name-error`} className="text-sm text-red-500 mt-1" role="alert">
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
              aria-describedby={errors.email ? `${variant}-email-error` : undefined}
              {...register("email")}
              className={`${inputBase} ${errors.email ? inputError : ""}`}
            />
            {errors.email && (
              <p id={`${variant}-email-error`} className="text-sm text-red-500 mt-1" role="alert">
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
              aria-describedby={errors.phone ? `${variant}-phone-error` : undefined}
              {...register("phone")}
              className={`${inputBase} ${errors.phone ? inputError : ""}`}
            />
            {errors.phone && (
              <p id={`${variant}-phone-error`} className="text-sm text-red-500 mt-1" role="alert">
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
            aria-describedby={errors.service ? `${variant}-service-error` : undefined}
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
            <p id={`${variant}-service-error`} className="text-sm text-red-500 mt-1" role="alert">
              {errors.service.message}
            </p>
          )}
        </div>

        {/* Patio Shades - Color & Quantity Selection */}
        {selectedService === "patio-shades" && (
          <div className={`rounded-xl border border-secondary/30 bg-secondary/5 ${isHero ? "space-y-3 p-3" : "space-y-4 p-4"}`}>
            {/* Color Selection */}
            <div>
              <label
                className={`block font-medium ${isHero ? "text-xs text-neutral-700 mb-2" : "text-sm text-neutral-700 mb-2"}`}
              >
                Select shade color
              </label>
              <div
                className="flex flex-wrap gap-3"
                role="radiogroup"
                aria-label="Shade color selection"
              >
                {SHADE_COLORS.map((color) => {
                  const isSelected = shadeColor === color.id;
                  const isNotSure = color.id === "not-sure";

                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setValue("shadeColor", color.id)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200 ${
                        isSelected
                          ? "bg-primary/10 ring-2 ring-primary"
                          : "hover:bg-neutral-100"
                      }`}
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={color.label}
                    >
                      {isNotSure ? (
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-dashed transition-colors ${
                            isSelected ? "border-primary bg-primary/10" : "border-neutral-300 bg-neutral-100"
                          }`}
                        >
                          <HelpCircle
                            className={`w-5 h-5 ${isSelected ? "text-primary" : "text-neutral-400"}`}
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full relative transition-transform ${
                            isSelected ? "scale-110" : ""
                          }`}
                          style={{
                            backgroundColor: color.hex ?? undefined,
                            boxShadow: color.id === "white" ? "inset 0 0 0 1px rgba(0,0,0,0.1)" : undefined,
                          }}
                        >
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Check
                                className={`w-5 h-5 ${
                                  color.id === "white" || color.id === "ivory" ? "text-primary" : "text-white"
                                }`}
                                strokeWidth={3}
                                aria-hidden="true"
                              />
                            </div>
                          )}
                        </div>
                      )}
                      <span
                        className={`text-xs font-medium ${
                          isSelected ? "text-primary" : "text-neutral-600"
                        }`}
                      >
                        {color.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.shadeColor && (
                <p className="text-sm text-red-500 mt-2" role="alert">
                  {errors.shadeColor.message}
                </p>
              )}
            </div>

            {/* Quantity Selection */}
            <div>
              <label
                htmlFor={`${variant}-shade-count`}
                className={`block font-medium ${isHero ? "text-xs text-neutral-700 mb-1.5" : "text-sm text-neutral-700 mb-2"}`}
              >
                How many shades do you need?
              </label>
              <select
                id={`${variant}-shade-count`}
                aria-invalid={errors.shadeCount ? "true" : undefined}
                aria-describedby={errors.shadeCount ? `${variant}-shade-count-error` : undefined}
                {...register("shadeCount", { valueAsNumber: true })}
                className={`${inputBase} text-neutral-600 ${errors.shadeCount ? inputError : ""}`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select quantity
                </option>
                {SHADE_COUNT_OPTIONS.map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "shade" : "shades"}
                  </option>
                ))}
              </select>
              {errors.shadeCount && (
                <p id={`${variant}-shade-count-error`} className="text-sm text-red-500 mt-1" role="alert">
                  {errors.shadeCount.message}
                </p>
              )}
            </div>

            {/* Dynamic Shade Measurements */}
            {fields.length > 0 && (
              <div className="space-y-4">
                <p className={`font-medium ${isHero ? "text-xs text-neutral-700" : "text-sm text-neutral-700"}`}>
                  Enter measurements for each shade (inches)
                </p>

                {fields.map((field, index) => {
                  const widthKey = `shade-${index}-width`;
                  const heightKey = `shade-${index}-height`;
                  const shadeErrors = errors.shades?.[index];

                  return (
                    <fieldset
                      key={field.id}
                      className="rounded-lg border border-neutral-200 bg-white p-3"
                    >
                      <legend className="px-2 text-sm font-semibold text-primary">
                        Shade {index + 1}
                      </legend>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Width */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor={`${variant}-${widthKey}`}
                            className="block text-xs font-medium text-neutral-600"
                          >
                            Width (in)
                          </label>
                          <input
                            type="number"
                            id={`${variant}-${widthKey}`}
                            inputMode="numeric"
                            placeholder="e.g. 120"
                            disabled={unknownFields[widthKey]}
                            aria-invalid={shadeErrors?.width ? "true" : undefined}
                            aria-describedby={shadeErrors?.width ? `${variant}-${widthKey}-error` : undefined}
                            {...register(`shades.${index}.width`)}
                            className={`${inputBase} ${inputDisabled} text-sm py-2 ${shadeErrors?.width ? inputError : ""}`}
                          />
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={unknownFields[widthKey] || false}
                              onChange={(e) => handleUnknownToggle(widthKey, index, "width", e.target.checked)}
                              className="rounded border-neutral-300 text-primary focus:ring-primary"
                            />
                            <span className="text-xs text-neutral-500">Unknown</span>
                          </label>
                          {shadeErrors?.width && (
                            <p id={`${variant}-${widthKey}-error`} className="text-xs text-red-500" role="alert">
                              {shadeErrors.width.message}
                            </p>
                          )}
                        </div>

                        {/* Height */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor={`${variant}-${heightKey}`}
                            className="block text-xs font-medium text-neutral-600"
                          >
                            Height (in)
                          </label>
                          <input
                            type="number"
                            id={`${variant}-${heightKey}`}
                            inputMode="numeric"
                            placeholder="e.g. 96"
                            disabled={unknownFields[heightKey]}
                            aria-invalid={shadeErrors?.height ? "true" : undefined}
                            aria-describedby={shadeErrors?.height ? `${variant}-${heightKey}-error` : undefined}
                            {...register(`shades.${index}.height`)}
                            className={`${inputBase} ${inputDisabled} text-sm py-2 ${shadeErrors?.height ? inputError : ""}`}
                          />
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={unknownFields[heightKey] || false}
                              onChange={(e) => handleUnknownToggle(heightKey, index, "height", e.target.checked)}
                              className="rounded border-neutral-300 text-primary focus:ring-primary"
                            />
                            <span className="text-xs text-neutral-500">Unknown</span>
                          </label>
                          {shadeErrors?.height && (
                            <p id={`${variant}-${heightKey}-error`} className="text-xs text-red-500" role="alert">
                              {shadeErrors.height.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            )}
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
            aria-describedby={errors.message ? `${variant}-message-error` : undefined}
            {...register("message")}
            className={`${inputBase} resize-none ${errors.message ? inputError : ""}`}
          />
          {errors.message && (
            <p id={`${variant}-message-error`} className="text-sm text-red-500 mt-1" role="alert">
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
