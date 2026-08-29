import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { isMarquee } = (await req.json().catch(() => ({}))) as { isMarquee?: boolean };
  if (typeof isMarquee !== "boolean") return NextResponse.json({ status: "error", message: "isMarquee boolean required" }, { status: 400 });
  const t = await db.testimonial.update({ where: { id }, data: { isMarquee } });
  return NextResponse.json({ status: "success", data: t });
}
