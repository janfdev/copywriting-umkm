import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  await db.testimonial.deleteMany();
  await db.testimonial.createMany({
    data: [
      { name: "Bu Siti", quote: "Copy-nya langsung laris di WA, pembeli nanya terus!", rating: 5, status: "approved", isMarquee: true },
      { name: "Pak Joko", quote: "Biasa bingung caption IG, sekarang 30 detik jadi.", rating: 5, status: "approved", isMarquee: true },
      { name: "Mbak Rina", quote: "Marketplace butuh judul SEO, dibantu banget.", rating: 4, status: "approved", isMarquee: false },
    ],
  });
  console.log("Seed done");
}
main().finally(() => db.$disconnect());
