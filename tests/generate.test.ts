import { describe, it, expect } from "vitest";
import { buildStubVariants, GUARDRAILS, buildPrompt } from "@/lib/generate";
import { generateCopySchema } from "@/lib/contracts/copywriting";

describe("contracts", () => {
  it("rejects short productName", () => {
    expect(generateCopySchema.safeParse({ productName: "A", description: "x".repeat(20), platform: "instagram", tone: "santai" }).success).toBe(false);
  });
  it("rejects short description", () => {
    expect(generateCopySchema.safeParse({ productName: "Keripik", description: "enak", platform: "instagram", tone: "santai" }).success).toBe(false);
  });
  it("accepts valid instagram", () => {
    expect(generateCopySchema.safeParse({ productName: "Keripik Singkong", description: "Keripik singkong 500gr renyah tanpa pengawet harga 15rb cocok keluarga", platform: "instagram", tone: "ceria" }).success).toBe(true);
  });
  it("accepts tiktok/facebook", () => {
    expect(generateCopySchema.safeParse({ productName: "Kopi", description: "x".repeat(20), platform: "tiktok", tone: "persuasif" }).success).toBe(true);
    expect(generateCopySchema.safeParse({ productName: "Kopi", description: "x".repeat(20), platform: "facebook", tone: "formal" }).success).toBe(true);
  });
  it("rejects old platforms", () => {
    expect(generateCopySchema.safeParse({ productName: "Kopi", description: "x".repeat(20), platform: "marketplace" as unknown as string, tone: "santai" }).success).toBe(false);
    expect(generateCopySchema.safeParse({ productName: "Kopi", description: "x".repeat(20), platform: "poster" as unknown as string, tone: "santai" }).success).toBe(false);
  });
});

describe("stub distinct 16 cases", () => {
  const platforms = ["instagram", "whatsapp", "tiktok", "facebook"] as const;
  const tones = ["santai", "formal", "ceria", "persuasif"] as const;
  for (const p of platforms) for (const t of tones) {
    it(`${p} × ${t} distinct`, () => {
      const vars = buildStubVariants({ productName: "Keripik", description: "Keripik singkong 500gr renyah tanpa pengawet harga 15rb", platform: p, tone: t });
      expect(vars).toHaveLength(3);
      expect(new Set(vars).size).toBe(3);
      if (p === "instagram") expect(vars[0]).toContain("#");
      if (p === "whatsapp") expect(vars[0]).toContain("*");
      if (p === "tiktok") expect(vars[0]).toContain("#");
      if (p === "facebook") expect(vars[0]).toContain("#");
    });
  }
});

describe("guardrails", () => {
  it("has guardrails", () => {
    expect(GUARDRAILS).toContain("HANYA");
    expect(GUARDRAILS).toContain("hashtag");
  });
  it("prompt contains guardrails", () => {
    const p = buildPrompt({ productName: "Kopi", description: "Kopi arabika Gayo 250gr sangrai medium", platform: "instagram", tone: "santai" });
    expect(p).toContain("HANYA");
    expect(p).toContain("JSON array 3");
  });
});
