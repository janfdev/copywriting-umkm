import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const { status } = (await req.json().catch(() => ({}))) as { status?: string };
  if (!["approved", "rejected", "pending"].includes(status ?? "")) return NextResponse.json({ status: "error", message: "Invalid status" }, { status: 400 });
  const t = await db.testimonial.update({ where: { id }, data: { status: status! } });
  return NextResponse.json({ status: "success", data: t });
}
