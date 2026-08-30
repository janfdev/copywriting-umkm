import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";

export async function GET() {
  const s = await requireAdmin();
  if (!s) return NextResponse.json({ status: "success", data: null });
  return NextResponse.json({ status: "success", data: { email: s.email, role: "admin" } });
}
