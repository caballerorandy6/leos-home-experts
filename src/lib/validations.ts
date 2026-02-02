import { z } from "zod";

export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .min(10, "Please enter a valid phone number")
      .max(20, "Phone number is too long")
      .regex(
        /^[\d\s\-\(\)\+]+$/,
        "Phone number can only contain digits, spaces, and dashes"
      ),
    service: z.string().min(1, "Please select a service"),
    width: z.string().optional(),
    height: z.string().optional(),
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must be less than 1000 characters"),
  })
  .superRefine((data, ctx) => {
    if (data.service === "patio-shades") {
      if (!data.width) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter width or select Unknown",
          path: ["width"],
        });
      }
      if (!data.height) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter height or select Unknown",
          path: ["height"],
        });
      }
    }
  });

export type ContactFormData = z.infer<typeof contactFormSchema>;
