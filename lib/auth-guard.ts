import { cookies } from "next/headers";
import { COOKIE_NAME, verifySession } from "./auth";

export async function requireAdmin(): Promise<{ email: string } | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const s = await verifySession(token);
  if (!s || s.role !== "admin") return null;
  return { email: s.email };
}
