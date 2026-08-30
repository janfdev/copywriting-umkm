"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.message || "Login gagal");
      toast.success("Masuk sebagai admin");
      router.push(next);
      router.refresh();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Login gagal");
    } finally { setLoading(false); }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Masuk Dashboard</CardTitle>
        <CardDescription>Hanya role <b>admin</b>. Kredensial dari env <code>ADMIN_EMAIL</code> / <code>ADMIN_PASSWORD_HASH</code>.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@kaligawe.local" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Memeriksa…" : "Masuk"}</Button>
          <p className="text-xs text-stone-500">Set <code>ADMIN_PASSWORD_HASH</code> (bcrypt) atau <code>ADMIN_PASSWORD</code> sementara, lalu restart.</p>
        </form>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-10">
      <Suspense fallback={<Card className="w-full p-6 text-sm text-stone-500">Memuat…</Card>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
