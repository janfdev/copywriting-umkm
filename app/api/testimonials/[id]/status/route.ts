import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = (await req.json().catch(() => ({}))) as { status?: string };
  if (!["approved", "rejected", "pending"].includes(status ?? "")) return NextResponse.json({ status: "error", message: "Invalid status" }, { status: 400 });
  const t = await db.testimonial.update({ where: { id }, data: { status: status! } });
  return NextResponse.json({ status: "success", data: t });
}
