import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const ROLE_ADMIN = "admin" as const;

export type SessionPayload = { sub: string; email: string; role: typeof ROLE_ADMIN; iat?: number; exp?: number };

function secret(): Uint8Array {
  const s = process.env.JWT_SECRET;
  if (!s || s.length < 16) throw new Error("JWT_SECRET missing");
  return new TextEncoder().encode(s);
}

export async function signSession(payload: Omit<SessionPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT({ ...payload, role: ROLE_ADMIN })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.role !== ROLE_ADMIN) return null;
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function verifyAdminPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  const fallback = process.env.ADMIN_PASSWORD;
  if (hash) return bcrypt.compare(plain, hash);
  if (fallback) return plain === fallback;
  return false;
}

export function adminEmail(): string {
  return process.env.ADMIN_EMAIL || "admin@kaligawe.local";
}

export const COOKIE_NAME = "admin_session";
