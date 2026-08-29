import { describe, it, expect } from "vitest";
import { buildStubVariants } from "@/lib/generate";
import { generateCopySchema } from "@/lib/contracts/copywriting";

describe("contracts", () => {
  it("rejects short productName", () => {
    expect(generateCopySchema.safeParse({ productName: "A", description: "x".repeat(20), platform: "instagram", tone: "santai" }).success).toBe(false);
  });
  it("rejects short description", () => {
    expect(generateCopySchema.safeParse({ productName: "Keripik", description: "enak", platform: "instagram", tone: "santai" }).success).toBe(false);
  });
  it("accepts valid", () => {
    expect(generateCopySchema.safeParse({ productName: "Keripik Singkong", description: "Keripik singkong 500gr renyah tanpa pengawet harga 15rb cocok keluarga", platform: "instagram", tone: "ceria" }).success).toBe(true);
  });
});

describe("stub distinct 12 cases", () => {
  const platforms = ["instagram", "whatsapp", "marketplace", "poster"] as const;
  const tones = ["santai", "formal", "ceria"] as const;
  for (const p of platforms) for (const t of tones) {
    it(`${p} × ${t} distinct`, () => {
      const vars = buildStubVariants({ productName: "Keripik", description: "Keripik singkong 500gr renyah tanpa pengawet harga 15rb", platform: p, tone: t });
      expect(vars).toHaveLength(3);
      expect(new Set(vars).size).toBe(3);
      if (p === "instagram") expect(vars[0]).toContain("#");
      if (p === "whatsapp") expect(vars[0]).toContain("*");
      if (p === "marketplace") expect(vars.some((v) => v.includes("|"))).toBe(true);
      if (p === "poster") expect(vars[0]).toBe(vars[0].toUpperCase());
    });
  }
});
