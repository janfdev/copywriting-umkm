import { z } from "zod";

export const platformEnum = z.enum(["instagram", "whatsapp", "marketplace", "poster"]);
export const toneEnum = z.enum(["santai", "formal", "persuasif", "ceria"]);

export const generateCopySchema = z.object({
  productName: z.string().min(2, "Minimal 2 karakter").max(60, "Maks 60 karakter"),
  description: z.string().min(20, "Minimal 20 karakter").max(500, "Maks 500 karakter"),
  highlights: z.string().max(200, "Maks 200 karakter").optional().or(z.literal("")),
  platform: platformEnum,
  tone: toneEnum,
});

export type GenerateCopyInput = z.infer<typeof generateCopySchema>;
export type Platform = z.infer<typeof platformEnum>;
export type Tone = z.infer<typeof toneEnum>;

export const testimonialsSchema = z.object({
  name: z.string().min(2).max(60),
  quote: z.string().min(10).max(500),
  rating: z.number().int().min(1).max(5),
});

export type TestimonialInput = z.infer<typeof testimonialsSchema>;
