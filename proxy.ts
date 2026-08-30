import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

async function isAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin_session")?.value;
  if (!token) return false;
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (req.nextUrl.pathname.startsWith("/dashboard")) res.headers.set("X-Robots-Tag", "noindex, nofollow");

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const url = req.nextUrl.clone();
    url.pathname = url.pathname.replace(/^\/admin/, "/dashboard");
    return NextResponse.redirect(url);
  }

  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isDashboardApi = req.nextUrl.pathname.startsWith("/api/analytics") || req.nextUrl.pathname.startsWith("/api/testimonials/admin") || req.nextUrl.pathname === "/api/testimonials" && req.method === "DELETE" || req.nextUrl.pathname.includes("/api/testimonials/") && (req.nextUrl.pathname.endsWith("/status") || req.nextUrl.pathname.endsWith("/marquee"));

  if ((isDashboard || isDashboardApi) && !(await isAdmin(req))) {
    if (isDashboardApi) return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
