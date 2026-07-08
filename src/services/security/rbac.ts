import type { UserRole } from "@/constants/roles";

const roleRank: Record<UserRole, number> = {
  "super-admin": 4,
  organizer: 3,
  "scanner-staff": 2,
  customer: 1
};

export function hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return roleRank[userRole] >= roleRank[requiredRole];
}