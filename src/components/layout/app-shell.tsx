import Link from "next/link";
import { LayoutDashboard, QrCode, ShieldCheck, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROLE_LABELS, type UserRole } from "@/constants/roles";

const navigation = [
  { href: "/dashboard/admin", label: ROLE_LABELS["super-admin"], icon: LayoutDashboard, role: "super-admin" as const },
  { href: "/dashboard/organizer", label: ROLE_LABELS.organizer, icon: Users, role: "organizer" as const },
  { href: "/dashboard/scanner", label: ROLE_LABELS["scanner-staff"], icon: QrCode, role: "scanner-staff" as const },
  { href: "/dashboard/customer", label: ROLE_LABELS.customer, icon: Ticket, role: "customer" as const }
];

export function AppShell({ children, role }: Readonly<{ children: React.ReactNode; role: UserRole }>) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 px-4 py-4 lg:px-6">
      <aside className="hidden w-72 shrink-0 lg:block">
        <Card className="glass-panel sticky top-4 p-4">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-200">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-950">Event Control</p>
              <p className="text-xs text-slate-500">Enterprise operations</p>
            </div>
          </div>
          <nav className="mt-4 space-y-2">
            {navigation.map((item) => (
              <Button key={item.href} asChild variant={role === item.role ? "default" : "ghost"} className="w-full justify-start">
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-950">
            Current role: <strong>{ROLE_LABELS[role]}</strong>
          </div>
        </Card>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}