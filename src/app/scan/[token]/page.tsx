import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getSessionUser } from "@/lib/firebase/session";
import { hasMinimumRole } from "@/services/security/rbac";
import { hashToken } from "@/utils/crypto";

export default async function ScanTokenPage({ params }: { params: Promise<{ token: string }> }) {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");
  if (!hasMinimumRole(user.role, "scanner-staff")) redirect("/dashboard");

  const { token } = await params;
  const tokenHash = hashToken(token);

  return (
    <AppShell role={user.role}>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-950">QR Validation</h1>
        <p className="text-slate-600">Ready to validate a secure access token. Hash key: {tokenHash.slice(0, 12)}…</p>
      </section>
    </AppShell>
  );
}