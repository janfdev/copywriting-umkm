import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await db.testimonial.delete({ where: { id } });
  return NextResponse.json({ status: "success" });
}
