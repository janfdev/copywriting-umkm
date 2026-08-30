import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-guard";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
  const items = await db.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ status: "success", data: items });
}
