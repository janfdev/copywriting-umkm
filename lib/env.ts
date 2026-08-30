import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL required"),
  DIRECT_URL: z.string().optional().transform((v) => (v === "" ? undefined : v)),
  GROQ_API_KEY: z.string().optional().transform((v) => (v === "" ? undefined : v)),
  GROQ_MODEL: z.string().default("llama-3.3-70b-versatile"),
  GEMINI_API_KEY: z.string().optional().transform((v) => (v === "" ? undefined : v)),
  GEMINI_MODEL: z.string().default("gemini-2.0-flash"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET min 16 chars").optional().transform((v) => (v === "" ? undefined : v)),
  ADMIN_EMAIL: z.string().email().optional().transform((v) => (v === "" ? undefined : v)),
  ADMIN_PASSWORD_HASH: z.string().optional().transform((v) => (v === "" ? undefined : v)),
  ADMIN_PASSWORD: z.string().optional().transform((v) => (v === "" ? undefined : v)),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

export function getEnv(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Env validation failed: ${msg}`);
  }
  cached = parsed.data;
  return cached;
}

export function validateEnv(): void {
  getEnv();
}
