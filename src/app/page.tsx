import Link from "next/link";
import { ArrowRight, QrCode, ShieldCheck, Sparkles, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const highlights = [
  { icon: ShieldCheck, title: "RBAC Secure Access", text: "Role-aware dashboards and server-side authorization for every action." },
  { icon: Ticket, title: "Offline Payment Flow", text: "Reservations, manual payment approval, and ticket issuance with no payment gateway." },
  { icon: QrCode, title: "Encrypted QR Access", text: "Secure random QR tokens with one-time access item consumption and audit logging." }
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 lg:px-10">
      <section className="glass-panel animate-fadeUp rounded-3xl px-6 py-10 lg:px-12 lg:py-16">
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-emerald-800">
          <Sparkles className="h-4 w-4" /> Enterprise Event Ticketing and QR Access Control
        </div>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:items-center">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
              Sell event tickets offline, verify payments manually, and control venue access with secure QR validation.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Built for organizers, scanner staff, and customers with a production-grade Next.js 15 architecture, Firebase Realtime Database, role-based authorization, and auditable access consumption.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/sign-in">
                  Sign in <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/dashboard">Open Dashboard</Link>
              </Button>
            </div>
          </div>
          <Card className="border-emerald-100 bg-white/80 p-6 shadow-glass">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Enterprise controls</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">Super Admin, Organizer, Scanner Staff, Customer</p>
              </div>
              <div className="grid gap-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-emerald-50 px-4 py-3">Server-side Firebase Admin session verification</div>
                <div className="rounded-2xl bg-emerald-50 px-4 py-3">Gmail SMTP ticket delivery with secure QR code</div>
                <div className="rounded-2xl bg-emerald-50 px-4 py-3">Realtime attendance, revenue, and consumption auditing</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <Card key={item.title} className="glass-panel p-6">
            <item.icon className="h-5 w-5 text-emerald-700" />
            <h2 className="mt-4 text-lg font-semibold text-slate-950">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
          </Card>
        ))}
      </section>
    </main>
  );
}