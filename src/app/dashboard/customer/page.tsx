import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getSessionUser } from "@/lib/firebase/session";

export default async function CustomerDashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");

  return (
    <AppShell role={user.role}>
      <section className="space-y-6">
        <h1 className="text-3xl font-semibold text-slate-950">Customer Dashboard</h1>
        <p className="text-slate-600">My tickets, QR codes, purchase history, and profile management.</p>
      </section>
    </AppShell>
  );
}