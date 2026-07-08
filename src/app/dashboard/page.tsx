import { redirect } from "next/navigation";
import { ROLE_DASHBOARD_PATHS } from "@/constants/roles";
import { getSessionUser } from "@/lib/firebase/session";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");
  redirect(ROLE_DASHBOARD_PATHS[user.role]);
}