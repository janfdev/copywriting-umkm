import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.testimonial.findMany({ where: { status: "approved", isMarquee: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ status: "success", data: items });
}
