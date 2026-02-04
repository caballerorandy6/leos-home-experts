import { z } from "zod";

const shadeMeasurementSchema = z.object({
  width: z.string().min(1, "Please enter width or select Unknown"),
  height: z.string().min(1, "Please enter height or select Unknown"),
});

export const SHADE_COLORS = [
  { id: "white", label: "White", hex: "#FFFFFF" },
  { id: "black", label: "Black", hex: "#3D3D3D" },
  { id: "beige", label: "Beige", hex: "#A69F8A" },
  { id: "bronze", label: "Bronze", hex: "#5C5C52" },
  { id: "ivory", label: "Ivory", hex: "#E8E4D9" },
  { id: "not-sure", label: "Not sure", hex: null },
] as const;

export type ShadeColorId = (typeof SHADE_COLORS)[number]["id"];

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
    shadeColor: z.string().optional(),
    shadeCount: z.number().min(1).max(10).optional(),
    shades: z.array(shadeMeasurementSchema).optional(),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must be less than 1000 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.service === "patio-shades") {
      if (!data.shadeColor) {
        ctx.addIssue({
          code: "custom",
          message: "Please select a color",
          path: ["shadeColor"],
        });
      }
      if (!data.shadeCount || data.shadeCount < 1) {
        ctx.addIssue({
          code: "custom",
          message: "Please select the number of shades",
          path: ["shadeCount"],
        });
      }
      if (!data.shades || data.shades.length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "Please enter measurements for at least one shade",
          path: ["shades"],
        });
      }
      if (data.shades && data.shadeCount) {
        for (let i = 0; i < data.shadeCount; i++) {
          const shade = data.shades[i];
          if (!shade?.width) {
            ctx.addIssue({
              code: "custom",
              message: "Please enter width or select Unknown",
              path: ["shades", i, "width"],
            });
          }
          if (!shade?.height) {
            ctx.addIssue({
              code: "custom",
              message: "Please enter height or select Unknown",
              path: ["shades", i, "height"],
            });
          }
        }
      }
    }
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ShadeMeasurement = z.infer<typeof shadeMeasurementSchema>;
