import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getSessionUser } from "@/lib/firebase/session";
import { hasMinimumRole } from "@/services/security/rbac";

export default async function OrganizerDashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");
  if (!hasMinimumRole(user.role, "organizer")) redirect("/dashboard");

  return (
    <AppShell role={user.role}>
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold text-slate-950">Organizer Dashboard</h1>
        <p className="text-slate-600">Events, pending payments, approvals, attendance, sales, and revenue analytics.</p>
      </section>
    </AppShell>
  );
}