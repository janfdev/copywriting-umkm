import { NextRequest, NextResponse } from "next/server";
import { testimonialsSchema } from "@/lib/contracts/copywriting";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const items = await db.testimonial.findMany({ where: { status: "approved" }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ status: "success", data: items });
  } catch {
    return NextResponse.json({ status: "success", data: [] });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = testimonialsSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ status: "error", message: parsed.error.issues[0].message }, { status: 400 });
  const t = await db.testimonial.create({ data: { ...parsed.data, status: "pending", isMarquee: false } });
  return NextResponse.json({ status: "success", data: t }, { status: 201 });
}
