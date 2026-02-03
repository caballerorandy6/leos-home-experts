import { z } from "zod";

const shadeMeasurementSchema = z.object({
  width: z.string().min(1, "Please enter width or select Unknown"),
  height: z.string().min(1, "Please enter height or select Unknown"),
});

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .length(10, "Please enter a valid 10-digit phone number")
      .regex(/^\d{10}$/, "Please enter only 10 digits"),
    service: z.string().min(1, "Please select a service"),
    shadeCount: z.number().min(1).max(10).optional(),
    shades: z.array(shadeMeasurementSchema).optional(),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must be less than 1000 characters"),
  })
  .check((ctx) => {
    const data = ctx.value;
    if (data.service === "patio-shades") {
      if (!data.shadeCount || data.shadeCount < 1) {
        ctx.issues.push({
          code: "custom",
          message: "Please select the number of shades",
          path: ["shadeCount"],
          input: data,
        });
      }
      if (!data.shades || data.shades.length === 0) {
        ctx.issues.push({
          code: "custom",
          message: "Please enter measurements for at least one shade",
          path: ["shades"],
          input: data,
        });
      }
      if (data.shades && data.shadeCount) {
        for (let i = 0; i < data.shadeCount; i++) {
          const shade = data.shades[i];
          if (!shade?.width) {
            ctx.issues.push({
              code: "custom",
              message: "Please enter width or select Unknown",
              path: ["shades", i, "width"],
              input: data,
            });
          }
          if (!shade?.height) {
            ctx.issues.push({
              code: "custom",
              message: "Please enter height or select Unknown",
              path: ["shades", i, "height"],
              input: data,
            });
          }
        }
      }
    }
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ShadeMeasurement = z.infer<typeof shadeMeasurementSchema>;
