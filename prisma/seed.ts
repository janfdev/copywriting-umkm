import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@kaligawe.local";
  const adminPlain = process.env.ADMIN_PASSWORD || process.env.SEED_ADMIN_PASSWORD || "admin123";
  const hash = bcrypt.hashSync(adminPlain, 10);

  await db.user.upsert({
    where: { email: adminEmail },
    update: { role: "admin" },
    create: { email: adminEmail, name: "Admin Kaligawe", role: "admin" },
  });

  await db.testimonial.deleteMany();
  await db.testimonial.createMany({
    data: [
      { name: "Bu Siti", quote: "Copy-nya langsung laris di WA, pembeli nanya terus!", rating: 5, status: "approved", isMarquee: true },
      { name: "Pak Joko", quote: "Biasa bingung caption IG, sekarang 30 detik jadi.", rating: 5, status: "approved", isMarquee: true },
      { name: "Mbak Rina", quote: "Marketplace butuh judul SEO, dibantu banget.", rating: 4, status: "approved", isMarquee: false },
    ],
  });

  console.log(`Seed done — admin: ${adminEmail} (hash bcrypt 10, plain from ADMIN_PASSWORD/SEED_ADMIN_PASSWORD or default "admin123")`);
  console.log(`Hash preview: ${hash.slice(0, 12)}... — set ADMIN_PASSWORD_HASH="${hash}" in env for login`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
