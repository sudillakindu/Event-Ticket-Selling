import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getSessionUser } from "@/lib/firebase/session";
import { hasMinimumRole } from "@/services/security/rbac";

export default async function ScannerDashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");
  if (!hasMinimumRole(user.role, "scanner-staff")) redirect("/dashboard");

  return (
    <AppShell role={user.role}>
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold text-slate-950">Scanner Dashboard</h1>
        <p className="text-slate-600">QR scanning, manual lookup, and access consumption controls.</p>
      </section>
    </AppShell>
  );
}